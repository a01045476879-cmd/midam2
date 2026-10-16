export interface Course {
  id: string;
  title: string;
  category: 'AI실무' | '컴퓨터OA' | '업무자동화' | '자격증/취업' | '기업체맞춤';
  level: '입문' | '중급' | '실무마스터';
  duration: string;
  targetAudience: string;
  description: string;
  curriculumList: string[];
  image: string;
  highlightBadge?: string;
  isPopular?: boolean;
  scheduleInfo: string;
  feeInfo: string;
}

export interface Post {
  id: string;
  title: string;
  category: '공지사항' | 'AI 테크 칼럼' | '교육 소식' | '수강생 후기' | '특강 안내';
  author: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  views: number;
  isPinned?: boolean;
  coverImage?: string;
}

export interface Review {
  id: string;
  studentName: string;
  affiliation: string;
  courseTaken: string;
  rating: number;
  comment: string;
  date: string;
  outcomeTag: string;
}

export interface Inquiry {
  id: string;
  applicantName: string;
  phone: string;
  email: string;
  courseOfInterest: string;
  message: string;
  preferredTime: string;
  createdAt: string;
  status: '접수완료' | '상담대기' | '상담완료';
}

export interface SocialLinks {
  kakao: string;
  naverBlog: string;
  youtube: string;
  instagram: string;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}

export interface SiteConfig {
  instituteName: string;
  tagline: string;
  representative: string;
  instructorTitle: string;
  address: string;
  phone: string;
  email: string;
  operatingHours: string;
  
  // Theme & Colors
  primaryColor: string; // e.g., #a855f7
  accentColor: string;  // e.g., #c084fc
  fontFamily: 'Noto Sans KR' | 'Plus Jakarta Sans' | 'Pretendard' | 'Gothic';
  
  // Hero section
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroImage: string;
  
  // Announcement banner
  showAnnouncementBar: boolean;
  announcementBarText: string;
  
  // Stats
  statGraduates: string;
  statSatisfaction: string;
  statExperience: string;
  statPartners: string;
  
  // Social & SEO
  socialLinks: SocialLinks;
  seo: SeoConfig;
}
