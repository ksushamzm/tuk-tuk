import React from 'react';
import Ticker from './Ticker';
import { useSiteContent } from '../context/SiteContentContext';

const RecentArticles: React.FC = () => {
  const { content } = useSiteContent();

  return (
    <div className="w-full bg-white flex flex-col">
      <Ticker text={content['recent_articles_ticker'] || "НОВЫЕ СТАТЬИ"} direction="left" className="bg-[#0EA5E9]" large />
    </div>
  );
};

export default RecentArticles;
