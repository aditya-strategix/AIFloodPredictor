import { Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Droplet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CloudWatch</span>
            </div>
            <p className="text-gray-400 max-w-md">
              AI-powered flood prediction for safer communities worldwide. 
              Protecting lives through advanced technology and real-time monitoring.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Features</span></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">FAQ</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Documentation</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 CloudWatch. All rights reserved. Made with 💧 for safer communities.</p>
        </div>
      </div>
    </footer>
  );
}