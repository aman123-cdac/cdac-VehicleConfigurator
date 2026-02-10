import { useEffect, useState } from "react";
import { Car, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "@/api/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MobileSidebar from "./MobileSidebar";
import { motion } from "framer-motion";

export default function EnhancedDashboardHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(null);
  const [initial, setInitial] = useState("U");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const parseJwt = (t) => {
      try {
        const payload = t.split(".")[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = JSON.parse(window.atob(base64));
        return json;
      } catch (e) {
        return null;
      }
    };

    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/user/profile");
        const user = res.data;
        const userName = user.name || user.username || user.email || null;
        setName(userName);
        setInitial(userName ? userName.charAt(0).toUpperCase() : "U");
      } catch (err) {
        const payload = parseJwt(token);
        const userName =
          payload?.name || payload?.email || payload?.sub || null;
        setName(userName);
        setInitial(userName ? userName.charAt(0).toUpperCase() : "U");
      }
    };

    fetchProfile();
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Configure", path: "/welcome" },
    { name: "Templates", path: "/default_config/1" },
    { name: "Invoices", path: "/invoice" },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-3">
            <MobileSidebar />
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                VehicleConfig
              </span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`font-medium text-sm transition-colors relative ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute -bottom-[18px] left-0 right-0 h-0.5 bg-blue-600"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <TooltipProvider>
              {/* Notifications */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-gray-100"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 pl-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {initial}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="font-semibold text-gray-900 text-sm leading-none">
                        {name || "Guest User"}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {name ? "View Profile" : "Sign in"}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      if (!localStorage.getItem("token")) navigate("/signin");
                      else navigate("/profile");
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (!localStorage.getItem("token")) navigate("/signin");
                      else navigate("/settings");
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  );
}
