import React from 'react';
import { useSite } from '../context/SiteContext';
import { X, CheckCircle, Clock, Users, Calendar, ArrowRight } from 'lucide-react';

export const CourseDetailModal: React.FC = () => {
  const { activeCourseModal, setActiveCourseModal, setSelectedCourseForInquiry, setIsInquiryModalOpen } = useSite();

  if (!activeCourseModal) return null;

  const handleApplyNow = () => {
    setSelectedCourseForInquiry(activeCourseModal.title);
    setActiveCourseModal(null);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveCourseModal(null)}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold">
            <span>{activeCourseModal.category}</span>
            <span aria-hidden="true">·</span>
            <span>난이도: {activeCourseModal.level}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            {activeCourseModal.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {activeCourseModal.description}
          </p>
        </div>

        {/* Quick specs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-300">
            <Clock className="w-4 h-4 text-purple-400 shrink-0" />
            <span><strong>교육 기간:</strong> {activeCourseModal.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
            <span><strong>일정:</strong> {activeCourseModal.scheduleInfo}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300 sm:col-span-2">
            <Users className="w-4 h-4 text-purple-400 shrink-0" />
            <span><strong>수강 대상:</strong> {activeCourseModal.targetAudience}</span>
          </div>
        </div>

        {/* Syllabus breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            회차별 세부 실습 커리큘럼
          </h4>
          <div className="space-y-2">
            {activeCourseModal.curriculumList.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-200 flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-purple-600/20 text-purple-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits notice */}
        <div className="p-3.5 rounded-lg bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
          <p className="font-semibold mb-0.5">※ 수강생 특전 안내</p>
          <p className="text-[11px] text-zinc-300">
            강의 전용 실습 예제 파일 50여 종, 프롬프트 치트시트, 수료증 발급 및 수업 종료 후 1개월 질의응답 피드백 제공
          </p>
        </div>

        {/* Modal actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
          <button
            onClick={() => setActiveCourseModal(null)}
            className="px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={handleApplyNow}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_16px_rgba(168,85,247,0.3)] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>이 과정으로 수강 신청하기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
