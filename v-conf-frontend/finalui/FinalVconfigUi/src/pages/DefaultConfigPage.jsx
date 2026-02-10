import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { defaultConfigService } from "../services/defaultConfigService";
import { Car } from "lucide-react";

export default function DefaultConfigPage() {
    const navigate = useNavigate();
    const { modelId } = useParams();
    const [searchParams] = useSearchParams();
    const quantity = parseInt(searchParams.get("qty"), 10) || 1;

    const [data, setData] = useState(null);
    const [imgError, setImgError] = useState(false);

    /* ===============================
       LOAD DEFAULT CONFIG
    =============================== */
    useEffect(() => {
        if (!modelId || quantity <= 0) {
            navigate("/welcome");
            return;
        }

        defaultConfigService
            .getDefaultConfiguration(modelId, quantity)
            .then(res => {
                setData(res);

                // Persist selection for Configurator
                localStorage.setItem(
                    "current_order_selection",
                    JSON.stringify({
                        model: { id: modelId, name: res.modelName },
                        manufacturer: res.manufacturerName,
                        segment: res.segmentName,
                        basePrice: res.basePrice,
                        quantity,
                        defaultComponents: res.defaultComponents
                    })
                );
            })
            .catch(() => navigate("/welcome"));
    }, [modelId, quantity, navigate]);


    if (!data) {
        return <p className="p-10 text-center text-gray-400">Loading your vehicle configuration...</p>;
    }


    /* ===============================
       CONFIRM DEFAULT ORDER
    =============================== */
    const handleConfirmDefault = () => {


        const finalOrder = {
            model: { id: modelId, name: data.modelName },
            manufacturer: data.manufacturerName,
            segment: data.segmentName,
            basePrice: data.basePrice,
            quantity,
            // Java backend now returns {id, name, compName, compType}
            selectedComponents: data.defaultComponents.map(c => ({
                componentName: c.compName,  // Category: "Air Bags", "Transmission"
                label: c.name,              // Selection: "6 Airbags", "CVT Automatic"
                price: 0,
                isDefault: true,
                baseCompId: c.id,
                altId: c.id
            })),
            defaultComponents: data.defaultComponents,
            addOnsTotal: 0,
            grandTotal: data.totalPrice,
            customerDetail: "Default Configuration"
        };

        localStorage.setItem("final_order", JSON.stringify(finalOrder));
        navigate("/invoice");
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
            {/* ================= HERO SECTION ================= */}
            <div className="bg-white rounded-[2rem] shadow-xl border overflow-hidden">
                {/* Image Area */}
                <div className="aspect-[21/9] bg-gray-50 relative">
                    {!imgError && data.imgPath ? (
                        <img
                            src={data.imgPath}
                            alt={data.modelName}
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Car className="w-20 h-20 text-gray-200" />
                        </div>
                    )}
                </div>

                {/* Info Bar */}
                <div className="bg-[#666] p-6 text-white">
                    <h1 className="text-3xl font-bold tracking-tight">{data.modelName}</h1>
                    <p className="text-gray-300 font-medium">
                        {data.manufacturerName} • {data.segmentName}
                    </p>
                </div>
            </div>

            {/* ================= FEATURES SECTION ================= */}
            <div className="bg-white rounded-3xl shadow-sm border p-8">
                <h2 className="text-xl font-bold mb-8 text-gray-900">Default Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.defaultComponents.map(c => (
                        <div
                            key={c.id}
                            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-50/60 border border-transparent transition-all"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
                            <span className="font-semibold text-gray-700 text-sm">{c.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= PRICE SUMMARY ================= */}
            <div className="bg-white rounded-3xl shadow-sm border p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-10">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Unit Price</span>
                        <span className="text-xl font-bold text-gray-900">₹ {data.basePrice.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Qty</span>
                        <span className="text-xl font-bold text-gray-900">× {quantity}</span>
                    </div>
                </div>

                <div className="text-center md:text-right">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Total Amount</span>
                    <span className="text-3xl font-black text-green-600">
                        ₹ {data.totalPrice.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            {/* ================= ACTION BAR ================= */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                    className="flex-1 px-8 py-4 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all"
                    onClick={() => navigate(-1)}
                >
                    Back to Catalog
                </button>
                <button
                    className="flex-1 px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-lg"
                    onClick={() => navigate(`/configurator/${modelId}?qty=${quantity}`)}
                >
                    Custom Configuration
                </button>
                <button
                    className="flex-1 px-8 py-4 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-xl shadow-green-200 transition-all"
                    onClick={handleConfirmDefault}
                >
                    Confirm Selection
                </button>
            </div>
        </div>
    );
}
