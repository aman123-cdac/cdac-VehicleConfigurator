import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const { t, i18n } = useTranslation(["signin", "register"]);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const redirectTo = location.state?.redirectTo || "/dashboard";

  /* =========================
     MANUAL SIGN-IN (JWT)
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("token", token);

        toast({ title: t("signin:success") });
        navigate(redirectTo, { replace: true });
      } else {
        const msg = await response.text();
        setError(msg || t("signin:invalid"));
      }
    } catch (err) {
      setError(t("signin:backendError"));
    }
  };

  /* =========================
     GOOGLE LOGIN 
  ========================= */
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-[420px] text-center">
        <div className="mb-4 text-blue-600 text-4xl">🚗</div>

        <h2 className="text-2xl font-bold mb-2">{t("signin:title")}</h2>
        <p className="text-sm text-gray-500 mb-6">
          {t("signin:subtitle")}
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* MANUAL LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded bg-gray-50 focus:outline-blue-500"
            type="text"
            placeholder={t("signin:username")}
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />

          <input
            className="w-full p-2 border rounded bg-gray-50 focus:outline-blue-500"
            type="password"
            placeholder={t("signin:password")}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
          >
            {t("signin:submit")}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          {t("signin:noAccount")}{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            {t("signin:register")}
          </Link>
        </p>

        {/* OR DIVIDER */}
        <div className="relative flex items-center justify-center py-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-400 text-xs uppercase">{t("signin:or")}</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 p-2 rounded hover:bg-gray-100 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          {t("signin:google")}
        </button>
        <button
          onClick={() =>
            window.location.href =
            "http://localhost:8080/oauth2/authorization/facebook"
          }
          className="w-full mt-3 bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          {t("signin:facebook")}
        </button>

      </div>
    </div>
  );
};

export default SignIn;
