import { useState } from 'react';
import {
  X, AlertTriangle, CheckCircle, Upload, ArrowRight, ArrowLeft,
  MapPin, Phone, Shield, Camera, Copy, AlertOctagon, HelpCircle
} from 'lucide-react';

const kategoriGangguan = [
  {
    id: 'Infrastruktur',
    label: 'Jalan Rusak / Jembatan Berlubang',
    desc: 'Aspal berlubang, talud amblas, atau jembatan rusak membahayakan pengendara.',
    icon: '🛣️',
  },
  {
    id: 'Fasilitas Umum',
    label: 'Lampu Penerangan Jalan (PJU) Mati',
    desc: 'Lampu jalan padam membuat jalanan gelap dan rawan kecelakaan/kejahatan.',
    icon: '💡',
  },
  {
    id: 'Sanitasi & Lingkungan',
    label: 'Saluran Irigasi / Gorong-gorong Mampet',
    desc: 'Aliran air tersumbat sampah/lumpur menyebabkan genangan air atau banjir.',
    icon: '🌊',
  },
  {
    id: 'Lingkungan',
    label: 'Sampah Liar & Pencemaran',
    desc: 'Pembuangan sampah sembarangan, bau menyengat, atau pembakaran sampah liar.',
    icon: '🗑️',
  },
  {
    id: 'Keamanan',
    label: 'Gangguan Ketertiban & Kamtibmas',
    desc: 'Keributan, balap liar / knalpot brong, atau potensi bahaya keamanan desa.',
    icon: '🛡️',
  },
  {
    id: 'Lainnya',
    label: 'Fasilitas Umum & Balai Desa',
    desc: 'Kerusakan sarana posyandu, pos kamling, atau fasilitas publik desa lainnya.',
    icon: '🏛️',
  },
];

export default function ModalLaporDesa({ isOpen, onClose, onSuccessSubmit }) {
  const [step, setStep] = useState(1);
  const [selectedKategori, setSelectedKategori] = useState('');
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    dusun: 'Dusun Krajan',
    rtRw: 'RT 01 / RW 01',
    lokasiPatokan: '',
    prioritas: 'Sedang',
    namaPelapor: '',
    nikPelapor: '',
    telepon: '',
    isAnonim: false,
  });
  const [uploadedFoto, setUploadedFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step === 1 && !selectedKategori) {
      alert('Silakan pilih salah satu kategori gangguan.');
      return;
    }
    if (step === 2) {
      if (!formData.judul || !formData.deskripsi || !formData.lokasiPatokan) {
        alert('Mohon isi judul keluhan, patokan lokasi yang jelas, dan rincian masalah.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.isAnonim && (!formData.namaPelapor || !formData.telepon)) {
      alert('Mohon isi nama pelapor dan nomor telepon, atau pilih opsi "Lapor Secara Anonim".');
      return;
    }

    const trackingId = `LAP-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newLaporan = {
      id: trackingId,
      pelapor: formData.isAnonim ? 'Warga Peduli (Anonim)' : formData.namaPelapor,
      nik: formData.isAnonim ? '3521010000000000' : (formData.nikPelapor || '3521010000000000'),
      telepon: formData.isAnonim ? '-' : formData.telepon,
      dusun: `${formData.dusun} (${formData.rtRw})`,
      kategori: selectedKategori,
      prioritas: formData.prioritas,
      judul: formData.judul,
      deskripsi: `${formData.deskripsi} (Patokan Lokasi: ${formData.lokasiPatokan})`,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'menunggu',
      tanggapan: 'Laporan baru diterima oleh sistem, menunggu disposisi petugas sarpras desa.',
      petugas: 'Petugas Admin',
      fotoAttached: uploadedFoto ? uploadedFoto.name : 'foto_bukti_kejadian.jpg',
    };

    // Save to local storage for synchronization with Admin Dashboard
    try {
      const existing = JSON.parse(localStorage.getItem('desa_laporan_list') || '[]');
      localStorage.setItem('desa_laporan_list', JSON.stringify([newLaporan, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setSubmittedData(newLaporan);
    if (onSuccessSubmit) onSuccessSubmit(newLaporan);
    setStep(4);
  };

  const copyTrackingId = () => {
    if (submittedData) {
      navigator.clipboard.writeText(submittedData.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setSelectedKategori('');
    setFormData({
      judul: '',
      deskripsi: '',
      dusun: 'Dusun Krajan',
      rtRw: 'RT 01 / RW 01',
      lokasiPatokan: '',
      prioritas: 'Sedang',
      namaPelapor: '',
      nikPelapor: '',
      telepon: '',
      isAnonim: false,
    });
    setUploadedFoto(null);
    setFotoPreview('');
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-border shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <AlertTriangle size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                  LaporDesa
                </span>
                <span className="text-xs text-blue-100 hidden sm:inline">• Tanggap Cepat Gangguan Infrastruktur</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold">
                {step === 4 ? 'Laporan Terkirim!' : 'Form Pengaduan Gangguan Fasilitas'}
              </h3>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Indicator (1 to 3) */}
        {step < 4 && (
          <div className="bg-surface-soft px-6 py-3 border-b border-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </span>
              <span className={step === 1 ? 'font-bold text-blue-800' : 'text-text-muted'}>Kategori</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </span>
              <span className={step === 2 ? 'font-bold text-blue-800' : 'text-text-muted'}>Rincian Masalah</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                3
              </span>
              <span className={step === 3 ? 'font-bold text-blue-800' : 'text-text-muted'}>Foto & Pelapor</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-sm">

          {/* STEP 1: Kategori Gangguan */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="font-display font-bold text-base text-text-primary">
                  Langkah 1: Pilih Jenis Masalah / Gangguan
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  Pilih kategori yang paling sesuai dengan kejadian yang Anda temukan di desa.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {kategoriGangguan.map((k) => {
                  const isSelected = selectedKategori === k.id;
                  return (
                    <div
                      key={k.id}
                      onClick={() => setSelectedKategori(k.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm'
                          : 'border-border hover:border-blue-300 hover:bg-slate-50/70'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{k.icon}</span>
                            <p className="font-semibold text-text-primary text-sm leading-snug">{k.label}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <CheckCircle size={14} />}
                          </div>
                        </div>
                        <p className="text-xs text-text-secondary mt-2 leading-relaxed">{k.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Rincian Gangguan & Lokasi */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="font-display font-bold text-base text-text-primary">
                  Langkah 2: Tentukan Lokasi & Rincian Masalah
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  Berikan informasi sejelas mungkin agar tim teknis desa dapat menemukan titik lokasi dengan cepat.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Judul Laporan / Kerusakan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Aspal Jalan Ambles Dekat Jembatan RT 03"
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Wilayah Dusun
                  </label>
                  <select
                    value={formData.dusun}
                    onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Dusun Krajan">Dusun Krajan</option>
                    <option value="Dusun Mulyo">Dusun Mulyo</option>
                    <option value="Dusun Rejo">Dusun Rejo</option>
                    <option value="Dusun Makmur">Dusun Makmur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    RT / RW
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: RT 03 / RW 02"
                    value={formData.rtRw}
                    onChange={(e) => setFormData({ ...formData, rtRw: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Patokan Lokasi yang Mudah Ditemukan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Depan warung Bu Sumini, kira-kira 50 meter sebelah barat Masjid Al-Ikhlas"
                    value={formData.lokasiPatokan}
                    onChange={(e) => setFormData({ ...formData, lokasiPatokan: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Tingkat Urgensi Kerusakan
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'Tinggi', label: 'Tinggi (Darurat)', desc: 'Bahaya kecelakaan', color: 'border-rose-300 text-rose-700 bg-rose-50' },
                      { id: 'Sedang', label: 'Sedang', desc: 'Perlu penanganan rutin', color: 'border-amber-300 text-amber-700 bg-amber-50' },
                      { id: 'Rendah', label: 'Rendah', desc: 'Usulan perbaikan berkala', color: 'border-green-300 text-green-700 bg-green-50' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, prioritas: p.id })}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          formData.prioritas === p.id ? `${p.color} ring-2 ring-blue-500 font-bold` : 'border-border bg-white text-text-secondary'
                        }`}
                      >
                        <p className="text-xs font-semibold">{p.label}</p>
                        <p className="text-[10px] opacity-75">{p.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Deskripsi Lengkap Kejadian / Kerusakan <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ceritakan kondisi kerusakan, sejak kapan terjadi, dan dampak bagi warga sekitar..."
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Unggah Foto & Identitas Pelapor */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="font-display font-bold text-base text-text-primary">
                  Langkah 3: Unggah Foto Bukti & Identitas Pelapor
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  Foto bukti lapangan sangat membantu perangkat desa untuk menganggarkan material dan perbaikan.
                </p>
              </div>

              {/* Unggah Foto Bukti */}
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 text-center transition-colors bg-surface-soft">
                <input
                  type="file"
                  id="foto-lapor-desa"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />

                {fotoPreview ? (
                  <div className="space-y-2">
                    <img
                      src={fotoPreview}
                      alt="Foto bukti"
                      className="max-h-44 mx-auto rounded-xl object-contain border border-slate-200 shadow-sm"
                    />
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs font-medium text-text-primary">{uploadedFoto?.name}</span>
                      <label
                        htmlFor="foto-lapor-desa"
                        className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        Ganti Foto
                      </label>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="foto-lapor-desa" className="cursor-pointer block space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
                      <Camera size={22} />
                    </div>
                    <p className="text-sm font-semibold text-text-primary">
                      Ambil Foto Langsung / Unggah Foto Bukti Kejadian
                    </p>
                    <p className="text-xs text-text-muted">
                      Mendukung format JPG, PNG (Maksimal 10MB)
                    </p>
                  </label>
                )}
              </div>

              {/* Data Pelapor */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-blue-900">Ingin Lapor Secara Rahasia / Anonim?</p>
                      <p className="text-[11px] text-blue-700">Nama Anda tidak akan dipublikasikan ke publik.</p>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAnonim}
                      onChange={(e) => setFormData({ ...formData, isAnonim: e.target.checked })}
                      className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-blue-900">Anonim</span>
                  </label>
                </div>

                {!formData.isAnonim && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1">
                        Nama Lengkap Pelapor <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Ahmad Fauzi"
                        value={formData.namaPelapor}
                        onChange={(e) => setFormData({ ...formData, namaPelapor: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1">
                        Nomor WhatsApp / HP Aktif <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Contoh: 0812-3456-7890"
                        value={formData.telepon}
                        onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <p className="text-[10px] text-text-muted mt-1">Digunakan untuk update progres perbaikan.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Sukses Lapor */}
          {step === 4 && submittedData && (
            <div className="text-center py-4 space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle size={36} />
              </div>

              <div>
                <h4 className="font-display font-bold text-xl text-text-primary">
                  Laporan Berhasil Diterima!
                </h4>
                <p className="text-xs text-text-secondary max-w-md mx-auto mt-1">
                  Terima kasih atas partisipasi aktif Anda dalam menjaga fasilitas dan lingkungan Desa Joesayur.
                </p>
              </div>

              {/* Kartu Bukti Laporan */}
              <div className="bg-blue-50/80 border-2 border-blue-200 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                  <span className="text-xs font-semibold text-blue-900">KODE TIKET PENGADUAN:</span>
                  <button
                    onClick={copyTrackingId}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-white px-2.5 py-1 rounded-md border border-blue-300 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <Copy size={12} />
                    {copied ? 'Tersalin!' : 'Salin Kode'}
                  </button>
                </div>

                <p className="font-mono text-2xl font-black text-blue-700 text-center tracking-wider py-1">
                  {submittedData.id}
                </p>

                <div className="text-xs space-y-1 text-blue-950 pt-2 border-t border-blue-200">
                  <p>• <strong>Topik:</strong> {submittedData.judul}</p>
                  <p>• <strong>Kategori:</strong> {submittedData.kategori}</p>
                  <p>• <strong>Lokasi:</strong> {submittedData.dusun}</p>
                  <p>• <strong>Prioritas:</strong> {submittedData.prioritas}</p>
                  <p>• <strong>Status:</strong> Menunggu Disposisi Petugas Lapangan</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Tim%20Trantib/Kesra%20Desa%20Joesayur,%20saya%20telah%20mengirim%20laporan%20gangguan%20dengan%20Nomor%20Tiket%20${submittedData.id}%20mengenai%20${encodeURIComponent(submittedData.judul)}.%20Mohon%20segera%20ditinjau.%20Terima%20kasih.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <Phone size={14} /> Kirim ke WhatsApp Tim Siaga Desa
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-xl bg-surface-muted hover:bg-slate-200 text-text-primary font-semibold text-xs transition-colors cursor-pointer"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Action Buttons (Step 1 - 3) */}
        {step < 4 && (
          <div className="bg-surface-soft px-6 py-4 border-t border-border flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:bg-white border border-border transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} /> Kembali
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:bg-white border border-border transition-colors cursor-pointer"
              >
                Batal
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                Lanjutkan <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                <CheckCircle size={15} /> Kirim Pengaduan Warga
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
