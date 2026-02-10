export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 pt-8 border-t border-gray-200">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          © {currentYear} VehicleConfig. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition">
            Terms of Service
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
