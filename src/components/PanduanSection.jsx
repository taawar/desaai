import { MousePointer, Edit3, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: 'step-pilih-layanan',
    step: '01',
    icon: MousePointer,
    title: 'Pilih Layanan',
    description: 'Pilih jenis surat atau laporan yang dibutuhkan sesuai keperluanmu.',
    color: '#16A34A',
    bg: '#DCFCE7',
    border: '#BBF7D0',
  },
  {
    id: 'step-isi-form',
    step: '02',
    icon: Edit3,
    title: 'Isi Form Online',
    description: 'Lengkapi data diri dan dokumen pendukung secara digital, tanpa antre.',
    color: '#2563EB',
    bg: '#DBEAFE',
    border: '#BFDBFE',
  },
  {
    id: 'step-selesai',
    step: '03',
    icon: CheckCircle2,
    title: 'Selesai & Unduh',
    description: 'Laporan diproses dan surat siap diambil atau diunduh langsung dari HP.',
    color: '#D97706',
    bg: '#FEF3C7',
    border: '#FDE68A',
  },
];

export default function PanduanSection() {
  return (
    <section id="panduan" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide border border-green-200">
            🗺️ Panduan Mudah
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
            Cara Pengajuan Layanan
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto">
            Hanya 3 langkah mudah untuk mengakses layanan administrasi desa secara digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-11 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-green-300 via-blue-300 to-amber-300 z-0" />

          {steps.map(({ id, step, icon: Icon, title, description, color, bg, border }) => (
            <div
              key={id}
              id={id}
              className="relative z-10 flex flex-col items-center text-center bg-white rounded-2xl p-8 border-2 card-shadow card-hover"
              style={{ borderColor: border }}
            >
              {/* Step badge */}
              <span
                className="absolute -top-3.5 right-5 text-xs font-black tracking-widest px-2.5 py-1 rounded-full border"
                style={{ backgroundColor: bg, color, borderColor: border }}
              >
                STEP {step}
              </span>

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                style={{ backgroundColor: bg }}
              >
                <Icon size={26} style={{ color }} />
              </div>

              <h3 className="font-display text-lg font-bold text-text-primary mb-3">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
