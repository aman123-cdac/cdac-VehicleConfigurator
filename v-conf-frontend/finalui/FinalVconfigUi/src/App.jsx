import { Car, Globe } from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EnhancedHero from "./components/EnhancedHero";
import EnhancedFeatures from "./components/EnhancedFeatures";
import EnhancedCTASection from "./components/EnhancedCTASection";
import Footer from "./components/layout/Footer";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Configurator from "./pages/Configurator";
import OAuthHandler from "./pages/OAuthHandler";
import ProtectedRoute from "./components/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import DefaultConfigPage from "./pages/DefaultConfigPage";
import InvoicePage from "./pages/InvoicePage";
import ThankYou from "./pages/ThankYou";

import EnhancedSidebar from "./components/layout/EnhancedSidebar";
import EnhancedDashboardHeader from "./components/layout/EnhancedDashboardHeader";
import EnhancedDashboardHome from "./pages/EnhancedDashboardHome";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation(["signin", "register"]);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    console.log("Language changed to:", lng);
  };

  // Updated to include /invoice in dashboard-style layouts
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/configurator") ||
    location.pathname.startsWith("/welcome") ||
    location.pathname.startsWith("/default_config") ||
    location.pathname.startsWith("/invoice") ||
    location.pathname.startsWith("/thank-you");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Toaster for notifications */}
      <Toaster />

      {/* ===== LANDING HEADER ===== */}
      {!isDashboardRoute && (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  VehicleConfig
                </span>
              </div>

              {/* Landing Navigation */}
              <div className="flex items-center gap-4">
                {/* 🌍 Language Selector */}
                <div className="flex items-center gap-1 mr-2 px-2 py-1 bg-gray-50 rounded-md border border-gray-200">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <select
                    value={i18n.language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="text-sm bg-transparent border-none focus:outline-none text-gray-700 font-medium cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="hi">हिन्दी</option>
                    <option value="mr">मराठी</option>
                    <option value="sa">संस्कृतम्</option>
                  </select>
                </div>

                <button
                  onClick={() => navigate("/signin")}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  {t("signin:title")}
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all hover:shadow-lg"
                >
                  {t("register:title")}
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* ===== ROUTES ===== */}
      <Routes key={i18n.language}>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <EnhancedHero />
              <EnhancedFeatures />
              <EnhancedCTASection />
              <Footer />
            </>
          }
        />

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/oauth2/redirect" element={<OAuthHandler />} />

        {/* Dashboard Home - Now active */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EnhancedDashboardHome />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Welcome Page */}
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <WelcomePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Configurator */}
        <Route
          path="/configurator/:modelId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Configurator />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Default Config */}
        <Route
          path="/default_config/:modelId"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DefaultConfigPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Invoice Page - New Route */}
        <Route
          path="/invoice"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <InvoicePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/thank-you"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ThankYou />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

/* ===== DASHBOARD LAYOUT ===== */
function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Hidden on mobile, shown on md+ */}
      <div className="hidden md:flex md:w-64">
        <EnhancedSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <EnhancedDashboardHeader />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
