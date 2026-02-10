import { Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const FeatureCard = ({
    id,
    name,
    description,
    price,
    isSelected,
    onToggle,
    isStandard = false,
}) => {
    const formatPrice = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div
            className={cn(
                "group flex items-center justify-between p-5 rounded-xl border transition-all duration-300",
                isStandard
                    ? "bg-[#f8faff] border-[#e9effd]"
                    : isSelected
                        ? "bg-white border-blue-200 shadow-sm"
                        : "bg-white border-gray-100 hover:border-blue-100 hover:shadow-sm"
            )}
        >
            <div className="flex-1 min-w-0 mr-4">
                <h4 className={cn(
                    "font-semibold text-[15px] tracking-tight",
                    isStandard ? "text-[#4a5568]" : "text-gray-900"
                )}>
                    {name}
                </h4>
                {description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1 font-medium">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 min-w-[120px] justify-end">
                    <span className={cn(
                        "font-semibold text-sm",
                        isStandard
                            ? "text-gray-400"
                            : "text-gray-900"
                    )}>
                        {isStandard ? "Included" : `+ ${formatPrice(price)}`}
                    </span>

                    {isStandard && (
                        <div className="flex items-center gap-1.5 py-1.5 px-3 bg-white border border-gray-200 rounded-full shadow-sm">
                            <Check className="w-3.5 h-3.5 text-blue-600 stroke-[4]" />
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-900">Standard</span>
                        </div>
                    )}
                </div>

                {!isStandard && (
                    <div className="min-w-[100px] flex justify-end">
                        {isSelected ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onToggle(id)}
                                className="h-9 px-5 rounded-lg border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all font-bold text-xs gap-2 group-hover:scale-[1.02]"
                            >
                                <X className="w-3.5 h-3.5 stroke-[3]" />
                                Remove
                            </Button>
                        ) : (
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => onToggle(id)}
                                className="h-9 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100 transition-all font-bold text-xs gap-2 group-hover:scale-[1.02]"
                            >
                                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                                Add
                            </Button>
                        )
                        }
                    </div>
                )
                }
            </div>
        </div>
    );
};
