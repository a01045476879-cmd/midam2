import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Settings, Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { config, setIsAdminOpen, setIsInquiryModalOpen } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '교육과정', href: '#courses' },
    { label: '대표강사 소개', href: '#instructor' },
    { label: '연구소 소식', href: '#posts' },
    { label: '수강생 후기', href: '#reviews' },
    { label: '오시는 길', href: '#location' },
  ];

  const handleConsultClick = () => {
    setIsInquiryModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single clean brand wordmark text element */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-transform"></span>
          <span>{config.instituteName}</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + Admin portal toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="관리자 대시보드 및 사이트 커스터마이징"
          >
            <Settings className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">관리자 대시보드</span>
            <span className="sm:hidden">관리자</span>
          </button>

          <button
            onClick={handleConsultClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md shadow-[0_0_16px_rgba(168,85,247,0.35)] transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <span>교육상담 신청</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 cursor-pointer"
            aria-label="메뉴 토글"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-purple-300 hover:bg-zinc-900/60 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2">
            <button
              onClick={handleConsultClick}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md transition-colors text-center"
            >
              교육상담 신청하기
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
