import { useState } from 'react';
import {
  X, FileText, CheckCircle, Upload, ArrowRight, ArrowLeft,
  User, ShieldCheck, MapPin, Phone, HelpCircle, AlertCircle,
  Copy, ExternalLink, Image as ImageIcon
} from 'lucide-react';

const jenisSuratOptions = [
  {
    id: 'domisili',
    label: 'Surat Keterangan Domisili',
    syarat: 'KTP & KK asli / fotokopi, pengantar RT',
    desc: 'Untuk keperluan pembukaan rekening, kerja, atau domisili tinggal.',
  },
  {
    id: 'sktm',
    label: 'Surat Keterangan Tidak Mampu (SKTM)',
    syarat: 'Fotokopi KK, KTP, dan surat pernyataan penghasilan',
    desc: 'Untuk permohonan beasiswa kuliah/sekolah, keringanan biaya RS, atau bansos.',
  },
  {
    id: 'ktp',
    label: 'Surat Pengantar KTP-el Baru / Penggantian',
    syarat: 'Fotokopi KK dan akta kelahiran (usia 17 tahun) atau surat kehilangan jika hilang',
    desc: 'Surat pengantar resmi ke loket perekaman Kecamatan.',
  },
  {
    id: 'sku',
    label: 'Surat Keterangan Usaha (SKU)',
    syarat: 'KTP, KK, dan foto lokasi usaha / warung',
    desc: 'Untuk syarat pengajuan KUR bank, legalitas UMKM, atau perizinan.',
  },
  {
    id: 'kematian',
    label: 'Surat Keterangan Kematian',
    syarat: 'Surat dokter / keterangan RT, KTP almarhum & pelapor',
    desc: 'Untuk klaim asuransi, pensiunan, atau penerbitan akta kematian.',
  },
  {
    id: 'nikah',
    label: 'Surat Pengantar Nikah (Model N1-N4)',
    syarat: 'KTP, KK, akta lahir, pas foto 2x3 & 3x4 latar biru',
    desc: 'Dokumen pengantar pendaftaran pernikahan ke KUA Kedunggalar.',
  },
];

export default function ModalAjukanSurat({ isOpen, onClose, onSuccessSubmit }) {
  const [step, setStep] = useState(1);
  const [selectedJenis, setSelectedJenis] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    noKK: '',
    dusun: 'Dusun Krajan',
    rtRw: 'RT 01 / RW 01',
    noHp: '',
    keperluan: '',
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedJenis) {
      alert('Silakan pilih salah satu jenis surat yang ingin diajukan.');
      return;
    }
    if (step === 2) {
      if (!formData.nama || !formData.nik || !formData.noHp || !formData.keperluan) {
        alert('Mohon lengkapi nama, NIK, nomor WhatsApp, dan keperluan surat.');
        return;
      }
      if (formData.nik.length < 16) {
        alert('Nomor Induk Kependudukan (NIK) harus terdiri dari 16 digit.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trackingId = `SRT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const jenisInfo = jenisSuratOptions.find(j => j.id === selectedJenis)?.label || 'Surat Permohonan';

    const newSurat = {
      id: trackingId,
      nama: formData.nama,
      nik: formData.nik,
      noKK: formData.noKK || '-',
      jenis: jenisInfo,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'menunggu',
      keperluan: formData.keperluan,
      alamat: `${formData.dusun} ${formData.rtRw}`,
      noHp: formData.noHp,
      fileAttached: uploadedFile ? uploadedFile.name : 'ktp_persyaratan.jpg',
    };

    // Save to local storage for persistence with dashboard
    try {
      const existing = JSON.parse(localStorage.getItem('desa_surat_list') || '[]');
      localStorage.setItem('desa_surat_list', JSON.stringify([newSurat, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setSubmittedData(newSurat);
    if (onSuccessSubmit) onSuccessSubmit(newSurat);
    setStep(4); // Success step
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
    setSelectedJenis('');
    setFormData({
      nama: '',
      nik: '',
      noKK: '',
      dusun: 'Dusun Krajan',
      rtRw: 'RT 01 / RW 01',
      noHp: '',
      keperluan: '',
    });
    setUploadedFile(null);
    setFilePreview('');
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-border shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-blue-700 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <FileText size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                  SuratCepat Desa
                </span>
                <span className="text-xs text-green-100 hidden sm:inline">• Gratis & Tanpa Antre</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold">
                {step === 4 ? 'Pengajuan Terkirim!' : 'Form Permohonan Surat Online'}
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
                step >= 1 ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </span>
              <span className={step === 1 ? 'font-bold text-green-800' : 'text-text-muted'}>Pilih Surat</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </span>
              <span className={step === 2 ? 'font-bold text-green-800' : 'text-text-muted'}>Data Warga</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                3
              </span>
              <span className={step === 3 ? 'font-bold text-green-800' : 'text-text-muted'}>Unggah KTP / Bukti</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-sm">
          
          {/* STEP 1: Pilih Jenis Surat */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="font-display font-bold text-base text-text-primary">
                  Langkah 1: Pilih Jenis Surat yang Anda Butuhkan
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  Klik salah satu surat di bawah ini sesuai keperluan administratif Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {jenisSuratOptions.map((item) => {
                  const isSelected = selectedJenis === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedJenis(item.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-green-600 bg-green-50/60 shadow-sm'
                          : 'border-border hover:border-green-300 hover:bg-slate-50/70'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-text-primary text-sm leading-snug">{item.label}</p>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                            isSelected ? 'bg-green-600 border-green-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <CheckCircle size={14} />}
                          </div>
                        </div>
                        <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200/70 text-[11px] text-green-800 font-medium">
                        📋 Syarat: {item.syarat}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Data Pemohon */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-blue-900">
                <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Surat yang Dipilih: {jenisSuratOptions.find(j => j.id === selectedJenis)?.label}</p>
                  <p className="text-blue-700 mt-0.5">Pastikan data NIK dan nama sesuai dengan KTP elektronik warga Desa Joesayur.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Nama Lengkap Pemohon (Sesuai KTP) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    NIK (Nomor Induk Kependudukan - 16 Digit) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="Contoh: 352101..."
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm font-mono focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-text-muted mt-1">{formData.nik.length}/16 digit</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Nomor WhatsApp / HP Aktif <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 0812-3456-7890"
                    value={formData.noHp}
                    onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-text-muted mt-1">Notifikasi surat selesai akan dikirimkan ke nomor ini.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Dusun Tempat Tinggal
                  </label>
                  <select
                    value={formData.dusun}
                    onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
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
                    placeholder="Contoh: RT 02 / RW 01"
                    value={formData.rtRw}
                    onChange={(e) => setFormData({ ...formData, rtRw: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Keperluan Pengajuan Surat <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Jelaskan secara singkat keperluan surat ini (contoh: Syarat pendaftaran beasiswa anak, pembukaan rekening tabungan, dll)..."
                    value={formData.keperluan}
                    onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Unggah Berkas & Konfirmasi */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="font-display font-bold text-base text-text-primary">
                  Langkah 3: Unggah Foto Dokumen Persyaratan
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  Unggah foto KTP asli atau Surat Pengantar RT untuk diverifikasi oleh admin desa.
                </p>
              </div>

              {/* Upload Box */}
              <div className="border-2 border-dashed border-slate-300 hover:border-green-500 rounded-2xl p-6 text-center transition-colors bg-surface-soft">
                <input
                  type="file"
                  id="file-upload-surat"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {filePreview ? (
                  <div className="space-y-3">
                    <img
                      src={filePreview}
                      alt="Pratinjau KTP"
                      className="max-h-48 mx-auto rounded-xl object-contain border border-slate-200 shadow-sm"
                    />
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs font-medium text-text-primary">{uploadedFile?.name}</span>
                      <label
                        htmlFor="file-upload-surat"
                        className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        Ganti Foto
                      </label>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="file-upload-surat" className="cursor-pointer block space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 mx-auto flex items-center justify-center">
                      <Upload size={22} />
                    </div>
                    <p className="text-sm font-semibold text-text-primary">
                      Klik untuk Memilih Foto KTP / Surat Pengantar
                    </p>
                    <p className="text-xs text-text-muted">
                      Mendukung format JPG, PNG, atau PDF (Maksimal 5MB)
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-text-secondary shadow-xs">
                      Pilih dari Galeri / Kamera HP
                    </span>
                  </label>
                )}
              </div>

              {/* Ringkasan Pengajuan Sebelum Kirim */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1.5">
                <p className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                  Konfirmasi Data Pengajuan:
                </p>
                <div className="flex justify-between">
                  <span className="text-text-muted">Jenis Surat:</span>
                  <span className="font-semibold text-text-primary">
                    {jenisSuratOptions.find(j => j.id === selectedJenis)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Nama Pemohon:</span>
                  <span className="font-semibold text-text-primary">{formData.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">NIK:</span>
                  <span className="font-mono text-text-primary">{formData.nik}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Wilayah:</span>
                  <span className="text-text-primary">{formData.dusun} ({formData.rtRw})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">WhatsApp:</span>
                  <span className="text-text-primary">{formData.noHp}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Halaman Sukses */}
          {step === 4 && submittedData && (
            <div className="text-center py-4 space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle size={36} />
              </div>

              <div>
                <h4 className="font-display font-bold text-xl text-text-primary">
                  Permohonan Berhasil Dikirim!
                </h4>
                <p className="text-xs text-text-secondary max-w-md mx-auto mt-1">
                  Pengajuan surat Anda telah masuk ke sistem antrean pelayanan Balai Desa Joesayur.
                </p>
              </div>

              {/* Kartu Bukti & Tracking ID */}
              <div className="bg-green-50/80 border-2 border-green-200 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-green-200">
                  <span className="text-xs font-semibold text-green-900">KODE PELACAKAN SURAT:</span>
                  <button
                    onClick={copyTrackingId}
                    className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-white px-2.5 py-1 rounded-md border border-green-300 hover:bg-green-100 transition-colors cursor-pointer"
                  >
                    <Copy size={12} />
                    {copied ? 'Tersalin!' : 'Salin Kode'}
                  </button>
                </div>

                <p className="font-mono text-2xl font-black text-green-700 text-center tracking-wider py-1">
                  {submittedData.id}
                </p>

                <div className="text-xs space-y-1 text-green-950 pt-2 border-t border-green-200">
                  <p>• <strong>Jenis Surat:</strong> {submittedData.jenis}</p>
                  <p>• <strong>Nama Pemohon:</strong> {submittedData.nama}</p>
                  <p>• <strong>Status Awal:</strong> Menunggu Verifikasi Petugas</p>
                  <p>• <strong>Estimasi Selesai:</strong> 1 - 2 Jam Kerja (Hari Kerja 08:00 - 15:30 WIB)</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Joesayur,%20saya%20sudah%20mengajukan%20surat%20dengan%20Kode%20Tracking%20${submittedData.id}%20atas%20nama%20${submittedData.nama}.%20Mohon%20dibantu%20proses.%20Terima%20kasih.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <Phone size={14} /> Konfirmasi ke WA Balai Desa
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

        {/* Footer Modal Action Buttons (Step 1 - 3) */}
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
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                Lanjutkan <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                <CheckCircle size={15} /> Kirim Permohonan Surat
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
