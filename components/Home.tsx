import React, { useEffect, useState } from 'react';
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

const Home: React.FC = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center font-bold text-2xl">Загрузка...</div>;

  const blocks = JSON.parse(content['home_blocks'] || '["Hero", "RecentArticles", "CategoryGrid", "BlueSection", "InfoGrid", "MuayThai", "GreenSection"]');

  return (
    <>
      {blocks.map((block: string, index: number) => {
        switch (block) {
          case 'Hero':
            return <Hero key={`${block}-${index}`} content={content} />;
          case 'RecentArticles':
            return <RecentArticles key={`${block}-${index}`} content={content} />;
          case 'CategoryGrid':
            return <CategoryGrid key={`${block}-${index}`} content={content} />;
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
            return <MuayThai key={`${block}-${index}`} content={content} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default Home;
