import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function EnhancedQuickActionCard({ title, subtitle, icon, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200 hover:border-blue-300 relative overflow-hidden"
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

        {/* Arrow Icon */}
        <div className="flex items-center text-blue-600 text-sm font-medium">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            Get Started
          </span>
          <ArrowRight className="w-4 h-4 ml-2 transform translate-x-0 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
