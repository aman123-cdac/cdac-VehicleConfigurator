import { Car, Package, ArrowLeft, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const ConfigSummary = ({
    vehicleName,
    manufacturer,
    quantity,
    basePrice,
    selectedComponents,
    addOnsTotal,
    grandTotal,
    onSave,
    onBack,
    onPlaceOrder,
    isSaving = false,
}) => {
    const formatPrice = (v) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(v);

    return (
        <div className="bg-white p-8 h-full flex flex-col">
            {/* Vehicle Info */}
            <div className="flex items-start gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mt-1">
                    <Car className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-bold text-[22px] text-gray-900 tracking-tight leading-tight">{vehicleName}</h3>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">{manufacturer}</p>
                </div>
            </div>

            {/* Selected Components */}
            <div className="mb-10 flex-1">
                <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-[13px] tracking-wide uppercase">
                    <Package className="w-3.5 h-3.5" />
                    <span>Selected Components</span>
                </div>

                {selectedComponents.length === 0 ? (
                    <div className="py-10 px-4 border border-dashed rounded-3xl flex items-center justify-center bg-gray-50/30">
                        <span className="text-xs text-gray-400 font-medium italic">No premium upgrades selected</span>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {selectedComponents.map((c) => (
                            <li
                                key={c.altId}
                                className="flex justify-between items-center animate-in fade-in slide-in-from-right-2 duration-300"
                            >
                                <span className="text-[15px] font-semibold text-gray-800 leading-tight pr-4">{c.label}</span>
                                <span className="text-[15px] font-bold text-gray-900 whitespace-nowrap">
                                    {formatPrice(c.price)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Breakdown & Totals */}
            <div className="pt-8 space-y-5">
                <div className="space-y-4 text-gray-500 font-bold text-[15px]">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400 uppercase tracking-widest text-[10px]">Base Price</span>
                        <span className="text-gray-900">{formatPrice(basePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400 uppercase tracking-widest text-[10px]">Add-ons</span>
                        <span className="text-gray-900">+ {formatPrice(addOnsTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400 uppercase tracking-widest text-[10px]">Quantity</span>
                        <span className="text-gray-900">× {quantity}</span>
                    </div>
                </div>

                <div className="h-px bg-gray-100 my-6" />

                <div className="flex justify-between items-center mb-10">
                    <span className="font-bold text-[17px] text-gray-900 tracking-tight">Grand Total</span>
                    <span className="text-[32px] font-black text-gray-900 tracking-tighter">
                        {formatPrice(grandTotal)}
                    </span>
                </div>

                {/* Main Action */}
                <Button
                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-200 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3"
                    onClick={onPlaceOrder}
                    disabled={isSaving}
                >
                    <CheckCircle className="w-5 h-5 stroke-[2.5]" />
                    {isSaving ? "Finalizing Order..." : "Place Order"}
                </Button>

                <Button
                    variant="ghost"
                    className="w-full h-12 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all font-bold text-xs flex items-center justify-center gap-2 group"
                    onClick={onBack}
                >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    Back to Default Config
                </Button>
            </div>
        </div>
    );
};
