import React from 'react';
import { ArticleLayoutData } from '../data/articlesData';
import { categoriesData } from '../data/categoriesData';
import ThaiPatternVertical from './ThaiPatternVertical';
import GreenSection from './GreenSection';
import YellowSection from './YellowSection';

interface Props {
  data: ArticleLayoutData;
}

const ArticleTemplate1: React.FC<Props> = ({ data }) => {
  const category = categoriesData[data.categoryId];
  const starIcon = category?.starIcon;

  const fixHangingPrepositions = (text: string) => {
    if (!text) return '';
    return text.replace(/\b(в|и|к|о|с|у|а|от|из|за|по|на|до|об|со|во|ко|но|бы|ли|же|да)\s+/gi, '$1\u00A0');
  };

  return (
    <div className="w-full bg-white font-roboto overflow-hidden">
      
      {/* Article Header */}
      <div className="flex border-b-2 border-black min-h-[80px] relative bg-white">
        <div className="w-[85%] md:w-[80%] flex items-center p-[14px] md:p-[2vw] relative z-20">
          <h1 className="text-[18px] md:text-[2.2vw] font-normal italic leading-tight">
            {fixHangingPrepositions(data.title)}
          </h1>
        </div>
        <div className="w-[15%] md:w-[20%] relative flex justify-end items-center md:pr-8 border-l-2 md:border-l-0 border-transparent">
          {/* Star overlaps down into the content to match design */}
          <img 
            src={starIcon || 'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Buddhism.png'} 
            alt="Category Star" 
            className="absolute right-4 md:right-[3vw] bottom-0 translate-y-1/2 w-[80px] md:w-[130px] object-contain drop-shadow-md z-30 pointer-events-none" 
          />
        </div>
      </div>

      {/* Row 1: Section 1 (Title + Text) */}
      <div className="flex flex-col border-b-2 border-black relative bg-white">
        <div className="w-[55%] md:w-1/2 p-[14px] md:p-[3vw] bg-white pt-4 md:pt-[3vw]">
          <h2 className="text-[22px] md:text-[4vw] font-medium uppercase italic leading-[1] relative z-20 md:whitespace-nowrap">
            {fixHangingPrepositions(data.blocks.section1Title || '')}
          </h2>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-[60%] md:w-1/2 p-[14px] md:p-[3vw] bg-white pt-0 md:pt-0">
            <div className="text-[18px] md:text-[2.2vw] font-normal italic leading-[1.3] text-black max-w-[95%]">
              {data.blocks.section1Text?.map((p, i) => {
                const isBullet = p.trim().startsWith('•');
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

      {/* Row 2: Photo | Yellow Section | Photo */}
      <div className="flex flex-col md:flex-row border-b-2 border-black h-auto md:h-[35vw] bg-white overflow-hidden">
        <div className="w-full md:w-[33.19%] border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden h-[488px] md:h-full">
          <img src={data.blocks.image1} className="w-full h-full object-cover" alt="" />
        </div>
        
        {/* Yellow Section with Pattern */}
        <div className="w-full h-[142px] md:h-full md:w-[9.86%] border-b-2 md:border-b-0 md:border-r-2 border-black">
          <YellowSection />
        </div>

        <div className="w-full md:w-[56.81%] overflow-hidden h-[287px] md:h-full">
          <img src={data.blocks.image2} className="w-full h-full object-cover" alt="" />
        </div>
      </div>

      {/* Row 3: Section 2 (Title + Text) */}
      <div className="flex flex-col border-b-2 border-black relative bg-white">
        <div className="w-[60%] md:w-1/2 p-[14px] md:p-[3vw] bg-white">
          <h2 className="text-[22px] md:text-[4vw] font-medium uppercase italic leading-[1] relative z-20">
            {fixHangingPrepositions(data.blocks.section2Title || '')}
          </h2>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-[65%] md:w-1/2 p-[14px] md:p-[3vw] bg-white pt-0 md:pt-0">
            <div className="text-[18px] md:text-[2.2vw] font-normal italic leading-[1.3] text-black max-w-[95%]">
              {data.blocks.section2Text?.map((p, i) => {
                const isBullet = p.trim().startsWith('•');
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

export default ArticleTemplate1;
