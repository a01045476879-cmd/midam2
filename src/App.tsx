import React from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CoursesSection } from './components/CoursesSection';
import { InstructorSection } from './components/InstructorSection';
import { PostsSection } from './components/PostsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { CourseDetailModal } from './components/CourseDetailModal';
import { PostReaderModal } from './components/PostReaderModal';
import { NewPostModal } from './components/NewPostModal';
import { InquiryModal } from './components/InquiryModal';
import { Phone, Settings, MessageCircle } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { config, setIsAdminOpen, setIsInquiryModalOpen } = useSite();

  const getFontFamilyStyle = () => {
    switch (config.fontFamily) {
      case 'Pretendard':
        return "'Pretendard', sans-serif";
      case 'Plus Jakarta Sans':
        return "'Plus Jakarta Sans', 'Noto Sans KR', sans-serif";
      default:
        return "'Noto Sans KR', 'Plus Jakarta Sans', sans-serif";
    }
  };

  return (
    <div
      className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-purple-600 selection:text-white flex flex-col relative transition-colors duration-200"
      style={{ fontFamily: getFontFamilyStyle() }}
    >
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Top 3-Zone Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero & Proposition Section */}
        <Hero />

        {/* 2. Core Curriculums & Courses */}
        <CoursesSection />

        {/* 3. Lead Instructor Oh Sook-kyung Spotlight */}
        <InstructorSection />

        {/* 4. Posts, AI Column & Notice CMS Board */}
        <PostsSection />

        {/* 5. Authentic Student Reviews & Outcomes */}
        <ReviewsSection />

        {/* 6. Location, Facilities & Directions (Baekto-ro 144, 3F) */}
        <LocationSection />

        {/* 7. Interactive Lead Consultation & Enrollment */}
        <InquirySection />
      </main>

      {/* Footer with Business & Legal Notice */}
      <Footer />

      {/* Modals */}
      <AdminDashboard />
      <CourseDetailModal />
      <PostReaderModal />
      <NewPostModal />
      <InquiryModal />

      {/* Floating Quick Action Widget (Bottom-right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        {/* Admin Dashboard quick pill */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/95 hover:bg-zinc-800 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold shadow-lg backdrop-blur-md transition-all cursor-pointer group hover:scale-105"
          title="관리자 설정 & 실시간 편집"
        >
          <Settings className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-45 transition-transform" />
          <span>관리자 대시보드</span>
        </button>

        {/* Direct Phone Dial */}
        <a
          href={`tel:${config.phone.replace(/[^0-9]/g, '')}`}
          className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          title={`전화 문의: ${config.phone}`}
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <MainLayout />
    </SiteProvider>
  );
}
