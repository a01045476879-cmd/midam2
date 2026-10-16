import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { X, Send, CheckCircle2, Phone } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { isInquiryModalOpen, setIsInquiryModalOpen, selectedCourseForInquiry, setSelectedCourseForInquiry, courses, addInquiry, config } = useSite();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(selectedCourseForInquiry || courses[0]?.title || '');
  const [message, setMessage] = useState('');
  const [preferredTime, setPreferredTime] = useState('평일 저녁반 (19:00~21:00)');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isInquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('성함을 입력해 주세요.');
      return;
    }
    if (!phone.trim()) {
      setError('연락처를 입력해 주세요.');
      return;
    }

    addInquiry({
      applicantName: name.trim(),
      phone: phone.trim(),
      email: '',
      courseOfInterest: course || selectedCourseForInquiry || '일반 상담',
      message: message.trim(),
      preferredTime,
    });

    setSubmitted(true);
    setError('');
  };

  const handleClose = () => {
    setIsInquiryModalOpen(false);
    setSubmitted(false);
    setName('');
    setPhone('');
    setMessage('');
    setSelectedCourseForInquiry('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">상담 신청이 접수되었습니다!</h3>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
              {config.representative} 대표 강사가 접수 내용을 확인 후 <strong className="text-white">{phone}</strong>로 신속히 연락드리겠습니다.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={handleClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">교육 상담 & 수강 신청</h3>
              <p className="text-xs text-zinc-300 mt-0.5">
                {config.instituteName} · 대표 오숙경 직통 상담
              </p>
            </div>

            {error && (
              <div className="p-2.5 text-xs bg-red-950/60 border border-red-500/40 text-red-300 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">신청자 성함 *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="성함을 입력하세요"
                  className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">연락처 *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">관심 교육과정</label>
                <select
                  value={course || selectedCourseForInquiry || courses[0]?.title}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.title}>
                      [{c.category}] {c.title}
                    </option>
                  ))}
                  <option value="1:1 개인 맞춤 레슨">1:1 개인 맞춤 레슨</option>
                  <option value="기업체 단체 출강 문의">기업체 단체 출강 문의</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">희망 시간대</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500"
                >
                  <option value="평일 오전반 (10:00~12:30)">평일 오전반 (10:00~12:30)</option>
                  <option value="평일 오후반 (14:00~17:00)">평일 오후반 (14:00~17:00)</option>
                  <option value="평일 저녁반 (19:00~21:00)">평일 저녁반 (19:00~21:00)</option>
                  <option value="주말 토요 집중반">주말 토요 집중반</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">남기실 말씀 (선택)</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="문의사항이나 현재 업무 수준을 적어주세요."
                  className="w-full px-3 py-2 text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500 resize-y"
                ></textarea>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
              <a
                href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
                className="text-xs text-zinc-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{config.phone}</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-3 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>신청서 전송</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
