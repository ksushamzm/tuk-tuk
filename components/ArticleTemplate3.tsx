import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleLayoutData } from '../data/articlesData';
import { categoriesData } from '../data/categoriesData';
import ThaiPatternVertical from './ThaiPatternVertical';
import GreenSection from './GreenSection';
import YellowSection from './YellowSection';

interface Props {
  data: ArticleLayoutData;
}

const ArticleTemplate3: React.FC<Props> = ({ data }) => {
  const category = categoriesData[data.categoryId];
  const starIcon = category?.starIcon;

  const fixHangingPrepositions = (text: string) => {
    if (!text) return '';
    return text.replace(/\b(в|и|к|о|с|у|а|от|из|за|по|на|до|об|со|во|ко|но|бы|ли|же|да)\s+/gi, '$1\u00A0');
  };

  const ArrowIcon = () => (
    <svg viewBox="0 0 42 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] md:w-[3.5vw] h-auto rotate-180">
      <path d="M41.7071 8.70711C42.0976 8.31658 42.0976 7.68342 41.7071 7.29289L35.3431 0.928932C34.9526 0.538408 34.3195 0.538408 33.9289 0.928932C33.5384 1.31946 33.5384 1.95262 33.9289 2.34315L39.5858 8L33.9289 13.6569C33.5384 14.0474 33.5384 14.6805 33.9289 15.0711C34.3195 15.4616 34.9526 15.4616 35.3431 15.0711L41.7071 8.70711ZM0 9H41V7H0V9Z" fill="black" />
    </svg>
  );

  return (
    <div className="w-full bg-white font-roboto overflow-hidden">
      
      {/* Back to Category Button */}
      <Link 
        to={`/category/${data.categoryId}`}
        className="flex items-center gap-4 p-[14px] md:p-[2vw] border-b-2 border-black hover:bg-thai-yellow/10 transition-colors group"
      >
        <ArrowIcon />
        <span className="text-[18px] md:text-[2.2vw] font-normal italic">К категории</span>
      </Link>

      {/* Article Header */}
      <div className="flex border-b-2 border-black min-h-[80px] relative bg-white">
        <div className="w-[85%] md:w-[80%] flex items-center p-[14px] md:p-[2vw] relative z-20">
          <h1 className="text-[18px] md:text-[2.2vw] font-normal italic leading-tight">
            {fixHangingPrepositions(data.title)}
          </h1>
        </div>
        <div className="w-[15%] md:w-[20%] relative flex justify-end items-center md:pr-8 border-l-2 md:border-l-0 border-transparent">
          <img 
            src={starIcon || 'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Buddhism.png'} 
            alt="Category Star" 
            className="absolute right-4 md:right-[3vw] bottom-0 translate-y-1/2 w-[80px] md:w-[130px] object-contain drop-shadow-md z-30 pointer-events-none" 
          />
        </div>
      </div>

      {/* Row 1: Section 1 (Title Header Left + Points Right) */}
      <div className="flex flex-col relative bg-white">
        <div className="w-[85%] md:w-[55%] p-[14px] md:p-[3vw] bg-white pt-10 md:pt-[3vw]">
          <h2 className="text-[28px] md:text-[4vw] font-medium uppercase italic leading-[1] relative z-20">
            {fixHangingPrepositions(data.blocks.section1Title || '')}
          </h2>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-[85%] md:w-1/2 p-[14px] md:p-[3vw] bg-white pt-2 md:pt-0">
            <div className="text-[18px] md:text-[2.2vw] font-normal italic leading-[1.3] text-black max-w-[95%]">
              {data.blocks.section1Text?.map((p, i) => {
                const isBullet = p.trim().startsWith('•') || p.match(/^\d+\./);
                return (
                  <p key={i} className={isBullet ? "pl-6 md:pl-[2vw] -indent-3 md:-indent-[1vw]" : ""}>
                    {fixHangingPrepositions(p)}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Photo Strip (Proportions specified) */}
      <div className="flex flex-col md:flex-row border-y-2 border-black h-auto md:h-[35vw] bg-white overflow-hidden mt-6">
        {/* Left Photo: 478px -> 33.19% */}
        <div className="w-full md:w-[33.19%] border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden h-[488px] md:h-full">
          <img src={data.blocks.image1} className="w-full h-full object-cover" alt="" />
        </div>
        
        {/* Middle Yellow Section with Pattern */}
        <div className="w-full h-[76px] md:h-full md:w-[9.86%] border-b-2 md:border-b-0 md:border-r-2 border-black bg-thai-yellow flex items-center overflow-hidden">
          <YellowSection vertical />
        </div>

        {/* Right Photo: 818px -> 56.81% */}
        <div className="w-full md:w-[56.81%] overflow-hidden h-[287px] md:h-full">
          <img src={data.blocks.image2} className="w-full h-full object-cover" alt="" />
        </div>
      </div>

      {/* Row 3: Section 2 (Title Lower Left + Points Right) */}
      <div className="flex flex-col relative bg-white pb-10">
        <div className="w-[85%] md:w-[60%] p-[14px] md:p-[3vw] bg-white pt-10 md:pt-[4vw]">
          <h2 className="text-[28px] md:text-[4vw] font-medium uppercase italic leading-[1.1] relative z-20">
            {fixHangingPrepositions(data.blocks.section2Title || '')}
          </h2>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-[85%] md:w-1/2 p-[14px] md:p-[3vw] bg-white pt-2 md:pt-0">
            <div className="text-[18px] md:text-[2.2vw] font-normal italic leading-[1.3] text-black max-w-[95%]">
              {data.blocks.section2Text?.map((p, i) => {
                const isBullet = p.trim().startsWith('•') || p.trim().match(/^\d+\./);
                return (
                  <p key={i} className={isBullet ? "pl-6 md:pl-[2vw] -indent-3 md:-indent-[1vw]" : ""}>
                    {fixHangingPrepositions(p)}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Pattern */}
      <GreenSection />
    </div>
  );
};

export default ArticleTemplate3;
