import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function EnhancedStatCard({ title, value, subtitle, icon, trend, trendValue }) {
  const isPositive = trend === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-gray-600 font-medium text-sm">{title}</p>
        </div>
        {icon && (
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <motion.h2
          className="text-4xl font-bold text-gray-900"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {value}
        </motion.h2>

        <div className="flex items-center gap-2">
          {trend && trendValue && (
            <div
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                isPositive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trendValue}
            </div>
          )}
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="mt-4 h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
    </motion.div>
  );
}
