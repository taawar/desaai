import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LayananSection from '../components/LayananSection';
import StatistikSection from '../components/StatistikSection';
import PanduanSection from '../components/PanduanSection';
import Footer from '../components/Footer';
import ModalAjukanSurat from '../components/ModalAjukanSurat';
import ModalLaporDesa from '../components/ModalLaporDesa';
import ModalCekStatus from '../components/ModalCekStatus';
import { FileText, AlertTriangle, Search, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const [modalSuratOpen, setModalSuratOpen] = useState(false);
  const [modalLaporOpen, setModalLaporOpen] = useState(false);
  const [modalStatusOpen, setModalStatusOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState('');

  const triggerToast = (msg) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(''), 4000);
  };

  return (
    <div className="min-h-screen bg-bg relative">
      {/* Toast Notifikasi Global */}
      {toastNotification && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-green-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-green-500 animate-slide-up">
          <CheckCircle size={20} className="shrink-0" />
          <span className="text-sm font-semibold">{toastNotification}</span>
        </div>
      )}

      <Navbar
        onOpenSurat={() => setModalSuratOpen(true)}
        onOpenLapor={() => setModalLaporOpen(true)}
        onOpenStatus={() => setModalStatusOpen(true)}
      />

      <main>
        <HeroSection
          onOpenSurat={() => setModalSuratOpen(true)}
          onOpenLapor={() => setModalLaporOpen(true)}
          onOpenStatus={() => setModalStatusOpen(true)}
        />

        <LayananSection
          onOpenSurat={() => setModalSuratOpen(true)}
          onOpenLapor={() => setModalLaporOpen(true)}
          onOpenStatus={() => setModalStatusOpen(true)}
        />

        <StatistikSection />
        <PanduanSection
          onOpenSurat={() => setModalSuratOpen(true)}
          onOpenLapor={() => setModalLaporOpen(true)}
        />
      </main>

      <Footer />

      {/* Floating Action Button untuk Warga Desa di Mobile & Desktop */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        <button
          onClick={() => setModalStatusOpen(true)}
          className="flex items-center gap-2 bg-white/95 text-slate-800 border border-slate-300 hover:bg-slate-100 px-4 py-2 rounded-full shadow-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          title="Lacak Surat atau Laporan"
        >
          <Search size={14} className="text-blue-600" />
          <span>Lacak Pengajuan</span>
        </button>

        <button
          onClick={() => setModalSuratOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-green-600/20"
        >
          <FileText size={18} />
          <span>Ajukan Surat</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <ModalAjukanSurat
        isOpen={modalSuratOpen}
        onClose={() => setModalSuratOpen(false)}
        onSuccessSubmit={(data) => triggerToast(`Pengajuan ${data.id} berhasil dikirim! Silakan simpan kodenya.`)}
      />

      <ModalLaporDesa
        isOpen={modalLaporOpen}
        onClose={() => setModalLaporOpen(false)}
        onSuccessSubmit={(data) => triggerToast(`Laporan ${data.id} berhasil dikirim ke Balai Desa!`)}
      />

      <ModalCekStatus
        isOpen={modalStatusOpen}
        onClose={() => setModalStatusOpen(false)}
      />
    </div>
  );
}
