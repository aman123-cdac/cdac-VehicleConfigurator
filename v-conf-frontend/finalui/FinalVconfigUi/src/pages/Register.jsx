import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* ---------- Reusable Input Component ---------- */
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  error,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-600 uppercase">
      {label} {required && "*"}
    </label>

    <input
      className={`w-full p-2 border rounded transition-colors outline-none ${error
        ? "border-red-500 bg-red-50"
        : "border-gray-300 focus:border-blue-500"
        }`}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />

    {error && <span className="text-red-500 text-xs font-medium">{error}</span>}
  </div>
);

/* ---------------------- Main Register Component ---------------------- */

const Register = () => {
  const { t, i18n } = useTranslation(["signin", "register"]);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ msg: "", type: "" });

  // Use the absolute URL as defined in your backend request mapping
  const API_URL = "http://localhost:8080/api/registration";

  const [formData, setFormData] = useState({
    companyName: "",
    holdingType: "",
    companyStNo: "",
    companyVatNo: "",
    taxPan: "",
    authName: "",
    designation: "",
    authTel: "",
    cell: "",
    phone: "",
    add1: "",
    add2: "",
    city: "",
    state: "",
    pin: "",
    tel: "",
    fax: "",
    email: "",
    username: "",
    password: "",
    role: "USER",
  });

  /* ---------- Validation Patterns ---------- */
  const regexPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    cell: /^[6-9][0-9]{9}$/,
    phone: /^[6-9][0-9]{9}$/,
    pin: /^[1-9][0-9]{5}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
  };

  /* ---------- Handle Change ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* ---------- Validation Logic ---------- */
  const validate = () => {
    let newErrors = {};

    if (step === 1) {
      if (formData.companyName.length < 3)
        newErrors.companyName = t("register:errors.companyName");
      if (!formData.holdingType) newErrors.holdingType = t("register:errors.holdingType");
      if (!regexPatterns.pan.test(formData.taxPan))
        newErrors.taxPan = t("register:errors.taxPan");
    }

    if (step === 2) {
      if (formData.authName.length < 2)
        newErrors.authName = t("register:errors.authName");
      if (formData.designation.length < 2)
        newErrors.designation = t("register:errors.designation");
      if (!regexPatterns.cell.test(formData.cell))
        newErrors.cell = t("register:errors.cell");
      if (formData.phone && !regexPatterns.phone.test(formData.phone))
        newErrors.phone = t("register:errors.phone");
    }

    if (step === 3) {
      if (!formData.add1) newErrors.add1 = t("register:errors.add1");
      if (!formData.city) newErrors.city = t("register:errors.city");
      if (!regexPatterns.pin.test(formData.pin))
        newErrors.pin = t("register:errors.pin");
    }

    if (step === 4) {
      if (!regexPatterns.email.test(formData.email))
        newErrors.email = t("register:errors.email");
      if (formData.username.length < 4)
        newErrors.username = t("register:errors.username");
      if (!regexPatterns.password.test(formData.password))
        newErrors.password = t("register:errors.password");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- Navigation ---------- */
  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) setStep((prev) => prev + 1);
  };

  /* ---------- The Submission Fix ---------- */
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus({ msg: t("register:saving"), type: "info" });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ msg: t("register:success"), type: "success" });
        setTimeout(() => navigate("/signin"), 3000);
      } else {
        try {
          // ✅ Parse JSON error response from backend
          const errorData = await response.json();
          console.error("Backend Error Detail:", errorData);

          // Show the backend error message directly
          const errorMessage =
            errorData.message ||
            errorData.error ||
            `${t("register:serverErrorPrefix")}: ${response.status}`;
          setStatus({
            msg: errorMessage,
            type: "error",
          });
        } catch (parseError) {
          // Fallback if response is not JSON
          const errorText = await response.text();
          console.error("Backend Error Detail:", errorText);
          setStatus({
            msg: `${t("register:serverErrorPrefix")}: ${response.status}. ${t("register:tryAgain")}`,
            type: "error",
          });
        }
      }
    } catch (err) {
      console.error("Network Error:", err);
      setStatus({ msg: t("register:networkError"), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-3 sm:px-4">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 border-b pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              {t("register:title")}
            </h2>
            <p className="text-gray-500 text-sm">
              {t("register:step", { step })}:{" "}
              {t(`register:${["company", "personal", "address", "account"][step - 1]}`)} {t("register:detailsSuffix")}
            </p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-8 rounded ${s <= step ? "bg-blue-600" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>

        {/* Status Notification */}
        {status.msg && (
          <div
            className={`p-4 mb-6 rounded-md text-sm font-medium border ${status.type === "error"
              ? "bg-red-50 text-red-800 border-red-200"
              : "bg-blue-50 text-blue-800 border-blue-200"
              }`}
          >
            {status.msg}
          </div>
        )}

        <form onSubmit={step === 4 ? handleRegister : handleNext} noValidate>
          {step === 1 && (
            <div className="space-y-4">
              <InputField
                label={t("register:fields.companyName")}
                name="companyName"
                placeholder={t("register:placeholders.companyName")}
                required
                value={formData.companyName}
                onChange={handleChange}
                error={errors.companyName}
              />
              <InputField
                label={t("register:fields.holdingType")}
                name="holdingType"
                placeholder={t("register:placeholders.holdingType")}
                required
                value={formData.holdingType}
                onChange={handleChange}
                error={errors.holdingType}
              />
              <InputField
                label={t("register:fields.taxPan")}
                name="taxPan"
                placeholder="ABCDE1234F"
                required
                value={formData.taxPan}
                onChange={handleChange}
                error={errors.taxPan}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <InputField
                label={t("register:fields.authName")}
                name="authName"
                placeholder={t("register:placeholders.authName")}
                required
                value={formData.authName}
                onChange={handleChange}
                error={errors.authName}
              />
              <InputField
                label={t("register:fields.designation")}
                name="designation"
                placeholder={t("register:placeholders.designation")}
                required
                value={formData.designation}
                onChange={handleChange}
                error={errors.designation}
              />
              <InputField
                label={t("register:fields.cell")}
                name="cell"
                type="tel"
                placeholder={t("register:placeholders.cell")}
                required
                value={formData.cell}
                onChange={handleChange}
                error={errors.cell}
              />
              <InputField
                label={t("register:fields.phone")}
                name="phone"
                type="tel"
                placeholder={t("register:placeholders.cell")}
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <InputField
                label={t("register:fields.add1")}
                name="add1"
                required
                value={formData.add1}
                onChange={handleChange}
                error={errors.add1}
              />
              <InputField
                label={t("register:fields.city")}
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label={t("register:fields.state")}
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  error={errors.state}
                />
                <InputField
                  label={t("register:fields.pin")}
                  name="pin"
                  required
                  value={formData.pin}
                  onChange={handleChange}
                  error={errors.pin}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <InputField
                label={t("register:fields.email")}
                name="email"
                type="email"
                placeholder="email@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputField
                label={t("register:fields.username")}
                name="username"
                placeholder="Choose username"
                required
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
              />
              <InputField
                label={t("register:fields.password")}
                name="password"
                type="password"
                placeholder="********"
                required
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-8 py-3 sm:px-8 rounded font-bold text-gray-500 border border-gray-300 hover:bg-gray-50 transition-all"
              >
                {t("register:back")}
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 disabled:bg-blue-300 transition-all"
            >
              {loading
                ? t("register:processing")
                : step === 4
                  ? t("register:complete")
                  : t("register:continue")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
