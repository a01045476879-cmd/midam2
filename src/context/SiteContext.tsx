import React, { createContext, useContext, useEffect, useState } from 'react';
import { initialCourses, initialPosts, initialReviews, initialSiteConfig } from '../data/initialData';
import { Course, Inquiry, Post, Review, SiteConfig } from '../types';

interface SiteContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  exportConfigJson: () => void;
  importConfigJson: (jsonString: string) => boolean;

  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  resetCourses: () => void;

  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'views'>) => void;
  updatePost: (id: string, updated: Partial<Post>) => void;
  deletePost: (id: string) => void;
  incrementPostViews: (id: string) => void;
  resetPosts: () => void;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id'>) => void;
  deleteReview: (id: string) => void;

  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // UI state
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  activeCourseModal: Course | null;
  setActiveCourseModal: (course: Course | null) => void;
  activePostModal: Post | null;
  setActivePostModal: (post: Post | null) => void;
  isNewPostModalOpen: boolean;
  setIsNewPostModalOpen: (open: boolean) => void;
  isInquiryModalOpen: boolean;
  setIsInquiryModalOpen: (open: boolean) => void;
  selectedCourseForInquiry: string;
  setSelectedCourseForInquiry: (courseTitle: string) => void;
}

const SiteContext = createContext<SiteContextType | null>(null);

const STORAGE_KEYS = {
  CONFIG: 'midam_site_config_v1',
  COURSES: 'midam_courses_v1',
  POSTS: 'midam_posts_v1',
  REVIEWS: 'midam_reviews_v1',
  INQUIRIES: 'midam_inquiries_v1',
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Config state
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? { ...initialSiteConfig, ...JSON.parse(saved) } : initialSiteConfig;
    } catch {
      return initialSiteConfig;
    }
  });

  // Courses state
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : initialCourses;
    } catch {
      return initialCourses;
    }
  });

  // Posts state
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
      return saved ? JSON.parse(saved) : initialPosts;
    } catch {
      return initialPosts;
    }
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'inq-seed-1',
              applicantName: '정*훈',
              phone: '010-8451-****',
              email: 'jh_jung@sample.co.kr',
              courseOfInterest: '비즈니스 생성형 AI & 프롬프트 엔지니어링 실무',
              message: '군산 산단 제조기업 기획팀 팀원 3명 단체 수강 일정 문의드립니다.',
              preferredTime: '평일 저녁반',
              createdAt: '2026-04-12 14:20',
              status: '상담대기',
            },
          ];
    } catch {
      return [];
    }
  });

  // Modal / UI States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [activePostModal, setActivePostModal] = useState<Post | null>(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedCourseForInquiry, setSelectedCourseForInquiry] = useState('');

  // Persist config
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
      // Apply theme CSS variables dynamically
      document.documentElement.style.setProperty('--color-primary', config.primaryColor);
      document.documentElement.style.setProperty('--color-accent', config.accentColor);
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  }, [config]);

  // Persist courses
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.error('Failed to save courses to localStorage', e);
    }
  }, [courses]);

  // Persist posts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save posts to localStorage', e);
    }
  }, [posts]);

  // Persist reviews
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  // Persist inquiries
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries to localStorage', e);
    }
  }, [inquiries]);

  // Config Actions
  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetConfig = () => {
    setConfig(initialSiteConfig);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
  };

  const exportConfigJson = () => {
    const fullBackup = {
      config,
      courses,
      posts,
      reviews,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `midam_edu_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.config) setConfig(data.config);
      if (Array.isArray(data.courses)) setCourses(data.courses);
      if (Array.isArray(data.posts)) setPosts(data.posts);
      if (Array.isArray(data.reviews)) setReviews(data.reviews);
      return true;
    } catch {
      return false;
    }
  };

  // Course Actions
  const addCourse = (newCourse: Omit<Course, 'id'>) => {
    const course: Course = {
      ...newCourse,
      id: `course-${Date.now()}`,
    };
    setCourses((prev) => [course, ...prev]);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const resetCourses = () => {
    setCourses(initialCourses);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
  };

  // Post Actions
  const addPost = (newPost: Omit<Post, 'id' | 'views'>) => {
    const post: Post = {
      ...newPost,
      id: `post-${Date.now()}`,
      views: 1,
    };
    setPosts((prev) => [post, ...prev]);
  };

  const updatePost = (id: string, updated: Partial<Post>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const incrementPostViews = (id: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, views: p.views + 1 } : p)));
  };

  const resetPosts = () => {
    setPosts(initialPosts);
    localStorage.removeItem(STORAGE_KEYS.POSTS);
  };

  // Review Actions
  const addReview = (newReview: Omit<Review, 'id'>) => {
    const review: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
    };
    setReviews((prev) => [review, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Inquiry Actions
  const addInquiry = (data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formatted = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newInquiry: Inquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      createdAt: formatted,
      status: '접수완료',
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  return (
    <SiteContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        exportConfigJson,
        importConfigJson,

        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        resetCourses,

        posts,
        addPost,
        updatePost,
        deletePost,
        incrementPostViews,
        resetPosts,

        reviews,
        addReview,
        deleteReview,

        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,

        isAdminOpen,
        setIsAdminOpen,
        activeCourseModal,
        setActiveCourseModal,
        activePostModal,
        setActivePostModal,
        isNewPostModalOpen,
        setIsNewPostModalOpen,
        isInquiryModalOpen,
        setIsInquiryModalOpen,
        selectedCourseForInquiry,
        setSelectedCourseForInquiry,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
