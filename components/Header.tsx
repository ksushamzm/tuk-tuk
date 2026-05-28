
import React, { useState, useEffect, useRef } from 'react';
import { Search, Mail, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TukTukLogo from './TukTukLogo';
import { articlesData } from '../data/articlesData';

interface HeaderProps {
  onAboutClick?: () => void;
  onHomeClick?: () => void;
  onMailClick?: () => void;
  onMenuClick?: () => void;
}

interface SearchArticle {
  id: string;
  categoryId: string;
  title: string;
  section1Title?: string;
  section1Text: string[];
  section2Title?: string;
  section2Text: string[];
}

// Компонент подсветки найденных ключевых слов в тексте
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  
  // Экранируем специальные символы регулярных выражений
  const escapedHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-thai-yellow text-black font-black uppercase italic px-0.5 select-none">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

const Header: React.FC<HeaderProps> = ({ onAboutClick, onHomeClick, onMailClick, onMenuClick }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<SearchArticle[]>([]);
  const navigate = useNavigate();

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Загрузка статей из API с фолбэком на статические данные
  useEffect(() => {
    // Подготавливаем статические статьи как базовый набор данных
    const staticArticles: SearchArticle[] = Object.entries(articlesData).map(([key, value]) => ({
      id: value.id,
      categoryId: value.categoryId,
      title: value.title,
      section1Title: value.blocks.section1Title,
      section1Text: value.blocks.section1Text || [],
      section2Title: value.blocks.section2Title,
      section2Text: value.blocks.section2Text || [],
    }));
    
    setArticles(staticArticles);

    // Загружаем динамические статьи с API
    fetch('/api/template-articles')
      .then(res => {
        if (!res.ok) throw new Error('API fetch error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const apiArticles: SearchArticle[] = data.map((a: any) => ({
            id: a.id,
            categoryId: a.categoryId,
            title: a.title,
            section1Title: a.section1Title,
            section1Text: a.section1Text || [],
            section2Title: a.section2Title,
            section2Text: a.section2Text || [],
          }));

          setArticles(prev => {
            const merged = [...prev];
            apiArticles.forEach(apiArt => {
              const idx = merged.findIndex(m => m.id.toLowerCase() === apiArt.id.toLowerCase());
              if (idx !== -1) {
                merged[idx] = apiArt; // Обновляем существующие
              } else {
                merged.push(apiArt); // Добавляем новые
              }
            });
            return merged;
          });
        }
      })
      .catch(err => {
        console.warn('Could not load dynamic articles from API, using static data fallback:', err);
      });
  }, []);

  // Фокусировка на поле ввода при открытии
  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  // Закрытие по клику вне области поиска
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Закрытие по кнопке Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchActive(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Алгоритм поиска по статьям
  const filteredArticles = articles.filter(article => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    
    const titleMatch = article.title.toLowerCase().includes(q);
    const categoryMatch = article.categoryId.toLowerCase().includes(q);
    const sec1TitleMatch = article.section1Title?.toLowerCase().includes(q) || false;
    const sec2TitleMatch = article.section2Title?.toLowerCase().includes(q) || false;
    
    const sec1TextMatch = article.section1Text.some(text => text.toLowerCase().includes(q));
    const sec2TextMatch = article.section2Text.some(text => text.toLowerCase().includes(q));

    return titleMatch || categoryMatch || sec1TitleMatch || sec2TitleMatch || sec1TextMatch || sec2TextMatch;
  });

  // Получение сниппета текста, содержащего ключевое слово
  const getSnippet = (article: SearchArticle, query: string) => {
    const q = query.toLowerCase();
    
    for (const text of article.section1Text) {
      const idx = text.toLowerCase().indexOf(q);
      if (idx !== -1) {
        const start = Math.max(0, idx - 40);
        const end = Math.min(text.length, idx + q.length + 60);
        let snippet = text.slice(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        return { snippet };
      }
    }

    for (const text of article.section2Text) {
      const idx = text.toLowerCase().indexOf(q);
      if (idx !== -1) {
        const start = Math.max(0, idx - 40);
        const end = Math.min(text.length, idx + q.length + 60);
        let snippet = text.slice(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        return { snippet };
      }
    }

    return { snippet: '' };
  };

  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`);
    setIsSearchActive(false);
    setSearchQuery('');
  };

  if (isSearchActive) {
    return (
      <header className="w-full bg-white border-b-2 border-black h-[120px] flex items-center justify-between px-8 relative z-[60]" ref={searchRef}>
        <div className="w-full flex items-center gap-4 relative h-full">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ПОИСК СТАТЬИ..."
            className="flex-1 bg-transparent border-0 outline-none text-3xl md:text-4xl font-black italic uppercase placeholder:text-gray-300 placeholder:italic text-black font-roboto h-full"
          />
          <div className="flex items-center gap-2">
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="hover:opacity-60 transition-opacity text-black p-2 animate-fade-in"
                title="Очистить"
              >
                <X size={28} strokeWidth={2} />
              </button>
            )}
            <button 
              onClick={() => setIsSearchActive(false)}
              className="hover:opacity-60 transition-opacity text-black p-2"
              title="Закрыть поиск"
            >
              <Search size={36} strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Полноширинная панель результатов */}
        {searchQuery.trim().length > 0 && (
          <div className="absolute top-[118px] right-0 left-0 bg-white border-b-2 border-black shadow-hard z-[100] max-h-[500px] overflow-y-auto no-scrollbar">
            {filteredArticles.length > 0 ? (
              <div className="flex flex-col divide-y-2 divide-black">
                {filteredArticles.map((article) => {
                  const { snippet } = getSnippet(article, searchQuery);
                  return (
                    <button
                      key={article.id}
                      onClick={() => handleArticleClick(article.id)}
                      className="w-full text-left p-6 hover:bg-thai-cyan/10 transition-colors flex flex-col gap-2 bg-white"
                    >
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span className="bg-black text-white text-xs font-black uppercase px-3 py-1 border-2 border-black shadow-hard-sm">
                          {article.categoryId}
                        </span>
                        <span className="text-sm text-black font-bold uppercase tracking-wider">Читать статью →</span>
                      </div>
                      <h4 className="font-roboto font-black italic text-xl md:text-2xl uppercase leading-tight text-black mt-1">
                        <HighlightText text={article.title} highlight={searchQuery} />
                      </h4>
                      {snippet && (
                        <p className="font-roboto text-base text-gray-600 line-clamp-2 italic leading-relaxed pl-3 border-l-4 border-thai-pink mt-1">
                          <HighlightText text={snippet} highlight={searchQuery} />
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center bg-white text-gray-500 font-roboto font-black italic text-lg">
                НИЧЕГО НЕ НАЙДЕНО ПО ЗАПРОСУ "{searchQuery.toUpperCase()}"
              </div>
            )}
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="w-full bg-white border-b-2 border-black h-[120px] flex items-center justify-between px-8 relative z-[60]">
      {/* Left: Menu */}
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="hover:opacity-60 transition-opacity"
        >
           <Menu size={48} strokeWidth={1} />
        </button>
      </div>

      {/* Center: Logo */}
      <button 
        onClick={onHomeClick}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center bg-transparent border-0 p-0 hover:opacity-90 transition-opacity"
        aria-label="На главную"
      >
        <div className="relative flex items-end justify-center">
          <TukTukLogo 
            className="h-16 w-auto" 
            style={{ filter: 'drop-shadow(-4px 4px 0px #000)' }} 
          />
          {/* Media Badge */}
          <span className="absolute -bottom-2 -right-8 text-sm font-black uppercase tracking-widest z-10 text-white select-none italic" 
                style={{ 
                  WebkitTextStroke: '1px black',
                  paintOrder: 'stroke fill',
                  textShadow: '2px 2px 0px #000'
                }}>
            МЕДИА
          </span>
        </div>
      </button>

      {/* Right: Actions */}
      <div className="flex items-center justify-end flex-1 max-w-lg md:max-w-xl ml-8 relative">
        <div className="flex items-center gap-8">
          <button 
            onClick={onAboutClick}
            className="hidden md:block font-roboto text-2xl italic font-normal text-black cursor-pointer hover:underline underline-offset-4 bg-transparent border-0 p-0"
          >
            О журнале
          </button>
          <div className="flex gap-6">
            <button 
              onClick={onMailClick}
              className="hover:opacity-60 transition-opacity animate-fade-in"
            >
              <Mail size={36} strokeWidth={1} />
            </button>
            <button 
              onClick={() => setIsSearchActive(true)}
              className="hover:opacity-60 transition-opacity animate-fade-in"
            >
              <Search size={36} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
