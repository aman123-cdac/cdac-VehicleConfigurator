import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ThankYou() {
    const navigate = useNavigate();

    const handleGoDashboard = () => {
        // Clear only order-related data (keep auth/session)
        localStorage.removeItem("final_order");
        localStorage.removeItem("last_saved_config");
        localStorage.removeItem("current_order_selection");

        navigate("/dashboard", { replace: true });
    };

    return (
        <div className="flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 text-center space-y-6 animate-in fade-in zoom-in duration-300">

                {/* ICON */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                {/* TEXT */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Order Confirmed 🎉
                    </h1>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Your vehicle configuration has been saved successfully.
                        <br />
                        The invoice has been generated and sent to your email.
                    </p>
                </div>

                {/* ACTION */}
                <Button
                    size="lg"
                    className="w-full gap-2 bg-gray-900 hover:bg-gray-800"
                    onClick={handleGoDashboard}
                >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                </Button>

            </div>
        </div>
    );
}
