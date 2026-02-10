import { Badge } from "@/components/ui/badge";

export const SectionHeader = ({
    icon: Icon,
    title,
    count,
    selectedCount
}) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                        options available
                    </p>
                </div>
            </div>
            {selectedCount !== undefined && selectedCount > 0 && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    {selectedCount} selected
                </Badge>
            )}
        </div>
    );
};
