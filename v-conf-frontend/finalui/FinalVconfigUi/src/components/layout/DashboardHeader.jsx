import { useEffect, useState } from "react";
import { Car, Bell } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "@/api/api";

export default function DashboardHeader() {
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
        const userName = payload?.name || payload?.email || payload?.sub || null;
        setName(userName);
        setInitial(userName ? userName.charAt(0).toUpperCase() : "U");
      }
    };

    fetchProfile();
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/welcome" },
    { name: "Configure", path: "/configurator" },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">VehicleConfig</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`font-medium text-sm transition-colors ${
                isActive(item.path)
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Section - Notification & User */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <button onClick={() => {
              if (!localStorage.getItem("token")) navigate("/signin");
              else navigate("/profile");
            }} className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm">{name || "Guest User"}</p>
                <p className="text-gray-500 text-xs">{name ? "View Profile" : "Sign in"}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {initial}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
