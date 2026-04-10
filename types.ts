export interface NavItem {
  label: string;
  href: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

export enum SectionType {
  TRANSPORT = 'TRANSPORT',
  ARCHITECTURE = 'ARCHITECTURE',
  CULTURE = 'CULTURE',
  RELIGION = 'RELIGION',
  SPORT = 'SPORT'
}