import { useState } from 'react';
import {
  Settings, Landmark, Bell, Shield, Database, Save, CheckCircle,
  Clock, MapPin, Phone, Mail, Globe, Lock
} from 'lucide-react';

export default function DashboardSettings() {
  const [saved, setSaved] = useState(false);
  const [villageData, setVillageData] = useState({
    namaDesa: 'Desa Joesayur',
    kecamatan: 'Kecamatan Kedunggalar',
    kabupaten: 'Kabupaten Ngawi',
    provinsi: 'Jawa Timur',
    kodePos: '63254',
    email: 'kontak@desajoesayur.id',
    telepon: '(0351) 749-012',
    whatsapp: '0812-3456-7890',
    alamatKantor: 'Jl. Raya Joesayur No. 01, Balai Desa Joesayur',
    jamBuka: '08:00',
    jamTutup: '15:30',
    notifWa: true,
    notifEmail: true,
    autoApprove: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl">
      {/* Toast */}
      {saved && (
        <div className="fixed top-20 right-6 z-50 bg-green-700 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-up border border-green-500">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">Pengaturan sistem berhasil disimpan!</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold">
            Konfigurasi Sistem
          </span>
          <span className="text-xs text-text-muted">• Pengaturan Instansi & Pelayanan</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Pengaturan Dashboard & Profil Desa
        </h2>
        <p className="text-text-secondary text-sm">
          Kelola informasi resmi kantor balai desa, jam operasional pelayanan, serta preferensi notifikasi.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identitas Desa */}
        <div className="bg-white rounded-2xl border border-border card-shadow p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
              <Landmark size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-text-primary">Identitas Kantor Balai Desa</h3>
              <p className="text-xs text-text-muted">Data ini ditampilkan pada kop surat resmi dan website warga</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Nama Desa</label>
              <input
                type="text"
                value={villageData.namaDesa}
                onChange={(e) => setVillageData({ ...villageData, namaDesa: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Kecamatan</label>
              <input
                type="text"
                value={villageData.kecamatan}
                onChange={(e) => setVillageData({ ...villageData, kecamatan: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Kabupaten</label>
              <input
                type="text"
                value={villageData.kabupaten}
                onChange={(e) => setVillageData({ ...villageData, kabupaten: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Kode Pos</label>
              <input
                type="text"
                value={villageData.kodePos}
                onChange={(e) => setVillageData({ ...villageData, kodePos: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-text-secondary mb-1">Alamat Kantor Lengkap</label>
              <input
                type="text"
                value={villageData.alamatKantor}
                onChange={(e) => setVillageData({ ...villageData, alamatKantor: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Jam Pelayanan & Kontak */}
        <div className="bg-white rounded-2xl border border-border card-shadow p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-text-primary">Jam Kerja & Kontak Layanan</h3>
              <p className="text-xs text-text-muted">Jadwal loket administrasi dan jalur komunikasi resmi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Jam Buka Pelayanan</label>
              <input
                type="time"
                value={villageData.jamBuka}
                onChange={(e) => setVillageData({ ...villageData, jamBuka: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Jam Tutup Pelayanan</label>
              <input
                type="time"
                value={villageData.jamTutup}
                onChange={(e) => setVillageData({ ...villageData, jamTutup: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">WhatsApp Admin Pelayanan</label>
              <input
                type="text"
                value={villageData.whatsapp}
                onChange={(e) => setVillageData({ ...villageData, whatsapp: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Email Resmi Balai Desa</label>
              <input
                type="email"
                value={villageData.email}
                onChange={(e) => setVillageData({ ...villageData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notifikasi & Backup Data */}
        <div className="bg-white rounded-2xl border border-border card-shadow p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-text-primary">Notifikasi & Keamanan Data</h3>
              <p className="text-xs text-text-muted">Pemberitahuan otomatis saat warga mengajukan permohonan surat</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-surface-soft hover:bg-blue-50/50 cursor-pointer border border-border transition-colors">
              <div>
                <p className="text-sm font-semibold text-text-primary">Notifikasi WhatsApp ke Petugas</p>
                <p className="text-xs text-text-muted">Kirim pesan otomatis saat ada laporan mendesak atau surat baru</p>
              </div>
              <input
                type="checkbox"
                checked={villageData.notifWa}
                onChange={(e) => setVillageData({ ...villageData, notifWa: e.target.checked })}
                className="w-5 h-5 rounded text-green-600 focus:ring-green-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-surface-soft hover:bg-blue-50/50 cursor-pointer border border-border transition-colors">
              <div>
                <p className="text-sm font-semibold text-text-primary">Kirim Salinan ke Email Dinas</p>
                <p className="text-xs text-text-muted">Arsipkan bukti permohonan surat ke inbox dinas</p>
              </div>
              <input
                type="checkbox"
                checked={villageData.notifEmail}
                onChange={(e) => setVillageData({ ...villageData, notifEmail: e.target.checked })}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Database size={16} className="text-blue-600" />
              <span>Pencadangan Basis Data Otomatis: <strong>Setiap Hari (00:00 WIB)</strong></span>
            </div>
            <button
              type="button"
              onClick={() => alert("Backup data kependudukan dan surat berhasil dibuat!")}
              className="px-3.5 py-2 text-xs font-semibold bg-surface-muted hover:bg-blue-50 text-blue-700 rounded-xl border border-border transition-colors cursor-pointer"
            >
              Cadangkan Data Sekarang
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm shadow-sm transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Save size={16} />
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
