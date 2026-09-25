import { useState } from 'react';
import { X, FileText, CheckCircle, Upload, Copy, Phone } from 'lucide-react';

const jenisSuratOptions = [
  'Surat Domisili',
  'SKTM (Keterangan Tidak Mampu)',
  'Pengantar KTP Baru / Hilang',
  'Surat Keterangan Usaha (SKU)',
  'Surat Kematian',
  'Pengantar Nikah (N1-N4)',
];

export default function ModalAjukanSurat({ isOpen, onClose, onSuccessSubmit }) {
  const [formData, setFormData] = useState({
    jenis: 'Surat Domisili',
    nama: '',
    nik: '',
    noHp: '',
    dusun: 'Dusun Krajan',
    keperluan: '',
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.nik || !formData.noHp) {
      alert('Nama, NIK, dan Nomor HP wajib diisi ya!');
      return;
    }

    const trackingId = `SRT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSurat = {
      id: trackingId,
      nama: formData.nama,
      nik: formData.nik,
      jenis: formData.jenis,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'menunggu',
      keperluan: formData.keperluan || 'Keperluan administrasi kependudukan',
      alamat: formData.dusun,
      noHp: formData.noHp,
      fileAttached: uploadedFile ? uploadedFile.name : 'ktp.jpg',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('desa_surat_list') || '[]');
      localStorage.setItem('desa_surat_list', JSON.stringify([newSurat, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setSubmittedData(newSurat);
    if (onSuccessSubmit) onSuccessSubmit(newSurat);
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
      jenis: 'Surat Domisili',
      nama: '',
      nik: '',
      noHp: '',
      dusun: 'Dusun Krajan',
      keperluan: '',
    });
    setUploadedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-border shadow-xl overflow-hidden animate-scale-in">
        
        {/* Header Simpel */}
        <div className="bg-green-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText size={20} />
            <h3 className="font-display font-bold text-base">
              {submittedData ? 'Pengajuan Terkirim!' : 'Ajukan Surat Online'}
            </h3>
          </div>
          <button
            onClick={resetForm}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Isi Form 1 Halaman Simpel */}
        {!submittedData ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-sm">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Pilih Jenis Surat
              </label>
              <select
                value={formData.jenis}
                onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                {jenisSuratOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Nama Lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama pemohon"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  NIK (16 Digit) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  placeholder="352101..."
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3 py-2 rounded-xl border border-border text-sm font-mono focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Nomor WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812-..."
                  value={formData.noHp}
                  onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Dusun
                </label>
                <select
                  value={formData.dusun}
                  onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="Dusun Krajan">Dusun Krajan</option>
                  <option value="Dusun Mulyo">Dusun Mulyo</option>
                  <option value="Dusun Rejo">Dusun Rejo</option>
                  <option value="Dusun Makmur">Dusun Makmur</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Keperluan Surat
              </label>
              <input
                type="text"
                placeholder="Contoh: Syarat beasiswa / buka rekening"
                value={formData.keperluan}
                onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Foto KTP / KK (Opsional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setUploadedFile(e.target.files[0])}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
              />
            </div>

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
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700 text-white transition-all cursor-pointer shadow-sm"
              >
                Kirim Pengajuan
              </button>
            </div>
          </form>
        ) : (
          /* Tampilan Sukses Ringkas */
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle size={28} />
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-base">Permohonan Berhasil!</h4>
              <p className="text-xs text-slate-500 mt-0.5">Simpan kode berikut untuk mengecek status surat Anda:</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <span className="font-mono text-xl font-black text-green-700">{submittedData.id}</span>
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
                href={`https://wa.me/6281234567890?text=Halo%20Admin%20Desa,%20saya%20sudah%20mengajukan%20surat%20dengan%20kode%20${submittedData.id}.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold shadow-sm"
              >
                <Phone size={13} /> Chat WhatsApp
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
