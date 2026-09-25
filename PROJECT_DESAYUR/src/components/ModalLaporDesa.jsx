import { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Copy, Phone } from 'lucide-react';

const kategoriList = [
  'Jalan Rusak / Berlubang',
  'Lampu Jalan (PJU) Mati',
  'Saluran Irigasi Mampet / Banjir',
  'Sampah Liar & Kebersihan',
  'Keamanan / Ketertiban',
  'Fasilitas Umum Lainnya',
];

export default function ModalLaporDesa({ isOpen, onClose, onSuccessSubmit }) {
  const [formData, setFormData] = useState({
    kategori: 'Jalan Rusak / Berlubang',
    judul: '',
    dusun: 'Dusun Krajan',
    lokasi: '',
    deskripsi: '',
    namaPelapor: '',
    telepon: '',
    isAnonim: false,
  });
  const [uploadedFoto, setUploadedFoto] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.judul || !formData.lokasi) {
      alert('Judul laporan dan patokan lokasi wajib diisi!');
      return;
    }

    const trackingId = `LAP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLaporan = {
      id: trackingId,
      pelapor: formData.isAnonim ? 'Warga (Anonim)' : (formData.namaPelapor || 'Warga Desa'),
      nik: '3521010000000000',
      telepon: formData.isAnonim ? '-' : (formData.telepon || '-'),
      dusun: `${formData.dusun} (${formData.lokasi})`,
      kategori: formData.kategori,
      prioritas: 'Sedang',
      judul: formData.judul,
      deskripsi: formData.deskripsi || formData.judul,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'menunggu',
      tanggapan: 'Laporan telah diterima sistem, menunggu disposisi petugas desa.',
      petugas: 'Petugas Admin',
      fotoAttached: uploadedFoto ? uploadedFoto.name : 'bukti.jpg',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('desa_laporan_list') || '[]');
      localStorage.setItem('desa_laporan_list', JSON.stringify([newLaporan, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setSubmittedData(newLaporan);
    if (onSuccessSubmit) onSuccessSubmit(newLaporan);
  };

  const copyCode = () => {
    if (submittedData) {
      navigator.clipboard.writeText(submittedData.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFormData({
      kategori: 'Jalan Rusak / Berlubang',
      judul: '',
      dusun: 'Dusun Krajan',
      lokasi: '',
      deskripsi: '',
      namaPelapor: '',
      telepon: '',
      isAnonim: false,
    });
    setUploadedFoto(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-border shadow-xl overflow-hidden animate-scale-in">
        
        {/* Header Simpel */}
        <div className="bg-blue-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={20} />
            <h3 className="font-display font-bold text-base">
              {submittedData ? 'Laporan Diterima!' : 'Lapor Gangguan Desa'}
            </h3>
          </div>
          <button
            onClick={resetForm}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form 1 Halaman Simpel */}
        {!submittedData ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-3 text-sm">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Kategori Masalah
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {kategoriList.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Judul Laporan / Masalah <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Aspal amblas dekat jembatan"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Wilayah Dusun
                </label>
                <select
                  value={formData.dusun}
                  onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Dusun Krajan">Dusun Krajan</option>
                  <option value="Dusun Mulyo">Dusun Mulyo</option>
                  <option value="Dusun Rejo">Dusun Rejo</option>
                  <option value="Dusun Makmur">Dusun Makmur</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Patokan Lokasi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Depan pos kamling RT 02"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Foto Bukti Kejadian (Opsional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setUploadedFoto(e.target.files[0])}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-medium text-slate-700">Kirim sebagai Anonim (Rahasiakan nama)</span>
              <input
                type="checkbox"
                checked={formData.isAnonim}
                onChange={(e) => setFormData({ ...formData, isAnonim: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 cursor-pointer"
              />
            </div>

            {!formData.isAnonim && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <input
                  type="text"
                  placeholder="Nama pelapor (opsional)"
                  value={formData.namaPelapor}
                  onChange={(e) => setFormData({ ...formData, namaPelapor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="No. WhatsApp (opsional)"
                  value={formData.telepon}
                  onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-border">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer shadow-sm"
              >
                Kirim Laporan
              </button>
            </div>
          </form>
        ) : (
          /* Sukses Lapor */
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
              <CheckCircle size={28} />
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-base">Laporan Berhasil Masuk!</h4>
              <p className="text-xs text-slate-500 mt-0.5">Petugas desa akan segera mengecek laporan Anda:</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <span className="font-mono text-xl font-black text-blue-700">{submittedData.id}</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-xs font-bold bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Copy size={13} />
                {copied ? 'Tersalin' : 'Salin'}
              </button>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <a
                href={`https://wa.me/6281234567890?text=Halo%20Admin%20Desa,%20saya%20sudah%20mengirim%20laporan%20dengan%20tiket%20${submittedData.id}.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
              >
                <Phone size={13} /> Hubungi Petugas
              </a>
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
