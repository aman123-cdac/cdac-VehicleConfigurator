import React from "react";
import { useLocation } from "react-router-dom";

const RegistrationSuccess = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const downloadPdf = () => {
    if (!userId) {
      alert("User ID not found!");
      return;
    }

    const url = `http://localhost:8080/api/registration/pdf/${userId}`;

    // Force browser download
    const link = document.createElement("a");
    link.href = url;
    link.download = "registration-details.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Registration Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Your registration has been completed successfully.
        </p>

        <button
          onClick={downloadPdf}
          className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Download Registration PDF
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
