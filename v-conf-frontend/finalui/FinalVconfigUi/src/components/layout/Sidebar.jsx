import {
  LayoutDashboard,
  Car,
  Layers,
  FileText,
  Upload,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen p-4 flex flex-col">
      {/* Top Section */}
      <div className="mb-8">
        <h2 className="text-gray-400 font-semibold text-sm uppercase tracking-widest mb-4">
          Menu
        </h2>

        <nav className="space-y-2">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active
          />
          <SidebarItem icon={<Car size={20} />} text="Configure Vehicle" />
          <SidebarItem icon={<Layers size={20} />} text="Templates" />
          <SidebarItem icon={<FileText size={20} />} text="Invoices" />
          <SidebarItem icon={<Upload size={20} />} text="Excel Upload" />
        </nav>
      </div>

      {/* Bottom Section - Settings & Logout */}
      <div className="mt-auto space-y-2">
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-gray-400 hover:bg-gray-700 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
        active ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
