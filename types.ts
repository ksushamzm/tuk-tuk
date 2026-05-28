// Общие типы приложения

export interface NavItem {
  label: string;
  href: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  coverImage?: string;
  excerpt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateArticle {
  id: string;
  categoryId: string;
  templateId: number;
  title: string;
  section1Title?: string;
  section1Text: string[];
  image1?: string;
  image2?: string;
  section2Title?: string;
  section2Text: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TestQuestion {
  id: number;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctId: string;
  explanation: string;
  orderIndex: number;
}

export interface SiteContent {
  hero_title: string;
  hero_link_text: string;
  hero_image: string;
  about_text_1: string;
  about_text_2: string;
  about_text_3: string;
  muay_thai_title: string;
  muay_thai_text: string;
  muay_thai_image: string;
  category_1_title: string;
  category_1_image: string;
  category_1_description: string;
  category_2_title: string;
  category_2_image: string;
  category_2_description: string;
  category_3_title: string;
  category_3_image: string;
  category_3_description: string;
  info_test_image: string;
  home_blocks: string; // JSON string
  [key: string]: string;
}

export type HomeBlock = 
  | 'Hero' 
  | 'RecentArticles' 
  | 'CategoryGrid' 
  | 'BlueSection' 
  | 'GreenSection' 
  | 'PinkSection' 
  | 'YellowSection' 
  | 'InfoGrid' 
  | 'MuayThai';

export enum SectionType {
  TRANSPORT = 'TRANSPORT',
  ARCHITECTURE = 'ARCHITECTURE',
  CULTURE = 'CULTURE',
  RELIGION = 'RELIGION',
  SPORT = 'SPORT'
}
