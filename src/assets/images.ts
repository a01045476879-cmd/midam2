// High-fidelity image assets for Midam Education Research Institute
import heroImg from './images/hero_ai_academy_1792163196717.jpg';
import instructorImg from './images/instructor_oh_1792163197271.jpg';
import courseAiPromptImg from './images/course_ai_prompt_1792163198645.jpg';
import courseOfficeOaImg from './images/course_office_oa_1792163197850.jpg';

export const ASSETS = {
  hero: heroImg,
  instructor: instructorImg,
  courseAiPrompt: courseAiPromptImg,
  courseOfficeOa: courseOfficeOaImg,
} as const;

/**
 * Resolves an image path so that both Vite-bundled assets,
 * public directory paths (/images/...), and legacy paths work flawlessly on Netlify or any host.
 */
export function resolveImagePath(path?: string): string {
  if (!path) return ASSETS.hero;

  // If already a bundled or data URL or valid http URL
  if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Map known image names to their Vite bundled assets
  if (path.includes('hero_ai_academy')) {
    return ASSETS.hero;
  }
  if (path.includes('instructor_oh')) {
    return ASSETS.instructor;
  }
  if (path.includes('course_ai_prompt')) {
    return ASSETS.courseAiPrompt;
  }
  if (path.includes('course_office_oa')) {
    return ASSETS.courseOfficeOa;
  }

  // If path was saved as /src/assets/images/..., rewrite to /images/... for static public host
  if (path.startsWith('/src/assets/images/')) {
    return path.replace('/src/assets/images/', '/images/');
  }

  return path;
}
