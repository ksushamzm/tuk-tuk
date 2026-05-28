import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import CategoryGrid from './CategoryGrid';
import InfoGrid from './InfoGrid';
import MuayThai from './MuayThai';
import GreenSection from './GreenSection';
import BlueSection from './BlueSection';
import PinkSection from './PinkSection';
import YellowSection from './YellowSection';
import RecentArticles from './RecentArticles';
import { useSiteContent } from '../context/SiteContentContext';
import { useSafeJsonParse } from '../hooks/useSafeJson';

const Home: React.FC = () => {
  const { content, loading } = useSiteContent();
  const navigate = useNavigate();

  const blocks = useSafeJsonParse<string[]>(
    content['home_blocks'],
    ['Hero', 'RecentArticles', 'CategoryGrid', 'BlueSection', 'InfoGrid', 'MuayThai', 'GreenSection']
  );

  if (loading) return <div className="p-20 text-center font-bold text-2xl">Загрузка...</div>;

  return (
    <>
      {blocks.map((block: string, index: number) => {
        switch (block) {
          case 'Hero':
            return <Hero key={`${block}-${index}`} />;
          case 'RecentArticles':
            return <RecentArticles key={`${block}-${index}`} />;
          case 'CategoryGrid':
            return <CategoryGrid key={`${block}-${index}`} />;
          case 'BlueSection':
            return <BlueSection key={`${block}-${index}`} />;
          case 'GreenSection':
            return <GreenSection key={`${block}-${index}`} />;
          case 'PinkSection':
            return <PinkSection key={`${block}-${index}`} />;
          case 'YellowSection':
            return <YellowSection key={`${block}-${index}`} />;
          case 'InfoGrid':
            return <InfoGrid key={`${block}-${index}`} content={content} onTestClick={() => navigate('/test')} />;
          case 'MuayThai':
            return <MuayThai key={`${block}-${index}`} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default Home;
