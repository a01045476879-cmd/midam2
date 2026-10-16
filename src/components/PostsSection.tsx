import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Post } from '../types';
import { Search, Plus, Eye, Calendar, Pin, ArrowRight, BookOpen } from 'lucide-react';

export const PostsSection: React.FC = () => {
  const { posts, setActivePostModal, setIsNewPostModalOpen, incrementPostViews } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '공지사항', 'AI 테크 칼럼', '교육 소식'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenPost = (post: Post) => {
    incrementPostViews(post.id);
    setActivePostModal(post);
  };

  return (
    <section id="posts" className="py-20 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>LAB INSIGHTS & NOTICES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight">
              연구소 소식 & AI 실무 테크 칼럼
            </h2>
            <p className="text-sm text-zinc-300 mt-2 max-w-xl">
              오숙경 대표 강사가 직접 전하는 최신 생성형 AI 트렌드, 엑셀 실무 비법, 그리고 수강생 소식입니다.
            </p>
          </div>

          {/* New Post Button */}
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>새 글 작성하기</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
          
          {/* Category tabs */}
          <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목, 내용, 태그 검색..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-950 text-zinc-200 placeholder-zinc-400 border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/30 rounded-xl border border-zinc-800/60">
            <p className="text-zinc-400 text-sm">일치하는 게시글이 없습니다.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('전체');
              }}
              className="mt-3 text-xs text-purple-400 hover:underline cursor-pointer"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => handleOpenPost(post)}
                className="group relative flex flex-col justify-between p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-all cursor-pointer hover:shadow-[0_4px_24px_rgba(168,85,247,0.08)]"
              >
                <div>
                  {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
                  <div className="flex items-center gap-2 text-xs text-zinc-300 mb-2.5">
                    {post.isPinned && (
                      <span className="text-purple-400 flex items-center gap-1 font-semibold">
                        <Pin className="w-3 h-3" />
                        고정 공지
                      </span>
                    )}
                    {post.isPinned && <span aria-hidden="true">·</span>}
                    <span className="text-purple-300 font-medium">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime} 읽기</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-zinc-300 mt-2.5 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Metadata & Read button */}
                <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
                    <span>작성: {post.author}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </span>
                  </div>

                  <span className="text-purple-400 group-hover:text-purple-300 font-medium flex items-center gap-1 text-xs">
                    <span>전문 읽기</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
