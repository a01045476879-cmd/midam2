import React from 'react';
import { useSite } from '../context/SiteContext';
import { resolveImagePath } from '../assets/images';
import { ArrowRight, BookOpen, MapPin, PhoneCall, CheckCircle2, Sparkles, Terminal, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  const { config, setIsInquiryModalOpen } = useSite();

  const handleInquiry = () => {
    setIsInquiryModalOpen(true);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-800/80">
      
      {/* 1. Architectural Fine Grid Pattern with Radial Falloff */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_65%,transparent_100%)]"
      />

      {/* 2. Atmospheric Layered Violet & Indigo Ambient Light Orbs */}
      <div 
        aria-hidden="true" 
        className="absolute -top-24 left-1/4 w-[650px] h-[380px] bg-purple-900/20 blur-[130px] rounded-full pointer-events-none"
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 -right-20 w-[550px] h-[360px] bg-indigo-950/25 blur-[120px] rounded-full pointer-events-none"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 left-1/3 w-[450px] h-[250px] bg-purple-950/20 blur-[100px] rounded-full pointer-events-none"
      />

      {/* 3. Aesthetic SVG Constellation / Neural Flow Lines */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Soft flowing curves representing AI network paths */}
        <path
          d="M -100 120 C 300 80, 500 280, 950 160 C 1200 90, 1400 240, 1650 180"
          fill="none"
          stroke="url(#purpleGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path
          d="M -50 260 C 250 180, 600 380, 1100 240 C 1350 170, 1500 320, 1750 280"
          fill="none"
          stroke="url(#purpleGrad)"
          strokeWidth="1"
        />
        {/* Constellation nodes */}
        <circle cx="300" cy="80" r="3" fill="#c084fc" opacity="0.6" />
        <circle cx="500" cy="280" r="2.5" fill="#a855f7" opacity="0.5" />
        <circle cx="950" cy="160" r="3.5" fill="#e879f9" opacity="0.7" />
        <circle cx="1100" cy="240" r="2.5" fill="#a855f7" opacity="0.5" />
      </svg>

      {/* 4. Fine Horizon Accent Light Line at the very top */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper grid: Value Proposition & Hero Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean kicker text */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-medium text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{config.representative} 대표 강사 직강</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">{config.address}</span>
            </div>

            {/* Display Headline with Balanced Wrapping */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.22] text-balance">
              <span>{config.heroTitle} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                {config.heroHighlight}
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
              {config.heroSubtitle}
            </p>

            {/* Feature Highlights Grid with subtle glass backdrop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>ChatGPT·Claude 실무 프롬프트 100% 실습</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>엑셀 피벗·파워쿼리·VBA 직무 자동화</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>컴퓨터활용능력 1·2급 실기 최단기 원패스</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>군산·전북권 기업 및 관공서 맞춤 출강</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={handleInquiry}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_24px_rgba(168,85,247,0.45)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>수강 및 출강 상담 신청</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#courses"
                className="px-5 py-3.5 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>교육과정 살펴보기</span>
              </a>

              <a
                href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
                className="px-4 py-3.5 text-sm font-medium text-zinc-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
                title="전화 문의"
              >
                <PhoneCall className="w-4 h-4" />
                <span className="font-mono tabular-nums">{config.phone}</span>
              </a>
            </div>

            {/* Location indicator */}
            <div className="pt-2 text-xs text-zinc-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>연구소 위치: {config.address} (최신 듀얼모니터 전산 실습실 구비)</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Image with Luxury Cyber Glass Brackets & Floating Badges */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Backlight Glow behind image */}
            <div 
              aria-hidden="true" 
              className="absolute -inset-2 bg-gradient-to-r from-purple-600/25 to-indigo-600/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"
            />

            <div className="relative rounded-2xl overflow-hidden border border-zinc-800/90 bg-zinc-950 shadow-[0_0_50px_rgba(168,85,247,0.18)] aspect-[16/11] lg:aspect-[4/3] group">
              
              {/* Precision Tech Frame Corner Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-purple-400/70 z-20 pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-purple-400/70 z-20 pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-purple-400/70 z-20 pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-purple-400/70 z-20 pointer-events-none"></div>

              {/* Top Floating Glass Badge */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-purple-500/30 text-[11px] font-semibold text-purple-200 flex items-center gap-1.5 shadow-lg">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>1:1 듀얼모니터 실습 환경</span>
              </div>

              {/* Main Image */}
              <img
                src={resolveImagePath(config.heroImage)}
                alt="Midam교육 연구소 최신 AI & 컴퓨터 실습 강의실"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Measured dark scrim for high contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent"></div>

              {/* Left Floating Mini Prompt Pill */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/85 backdrop-blur-md border border-zinc-800 text-[11px] text-zinc-300 shadow-xl">
                <Terminal className="w-3 h-3 text-purple-400" />
                <span className="font-mono">AI Prompt · Automation</span>
              </div>

              {/* Bottom image overlay kicker */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800/90">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-purple-300 font-semibold">{config.instituteName}</p>
                    <p className="text-sm font-bold text-white mt-0.5">현장 실무 중심 실습 교육 환경</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-300 tabular-nums">군산 본원 직영</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Full-width Quantitative Rigor Proof Strip with subtle glass finish */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/70 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              {config.statGraduates}
            </p>
            <p className="text-xs text-zinc-300 mt-1">누적 수료생 배출</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/70 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono tabular-nums">
              {config.statSatisfaction}
            </p>
            <p className="text-xs text-zinc-300 mt-1">교육생 수강 만족도</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/70 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              {config.statExperience}
            </p>
            <p className="text-xs text-zinc-300 mt-1">IT·OA 전문 지도 경력</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/70 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono tabular-nums">
              {config.statPartners}
            </p>
            <p className="text-xs text-zinc-300 mt-1">기관 및 기업체 출강</p>
          </div>
        </div>

      </div>
    </section>
  );
};
