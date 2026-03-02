import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ThaiPatternVertical from './ThaiPatternVertical';

interface Block {
  id: number;
  type: 'text' | 'image' | 'quote' | 'heading' | 'test';
  content: string;
  orderIndex: number;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  excerpt: string;
  createdAt: string;
  blocks: Block[];
}

const ArticlePage: React.FC = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="p-20 text-center font-bold text-2xl">Загрузка...</div>;
  if (!article) return <div className="p-20 text-center font-bold text-2xl">Статья не найдена</div>;

  // Group blocks by heading for the two-column layout
  const groupedBlocks: { heading: Block | null, content: Block[] }[] = [];
  let currentGroup: { heading: Block | null, content: Block[] } = { heading: null, content: [] };

  article.blocks.forEach(block => {
    if (block.type === 'heading') {
      if (currentGroup.heading || currentGroup.content.length > 0) {
        groupedBlocks.push(currentGroup);
      }
      currentGroup = { heading: block, content: [] };
    } else {
      currentGroup.content.push(block);
    }
  });
  if (currentGroup.heading || currentGroup.content.length > 0) {
    groupedBlocks.push(currentGroup);
  }

  return (
    <article className="w-full bg-[#fbfbfb] flex flex-col min-h-screen font-roboto">
      {/* Top Navigation */}
      <div className="p-6 border-b-2 border-black flex justify-between items-center bg-white">
        <Link to="/" className="inline-flex items-center gap-2 font-bold hover:text-thai-magenta transition-colors italic">
          <ArrowLeft size={20} /> Назад
        </Link>
        <span className="font-black italic uppercase text-xl">{article.category}</span>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* Left Column: Title & Pattern */}
        <div className="w-full md:w-[35%] lg:w-[30%] border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col bg-white">
          <div className="p-8 lg:p-12 flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase leading-[0.9] tracking-tight break-words">
              {article.title}
            </h1>
            <p className="mt-6 text-gray-500 font-medium italic">
              {new Date(article.createdAt).toLocaleDateString('ru-RU')}
            </p>
          </div>
          {/* Decorative Pattern at the bottom of the left column */}
          <div className="hidden md:flex justify-center items-end overflow-hidden border-t-2 border-black bg-thai-yellow h-[400px] relative">
             <ThaiPatternVertical className="w-full h-full object-cover opacity-80" fill="#000" />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="w-full md:w-[65%] lg:w-[70%] flex flex-col bg-white">
          
          {article.coverImage && (
            <div className="w-full border-b-2 border-black">
              <img src={article.coverImage} alt={article.title} className="w-full h-[40vh] md:h-[60vh] object-cover" />
            </div>
          )}

          <div className="flex flex-col">
            {groupedBlocks.map((group, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row border-b-2 border-black last:border-b-0">
                
                {/* Heading Cell */}
                <div className="w-full lg:w-1/3 p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-[#fbfbfb]">
                  {group.heading ? (
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase leading-tight">
                      {group.heading.content}
                    </h2>
                  ) : (
                    <div className="hidden lg:block h-full"></div>
                  )}
                </div>

                {/* Content Cell */}
                <div className="w-full lg:w-2/3 p-8 lg:p-12 space-y-8 text-lg md:text-xl leading-relaxed font-medium italic">
                  {group.content.map((block) => {
                    switch (block.type) {
                      case 'text':
                        return <div key={block.id} className="prose prose-lg max-w-none font-roboto font-normal not-italic" dangerouslySetInnerHTML={{ __html: block.content }} />;
                      case 'image':
                        return (
                          <div key={block.id} className="my-8 border-2 border-black shadow-hard-sm">
                            <img src={block.content} alt="" className="w-full h-auto block" />
                          </div>
                        );
                      case 'quote':
                        return (
                          <blockquote key={block.id} className="border-l-4 border-thai-magenta pl-6 py-2 my-8 text-2xl md:text-3xl font-black italic uppercase leading-tight">
                            «{block.content}»
                          </blockquote>
                        );
                      case 'test':
                        return (
                          <div key={block.id} className="my-8 p-8 border-4 border-black bg-thai-pink/10 text-center">
                            <h3 className="text-3xl font-black italic uppercase mb-4 text-thai-magenta">Интерактивный тест</h3>
                            <p className="font-roboto font-normal not-italic mb-6 text-xl">Проверьте свои знания, пройдя этот тест!</p>
                            <Link 
                              to="/test" 
                              className="inline-block px-8 py-4 bg-black text-white font-black italic uppercase text-xl hover:bg-thai-magenta transition-colors border-2 border-transparent hover:border-black shadow-hard-sm"
                            >
                              Пройти тест
                            </Link>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Bottom Decorative Bar */}
      <div className="h-16 md:h-24 bg-thai-green border-t-2 border-black w-full overflow-hidden flex items-center justify-center relative">
         {/* Repeating pattern horizontally */}
         <div className="absolute inset-0 flex items-center justify-around opacity-30">
            <ThaiPatternVertical className="h-48 w-auto transform rotate-90" fill="#000" />
            <ThaiPatternVertical className="h-48 w-auto transform rotate-90" fill="#000" />
            <ThaiPatternVertical className="h-48 w-auto transform rotate-90" fill="#000" />
            <ThaiPatternVertical className="h-48 w-auto transform rotate-90" fill="#000" />
            <ThaiPatternVertical className="h-48 w-auto transform rotate-90" fill="#000" />
         </div>
      </div>
    </article>
  );
};

export default ArticlePage;
