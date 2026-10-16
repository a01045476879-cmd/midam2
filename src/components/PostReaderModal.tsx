import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { X, Calendar, User, Eye, Share2, Check, Printer } from 'lucide-react';

export const PostReaderModal: React.FC = () => {
  const { activePostModal, setActivePostModal } = useSite();
  const [copied, setCopied] = useState(false);

  if (!activePostModal) return null;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top actions bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold">
            <span>{activePostModal.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              title="인쇄"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-xs"
              title="링크 복사"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setActivePostModal(null)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          {activePostModal.title}
        </h2>

        {/* Post Metadata (Zero-Pill) */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300 font-medium border-b border-zinc-800 pb-4">
          <span className="flex items-center gap-1 text-purple-300">
            <User className="w-3.5 h-3.5" />
            {activePostModal.author}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 font-mono tabular-nums">
            <Calendar className="w-3.5 h-3.5" />
            {activePostModal.date}
          </span>
          <span aria-hidden="true">·</span>
          <span>{activePostModal.readTime} 소요</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 font-mono tabular-nums">
            <Eye className="w-3.5 h-3.5" />
            조회수 {activePostModal.views}
          </span>
        </div>

        {/* Post Body Content */}
        <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed space-y-4 whitespace-pre-line font-normal">
          {activePostModal.content}
        </div>

        {/* Tags */}
        <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-2 text-xs">
          {activePostModal.tags.map((tag, i) => (
            <span key={i} className="text-zinc-400 hover:text-purple-300">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={() => setActivePostModal(null)}
            className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors cursor-pointer"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
