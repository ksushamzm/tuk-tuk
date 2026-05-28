import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ticker from './Ticker';
import { useSiteContent } from '../context/SiteContentContext';

interface CardProps {
  title: string;
  description?: string;
  image: string;
  hasSticker?: boolean;
  stickerIcon?: string;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, image, hasSticker, stickerIcon, className = '', onClick }) => (
  <button onClick={onClick} className={`relative group cursor-pointer border-black flex flex-col bg-transparent p-0 text-left w-full ${className}`}>
    {/* Image */}
    <div className="relative overflow-hidden h-[220px] md:h-[380px] shrink-0">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
    </div>

    {/* White Card */}
    <div className="bg-white border-t-2 border-black p-5 md:p-7 flex flex-col justify-between flex-1">
      <div>
        <h3 className="font-roboto font-black italic text-lg md:text-[22px] uppercase leading-tight mb-3 group-hover:text-thai-magenta transition-colors line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="font-roboto italic text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">{description}</p>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2 font-bold uppercase text-sm tracking-wider group-hover:gap-4 transition-all">
        Читать далее <span>→</span>
      </div>
    </div>

    {hasSticker && stickerIcon && (
      <div className="absolute top-[-20px] right-[-20px] z-50 w-32 h-32 md:w-40 md:h-40 pointer-events-none">
        <img src={stickerIcon} alt="" className="w-full h-full object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
      </div>
    )}
  </button>
);

const CategoryGrid: React.FC = () => {
  const navigate = useNavigate();
  const { content } = useSiteContent();

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Top Ticker */}
      <Ticker text="СТАТЬИ" large className="bg-[#0EA5E9]" />

      <div className="grid grid-cols-2 md:grid-cols-3 border-b-2 border-black">
        <Card
          title={content['category_1_title'] || "САМЫЕ ПОПУЛЯРНЫЕ ТРАДИЦИОННЫЕ ТАЙСКИЕ НАРЯДЫ"}
          description={content['category_1_description'] || "В Таиланде особенно важна культура..."}
          image={content['category_1_image'] || "/images/транспорт.jpg"}
          hasSticker={true}
          stickerIcon="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Clothes.png"
          className="border-b-2 md:border-b-0 border-r-2 z-10 md:z-30"
          onClick={() => navigate('/category/этика')}
        />
        <Card
          title={content['category_2_title'] || "ТРАДИЦИОННЫЕ ЭЛЕМЕНТЫ В ХРАМОВЫХ КОМПЛЕКСАХ"}
          description={content['category_2_description'] || "В тайских храмовых комплексах..."}
          image={content['category_2_image'] || "/images/буддизм.jpg"}
          hasSticker={true}
          stickerIcon="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Architecture.png"
          className="border-b-2 md:border-b-0 md:border-r-2 z-20 md:z-20"
          onClick={() => navigate('/category/архитектура')}
        />
        <Card
          title={content['category_3_title'] || "КАКИЕ ПРОЦЕДУРЫ СТОИТ ПОСЕТИТЬ ИМЕННО ВАМ?"}
          description={content['category_3_description'] || "Аюрведа очень популярна в Таиланде..."}
          image={content['category_3_image'] || "/images/архитектура.jpg"}
          hasSticker={true}
          stickerIcon="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Ayurveda.png"
          className="border-r-2 md:border-r-0 col-span-2 md:col-span-1 z-30 md:z-10"
          onClick={() => navigate('/category/аюрведа')}
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
