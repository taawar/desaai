import { useState } from 'react';
import {
  X, Search, CheckCircle, Clock, XCircle, ArrowUpRight,
  FileText, AlertTriangle, User, Calendar, MapPin, ShieldCheck
} from 'lucide-react';

const mockTrackingDatabase = [
  {
    id: 'SRT-2026-001',
    tipe: 'surat',
    nik: '3521012345678901',
    nama: 'Ahmad Fauzi',
    judul: 'Surat Domisili',
    tanggal: '18 Sep 2026',
    status: 'selesai',
    keterangan: 'Surat telah ditandatangani secara digital dan siap diunduh / diambil di balai desa.',
    timeline: [
      { waktu: '18 Sep 08:30', pesan: 'Permohonan surat berhasil diajukan online', done: true },
      { waktu: '18 Sep 09:15', pesan: 'Berkas KTP & KK telah diverifikasi oleh Kasi Pelayanan', done: true },
      { waktu: '18 Sep 10:00', pesan: 'Surat dicetak dan disahkan oleh Kepala Desa', done: true },
    ],
  },
  {
    id: 'LAP-2026-081',
    tipe: 'laporan',
    nik: '3521015609820002',
    nama: 'Siti Aminah',
    judul: 'Jalan Penghubung Dusun Rusak Parah dan Berlubang',
    tanggal: '18 Sep 2026',
    status: 'proses',
    keterangan: 'Tim sarana prasarana desa telah meninjau lokasi jam 09.00 WIB. Material sirtu dikirim sore ini.',
    timeline: [
      { waktu: '18 Sep 07:45', pesan: 'Laporan warga diterima oleh sistem', done: true },
      { waktu: '18 Sep 09:00', pesan: 'Ditinjau oleh Pak Bambang (Kasi Kesra)', done: true },
      { waktu: '18 Sep 14:00', pesan: 'Pengadaan material perbaikan jalan sedang berlangsung', done: false },
    ],
  },
];

export default function ModalCekStatus({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Search in localStorage first
    let found = null;
    try {
      const suratList = JSON.parse(localStorage.getItem('desa_surat_list') || '[]');
      const laporanList = JSON.parse(localStorage.getItem('desa_laporan_list') || '[]');

      const foundSurat = suratList.find(s => s.id.toLowerCase() === query.trim().toLowerCase() || s.nik === query.trim());
      if (foundSurat) {
        found = {
          id: foundSurat.id,
          tipe: 'surat',
          nik: foundSurat.nik,
          nama: foundSurat.nama,
          judul: foundSurat.jenis,
          tanggal: foundSurat.tanggal,
          status: foundSurat.status,
          keterangan: foundSurat.status === 'selesai' ? 'Surat telah selesai dan siap diambil.' : 'Surat sedang diverifikasi petugas.',
          timeline: [
            { waktu: foundSurat.tanggal, pesan: 'Permohonan diajukan via website', done: true },
            { waktu: 'Hari ini', pesan: foundSurat.status === 'selesai' ? 'Surat selesai ditandatangani' : 'Dalam antrean verifikasi loket', done: foundSurat.status === 'selesai' },
          ]
        };
      } else {
        const foundLaporan = laporanList.find(l => l.id.toLowerCase() === query.trim().toLowerCase() || l.nik === query.trim());
        if (foundLaporan) {
          found = {
            id: foundLaporan.id,
            tipe: 'laporan',
            nik: foundLaporan.nik,
            nama: foundLaporan.pelapor,
            judul: foundLaporan.judul,
            tanggal: foundLaporan.tanggal,
            status: foundLaporan.status,
            keterangan: foundLaporan.tanggapan || 'Menunggu tindakan petugas lapangan.',
            timeline: [
              { waktu: foundLaporan.tanggal, pesan: 'Laporan masuk ke sistem desa', done: true },
              { waktu: 'Hari ini', pesan: foundLaporan.tanggapan || 'Proses disposisi', done: foundLaporan.status === 'selesai' },
            ]
          };
        }
      }
    } catch (err) {
      console.error(err);
    }

    if (!found) {
      // Search mock
      found = mockTrackingDatabase.find(
        item => item.id.toLowerCase() === query.trim().toLowerCase() || item.nik === query.trim()
      );
    }

    setResult(found || null);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-border shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Search size={20} className="text-green-400" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Lacak Status Surat & Laporan</h3>
              <p className="text-xs text-slate-300">Cek progres permohonan Anda secara transparan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm">
          {/* Form Pencarian */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-semibold text-text-secondary">
              Masukkan Nomor Kode Tracking atau NIK Anda:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Contoh: SRT-2026-001 atau NIK 16 digit..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs transition-colors cursor-pointer shrink-0"
              >
                Cari Data
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
              <span>💡 Contoh uji coba:</span>
              <button
                type="button"
                onClick={() => { setQuery('SRT-2026-001'); }}
                className="text-blue-600 hover:underline font-mono"
              >
                SRT-2026-001
              </button>
              <span>atau</span>
              <button
                type="button"
                onClick={() => { setQuery('LAP-2026-081'); }}
                className="text-blue-600 hover:underline font-mono"
              >
                LAP-2026-081
              </button>
            </div>
          </form>

          {/* Hasil Pencarian */}
          {searched && (
            <div className="pt-2 border-t border-border">
              {result ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-surface-soft p-4 rounded-2xl border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-border text-blue-700">
                        {result.id}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        result.status === 'selesai'
                          ? 'bg-green-100 text-green-800'
                          : result.status === 'proses'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {result.status}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-text-primary pt-1">
                      {result.judul}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Pemohon/Pelapor: <strong>{result.nama}</strong> • Tanggal: {result.tanggal}
                    </p>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 mt-2">
                      💬 <strong>Catatan Petugas:</strong> {result.keterangan}
                    </div>
                  </div>

                  {/* Timeline Progres */}
                  <div className="space-y-2 px-1">
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                      Riwayat Tindak Lanjut:
                    </p>
                    <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {result.timeline.map((t, idx) => (
                        <div key={idx} className="flex items-start gap-3 relative pl-6">
                          <div className={`absolute left-1.5 top-1 w-3 h-3 rounded-full border-2 border-white ${
                            t.done ? 'bg-green-600' : 'bg-slate-300'
                          }`} />
                          <div>
                            <p className="text-xs font-semibold text-text-primary">{t.pesan}</p>
                            <p className="text-[10px] text-text-muted">{t.waktu}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-text-muted space-y-2">
                  <XCircle size={32} className="mx-auto text-rose-400" />
                  <p className="font-semibold text-text-primary text-sm">Data Tidak Ditemukan</p>
                  <p className="text-xs">
                    Pastikan kode pelacakan (misal SRT-2026-001) atau NIK yang Anda masukkan sudah benar.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-surface-soft px-6 py-3.5 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
