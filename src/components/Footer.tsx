import React from 'react';
import { useSite } from '../context/SiteContext';
import { Phone, MapPin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, setIsAdminOpen } = useSite();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-zinc-900 text-zinc-300 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid: Info & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Address Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.7)]"></span>
              <span className="text-base font-bold text-white tracking-tight">{config.instituteName}</span>
            </div>

            <p className="text-zinc-300 text-xs leading-relaxed max-w-sm">
              {config.tagline}. 생성형 AI 실무 프롬프트부터 실무 엑셀, 직무 자동화, 컴퓨터활용능력까지 전문 교육을 제공합니다.
            </p>

            <div className="space-y-1.5 pt-2 text-[11px] text-zinc-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>주소: {config.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>대표 전화: <strong className="text-zinc-300 font-mono tabular-nums">{config.phone}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>이메일: {config.email}</span>
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-semibold text-zinc-300 text-xs">교육 커리큘럼</p>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#courses" className="hover:text-purple-300 transition-colors">생성형 AI & 프롬프트 엔지니어링</a></li>
              <li><a href="#courses" className="hover:text-purple-300 transition-colors">실무 엑셀 & 데이터 분석 마스터</a></li>
              <li><a href="#courses" className="hover:text-purple-300 transition-colors">AI 기반 노코드 업무자동화</a></li>
              <li><a href="#courses" className="hover:text-purple-300 transition-colors">컴활 1·2급 실기 단기완성</a></li>
              <li><a href="#courses" className="hover:text-purple-300 transition-colors">기업 및 공공기관 맞춤형 출강</a></li>
            </ul>
          </div>

          {/* Social Links & Legal */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-semibold text-zinc-300 text-xs">소셜 미디어 & 공식 채널</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href={config.socialLinks.naverBlog}
                target="_blank"
                rel="noreferrer noopener"
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
              >
                네이버 블로그
              </a>
              <a
                href={config.socialLinks.kakao}
                target="_blank"
                rel="noreferrer noopener"
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
              >
                카카오톡 상담
              </a>
              <a
                href={config.socialLinks.youtube}
                target="_blank"
                rel="noreferrer noopener"
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
              >
                유튜브 채널
              </a>
              <a
                href={config.socialLinks.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
              >
                인스타그램
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-[11px] text-zinc-400 hover:text-purple-400 underline underline-offset-2 transition-colors cursor-pointer"
              >
                관리자 대시보드 로그인 / 사이트 설정
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            <p>
              © {new Date().getFullYear()} {config.instituteName}. All rights reserved. | 대표자: {config.representative} | 개인정보책임관리자: {config.representative}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            <span>맨 위로 가기</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
