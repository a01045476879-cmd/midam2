import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Post, Course } from '../types';
import { ASSETS, resolveImagePath } from '../assets/images';
import { 
  X, Palette, FileText, BookOpen, Inbox, Globe, RefreshCw, 
  Download, Upload, Plus, Trash2, Edit3, Pin, Check, Copy, 
  ExternalLink, Sparkles, CheckCircle2, Phone, Save
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdminOpen, setIsAdminOpen,
    config, updateConfig, resetConfig, exportConfigJson, importConfigJson,
    posts, addPost, updatePost, deletePost, resetPosts,
    courses, addCourse, updateCourse, deleteCourse, resetCourses,
    inquiries, updateInquiryStatus, deleteInquiry,
    setIsNewPostModalOpen
  } = useSite();

  const [activeTab, setActiveTab] = useState<'design' | 'posts' | 'courses' | 'inquiries' | 'seo'>('design');

  // Editing state for post
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Editing state for course
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  // Form states for adding/editing a course
  const [courseForm, setCourseForm] = useState<Omit<Course, 'id'>>({
    title: '',
    category: 'AI실무',
    level: '입문',
    duration: '4주 (총 16시간)',
    targetAudience: '',
    description: '',
    curriculumList: ['1주차: ', '2주차: ', '3주차: ', '4주차: '],
    image: ASSETS.courseAiPrompt,
    scheduleInfo: '평일 저녁반',
    feeInfo: '개별 상담',
    highlightBadge: '추천 과정',
  });

  // Import JSON input
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState(false);

  if (!isAdminOpen) return null;

  const showSaveSuccess = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const success = importConfigJson(importJsonText);
    if (success) {
      setImportStatus('성공적으로 데이터를 불러왔습니다!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('JSON 형식이 올바르지 않습니다.');
    }
  };

  const handleSaveEditingPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    updatePost(editingPost.id, editingPost);
    setEditingPost(null);
    showSaveSuccess();
  };

  const handleSaveCourseForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(editingCourse.id, courseForm);
      setEditingCourse(null);
    } else {
      addCourse(courseForm);
      setIsAddingCourse(false);
    }
    showSaveSuccess();
  };

  const startEditCourse = (c: Course) => {
    setEditingCourse(c);
    setCourseForm({
      title: c.title,
      category: c.category,
      level: c.level,
      duration: c.duration,
      targetAudience: c.targetAudience,
      description: c.description,
      curriculumList: [...c.curriculumList],
      image: c.image,
      scheduleInfo: c.scheduleInfo,
      feeInfo: c.feeInfo,
      highlightBadge: c.highlightBadge || '',
    });
  };

  const presetPurpleHues = [
    { label: '클래식 바이올렛', color: '#a855f7' },
    { label: '딥 로열 퍼플', color: '#7c3aed' },
    { label: '네온 일렉트릭', color: '#9333ea' },
    { label: '소프트 라벤더', color: '#c084fc' },
    { label: '인디고 퓨전', color: '#6366f1' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]"></span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Midam교육 연구소 통합 관리자 대시보드</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30">
                  실시간 커스텀 & CMS
                </span>
              </h2>
              <p className="text-xs text-zinc-300">
                디자인, 폰트, 테마, 게시글, 교육과정, 수강신청 및 SEO를 손쉽게 편집합니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveToast && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/30">
                <Check className="w-3.5 h-3.5" />
                저장 완료!
              </span>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-2 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('design')}
            className={`px-3.5 py-2.5 font-medium border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'design'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>디자인 & 사이트 설정</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`px-3.5 py-2.5 font-medium border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'posts'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>게시글 & 소식 관리 ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3.5 py-2.5 font-medium border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'courses'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>교육과정 관리 ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3.5 py-2.5 font-medium border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'inquiries'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>상담 접수함 ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3.5 py-2.5 font-medium border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'seo'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>SEO & 소셜 미리보기</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* TAB 1: DESIGN & SITE CUSTOMIZATION */}
          {activeTab === 'design' && (
            <div className="space-y-8">
              
              {/* Basic Organization Profile */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  기본 기관 정보 (기관명, 대표자, 주소, 연락처)
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">웹사이트 / 기관 이름</label>
                    <input
                      type="text"
                      value={config.instituteName}
                      onChange={(e) => updateConfig({ instituteName: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">대표자 성명</label>
                    <input
                      type="text"
                      value={config.representative}
                      onChange={(e) => updateConfig({ representative: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">대표 전화번호</label>
                    <input
                      type="text"
                      value={config.phone}
                      onChange={(e) => updateConfig({ phone: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-zinc-300 font-semibold">연구소 주소</label>
                    <input
                      type="text"
                      value={config.address}
                      onChange={(e) => updateConfig({ address: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">공식 이메일</label>
                    <input
                      type="email"
                      value={config.email}
                      onChange={(e) => updateConfig({ email: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-3">
                    <label className="text-zinc-300 font-semibold">슬로건 / 태그라인</label>
                    <input
                      type="text"
                      value={config.tagline}
                      onChange={(e) => updateConfig({ tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Theme & Purple Palette Selection */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-purple-400" />
                  테마 색상 & 폰트 커스터마이징 (검정 배경 + 보라색 포인트)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div className="space-y-2">
                    <label className="text-zinc-300 font-semibold">포인트 보라색 프리셋</label>
                    <div className="flex flex-wrap gap-2">
                      {presetPurpleHues.map((hue) => (
                        <button
                          key={hue.color}
                          onClick={() => updateConfig({ primaryColor: hue.color })}
                          className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                            config.primaryColor === hue.color
                              ? 'border-white text-white font-bold bg-zinc-800 shadow'
                              : 'border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: hue.color }}></span>
                          <span>{hue.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <span className="text-zinc-400">직접 입력:</span>
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                        className="w-8 h-8 rounded border border-zinc-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.primaryColor}
                        onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                        className="w-28 px-2 py-1 bg-zinc-950 text-white font-mono text-xs border border-zinc-800 rounded"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-zinc-300 font-semibold">대표 폰트 서체</label>
                    <select
                      value={config.fontFamily}
                      onChange={(e) => updateConfig({ fontFamily: e.target.value as any })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="Noto Sans KR">Noto Sans KR (한국어 표준 고딕)</option>
                      <option value="Pretendard">Pretendard (현대적인 산세리프)</option>
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans (기하학적 영문 조화)</option>
                    </select>
                    <p className="text-[11px] text-zinc-400">
                      가독성과 전문성을 최적화한 현대적인 폰트가 전 영역에 실시간 적용됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Announcement Banner & Hero Copy */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  상단 공지 배너 & 히어로 헤드라인 편집
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="show-banner"
                      checked={config.showAnnouncementBar}
                      onChange={(e) => updateConfig({ showAnnouncementBar: e.target.checked })}
                      className="w-4 h-4 rounded text-purple-600 bg-zinc-950 border-zinc-800"
                    />
                    <label htmlFor="show-banner" className="text-zinc-300 font-semibold cursor-pointer">
                      최상단 특별 공지 배너 표시
                    </label>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">배너 문구</label>
                    <input
                      type="text"
                      value={config.announcementBarText}
                      onChange={(e) => updateConfig({ announcementBarText: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-zinc-300 font-semibold">히어로 타이틀 (전반부)</label>
                      <input
                        type="text"
                        value={config.heroTitle}
                        onChange={(e) => updateConfig({ heroTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-300 font-semibold">강조 포인트 단어 (보라색 그라데이션)</label>
                      <input
                        type="text"
                        value={config.heroHighlight}
                        onChange={(e) => updateConfig({ heroHighlight: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">히어로 상세 설명</label>
                    <textarea
                      rows={3}
                      value={config.heroSubtitle}
                      onChange={(e) => updateConfig({ heroSubtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Data Backup & Restore */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-purple-400" />
                  데이터 백업 (JSON 내보내기 / 가져오기) & 초기화
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <button
                    onClick={exportConfigJson}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-purple-400" />
                    <span>전체 설정 JSON 파일 다운로드</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('정말 기본값으로 초기화하시겠습니까?')) {
                        resetConfig();
                        resetCourses();
                        resetPosts();
                        showSaveSuccess();
                      }
                    }}
                    className="px-4 py-2 bg-red-950/40 hover:bg-red-950/80 text-red-300 border border-red-500/30 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>초기 기본값으로 복원</span>
                  </button>
                </div>

                <div className="space-y-2 pt-2 text-xs">
                  <label className="text-zinc-300">JSON 데이터 붙여넣어 복원하기</label>
                  <textarea
                    rows={2}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="백업했던 JSON 문자열을 붙여넣으세요"
                    className="w-full px-3 py-1.5 bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-lg font-mono text-[11px]"
                  ></textarea>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleImportSubmit}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-md text-xs cursor-pointer"
                    >
                      데이터 적용하기
                    </button>
                    {importStatus && <span className="text-xs text-purple-300">{importStatus}</span>}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: POSTS & NEWS MANAGEMENT */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">게시글 목록 및 관리</h3>
                  <p className="text-xs text-zinc-300">새로운 공지사항이나 AI 테크 칼럼을 작성, 수정, 삭제합니다.</p>
                </div>
                <button
                  onClick={() => setIsNewPostModalOpen(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 글 작성</span>
                </button>
              </div>

              {/* Editing Form Modal within Admin */}
              {editingPost && (
                <form onSubmit={handleSaveEditingPost} className="p-5 rounded-xl bg-zinc-900 border border-purple-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-purple-300">게시글 수정 중: {editingPost.title}</h4>
                    <button
                      type="button"
                      onClick={() => setEditingPost(null)}
                      className="text-zinc-400 hover:text-white text-xs"
                    >
                      취소
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-zinc-300">제목</label>
                      <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-300">카테고리</label>
                      <select
                        value={editingPost.category}
                        onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value as any })}
                        className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                      >
                        <option value="공지사항">공지사항</option>
                        <option value="AI 테크 칼럼">AI 테크 칼럼</option>
                        <option value="교육 소식">교육 소식</option>
                        <option value="특강 안내">특강 안내</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="text-zinc-300">요약</label>
                    <input
                      type="text"
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="text-zinc-300">본문 내용</label>
                    <textarea
                      rows={6}
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg text-xs"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingPost(null)}
                      className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>수정 저장</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Posts Table */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="p-3">분류</th>
                      <th className="p-3">제목</th>
                      <th className="p-3 hidden sm:table-cell">작성자</th>
                      <th className="p-3 hidden sm:table-cell">작성일</th>
                      <th className="p-3 hidden sm:table-cell">조회수</th>
                      <th className="p-3 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-zinc-900/60 transition-colors">
                        <td className="p-3 text-purple-400 font-medium whitespace-nowrap">
                          {post.category}
                        </td>
                        <td className="p-3 font-semibold text-white max-w-xs truncate">
                          {post.isPinned && <Pin className="w-3 h-3 text-purple-400 inline mr-1" />}
                          {post.title}
                        </td>
                        <td className="p-3 text-zinc-400 hidden sm:table-cell whitespace-nowrap">{post.author}</td>
                        <td className="p-3 text-zinc-400 hidden sm:table-cell font-mono tabular-nums whitespace-nowrap">{post.date}</td>
                        <td className="p-3 text-zinc-400 hidden sm:table-cell font-mono tabular-nums whitespace-nowrap">{post.views}</td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => setEditingPost(post)}
                            className="p-1 text-zinc-400 hover:text-white mr-1 cursor-pointer"
                            title="수정"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
                                deletePost(post.id);
                                showSaveSuccess();
                              }
                            }}
                            className="p-1 text-zinc-400 hover:text-red-400 cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: COURSE MANAGER */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">교육과정 커리큘럼 관리</h3>
                  <p className="text-xs text-zinc-300">정규 교육과정, 주차별 실습 내용, 수강 대상 및 일정을 등록하고 수정합니다.</p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingCourse(true);
                    setEditingCourse(null);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 교육과정 추가</span>
                </button>
              </div>

              {/* Add / Edit Course Form */}
              {(isAddingCourse || editingCourse) && (
                <form onSubmit={handleSaveCourseForm} className="p-5 rounded-xl bg-zinc-900 border border-purple-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-purple-300">
                      {editingCourse ? `교육과정 수정: ${editingCourse.title}` : '새 교육과정 생성'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingCourse(false);
                        setEditingCourse(null);
                      }}
                      className="text-zinc-400 hover:text-white text-xs"
                    >
                      취소
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-zinc-300 font-semibold">과정명</label>
                      <input
                        type="text"
                        required
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-300 font-semibold">카테고리</label>
                      <select
                        value={courseForm.category}
                        onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                        className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                      >
                        <option value="AI실무">AI실무</option>
                        <option value="컴퓨터OA">컴퓨터OA</option>
                        <option value="업무자동화">업무자동화</option>
                        <option value="자격증/취업">자격증/취업</option>
                        <option value="기업체맞춤">기업체맞춤</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-300 font-semibold">난이도</label>
                      <select
                        value={courseForm.level}
                        onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                        className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                      >
                        <option value="입문">입문</option>
                        <option value="중급">중급</option>
                        <option value="실무마스터">실무마스터</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-300 font-semibold">교육 기간</label>
                      <input
                        type="text"
                        value={courseForm.duration}
                        onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                        className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-300 font-semibold">하이라이트 뱃지</label>
                      <input
                        type="text"
                        value={courseForm.highlightBadge}
                        onChange={(e) => setCourseForm({ ...courseForm, highlightBadge: e.target.value })}
                        className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="text-zinc-300 font-semibold">과정 설명</label>
                    <textarea
                      rows={2}
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                    ></textarea>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="text-zinc-300 font-semibold">수강 대상</label>
                    <input
                      type="text"
                      value={courseForm.targetAudience}
                      onChange={(e) => setCourseForm({ ...courseForm, targetAudience: e.target.value })}
                      className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2 text-xs">
                    <label className="text-zinc-300 font-semibold">회차별 실습 커리큘럼 (줄바꿈으로 구분)</label>
                    <textarea
                      rows={4}
                      value={courseForm.curriculumList.join('\n')}
                      onChange={(e) => setCourseForm({ ...courseForm, curriculumList: e.target.value.split('\n').filter(s => s.trim().length > 0) })}
                      className="w-full px-3 py-1.5 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingCourse(false);
                        setEditingCourse(null);
                      }}
                      className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg"
                    >
                      저장하기
                    </button>
                  </div>
                </form>
              )}

              {/* Course list cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-purple-400 font-medium">
                        <span>{c.category} · {c.level}</span>
                        <span className="text-zinc-400">{c.duration}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{c.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{c.description}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
                      <button
                        onClick={() => startEditCourse(c)}
                        className="px-3 py-1 text-xs text-zinc-300 hover:text-white bg-zinc-800 rounded"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('이 교육과정을 삭제하시겠습니까?')) {
                            deleteCourse(c.id);
                            showSaveSuccess();
                          }
                        }}
                        className="px-3 py-1 text-xs text-red-300 hover:text-red-200 bg-red-950/40 rounded"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: INQUIRIES INBOX */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white">상담 및 수강신청 접수함</h3>
                <p className="text-xs text-zinc-300">웹사이트에서 접수된 개인 및 기업 상담 신청 목록입니다.</p>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-zinc-400 text-xs">
                  접수된 상담 신청이 없습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{inq.applicantName}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            inq.status === '상담완료'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : inq.status === '상담대기'
                              ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                              : 'bg-purple-950 text-purple-300 border border-purple-500/30'
                          }`}>
                            {inq.status}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-mono">{inq.createdAt}</span>
                        </div>

                        <div className="text-xs text-zinc-300 space-y-1">
                          <p>
                            <strong className="text-zinc-200">신청 과정:</strong> {inq.courseOfInterest}
                          </p>
                          <p>
                            <strong className="text-zinc-200">연락처:</strong>{' '}
                            <a href={`tel:${inq.phone.replace(/[^0-9]/g, '')}`} className="text-purple-400 hover:underline font-mono">
                              {inq.phone}
                            </a>
                            {inq.email && <span className="text-zinc-400 ml-2">({inq.email})</span>}
                          </p>
                          {inq.preferredTime && (
                            <p>
                              <strong className="text-zinc-200">희망 시간:</strong> {inq.preferredTime}
                            </p>
                          )}
                          {inq.message && (
                            <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800/80 text-zinc-300 text-xs mt-1">
                              {inq.message}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status toggle & delete */}
                      <div className="flex sm:flex-col items-center gap-2 shrink-0">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="px-2.5 py-1 text-xs bg-zinc-950 text-white border border-zinc-800 rounded"
                        >
                          <option value="접수완료">접수완료</option>
                          <option value="상담대기">상담대기</option>
                          <option value="상담완료">상담완료</option>
                        </select>
                        <button
                          onClick={() => {
                            if (window.confirm('이 상담 내역을 삭제하시겠습니까?')) {
                              deleteInquiry(inq.id);
                            }
                          }}
                          className="p-1 text-zinc-400 hover:text-red-400 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>삭제</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SEO & SOCIAL INTEGRATION */}
          {activeTab === 'seo' && (
            <div className="space-y-8">
              
              {/* Meta Tags Configuration */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  검색엔진 최적화 (SEO) 메타 정보 설정
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">SEO 메타 타이틀 (Page Title)</label>
                    <input
                      type="text"
                      value={config.seo.metaTitle}
                      onChange={(e) => updateConfig({ seo: { ...config.seo, metaTitle: e.target.value } })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">SEO 메타 디스크립션 (Description)</label>
                    <textarea
                      rows={2}
                      value={config.seo.metaDescription}
                      onChange={(e) => updateConfig({ seo: { ...config.seo, metaDescription: e.target.value } })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg text-xs"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">검색 키워드 (쉼표 구분)</label>
                    <input
                      type="text"
                      value={config.seo.keywords}
                      onChange={(e) => updateConfig({ seo: { ...config.seo, keywords: e.target.value } })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Social Channels Config */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  소셜 미디어 공식 링크 연동
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">카카오톡 오픈채팅 / 상담 링크</label>
                    <input
                      type="text"
                      value={config.socialLinks.kakao}
                      onChange={(e) => updateConfig({ socialLinks: { ...config.socialLinks, kakao: e.target.value } })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">네이버 블로그 링크</label>
                    <input
                      type="text"
                      value={config.socialLinks.naverBlog}
                      onChange={(e) => updateConfig({ socialLinks: { ...config.socialLinks, naverBlog: e.target.value } })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">유튜브 채널 링크</label>
                    <input
                      type="text"
                      value={config.socialLinks.youtube}
                      onChange={(e) => updateConfig({ socialLinks: { ...config.socialLinks, youtube: e.target.value } })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">인스타그램 링크</label>
                    <input
                      type="text"
                      value={config.socialLinks.instagram}
                      onChange={(e) => updateConfig({ socialLinks: { ...config.socialLinks, instagram: e.target.value } })}
                      className="w-full px-3 py-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Live Search Snippet Simulator */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  실시간 구글/네이버/카카오톡 공유 카드 시뮬레이터
                </h3>

                {/* Google preview */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-zinc-300">1. 구글 검색 노출 시뮬레이션</p>
                  <div className="p-4 rounded-xl bg-white text-zinc-900 text-xs shadow-md space-y-1">
                    <div className="flex items-center gap-2 text-zinc-600 text-[11px]">
                      <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[9px]">M</span>
                      <span className="font-mono">{config.seo.canonicalUrl}</span>
                    </div>
                    <p className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer">
                      {config.seo.metaTitle}
                    </p>
                    <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                      {config.seo.metaDescription}
                    </p>
                  </div>
                </div>

                {/* KakaoTalk Card preview */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-zinc-300">2. 카카오톡 / SNS 링크 공유 카드 미리보기</p>
                  <div className="max-w-sm rounded-xl overflow-hidden bg-[#242424] border border-zinc-700 text-xs shadow-lg">
                    <div className="h-40 bg-zinc-900 overflow-hidden relative">
                      <img
                        src={resolveImagePath(config.heroImage)}
                        alt="SNS 카드 미리보기"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 space-y-1">
                      <p className="font-bold text-white text-sm line-clamp-1">{config.seo.metaTitle}</p>
                      <p className="text-zinc-400 text-xs line-clamp-2">{config.seo.metaDescription}</p>
                      <p className="text-[11px] text-zinc-500 pt-1">midam-edu.kr</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/90 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>데이터 자동 로컬 저장 활성화 (LocalStorage)</span>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-4 py-1.5 font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md transition-colors cursor-pointer"
          >
            변경사항 적용하고 닫기
          </button>
        </div>

      </div>
    </div>
  );
};
