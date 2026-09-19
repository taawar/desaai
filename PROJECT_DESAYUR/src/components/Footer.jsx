import { MessageSquare, Landmark, MapPin, Clock, Phone, Mail } from 'lucide-react';

function HelpdeskBanner() {
  return (
    <div
      id="kontak"
      className="max-w-5xl mx-auto rounded-2xl p-8 sm:p-10 border-2 flex flex-col sm:flex-row items-center justify-between gap-6"
      style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }}
    >
      <div className="text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
          <span className="text-2xl">💬</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
            Bingung cara mengurus surat secara online?
          </h3>
        </div>
        <p className="text-text-secondary text-sm sm:text-base">
          Petugas posko digital desa siap membantu kamu kapan saja.
        </p>
      </div>

      <a
        id="btn-whatsapp"
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-200"
      >
        <MessageSquare size={18} />
        Hubungi WhatsApp Desa
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-blue-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Helpdesk Banner */}
        <div className="mb-16">
          <HelpdeskBanner />
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-blue-800">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
                <Landmark size={20} className="text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">Desa Joesayur</p>
                <p className="text-xs text-blue-300">Smart Village Ngawi</p>
              </div>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed">
              Portal layanan digital resmi Desa Joesayur untuk kemudahan akses administrasi dan pengaduan warga.
            </p>
            <div className="flex items-start gap-2 text-blue-300 text-sm">
              <MapPin size={15} className="mt-0.5 flex-shrink-0 text-green-400" />
              <span>Kantor Desa Joesayur, Kec. Geneng, Kab. Ngawi, Jawa Timur.</span>
            </div>
          </div>

          {/* Jam Operasional */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm font-display">Jam Operasional</h4>
            <div className="flex items-start gap-2 text-blue-300 text-sm">
              <Clock size={15} className="mt-0.5 flex-shrink-0 text-amber-400" />
              <div>
                <p className="text-white font-medium">Senin – Jumat</p>
                <p>08.00 – 15.00 WIB</p>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-600/20 text-green-300 border border-green-600/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-soft" />
                Layanan Online: 24 Jam
              </span>
            </div>
          </div>

          {/* Kontak */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm font-display">Hubungi Kami</h4>
            <a
              href="https://wa.me/6281234567890"
              className="flex items-center gap-2 text-blue-300 hover:text-green-400 transition-colors text-sm"
            >
              <Phone size={15} className="text-green-400" />
              +62 812-3456-7890
            </a>
            <a
              href="mailto:desajoesayur@ngawi.go.id"
              className="flex items-center gap-2 text-blue-300 hover:text-green-400 transition-colors text-sm"
            >
              <Mail size={15} className="text-green-400" />
              desajoesayur@ngawi.go.id
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-blue-400 text-xs">
          <p>© 2026 Desa Joesayur. Hak Cipta Dilindungi.</p>
          <p className="text-blue-500">Dibuat dengan ❤️ untuk warga Desa Joesayur</p>
        </div>
      </div>
    </footer>
  );
}
