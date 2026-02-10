import {
  LayoutDashboard,
  Car,
  Layers,
  FileText,
  Upload,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export default function EnhancedSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/dashboard" },
    { icon: Car, text: "Configure", path: "/welcome" },
    { icon: Layers, text: "Templates", path: "/default_config/1" },
    { icon: FileText, text: "Invoices", path: "/invoice" },
    { icon: Upload, text: "Upload", path: "/upload" },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen p-4 flex flex-col">
        {/* Logo */}
        <motion.div
          className="mb-8 flex items-center gap-3 px-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">VehicleConfig</h2>
            <p className="text-xs text-gray-400">Configuration Panel</p>
          </div>
        </motion.div>

        {/* Menu Section */}
        <div className="mb-6">
          <p className="text-gray-400 font-semibold text-xs uppercase tracking-widest mb-4 px-3">
            Menu
          </p>

          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg cursor-pointer transition-all ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.text}</span>
                    {isActive(item.path) && (
                      <motion.div
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.text}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </div>

        <Separator className="bg-gray-700 my-4" />

        {/* Bottom Section */}
        <div className="mt-auto space-y-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => navigate("/settings")}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Settings size={20} />
                <span className="text-sm font-medium">Settings</span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut size={20} />
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
