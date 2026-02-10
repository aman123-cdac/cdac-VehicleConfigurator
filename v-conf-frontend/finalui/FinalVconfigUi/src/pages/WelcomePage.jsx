import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Car, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dropdown from "../components/Dropdown";
import { welcomeService } from "../services/welcomeService";
import { useToast } from "@/hooks/use-toast";

export default function WelcomePage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [segments, setSegments] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);

  const [segment, setSegment] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [model, setModel] = useState(null);

  const [quantity, setQuantity] = useState(0);
  const [minQuantity, setMinQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ===============================
     AUTH CHECK
  ================================ */
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [navigate]);

  /* ===============================
     LOAD SEGMENTS
  ================================ */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await welcomeService.getSegments();
        setSegments(data);
      } catch (err) {
        toast({
          title: "Failed to load segments",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  /* ===============================
     LOAD MANUFACTURERS
  ================================ */
  useEffect(() => {
    if (!segment) return;

    welcomeService.getManufacturers(segment.id).then(setManufacturers);
    setManufacturer(null);
    setModel(null);
    setModels([]);
  }, [segment]);

  /* ===============================
     LOAD MODELS
  ================================ */
  useEffect(() => {
    if (!segment || !manufacturer) return;

    welcomeService
      .getModels(manufacturer.id, segment.id)
      .then(setModels);
  }, [segment, manufacturer]);

  /* ===============================
     CONTINUE
  ================================ */
  const handleContinue = () => {
    if (!model || quantity < minQuantity) {
      toast({
        title: "Invalid Selection",
        description: `Minimum quantity is ${minQuantity}`,
        variant: "warning",
      });
      return;
    }

    navigate(`/default_config/${model.id}?qty=${quantity}`);
  };

  /* ===============================
     LOADING
  ================================ */
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
        <p className="text-gray-500 font-medium">
          Loading configuration options…
        </p>
      </div>
    );
  }

  /* ===============================
     UI
  ================================ */
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Car size={32} />
          </div>
          <h1 className="text-3xl font-black">Configure Your Vehicle</h1>
          <p className="text-slate-400 mt-2">
            Choose segment, manufacturer and model
          </p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          <Dropdown
            label="Segment"
            value={segment?.id || ""}
            onChange={(id) =>
              setSegment(segments.find((s) => s.id == id))
            }
            options={segments.map((s) => ({
              value: s.id,
              label: s.name,
            }))}
          />

          <Dropdown
            label="Manufacturer"
            value={manufacturer?.id || ""}
            onChange={(id) =>
              setManufacturer(
                manufacturers.find((m) => m.id == id)
              )
            }
            options={manufacturers.map((m) => ({
              value: m.id,
              label: m.name,
            }))}
            disabled={!segment}
          />

          <Dropdown
            label="Model"
            value={model?.id || ""}
            onChange={(id) => {
              const selected = models.find((m) => m.id == id);
              setModel(selected);
              setMinQuantity(selected.minQty);
              setQuantity(selected.minQty);
            }}
            options={models.map((m) => ({
              value: m.id,
              label: `${m.name} (Min ${m.minQty})`,
            }))}
            disabled={!manufacturer}
          />

          {model && (
            <div>
              <label className="block text-sm font-semibold mb-1">
                Quantity (Min {minQuantity})
              </label>
              <input
                type="number"
                min={minQuantity}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(minQuantity, +e.target.value))
                }
                className="w-full h-12 border rounded-lg px-4 font-bold"
              />
            </div>
          )}

          <Button
            onClick={handleContinue}
            disabled={!model || quantity < minQuantity}
            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-xl gap-2"
          >
            Continue <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
