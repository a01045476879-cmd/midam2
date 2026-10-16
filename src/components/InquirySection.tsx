import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Send, CheckCircle2, Phone, Mail, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const InquirySection: React.FC = () => {
  const { config, courses, addInquiry, selectedCourseForInquiry, setSelectedCourseForInquiry } = useSite();

  const [formData, setFormData] = useState({
    applicantName: '',
    phone: '',
    email: '',
    courseOfInterest: selectedCourseForInquiry || courses[0]?.title || '비즈니스 생성형 AI & 프롬프트 엔지니어링 실무',
    preferredTime: '평일 저녁반 (19:00~21:00)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.applicantName.trim()) {
      setErrorMsg('성함(신청자명)을 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('연락처를 입력해 주세요.');
      return;
    }

    addInquiry({
      applicantName: formData.applicantName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      courseOfInterest: formData.courseOfInterest,
      preferredTime: formData.preferredTime,
      message: formData.message.trim(),
    });

    setSubmitted(true);
    setErrorMsg('');
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      applicantName: '',
      phone: '',
      email: '',
      courseOfInterest: courses[0]?.title || '',
      preferredTime: '평일 저녁반 (19:00~21:00)',
      message: '',
    });
    setSelectedCourseForInquiry('');
  };

  return (
    <section id="inquiry" className="py-20 border-b border-zinc-800/80 bg-[#0c0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ONLINE CONSULTATION & REGISTRATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            교육 상담 및 수강 신청
          </h2>
          <p className="text-sm text-zinc-300 mt-2 font-normal">
            개인 수강, 직무 자격증, 기업 단체 출강 등 궁금하신 점을 남겨주시면 오숙경 대표 강사가 직접 친절히 상담해 드립니다.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900 border border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)] text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">상담 신청이 정상적으로 접수되었습니다</h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  남겨주신 연락처(<strong className="text-white">{formData.phone}</strong>)로 확인 후 24시간 이내에 오숙경 대표 강사가 직접 맞춤 교육 일정과 커리큘럼을 안내해 드립니다.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-zinc-300">신청자명</span>
                  <span className="text-white font-medium">{formData.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-300">신청 과정</span>
                  <span className="text-purple-300 font-medium">{formData.courseOfInterest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-300">희망 시간대</span>
                  <span className="text-white font-medium">{formData.preferredTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleResetForm}
                  className="px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
                >
                  새로운 상담 작성하기
                </button>
                <a
                  href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>즉시 전화 문의 ({config.phone})</span>
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6 shadow-xl"
            >
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    <span>성함 / 담당자명</span>
                    <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    placeholder="예: 홍길동"
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 text-white placeholder-zinc-400 border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    <span>연락처 (휴대전화)</span>
                    <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="예: 010-1234-5678"
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 text-white placeholder-zinc-400 border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 transition-colors font-mono tabular-nums"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    이메일 (선택)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@company.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 text-white placeholder-zinc-400 border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Preferred time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    희망 수강/상담 시간대
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                  >
                    <option value="평일 오전반 (10:00~12:30)">평일 오전반 (10:00~12:30)</option>
                    <option value="평일 오후반 (14:00~17:00)">평일 오후반 (14:00~17:00)</option>
                    <option value="평일 저녁반 (19:00~21:00)">평일 저녁반 (19:00~21:00)</option>
                    <option value="주말 토요 집중반">주말 토요 집중반</option>
                    <option value="기업/기관 맞춤 출강 협의">기업/기관 맞춤 출강 협의</option>
                  </select>
                </div>
              </div>

              {/* Course selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  관심 교육과정 선택
                </label>
                <select
                  value={formData.courseOfInterest}
                  onChange={(e) => setFormData({ ...formData, courseOfInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.title}>
                      [{c.category}] {c.title}
                    </option>
                  ))}
                  <option value="기타 맞춤 과정 및 1:1 개인 레슨">기타 맞춤 과정 및 1:1 개인 레슨</option>
                  <option value="기업체 단체 출강 제안서 요청">기업체 단체 출강 제안서 요청</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  상담 내용 및 문의 사항
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="현재 다루시는 업무 내용이나 목표(예: 자격증 취득, 엑셀 보고서 자동화, 사내 AI 도입 등)를 자유롭게 적어주시면 더욱 정밀한 맞춤 커리큘럼을 제안해 드립니다."
                  className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 text-white placeholder-zinc-400 border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-y leading-relaxed"
                ></textarea>
              </div>

              {/* Privacy agreement & Submit button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>수집된 정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
                >
                  <span>상담 및 수강 신청 접수</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
