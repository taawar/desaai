import { FileText, AlertTriangle, ArrowRight, CheckCircle, Search, Sparkles } from 'lucide-react';

function ServiceCard({ id, icon: Icon, iconBg, iconColor, borderColor, title, description, tags, tagBg, tagColor, btnLabel, btnBg, btnText, onClick }) {
  return (
    <div
      id={id}
      onClick={onClick}
      className="group bg-white rounded-3xl p-8 border-2 card-shadow card-hover flex flex-col gap-5 cursor-pointer relative overflow-hidden"
      style={{ borderColor }}
    >
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-xs"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={28} style={{ color: iconColor }} />
      </div>

      {/* Text */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full" style={{ backgroundColor: tagBg, color: tagColor }}>
            Modul Utama
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold text-text-primary mb-2.5">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: tagBg, color: tagColor }}
          >
            <CheckCircle size={11} />
            {tag}
          </span>
        ))}
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
        className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:opacity-95 hover:shadow-md active:scale-95 cursor-pointer"
        style={{ backgroundColor: btnBg, color: btnText }}
      >
        {btnLabel}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-200" />
      </button>
    </div>
  );
}

export default function LayananSection({ onOpenSurat, onOpenLapor, onOpenStatus }) {
  return (
    <section id="layanan" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide border border-green-200">
            🏛️ Pelayanan Digital Terpadu
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">
            Layanan Warga Dalam <span className="text-green-600">Satu Sistem</span>
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
            Solusi digital cerdas untuk pengurusan administrasi kependudukan dan pengaduan sarana desa secara mandiri dan cepat.
          </p>
        </div>

        {/* Cards SuratCepat & LaporDesa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <ServiceCard
            id="card-surat-cepat"
            icon={FileText}
            iconBg="#DCFCE7"
            iconColor="#16A34A"
            borderColor="#BBF7D0"
            title="SuratCepat"
            description="Pengajuan surat pengantar RT/RW, domisili, SKTM, hingga izin usaha secara daring dari HP tanpa perlu datang antre di loket balai desa."
            tags={['Surat Domisili', 'SKTM', 'Pengantar KTP', 'Izin Usaha SKU']}
            tagBg="#F0FDF4"
            tagColor="#16A34A"
            btnLabel="Isi Form Permohonan Surat"
            btnBg="#16A34A"
            btnText="#FFFFFF"
            onClick={onOpenSurat}
          />

          <ServiceCard
            id="card-lapor-desa"
            icon={AlertTriangle}
            iconBg="#DBEAFE"
            iconColor="#2563EB"
            borderColor="#BFDBFE"
            title="LaporDesa"
            description="Sistem tanggap darurat warga untuk melaporkan jalan rusak, lampu jalan padam, saluran mampet, atau sampah dengan fitur unggah foto bukti kejadian."
            tags={['Jalan Berlubang', 'Lampu PJU Padam', 'Irigasi & Banjir', 'Unggah Foto']}
            tagBg="#EFF6FF"
            tagColor="#2563EB"
            btnLabel="Buat Laporan Pengaduan"
            btnBg="#2563EB"
            btnText="#FFFFFF"
            onClick={onOpenLapor}
          />
        </div>

        {/* Info Banner & Cek Status Bar */}
        <div className="mt-12 max-w-5xl mx-auto bg-gradient-to-r from-blue-50 via-slate-50 to-green-50 border border-blue-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Search size={22} />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-text-primary">
                Ingin Mengetahui Progres Surat atau Laporan Anda?
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Masukkan kode pelacakan tiket atau NIK untuk memantau proses tindak lanjut perangkat desa.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenStatus}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 font-bold text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm shrink-0"
          >
            <Search size={14} />
            Lacak Status Sekarang
          </button>
        </div>

      </div>
    </section>
  );
}
