import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ticker from './Ticker';

interface CardProps {
  title: string;
  image: string;
  hasSticker?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, image, hasSticker, className = '', onClick }) => (
  <div onClick={onClick} className={`relative h-[580px] group cursor-pointer border-black ${className}`}>
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-200">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
        
        {/* Typography */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full text-center z-10 px-2">
            <div className="relative inline-block">
                <span className="relative font-roboto font-black text-5xl md:text-[54px] text-white uppercase italic tracking-tighter z-20 block leading-none" 
                        style={{ 
                        WebkitTextStroke: '2px black', 
                        paintOrder: 'stroke fill',
                        textShadow: '-5px 5px 0px #000'
                        }}>
                    {title}
                </span>
            </div>
        </div>
    </div>

    {hasSticker && (
        <div className="absolute top-[-20px] right-[-20px] z-50 w-24 h-24 md:w-32 md:h-32 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-spin-slow">
                <path d="M50 0 L60 20 L80 15 L75 35 L95 45 L80 60 L90 80 L65 75 L50 95 L35 75 L10 80 L20 60 L5 45 L25 35 L20 15 L40 20 Z" fill="#FFF500" stroke="black" strokeWidth="2" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pt-2 pl-2">
                <span className="font-roboto font-black text-xl md:text-2xl">๙</span>
            </div>
        </div>
    )}
  </div>
);

interface CategoryGridProps {
  content?: Record<string, string>;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ content }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Top Ticker */}
      <Ticker text="СТАТЬИ" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 border-b-2 border-black">
         <Card 
            title={content?.['category_1_title'] || "ТРАНСПОРТ"} 
            image={content?.['category_1_image'] || "транспорт.jpg"} 
            hasSticker={true}
            // Mobile: z-10 (bottom), Desktop: z-30 (top left)
            className="border-b-2 md:border-b-0 border-r-2 z-10 md:z-30 h-[300px] md:h-[580px]"
            onClick={() => navigate(`/category/${content?.['category_1_title'] || 'Транспорт'}`)}
         />
         <Card 
            title={content?.['category_2_title'] || "БУДДИЗМ"} 
            image={content?.['category_2_image'] || "буддизм.jpg"} 
            hasSticker={true}
            // Mobile: z-20 (middle), Desktop: z-20 (middle)
            className="border-b-2 md:border-b-0 md:border-r-2 z-20 md:z-20 h-[300px] md:h-[580px]"
            onClick={() => navigate(`/category/${content?.['category_2_title'] || 'Буддизм'}`)}
         />
         <Card 
            title={content?.['category_3_title'] || "АРХИТЕКТУРА"} 
            image={content?.['category_3_image'] || "архитектура.jpg"} 
            hasSticker={true}
            // Mobile: z-30 (top), Desktop: z-10 (bottom right)
            className="border-r-2 md:border-r-0 col-span-2 md:col-span-1 z-30 md:z-10 h-[300px] md:h-[580px]" 
            onClick={() => navigate(`/category/${content?.['category_3_title'] || 'Архитектура'}`)}
         />
      </div>
    </div>
  );
};

export default CategoryGrid;