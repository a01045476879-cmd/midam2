import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Post } from '../types';
import { X, Send, Pin } from 'lucide-react';

export const NewPostModal: React.FC = () => {
  const { isNewPostModalOpen, setIsNewPostModalOpen, addPost, config } = useSite();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Post['category']>('AI 테크 칼럼');
  const [author, setAuthor] = useState(config.representative);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('AI실무, 프롬프트, 엑셀');
  const [isPinned, setIsPinned] = useState(false);
  const [readTime, setReadTime] = useState('3분');
  const [error, setError] = useState('');

  if (!isNewPostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('제목을 입력해 주세요.');
      return;
    }
    if (!content.trim()) {
      setError('본문 내용을 입력해 주세요.');
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addPost({
      title: title.trim(),
      category,
      author: author.trim() || config.representative,
      date: formattedDate,
      excerpt: excerpt.trim() || content.slice(0, 100) + '...',
      content: content.trim(),
      tags: tags.length ? tags : ['Midam교육연구소'],
      readTime,
      isPinned,
    });

    setIsNewPostModalOpen(false);
    // Reset form
    setTitle('');
    setContent('');
    setExcerpt('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">새 게시글 / 소식 작성</h3>
            <p className="text-xs text-zinc-300">연구소 소식이나 AI 실무 칼럼을 작성하여 바로 게시합니다.</p>
          </div>
          <button
            onClick={() => setIsNewPostModalOpen(false)}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-950/60 border border-red-500/40 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category & Pinned */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">분류 카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Post['category'])}
                className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="공지사항">공지사항</option>
                <option value="AI 테크 칼럼">AI 테크 칼럼</option>
                <option value="교육 소식">교육 소식</option>
                <option value="특강 안내">특강 안내</option>
                <option value="수강생 후기">수강생 후기</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">작성자</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="예: 대표 오숙경"
                className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">제목</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시글 제목을 입력해 주세요"
              className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">한 줄 요약 (목록에 노출)</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="핵심 요약을 간략히 적어주세요"
              className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Content */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">본문 내용</label>
            <textarea
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="본문 내용을 자유롭게 입력하세요. 줄바꿈 및 서식이 그대로 반영됩니다."
              className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 resize-y leading-relaxed"
            ></textarea>
          </div>

          {/* Tags & Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">태그 (쉼표로 구분)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, 엑셀, 군산, 프롬프트"
                className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">예상 소요 시간</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="예: 3분"
                className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="pin-post"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-700 text-purple-600 focus:ring-purple-500 bg-zinc-950"
            />
            <label htmlFor="pin-post" className="text-xs text-zinc-300 flex items-center gap-1 cursor-pointer">
              <Pin className="w-3.5 h-3.5 text-purple-400" />
              <span>상단 고정 공지로 등록하기</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(false)}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>게시글 등록하기</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
