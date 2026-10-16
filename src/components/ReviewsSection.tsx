import React from 'react';
import { useSite } from '../context/SiteContext';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, setIsInquiryModalOpen } = useSite();

  return (
    <section id="reviews" className="py-20 border-b border-zinc-800/80 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>STUDENT REVIEWS & SUCCESS STORIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            수강생들이 증명하는 생생한 변화
          </h2>
          <p className="text-sm text-zinc-300 mt-2 font-normal">
            야근이 일상이었던 직장인부터 자격증에 번번이 낙방하던 수험생까지, 오숙경 강사와 함께 만든 진짜 결과입니다.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating stars & date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-300 font-mono tabular-nums">{rev.date}</span>
                </div>

                {/* Outcome Achievement Pill-alternative (clean border box with icon) */}
                <div className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-950/40 border border-purple-500/20 px-2.5 py-1 rounded">
                  <CheckCircle2 className="w-3 h-3 text-purple-400 shrink-0" />
                  <span className="font-medium text-[11px] truncate">{rev.outcomeTag}</span>
                </div>

                {/* Comment quote */}
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  “{rev.comment}”
                </p>
              </div>

              {/* Student info */}
              <div className="mt-5 pt-3 border-t border-zinc-800/80">
                <p className="text-xs font-semibold text-white">{rev.studentName}</p>
                <p className="text-[11px] text-zinc-300 truncate">{rev.affiliation}</p>
                <p className="text-[11px] text-purple-400 truncate mt-0.5">수강과목: {rev.courseTaken}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-12 text-center">
          <p className="text-xs text-zinc-300 mb-3">
            다음 성공 후기의 주인공은 바로 여러분입니다.
          </p>
          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer active:scale-95"
          >
            지금 1:1 맞춤 상담 신청하기
          </button>
        </div>

      </div>
    </section>
  );
};
