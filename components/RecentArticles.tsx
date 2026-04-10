import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Ticker from './Ticker';

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  excerpt: string;
}

const RecentArticles: React.FC<{ content?: Record<string, string> }> = ({ content }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        // Take the first 3 articles
        setArticles(data.slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (articles.length === 0) return null;

  return (
    <div className="w-full bg-white flex flex-col">
      <Ticker text={content?.['recent_articles_ticker'] || "НОВЫЕ СТАТЬИ"} direction="left" className="bg-thai-cyan" />
      
      <div className="grid grid-cols-2 lg:grid-cols-3 border-b-2 border-black">
        {articles.map((article, index) => (
          <Link 
            key={article.id} 
            to={`/article/${article.slug}`}
            className={`group relative flex flex-col border-black bg-white hover:bg-gray-50 transition-colors
              ${index !== articles.length - 1 ? 'border-r-2' : ''}
              ${index === 2 ? 'col-span-2 lg:col-span-1 border-t-2 lg:border-t-0' : ''}
            `}
          >
            {/* Image Container */}
            <div className="aspect-[4/3] w-full overflow-hidden border-b-2 border-black relative">
              {article.coverImage ? (
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="font-roboto font-bold text-gray-400">NO IMAGE</span>
                </div>
              )}
              
              {/* Category Tag */}
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-roboto font-bold uppercase text-sm border-2 border-white shadow-hard-sm">
                {article.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-roboto font-black italic text-2xl uppercase leading-tight mb-4 group-hover:text-thai-magenta transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <p className="font-roboto text-gray-600 line-clamp-4 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              
              <div className="mt-6 flex items-center gap-2 font-bold uppercase text-sm tracking-wider group-hover:gap-4 transition-all">
                Читать далее <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentArticles;
