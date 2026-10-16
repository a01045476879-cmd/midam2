import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { MapPin, Phone, Clock, Car, Bus, Copy, Check, Navigation, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { config } = useSite();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(config.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="location" className="py-20 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 mb-2">
            <Navigation className="w-3.5 h-3.5" />
            <span>DIRECTIONS & LOCATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            연구소 오시는 길 & 시설 안내
          </h2>
          <p className="text-sm text-zinc-300 mt-2 font-normal">
            쾌적한 실습 환경과 최신 PC 및 듀얼 모니터가 완비된 Midam교육 연구소 본원입니다.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Map Simulation & Facility Preview */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-zinc-900/60 border border-zinc-800 overflow-hidden">
            
            {/* Interactive Map Visual Mockup */}
            <div className="relative w-full h-72 sm:h-80 bg-zinc-950 flex flex-col items-center justify-center p-6 border-b border-zinc-800 text-center overflow-hidden">
              {/* Grid background effect */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]"
              />

              {/* Glowing Map pin pin carrier */}
              <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
                <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-500 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.8)]">
                  <MapPin className="w-6 h-6 text-purple-300" />
                </div>
                <div className="mt-2 px-3 py-1 bg-zinc-900 border border-purple-500/40 rounded-lg text-xs font-bold text-white shadow-xl">
                  {config.instituteName} (3층)
                </div>
              </div>

              {/* Street & landmark tags on map */}
              <div className="absolute top-4 left-4 text-[11px] text-zinc-400 bg-black/60 px-2 py-1 rounded">
                군산시 백토로 144
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(config.address)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3 py-1.5 text-[11px] font-medium bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 rounded flex items-center gap-1 transition-colors"
                >
                  <span>네이버 지도</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`https://map.kakao.com/?q=${encodeURIComponent(config.address)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3 py-1.5 text-[11px] font-medium bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-500/40 rounded flex items-center gap-1 transition-colors"
                >
                  <span>카카오맵</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Address & Quick Copy Strip */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-purple-400 font-semibold">지번 / 도로명 주소</p>
                <p className="text-base font-bold text-white mt-0.5">{config.address}</p>
                <p className="text-xs text-zinc-300 mt-0.5">건물 3층 전관 (엘리베이터 이용 가능)</p>
              </div>

              <button
                onClick={handleCopyAddress}
                className="px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '주소 복사 완료' : '주소 복사하기'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Transport, Hours & Contact Details */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Phone & Direct Consultation Call */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-950/40 to-zinc-900/60 border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-300 font-medium">전화 문의 및 상담 예약</p>
                  <p className="text-2xl font-black text-white font-mono tracking-tight mt-1 tabular-nums">
                    {config.phone}
                  </p>
                  <p className="text-xs text-zinc-300 mt-1">
                    담당: <strong className="text-zinc-200">{config.representative} 대표 강사</strong> 직접 상담
                  </p>
                </div>
                <a
                  href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
                  className="w-12 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer active:scale-95"
                  title="전화 걸기"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-start gap-3">
              <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-300">
                <p className="font-semibold text-white mb-0.5">상담 및 교육 운영 시간</p>
                <p>{config.operatingHours}</p>
                <p className="text-[11px] text-zinc-300 mt-1">※ 사전 예약 시 주말 및 심야 출강 상담 가능</p>
              </div>
            </div>

            {/* Public Transit Guide */}
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-start gap-3">
              <Bus className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-300">
                <p className="font-semibold text-white mb-0.5">대중교통 안내</p>
                <p className="leading-relaxed">
                  시내버스 01, 02, 11, 13, 15번 탑승 후 백토로 인근 정류장 하차 (도보 2분 거리)
                </p>
              </div>
            </div>

            {/* Parking Guide */}
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-start gap-3">
              <Car className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-300">
                <p className="font-semibold text-white mb-0.5">주차 안내</p>
                <p className="leading-relaxed">
                  건물 뒤편 연구소 전용 주차장 무료 이용 가능 (만차 시 인근 공영주차장 이용)
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
