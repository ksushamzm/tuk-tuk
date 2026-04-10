import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { articlesData } from '../data/articlesData';
import ArticleTemplate1 from './ArticleTemplate1';
import ArticleTemplate2 from './ArticleTemplate2';
import ArticleTemplate3 from './ArticleTemplate3';
import { categoriesData } from '../data/categoriesData';

const ArticlePage: React.FC = () => {
  const { slug } = useParams();
  const articleId = slug?.toLowerCase() || '';
  const data = articlesData[articleId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) {
    return (
      <div className="w-full bg-white flex flex-col min-h-[80vh] p-8 md:p-16">
        <Link to="/" className="inline-flex items-center gap-2 font-bold hover:text-thai-magenta transition-colors mb-8">
          <ArrowLeft size={20} /> Вернуться назад
        </Link>
        <h1 className="font-roboto font-black italic text-4xl md:text-6xl uppercase leading-tight mb-8">
          Статья не найдена
        </h1>
        <p className="text-xl font-bold text-gray-500 italic">Скорее всего, контент еще в разработке (ID: {slug}).</p>
      </div>
    );
  }

  const category = categoriesData[data.categoryId];

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* Top Navigation for Article */}
      <div className="p-[14px] md:p-6 border-b-2 border-black flex justify-between items-center bg-white sticky top-0 z-50">
        <Link 
          to={`/category/${data.categoryId}`} 
          className="inline-flex items-center gap-2 text-[14px] md:text-[20px] font-bold hover:text-thai-magenta transition-colors italic"
        >
          <ArrowLeft size={20} /> К категории
        </Link>
        <span className="font-black italic uppercase text-[14px] md:text-xl text-right ml-4">
          {category?.title || data.categoryId}
        </span>
      </div>

      {/* Render the proper template based on templateId */}
      {data.templateId === 1 && <ArticleTemplate1 data={data} />}
      {data.templateId === 2 && <ArticleTemplate2 data={data} />}
      {data.templateId === 3 && <ArticleTemplate3 data={data} />}
    </div>
  );
};

export default ArticlePage;
