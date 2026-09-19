import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, AlertTriangle, Users, BarChart2,
  Settings, LogOut, Menu, X, Landmark, Bell, ChevronRight,
  Home,
} from 'lucide-react';
import DashboardHome from '../components/dashboard/DashboardHome';
import DashboardSurat from '../components/dashboard/DashboardSurat';
import DashboardLaporan from '../components/dashboard/DashboardLaporan';
import DashboardWarga from '../components/dashboard/DashboardWarga';
import DashboardStatistik from '../components/dashboard/DashboardStatistik';
import DashboardSettings from '../components/dashboard/DashboardSettings';

const sidebarLinks = [
  { label: 'Ringkasan',  href: '/dashboard',         icon: LayoutDashboard, end: true },
  { label: 'Surat Masuk', href: '/dashboard/surat',   icon: FileText },
  { label: 'Laporan',    href: '/dashboard/laporan',  icon: AlertTriangle },
  { label: 'Data Warga', href: '/dashboard/warga',    icon: Users },
  { label: 'Statistik',  href: '/dashboard/statistik', icon: BarChart2 },
];

function Sidebar({ open, onClose }) {
  const location = useLocation();

  const isActive = (href, end) => {
    if (end) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 z-40 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center">
              <Landmark size={18} className="text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm leading-tight">Desa Joesayur</p>
              <p className="text-blue-300 text-xs leading-tight">Admin Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-blue-300 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        {/* Admin info */}
        <div className="px-5 py-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              PA
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Petugas Admin</p>
              <p className="text-blue-300 text-xs">admin@desajoesayur.id</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider px-3 mb-3">Menu Utama</p>
          <div className="space-y-1">
            {sidebarLinks.map(({ label, href, icon: Icon, end }) => {
              const active = isActive(href, end);
              return (
                <Link
                  key={href}
                  to={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                    active
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-white' : 'text-blue-400 group-hover:text-white'} />
                  {label}
                  {active && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              );
            })}
          </div>

          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider px-3 mb-3 mt-6">Pengaturan</p>
          <div className="space-y-1">
            <Link
              to="/dashboard/settings"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:bg-blue-800 hover:text-white transition-all duration-150 group"
            >
              <Settings size={18} className="text-blue-400 group-hover:text-white" />
              Pengaturan
            </Link>
          </div>
        </nav>

        {/* Back to Site + Logout */}
        <div className="px-3 py-4 border-t border-blue-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:bg-blue-800 hover:text-white transition-all duration-150 group"
          >
            <Home size={18} className="text-blue-400 group-hover:text-white" />
            Kembali ke Website
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-300 hover:bg-rose-900/30 hover:text-rose-200 transition-all duration-150 group cursor-pointer">
            <LogOut size={18} className="text-rose-400" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}

function TopBar({ onMenuClick }) {
  const location = useLocation();
  const pageTitle = {
    '/dashboard': 'Ringkasan Dashboard',
    '/dashboard/surat': 'Manajemen Surat',
    '/dashboard/laporan': 'Laporan Warga',
    '/dashboard/warga': 'Data Warga',
    '/dashboard/statistik': 'Statistik Desa',
    '/dashboard/settings': 'Pengaturan Sistem',
  }[location.pathname] ?? 'Dashboard';

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 h-16">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-surface-muted hover:bg-blue-50 text-text-secondary hover:text-blue-700 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="font-display text-lg font-bold text-text-primary">{pageTitle}</h1>
          <p className="text-xs text-text-muted hidden sm:block">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-surface-muted hover:bg-blue-50 text-text-secondary hover:text-blue-700 transition-colors cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
            PA
          </div>
          <span className="hidden sm:block text-sm font-medium text-text-secondary">Petugas Admin</span>
        </div>
      </div>
    </header>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-soft flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="surat" element={<DashboardSurat />} />
            <Route path="laporan" element={<DashboardLaporan />} />
            <Route path="warga" element={<DashboardWarga />} />
            <Route path="statistik" element={<DashboardStatistik />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="*" element={
              <div className="flex items-center justify-center h-64 text-text-secondary">
                <p>Halaman sedang dalam pengembangan.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}
