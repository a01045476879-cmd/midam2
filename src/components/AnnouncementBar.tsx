import React from 'react';
import { useSite } from '../context/SiteContext';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { config, updateConfig, setSelectedCourseForInquiry, setIsInquiryModalOpen } = useSite();

  if (!config.showAnnouncementBar || !config.announcementBarText) {
    return null;
  }

  const handleApplyClick = () => {
    setSelectedCourseForInquiry('비즈니스 생성형 AI & 프롬프트 엔지니어링 실무');
    setIsInquiryModalOpen(true);
  };

  return (
    <aside 
      aria-label="공지 배너"
      className="relative z-40 bg-gradient-to-r from-purple-950/80 via-zinc-950 to-purple-950/80 border-b border-purple-500/20 text-xs text-purple-200 py-2.5 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="truncate font-medium text-zinc-200">
            {config.announcementBarText}
          </span>
          <button
            onClick={handleApplyClick}
            className="hidden sm:inline-flex items-center gap-1 text-purple-300 hover:text-white font-medium underline underline-offset-2 shrink-0 ml-1 transition-colors cursor-pointer"
          >
            상담 신청하기
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <button
          onClick={() => updateConfig({ showAnnouncementBar: false })}
          className="text-zinc-400 hover:text-zinc-200 p-1 shrink-0 transition-colors cursor-pointer"
          aria-label="공지 닫기"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
