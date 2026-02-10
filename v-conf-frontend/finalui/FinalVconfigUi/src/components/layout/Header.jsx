import { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import API from "@/api/api";
import { useNavigate } from "react-router-dom";

export const Header = ({ title, subtitle }) => {
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

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
        setName(user.name || user.username || user.email || null);
        setRole(user.role || user.type || null);
      } catch (err) {
        // Fallback: try to decode JWT (works for Google and backend tokens that include email/name)
        const payload = parseJwt(token);
        if (payload) {
          setName(payload.name || payload.email || payload.sub || null);
          setRole(payload.role || null);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleProfileClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      navigate("/profile");
    }
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 card-shadow">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {name || "Guest User"}
              </p>
              <p className="text-xs text-muted-foreground">
                {role || (name ? "User" : "Sign in")}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
