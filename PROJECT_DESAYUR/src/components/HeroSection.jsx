import { FileText, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.jpg';

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Overlay — soft green-blue tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/75 via-blue-800/60 to-green-900/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-950/50" />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-green-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto animate-fade-up">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 mb-8 text-white/95 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
          🏛️ Layanan Digital Resmi Desa Joesayur
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-4 drop-shadow-2xl">
          DESA
          <span className="block" style={{ color: '#6EE7B7' }}>JOESAYUR</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-3 leading-relaxed font-light">
          Kabupaten Ngawi, Jawa Timur
        </p>
        <p className="text-sm sm:text-base text-white/75 max-w-xl mx-auto mb-10 leading-relaxed">
          Urus surat, lapor masalah desa, dan akses layanan administrasi dari rumah — cepat, mudah, dan gratis.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="cta-ajukan-surat"
            href="#layanan"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95 bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/40"
          >
            <FileText size={17} />
            Ajukan Surat Sekarang
          </a>

          <Link
            id="cta-dashboard"
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-sm border-2 border-white/60 hover:bg-white/20 hover:border-white transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            Lihat Dashboard
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce opacity-60">
          <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} className="text-white/60" />
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F0F9FF"/>
        </svg>
      </div>
    </section>
  );
}
