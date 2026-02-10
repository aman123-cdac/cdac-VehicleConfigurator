import { Menu, X, LayoutDashboard, Car, Layers, FileText, Upload, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function MobileSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/dashboard" },
    { icon: Car, text: "Configure Vehicle", path: "/welcome" },
    { icon: Layers, text: "Templates", path: "/default_config/1" },
    { icon: FileText, text: "Invoices", path: "/invoice" },
    { icon: Upload, text: "Excel Upload", path: "/upload" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Car className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold">VehicleConfig</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full px-4 pb-4">
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.text}</span>
              </button>
            ))}
          </nav>

          <Separator className="my-4" />

          <div className="space-y-2">
            <button
              onClick={() => navigate("/settings")}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <Settings size={20} />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
