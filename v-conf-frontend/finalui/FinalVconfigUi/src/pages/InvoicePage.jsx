import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Download,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { invoiceService } from "@/services/invoiceService";
import { useToast } from "@/hooks/use-toast";

const InvoicePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingOrder, setCheckingOrder] = useState(true);

  /* ================= LOAD ORDER ================= */
  useEffect(() => {
    const stored = localStorage.getItem("final_order");

    if (!stored) {
      navigate("/welcome", { replace: true });
      return;
    }

    try {
      setOrder(JSON.parse(stored));
    } catch {
      localStorage.removeItem("final_order");
      navigate("/welcome", { replace: true });
    } finally {
      setCheckingOrder(false);
    }
  }, [navigate]);

  /* ================= CALCULATIONS ================= */
  const tax = useMemo(() => {
    if (!order) return 0;
    return order.grandTotal * 0.18;
  }, [order]);

  const finalAmount = useMemo(() => {
    if (!order) return 0;
    return order.grandTotal + tax;
  }, [order, tax]);

  const format = (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(v);

  /* ================= CONFIRM & GENERATE ================= */
  const handleConfirm = async () => {
    try {
      setLoading(true);

      await invoiceService.generateInvoice({
        modelId: order.model.id,
        qty: order.quantity,
        customerDetail: "Online Order",
        components: order.selectedComponents.map((c) => ({
          compId: c.baseCompId,
          altCompId: c.altId,
        })),
      });

      toast({
        title: "Invoice Generated",
        description: "Invoice emailed successfully 📧",
      });

      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      toast({
        title: "Invoice Failed",
        description: err?.response?.data || "Server error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */
  if (checkingOrder) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading invoice...</p>
      </div>
    );
  }

  if (!order) return null;

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg my-10 rounded-xl border">

      {/* HEADER */}
      <div className="flex justify-between items-start border-b pb-8">
        <div>
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle className="w-6 h-6" />
            <span className="font-bold uppercase tracking-wider">
              Order Confirmed
            </span>
          </div>
          <h1 className="text-4xl font-black">INVOICE</h1>
          <p className="text-gray-500 mt-1">
            Order #VCF-{Math.floor(Math.random() * 10000)}
          </p>
        </div>

        <div className="text-right">
          <h2 className="font-bold text-xl text-blue-600">
            VehicleConfig Ltd.
          </h2>
          <p className="text-sm text-gray-500">Innovation Hub, Pune</p>
        </div>
      </div>

      {/* VEHICLE INFO */}
      <div className="py-8 grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">
            Vehicle Details
          </h3>
          <p className="font-bold text-lg">{order.model.name}</p>
          <p className="text-gray-600">
            {order.manufacturer} • Qty: {order.quantity}
          </p>
        </div>

        <div className="text-right">
          <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">
            Configuration Date
          </h3>
          <p className="font-medium">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>


      {/* VEHICLE CONFIGURATION TABLE */}
      {(() => {
        if (!order.selectedComponents || order.selectedComponents.length === 0) return null;

        return (
          <>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Vehicle Configuration
            </h3>
            <table className="w-full mb-8">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Feature / Component
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Selection
                  </th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">
                    Price Adjustment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-b">
                {order.selectedComponents.map((item, idx) => {
                  // Determine if it's an upgrade or standard based on isDefault flag OR price 0
                  const isincluded = item.isDefault || item.price === 0;

                  return (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 text-gray-600 text-sm font-medium">
                        {item.componentName}
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-bold text-gray-900">
                          {item.label}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        {!isincluded ? (
                          <span className="text-blue-700 font-bold whitespace-nowrap">
                            + {format(item.price)}
                          </span>
                        ) : (
                          <span className="text-gray-400 font-medium italic">
                            Included
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      })()}

      {/* TOTALS */}
      <div className="flex justify-end mb-8">
        <div className="w-80 space-y-3">
          <div className="flex justify-between text-gray-600 font-medium">
            <span>Base Amount</span>
            <span>{format(order.grandTotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600 font-medium">
            <span>Tax (18%)</span>
            <span>{format(tax)}</span>
          </div>
          <div className="flex justify-between items-center text-xl pt-4 border-t border-gray-200">
            <span className="font-bold text-gray-900">Total Payable</span>
            <span className="font-extrabold text-blue-600 text-2xl">
              {format(finalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          disabled={loading}
          className="h-12 text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
        >
          Back
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={loading}
          className="h-12 bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <FileText className="w-4 h-4" />
          {loading ? "Generating..." : "Confirm & Generate Invoice"}
        </Button>
      </div>
    </div>
  );
};

export default InvoicePage;
