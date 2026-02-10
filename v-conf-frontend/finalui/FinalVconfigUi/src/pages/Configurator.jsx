import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Armchair,
  Palette,
  Wrench,
  Loader2,
} from "lucide-react";

import { FeatureCard } from "@/components/configurator/FeatureCard";
import { SectionHeader } from "@/components/configurator/SectionHeader";
import { ConfigSummary } from "@/components/configurator/ConfigSummary";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { vehicleService } from "@/services/vehicleService";
import { useToast } from "@/hooks/use-toast";

// 1. Modified mapping to be more flexible
const mapApiGroups = (groups, category) =>
  groups.map((g) => ({
    componentName: g.componentName,
    options: g.options.map((o) => ({
      altId: Number(o.compId),
      label: o.subType,
      price: Number(o.price) || 0,
      category,
    })),
  }));

/* ======================================================
   MERGE SAME COMPONENT NAMES
====================================================== */
const mergeGroupsByComponentName = (groups) => {
  const map = {};

  groups.forEach((g) => {
    const name = g.componentName || "Unknown";
    if (!map[name]) {
      map[name] = {
        componentName: name,
        options: [],
      };
    }

    g.options.forEach(opt => {
      const exists = map[name].options.some(o => o.altId === opt.altId);
      if (!exists) {
        map[name].options.push(opt);
      }
    });
  });

  return Object.values(map);
};

/* ======================================================
   PROCESS CATEGORY (Logic for Standard vs Alternate)
====================================================== */
const processOptions = (apiGroups, category, defaults) => {
  const mapped = mapApiGroups(apiGroups, category);
  const merged = mergeGroupsByComponentName(mapped);

  return merged.map(group => {
    // Find if any default matches this component group
    const matchingDefault = defaults.find(d => d.compName === group.componentName);

    if (matchingDefault) {
      // THE FIX: Try to find standardOption by ID OR by Name/Label (matchingDefault.name is the subtype)
      const foundOption = group.options.find(o =>
        o.altId === matchingDefault.id ||
        o.label.toLowerCase() === matchingDefault.name.toLowerCase()
      );

      const standardOption = foundOption || {
        altId: matchingDefault.id,
        label: matchingDefault.name,
        price: 0,
        category,
        isDefault: true
      };

      // Ensure the standard item has price 0 and is marked default
      const standardItem = {
        ...standardOption,
        price: 0,
        isDefault: true
      };

      const alternates = group.options.filter(o => o.altId !== standardItem.altId);

      return {
        ...group,
        standardItem,
        alternates: alternates.map(alt => ({ ...alt, isDefault: false })),
        options: [standardItem, ...alternates]
      };
    }

    // Fallback: If no default matched, try to find a Price 0 option.
    // If THAT fails, take the FIRST option as the default. This ensures every group has a valid "Included" item.

    let standardItem = group.options.find(o => o.price === 0);

    if (!standardItem) {
      // Force the first item as the standard one for ALL categories if no other default exists.
      standardItem = group.options[0];
    }

    if (standardItem) {
      // Mark as default
      standardItem = { ...standardItem, isDefault: true };

      // Ensure we don't duplicate it in alternates
      const alternates = group.options.filter(o => o.altId !== standardItem.altId);

      return {
        ...group,
        standardItem,
        alternates: alternates.map(alt => ({ ...alt, isDefault: false })),
        options: [standardItem, ...alternates]
      };
    }

    // Really no default found
    return {
      ...group,
      standardItem: null,
      alternates: group.options,
      options: group.options
    };
  });
};

/* ======================================================
   COMPONENT
====================================================== */
const Configurator = () => {
  const { modelId } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty") || 1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selection, setSelection] = useState(null);
  const [options, setOptions] = useState({
    standard: [],
    interior: [],
    exterior: [],
    accessories: [],
  });

  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("interior");

  /* ================= LOAD SELECTION ================= */
  useEffect(() => {
    const stored = localStorage.getItem("current_order_selection");
    if (!stored) {
      navigate("/welcome");
      return;
    }
    setSelection(JSON.parse(stored));
  }, [navigate]);

  /* ================= LOAD OPTIONS ================= */
  useEffect(() => {
    if (!modelId || !selection) return;

    const load = async () => {
      try {
        setLoading(true);

        const [s, i, e, a] = await Promise.all([
          vehicleService.getStandard(modelId),
          vehicleService.getInterior(modelId),
          vehicleService.getExterior(modelId),
          vehicleService.getAccessories(modelId),
        ]);

        const defaults = selection.defaultComponents || [];

        const stdProcessed = processOptions(s, "standard", defaults);
        const intProcessed = processOptions(i, "interior", defaults);
        const extProcessed = processOptions(e, "exterior", defaults);
        const accProcessed = processOptions(a, "accessories", defaults);

        // Consolidate: If a group exists in Interior/Exterior/Accessories, merge the Standard item into it
        // and remove from the top-level Standard list.

        let finalStandard = [...stdProcessed];
        const mergeIntoCategory = (categoryGroups) => {
          return categoryGroups.map(catGroup => {
            const stdMatchIndex = finalStandard.findIndex(s => s.componentName.toLowerCase() === catGroup.componentName.toLowerCase());
            if (stdMatchIndex !== -1) {
              const stdGroup = finalStandard[stdMatchIndex];
              // Remove directly from standard list to prevent duplication
              finalStandard.splice(stdMatchIndex, 1);

              // If the category group is missing a standard item, use the one from Standard list
              if (!catGroup.standardItem && stdGroup.standardItem) {
                return {
                  ...catGroup,
                  standardItem: stdGroup.standardItem,
                  options: [stdGroup.standardItem, ...catGroup.options]
                };
              }
            }
            return catGroup;
          });
        };

        const finalInterior = mergeIntoCategory(intProcessed);
        const finalExterior = mergeIntoCategory(extProcessed);
        const finalAccessories = mergeIntoCategory(accProcessed);

        setOptions({
          standard: finalStandard,
          interior: finalInterior,
          exterior: finalExterior,
          accessories: finalAccessories,
        });

        // Initialize config: iterate ALL groups to ensure even fallback defaults are selected
        const initialConfig = {};
        const allGroups = [...finalStandard, ...finalInterior, ...finalExterior, ...finalAccessories];

        // 1. First, populate with whatever the processed logic determined is the "standardItem"
        // This covers both explicit defaults AND the price-based fallback AND the merged items
        allGroups.forEach(group => {
          if (group.standardItem) {
            initialConfig[group.componentName] = {
              componentName: group.componentName,
              baseCompId: group.standardItem.altId,
              altId: group.standardItem.altId,
              label: group.standardItem.label,
              price: group.standardItem.price,
              isDefault: true
            };
          }
        });

        // 2. (Optional) Overlay specific default selection IDs if needed, but the above should cover it if processOptions works
        // We can keep the default matching as a secondary check or just rely on processOptions

        setConfig(initialConfig);

      } catch (err) {
        console.error(err);
        toast({
          title: "Load failed",
          description: "Could not load components",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [modelId, selection, toast]);

  /* ================= TOGGLE ================= */
  const toggleOption = (componentName, baseCompId, opt) => {
    setConfig((prev) => {
      const current = prev[componentName];

      // If clicking the SAME option that is currently selected
      if (current && current.altId === opt.altId) {
        // Return to default if it exists and isn't the current one
        const allGroups = [
          ...options.standard,
          ...options.interior,
          ...options.exterior,
          ...options.accessories
        ];
        const groupData = allGroups.find(g => g.componentName === componentName);

        if (groupData?.standardItem && opt.altId !== groupData.standardItem.altId) {
          return {
            ...prev,
            [componentName]: {
              componentName,
              baseCompId: groupData.standardItem.altId,
              altId: groupData.standardItem.altId,
              label: groupData.standardItem.label,
              price: 0,
              isDefault: true
            }
          };
        }
        return prev; // Don't allow deselecting everything
      }

      // Replace selection
      return {
        ...prev,
        [componentName]: {
          componentName,
          baseCompId,
          altId: opt.altId,
          label: opt.label,
          price: opt.price,
          isDefault: opt.isDefault || false
        },
      };
    });
  };

  /* ================= DERIVED ================= */
  const selectedComponents = useMemo(
    () => Object.values(config).filter(c => !c.isDefault),
    [config]
  );

  const addOnsTotal = useMemo(
    () => selectedComponents.reduce((sum, c) => sum + c.price, 0),
    [selectedComponents]
  );

  const unitTotal = selection ? selection.basePrice + addOnsTotal : 0;
  const grandTotal = unitTotal * qty;

  /* ================= SAVE & NAVIGATE ================= */
  const handlePlaceOrder = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      if (selectedComponents.length > 0) {
        await vehicleService.saveAlternateComponents({
          modelId: selection.model.id,
          components: selectedComponents.map((c) => ({
            compId: c.baseCompId,
            altCompId: c.altId,
          })),
        });
      }

      const allSelections = Object.values(config);

      localStorage.setItem("final_order", JSON.stringify({
        ...selection,
        selectedComponents: allSelections, // Send ALL active selections (Standard + Upgrade) to Invoice
        addOnsTotal,
        grandTotal,
      }));

      toast({ title: "Order placed successfully" });
      navigate("/invoice");
    } catch (err) {
      console.error(err);
      toast({ title: "Failed to place order", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !selection) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50/30">
      {/* LEFT AREA: Features */}
      <div className="flex-1 p-8 space-y-12 overflow-y-auto max-w-[900px]">
        <SectionHeader
          icon={Sparkles}
          title="Standard Features"
          count={options.standard.length}
        />

        <div className="space-y-12 ml-1">
          {options.standard.map((group) => (
            <div key={group.componentName} className="space-y-5">
              <h4 className="font-bold text-gray-900 text-lg tracking-tight px-1">
                {group.componentName}
              </h4>

              <div className="space-y-4">
                {/* STANDARD ITEM (ALWAYS TOP) */}
                {group.standardItem ? (
                  <FeatureCard
                    name={group.standardItem.label}
                    price={0}
                    isSelected={config[group.componentName]?.altId === group.standardItem.altId}
                    isStandard={true}
                    onToggle={() => toggleOption(group.componentName, group.standardItem.altId, group.standardItem)}
                  />
                ) : (
                  <div className="p-5 border border-dashed rounded-xl flex items-center justify-center text-gray-400 italic text-sm bg-gray-50/50">
                    Base configuration not defined
                  </div>
                )}

                {/* ALTERNATES BELOW */}
                {group.alternates.map((opt) => (
                  <FeatureCard
                    key={opt.altId}
                    name={opt.label}
                    price={opt.price}
                    isSelected={config[group.componentName]?.altId === opt.altId}
                    isStandard={false}
                    onToggle={() => toggleOption(group.componentName, group.standardItem?.altId || 0, opt)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10 pt-4">
          <TabsList className="bg-gray-100/50 p-1.5 rounded-2xl h-14 w-fit border border-gray-100 shadow-sm transition-all hover:bg-gray-100/80">
            <TabsTrigger value="interior" className="rounded-xl px-8 h-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all font-bold text-sm flex items-center gap-2.5">
              <Armchair className="w-4 h-4" /> Interior
            </TabsTrigger>
            <TabsTrigger value="exterior" className="rounded-xl px-8 h-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all font-bold text-sm flex items-center gap-2.5">
              <Palette className="w-4 h-4" /> Exterior
            </TabsTrigger>
            <TabsTrigger value="accessories" className="rounded-xl px-8 h-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all font-bold text-sm flex items-center gap-2.5">
              <Wrench className="w-4 h-4" /> Accessories
            </TabsTrigger>
          </TabsList>

          {["interior", "exterior", "accessories"].map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-0 focus-visible:outline-none">
              <div className="space-y-12 ml-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {options[cat].map((group) => (
                  <div key={group.componentName} className="space-y-5">
                    <h4 className="font-bold text-gray-900 text-lg tracking-tight px-1 mb-3">
                      {group.componentName}
                    </h4>

                    <div className="space-y-4">
                      {/* STANDARD ITEM */}
                      {group.standardItem && (
                        <FeatureCard
                          name={group.standardItem.label}
                          price={0}
                          isSelected={config[group.componentName]?.altId === group.standardItem.altId}
                          isStandard={true}
                          onToggle={() => toggleOption(group.componentName, group.standardItem.altId, group.standardItem)}
                        />
                      )}

                      {/* ALTERNATES */}
                      {group.alternates.map((opt) => (
                        <FeatureCard
                          key={opt.altId}
                          name={opt.label}
                          price={opt.price}
                          isSelected={config[group.componentName]?.altId === opt.altId}
                          isStandard={false}
                          onToggle={() => toggleOption(group.componentName, group.standardItem?.altId || 0, opt)}
                        />
                      ))}

                      {group.alternates.length === 0 && !group.standardItem && (
                        <div className="p-6 border border-dashed rounded-2xl flex items-center justify-center text-gray-400 italic text-sm">
                          No options available
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* RIGHT AREA: Summary */}
      <div className="w-[450px] border-l bg-white/50 backdrop-blur-xl shadow-2xl z-10 sticky top-0 h-screen overflow-y-auto">
        <ConfigSummary
          vehicleName={selection.model.name}
          manufacturer={selection.manufacturer}
          quantity={qty}
          basePrice={selection.basePrice}
          selectedComponents={selectedComponents}
          addOnsTotal={addOnsTotal}
          grandTotal={grandTotal}
          onSave={handlePlaceOrder}
          onBack={() => navigate(`/default_config/${modelId}?qty=${qty}`)}
          onPlaceOrder={handlePlaceOrder}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};

export default Configurator;
