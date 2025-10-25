import { useState, useEffect } from 'react';
import { Menu, X, Droplet, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {}

export function Navigation({}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const getCurrentPath = () => {
    return location.pathname;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}
      style={{ height: '64px' }}
    >
      <div className="max-w-screen-xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Droplet className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">CloudWatch</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-base font-medium transition-all duration-500 relative ${
                getCurrentPath() === item.path
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {item.label}
              {getCurrentPath() === item.path && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden lg:block">
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            Check Risk
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-900" />
          ) : (
            <Menu className="w-6 h-6 text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left py-2 text-base font-medium ${
                  getCurrentPath() === item.path
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold mt-4 inline-block text-center"
            >
              Check Risk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}