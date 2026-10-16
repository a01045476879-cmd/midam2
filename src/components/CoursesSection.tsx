import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Course } from '../types';
import { resolveImagePath } from '../assets/images';
import { ArrowUpRight, Clock, Plus, Sparkles, BookOpen } from 'lucide-react';

export const CoursesSection: React.FC = () => {
  const { courses, setActiveCourseModal, setSelectedCourseForInquiry, setIsInquiryModalOpen, setIsAdminOpen } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  const categories = ['전체', 'AI실무', '컴퓨터OA', '업무자동화', '자격증/취업', '기업체맞춤'];

  const filteredCourses = activeCategory === '전체'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  const handleApply = (course: Course) => {
    setSelectedCourseForInquiry(course.title);
    setIsInquiryModalOpen(true);
  };

  return (
    <section id="courses" className="py-20 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURRICULUM OVERVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight">
              실무 직결형 AI & 컴퓨터 OA 정규 교육과정
            </h2>
            <p className="text-sm text-zinc-300 mt-2 max-w-xl">
              단순 암기가 아닌, 실무 데이터를 직접 다루며 실력을 완성하는 단계별 맞춤 커리큘럼입니다.
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented Control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group relative flex flex-col rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-purple-500/50 transition-all duration-300 overflow-hidden hover:shadow-[0_4px_30px_rgba(168,85,247,0.1)]"
            >
              {/* Card Image Slot with Fallback */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={resolveImagePath(course.image)}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to high tech gradient container
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
                
                {/* Highlight Badge */}
                {course.highlightBadge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold bg-purple-600 text-white rounded">
                    {course.highlightBadge}
                  </div>
                )}

                {/* Level info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
                  <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px]">
                    <Clock className="w-3 h-3 text-purple-400" />
                    <span>{course.duration}</span>
                  </span>
                  <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-purple-300 font-medium">
                    난이도: {course.level}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs text-purple-400 font-medium mb-1.5">
                    <span>{course.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-300">{course.scheduleInfo}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Curriculum Bullet Points */}
                <div className="border-t border-zinc-800/80 pt-3 space-y-1.5 text-xs text-zinc-300">
                  <p className="text-[11px] font-semibold text-zinc-200">주요 학습 내용</p>
                  {course.curriculumList.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-zinc-300 text-[11px] truncate">
                      <span className="text-purple-400 shrink-0">·</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="border-t border-zinc-800/80 pt-4 flex items-center gap-2">
                  <button
                    onClick={() => setActiveCourseModal(course)}
                    className="flex-1 py-2 px-3 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    <span>상세 커리큘럼</span>
                  </button>
                  <button
                    onClick={() => handleApply(course)}
                    className="py-2 px-3.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  >
                    <span>수강 신청</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner & Quick Admin Course Add Hint */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-purple-950/40 via-zinc-900/60 to-purple-950/30 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-white">원하시는 맞춤 과정이나 기업 단체 출강이 필요하신가요?</h4>
            <p className="text-xs text-zinc-300 mt-0.5">
              교육생 수준과 사내 업무 환경에 맞춘 커스텀 커리큘럼 제안서를 24시간 이내에 발송해 드립니다.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md transition-colors cursor-pointer"
            >
              기업 출강 제안서 요청
            </button>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-md transition-colors cursor-pointer"
              title="관리자: 교육과정 추가/수정"
            >
              <Plus className="w-4 h-4 text-purple-400" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
