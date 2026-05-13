import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { articlesData, ArticleLayoutData } from '../data/articlesData';
import ArticleTemplate1 from './ArticleTemplate1';
import ArticleTemplate2 from './ArticleTemplate2';
import ArticleTemplate3 from './ArticleTemplate3';
import { categoriesData } from '../data/categoriesData';

const ArticlePage: React.FC = () => {
  const { slug } = useParams();
  const articleId = slug?.toLowerCase() || '';
  
  // First try static data
  const staticData = articlesData[articleId];
  
  const [dynamicData, setDynamicData] = useState<ArticleLayoutData | null>(null);
  const [loading, setLoading] = useState(!staticData);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    // If no static data, try API
    if (!staticData && slug) {
      fetch(`/api/template-articles/${encodeURIComponent(slug)}`)
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then(data => {
          if (data.error) throw new Error(data.error);
          // Convert API format to ArticleLayoutData format
          const layoutData: ArticleLayoutData = {
            id: data.id,
            categoryId: data.categoryId,
            templateId: data.templateId,
            title: data.title,
            blocks: {
              section1Title: data.section1Title,
              section1Text: data.section1Text || [],
              image1: data.image1,
              image2: data.image2,
              section2Title: data.section2Title,
              section2Text: data.section2Text || [],
            },
          };
          setDynamicData(layoutData);
          setLoading(false);
        })
        .catch(() => {
          setNotFound(true);
          setLoading(false);
        });
    }
  }, [slug, staticData]);

  const data = staticData || dynamicData;

  if (loading) {
    return (
      <div className="w-full bg-white flex flex-col min-h-[80vh] p-8 md:p-16 items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!data || notFound) {
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
      {/* Render the proper template based on templateId */}
      {data.templateId === 1 && <ArticleTemplate1 data={data} />}
      {data.templateId === 2 && <ArticleTemplate2 data={data} />}
      {data.templateId === 3 && <ArticleTemplate3 data={data} />}
    </div>
  );
};

export default ArticlePage;
