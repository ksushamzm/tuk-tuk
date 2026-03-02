import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  excerpt: string;
}

const CategoryPage: React.FC = () => {
  const { name } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        // Filter by category
        const filtered = data.filter((a: Article) => a.category.toLowerCase() === name?.toLowerCase());
        setArticles(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [name]);

  return (
    <div className="w-full bg-white flex flex-col min-h-[800px] p-8 md:p-16">
      <Link to="/" className="inline-flex items-center gap-2 font-bold hover:text-thai-magenta transition-colors mb-8">
        <ArrowLeft size={20} /> На главную
      </Link>
      
      <h1 className="font-roboto font-black italic text-5xl md:text-7xl uppercase leading-tight mb-12">
        Категория: {name}
      </h1>

      {loading ? (
        <p className="text-2xl font-bold">Загрузка...</p>
      ) : articles.length === 0 ? (
        <p className="text-2xl font-bold text-gray-500">В этой категории пока нет статей.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              to={`/article/${article.slug}`}
              className="group relative flex flex-col border-2 border-black bg-white hover:bg-gray-50 transition-colors rounded-xl overflow-hidden shadow-hard-sm"
            >
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
              </div>

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
      )}
    </div>
  );
};

export default CategoryPage;
