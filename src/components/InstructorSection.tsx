import React from 'react';
import { useSite } from '../context/SiteContext';
import { Award, Briefcase, Sparkles, CheckCircle, Quote, Phone } from 'lucide-react';

export const InstructorSection: React.FC = () => {
  const { config, setIsInquiryModalOpen } = useSite();

  const careerList = [
    '현) Midam교육 연구소 대표 및 수석 강사',
    '군산시 중소기업 및 관공서 OA 실무·AI 역량강화 전담 강사',
    '한국생산성본부(KPC) 공인 ITQ 지도사 및 전문 코치',
    '대한상공회의소 컴퓨터활용능력 1·2급 공인 지도 경력 14년+',
    '생성형 AI 비즈니스 프롬프트 엔지니어링 전문 컨설턴트',
    '전라북도 교육지원기관 및 대학 취업 캠프 실무 특강 다수',
  ];

  const certificates = [
    '컴퓨터활용능력 1급',
    'AI 프롬프트 마스터 지도사',
    'ITQ Master (정보기술자격)',
    'MOS Master',
    '평생교육사',
    '직업훈련교사',
  ];

  const philosophies = [
    {
      title: '현업 직결 100% 실습',
      desc: '단순 자격증 문제 풀이가 아닌, 실제 현장에서 쓰는 엑셀 장부와 보고서 양식을 다룹니다.',
    },
    {
      title: '비전공자 눈높이 맞춤형 지도',
      desc: '어려운 컴퓨터 용어도 누구나 이해하기 쉬운 비유와 1:1 화면 밀착 코칭으로 풀어냅니다.',
    },
    {
      title: 'AI를 통한 일상 업무의 시간 해방',
      desc: '매일 야근하던 루틴 작업을 AI와 자동화로 해결하여 삶의 여유를 되찾아 드립니다.',
    },
  ];

  return (
    <section id="instructor" className="py-20 border-b border-zinc-800/80 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LEAD INSTRUCTOR & FOUNDER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            대표 강사 <span className="text-purple-400">{config.representative}</span>를 소개합니다
          </h2>
          <p className="text-sm text-zinc-300 mt-2 font-normal">
            14년 넘게 군산과 전북 지역에서 수많은 직장인과 수험생의 컴퓨터 역량을 책임져 온 베테랑 교육자입니다.
          </p>
        </div>

        {/* Main Grid: Portrait & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Portrait & Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl w-full max-w-md aspect-[3/4] group">
              <img
                src="/src/assets/images/instructor_oh_1792163197271.jpg"
                alt="Midam교육 연구소 대표 오숙경 강사"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                      {config.representative}
                      <span className="text-xs font-normal text-purple-300">대표 / 수석 강사</span>
                    </h3>
                    <p className="text-xs text-zinc-300 mt-0.5">{config.instituteName}</p>
                  </div>
                  <a
                    href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
                    className="p-2.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                    title="강사 직통 상담 문의"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Certifications strip below image */}
            <div className="w-full max-w-md mt-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <p className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                보유 공인 자격 및 자격증
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
                {certificates.map((cert, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-zinc-800/70 text-zinc-200 rounded text-[11px]"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quote Box */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-950/30 to-zinc-900/40 border border-purple-500/20 relative">
              <Quote className="w-8 h-8 text-purple-500/30 absolute top-4 right-4 pointer-events-none" />
              <p className="text-base sm:text-lg font-medium text-purple-200 leading-relaxed italic">
                “기술은 두려움의 대상이 아니라, 여러분의 일과 삶의 시간을 아껴주는 가장 든든한 파트너입니다. 
                비전공자도, 어르신도 원리를 알면 컴퓨터와 AI가 가장 든든한 날개가 됩니다.”
              </p>
              <p className="text-xs text-zinc-300 mt-3 text-right">
                — Midam교육 연구소 대표 강사 <strong className="text-white">{config.representative}</strong>
              </p>
            </div>

            {/* Career History */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                주요 약력 및 출강 이력
              </h3>
              <div className="space-y-2 text-xs text-zinc-300 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/70">
                {careerList.map((career, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Core Educational Tenets */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                오숙경 강사의 3대 교육 원칙
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {philosophies.map((item, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800">
                    <p className="text-xs font-bold text-purple-300 mb-1">{item.title}</p>
                    <p className="text-[11px] text-zinc-300 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Action */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_16px_rgba(168,85,247,0.3)] transition-colors cursor-pointer"
              >
                오숙경 대표 강사에게 1:1 맞춤 상담 신청
              </button>
              <span className="text-xs text-zinc-300 font-mono">
                직통 문의: {config.phone}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
