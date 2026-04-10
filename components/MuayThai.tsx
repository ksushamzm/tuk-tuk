import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MuayThaiProps {
  content?: Record<string, string>;
}

const MuayThai: React.FC<MuayThaiProps> = ({ content }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/category/Спорт')}
      className="w-full bg-white border-b-2 border-black grid grid-cols-1 md:grid-cols-3 min-h-[537px] cursor-pointer group"
    >
      
      {/* Left Text Content (Spans 2 columns) */}
      <div className="md:col-span-2 p-12 md:p-16 flex flex-col justify-start relative border-b-2 md:border-b-0 md:border-r-2 border-black">
         <h2 className="font-roboto font-black italic text-5xl md:text-6xl uppercase mb-8 leading-tight text-white tracking-wide group-hover:text-thai-magenta transition-colors"
             style={{ 
               WebkitTextStroke: '2px black', 
               paintOrder: 'stroke fill',
               textShadow: '4px 4px 0px #000' 
             }}>
           {content?.['muay_thai_title'] || 'ТАЙСКИЙ БОКС'}
         </h2>
         
         <div className="max-w-2xl mt-4">
           <p className="font-roboto font-normal italic text-2xl md:text-[32px] leading-snug text-black whitespace-pre-line">
             {content?.['muay_thai_text'] || 'Интервью с выдающейся тайской боксершей, которая достигла значительных успехов в мире муай тай. Мы расскажем о её пути в спорт, начиная с раннего возраста, когда она впервые познакомилась с боевыми искусствами.'}
           </p>
         </div>

         <div className="absolute bottom-8 right-8 group-hover:translate-x-2 transition-transform">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NSIgaGVpZ2h0PSI1NSIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNSAxMmgyNDQgbTctNyA3IDctNyA3IiB0cmFuc2Zvcm09InNjYWxlKDAuMDUpIi8+PHBhdGggZD0iTTUgMTJoMTQiIC8+PHBhdGggZD0ibTEyIDUgNyA3LTcgNyIgLz48L3N2Zz4=" alt="arrow" className="w-16 h-16" />
         </div>
         
         {/* Decoration Sticker */}
         <div className="absolute bottom-8 left-8 w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-spin-slow">
               <path d="M50 0 L60 20 L80 15 L75 35 L95 45 L80 60 L90 80 L65 75 L50 95 L35 75 L10 80 L20 60 L5 45 L25 35 L20 15 L40 20 Z" fill="#FFF500" stroke="black" strokeWidth="2" />
            </svg>
         </div>
      </div>

      {/* Right Image (Spans 1 column) */}
      <div className="md:col-span-1 relative h-[500px] md:h-auto overflow-hidden">
         <img 
           src={content?.['muay_thai_image'] || "/images/боксерша.jpg"} 
           alt="Muay Thai Fighter" 
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         />
      </div>

    </div>
  );
};

export default MuayThai;