import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Landmark, Menu, X, LayoutGrid, BarChart2, BookOpen, Phone, LayoutDashboard,
} from 'lucide-react';

const navLinks = [
  { label: 'Beranda',  href: '#beranda',   icon: Home },
  { label: 'Layanan',  href: '#layanan',    icon: LayoutGrid },
  { label: 'Statistik', href: '#statistik', icon: BarChart2 },
  { label: 'Panduan',  href: '#panduan',    icon: BookOpen },
  { label: 'Kontak',   href: '#kontak',     icon: Phone },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('#beranda');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => { setActiveLink(href); setMenuOpen(false); };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-3 group" onClick={() => handleNavClick('#beranda')}>
            <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shadow-sm group-hover:bg-green-700 transition-colors">
              <Landmark size={20} className="text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-sm leading-tight text-text-primary">Desa Joesayur</p>
              <p className="text-xs text-text-secondary leading-tight">Kabupaten Ngawi</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => handleNavClick(href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeLink === href
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-text-secondary hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right: Dashboard CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              id="btn-dashboard"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <LayoutDashboard size={15} />
              Dashboard
            </Link>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center hover:bg-blue-50 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} className="text-text-secondary" /> : <Menu size={18} className="text-text-secondary" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-t border-border`}
      >
        <div className="max-w-7xl mx-auto px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              onClick={() => handleNavClick(href)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeLink === href
                  ? 'bg-blue-600 text-white'
                  : 'text-text-secondary hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
          >
            <LayoutDashboard size={16} />
            Masuk Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
