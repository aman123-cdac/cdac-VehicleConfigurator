import {
  Car,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      {/* Gradient Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-300"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-semibold text-white">
              VehicleConfig
            </span>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Design and configure your dream vehicle with our advanced
            configurator.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a className="hover:text-blue-400 transition cursor-pointer">
              <Facebook size={18} />
            </a>
            <a className="hover:text-sky-400 transition cursor-pointer">
              <Twitter size={18} />
            </a>
            <a className="hover:text-pink-400 transition cursor-pointer">
              <Instagram size={18} />
            </a>
            <a className="hover:text-blue-500 transition cursor-pointer">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">Templates</li>
            <li className="hover:text-white cursor-pointer">Updates</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Documentation</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms of Service
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">
            Subscribe to our newsletter for latest updates
          </p>

          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-slate-800 text-sm text-gray-200 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-gray-500 py-6">
        © 2026 VehicleConfig. Made with Emergent
      </div>
    </footer>
  );
}
