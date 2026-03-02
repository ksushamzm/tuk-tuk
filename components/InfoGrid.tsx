
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ticker from './Ticker';

interface InfoGridProps {
  onTestClick?: () => void;
  content?: Record<string, string>;
}

const InfoGrid: React.FC<InfoGridProps> = ({ onTestClick, content }) => {
  const navigate = useNavigate();

  return (
    <>
    <div className="grid grid-cols-2 lg:grid-cols-3 border-b-2 border-black bg-white">
      
      {/* Column 1: Test (Pink) */}
      <div 
        onClick={onTestClick}
        className="relative h-[300px] md:h-[535px] border-b-2 md:border-b-0 border-r-2 border-black bg-thai-pink overflow-hidden flex flex-col items-center pt-8 group cursor-pointer"
      >
         
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg width="100%" height="100%">
                 <pattern id="pink-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                     <circle cx="2" cy="2" r="2" fill="black" />
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#pink-dots)" />
             </svg>
         </div>

         <div className="relative z-10 w-full text-center mt-6">
           {/* Starburst Effect */}
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] -z-10 animate-spin-slow">
               <svg viewBox="0 0 100 100" className="w-full h-full fill-thai-cyan stroke-black stroke-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <path d="M50 0 L63 25 L90 15 L78 40 L100 55 L75 70 L85 95 L60 82 L45 100 L35 75 L5 80 L25 55 L0 35 L28 28 L20 0 L50 15 Z" />
               </svg>
           </div>
           
           <span className="font-roboto font-black text-7xl uppercase text-white italic transform -rotate-6 inline-block" 
                 style={{ 
                   WebkitTextStroke: '2.5px black', 
                   paintOrder: 'stroke fill',
                   textShadow: '4px 4px 0px #000' 
                 }}>
             ТЕСТ
           </span>
         </div>
         
         <div className="mt-8 relative z-20">
             <span className="bg-black text-white font-roboto font-bold text-xl px-4 py-1 uppercase tracking-widest transform rotate-2 inline-block border-2 border-white">
               Проверь себя
             </span>
         </div>

         <div className="absolute inset-x-0 bottom-0 top-32 transition-transform duration-500 group-hover:scale-105">
            <img 
              src={content?.['info_test_image'] || "https://picsum.photos/seed/thai_dancer_pink/600/800"} 
              alt="Woman with lantern" 
              className="w-full h-full object-contain object-bottom"
            />
         </div>
         
         {/* Corner Sticker */}
         <div className="absolute bottom-6 right-6 z-30 w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-spin-slow">
                <path d="M50 0 L60 20 L80 15 L75 35 L95 45 L80 60 L90 80 L65 75 L50 95 L35 75 L10 80 L20 60 L5 45 L25 35 L20 15 L40 20 Z" fill="#FFF500" stroke="black" strokeWidth="2" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-black text-xl">NEW</span>
            </div>
         </div>
      </div>

      {/* Column 2: Etiquette (White with Custom Window Frame) */}
      <div 
        onClick={() => navigate('/category/Этика')}
        className="relative h-[300px] md:h-[535px] border-b-2 md:border-b-0 md:border-r-2 border-black bg-white flex flex-col items-center justify-between p-0 overflow-hidden group cursor-pointer"
      >
         
         <div className="w-full h-full relative flex items-center justify-center p-4 md:p-8">
            {/* Thai Window Shape SVG Background */}
            <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-[1.02]">
               <svg width="100%" height="100%" viewBox="0 0 482 530" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M481.001 528.116H1.44003L1.00085 157.224C1.00085 157.224 25.9884 150.271 29.3264 138.074C40.7713 96.2534 87.1471 107.786 87.1471 107.786C84.8541 97.3556 94.9716 85.6014 103.764 78.8686C110.598 73.6337 118.774 69.6971 127.698 67.3917C139.924 64.2313 154.241 63.4957 166.599 66.5215C168.276 66.9323 169.963 67.3766 171.552 67.9776C172.361 68.2874 174.617 69.016 174.908 69.8154C167.574 48.9059 181.952 30.159 209.83 25.351C237.707 20.5431 240.061 0.116211 240.061 0.116211C240.061 0.116211 242.407 20.5512 270.293 25.351C298.171 30.1579 312.557 48.9059 305.215 69.8154C305.495 69.0149 307.762 68.2793 308.569 67.9776C310.159 67.3766 311.846 66.9334 313.524 66.5204C325.881 63.5038 340.198 64.2313 352.424 67.3917C361.339 69.6971 369.525 73.6337 376.359 78.8686C385.15 85.6095 395.268 97.3545 392.975 107.786C392.975 107.786 439.342 96.2453 450.795 138.074C454.133 150.271 480.535 157.502 480.535 157.502L481.001 528.116Z" fill="white" stroke="black" strokeWidth="2"/>
               </svg>
            </div>
            
            <div className="relative z-10 text-center mt-16 md:mt-32">
                <h3 className="font-roboto italic font-normal text-xl md:text-3xl leading-snug text-black whitespace-pre-line">
                  {content?.['info_etiquette_text'] || "На сколько хорошо \nВы знаете тайский этикет?"}
                </h3>
            </div>
            
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10 group-hover:translate-x-2 transition-transform">
               <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NSIgaGVpZ2h0PSI1NSIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNSAxMmgyNDQgbTctNyA3IDctNyA3IiB0cmFuc2Zvcm09InNjYWxlKDAuMDUpIi8+PHBhdGggZD0iTTUgMTJoMTQiIC8+PHBhdGggZD0ibTEyIDUgNyA3LTcgNyIgLz48L3N2Zz4=" alt="arrow" className="w-8 h-8 md:w-12 md:h-12" />
            </div>
         </div>
      </div>

      {/* Column 3: Letter of Day */}
      <div className="relative h-[300px] md:h-[535px] col-span-2 lg:col-span-1 border-t-2 md:border-t-0 border-black bg-white flex flex-col items-center justify-between py-6 md:py-12 group hover:bg-gray-50 transition-colors">
         <div className="text-center">
            <h3 className="font-roboto font-black italic text-3xl md:text-5xl leading-none uppercase text-black">
              БУКВА ДНЯ
            </h3>
         </div>
         
         <div className="relative flex-1 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
             {/* Character */}
             <div className="relative">
                <span className="font-serif text-[100px] md:text-[180px] leading-none text-white" style={{ WebkitTextStroke: '4px black', filter: 'drop-shadow(-6px 4px 0px #000000)' }}>
                  {content?.['info_letter_char'] || "ก"}
                </span>
             </div>
         </div>

         <div className="text-center">
           <p className="font-roboto font-normal text-3xl md:text-5xl leading-none">{content?.['info_letter_char'] || "ก"}</p>
           <p className="font-roboto font-bold italic text-2xl md:text-4xl leading-none uppercase mt-2">{content?.['info_letter_transcription'] || "«ко кай»"}</p>
         </div>
      </div>
    </div>
    
    {/* Bottom Ticker */}
    <Ticker text="ИНТЕРВЬЮ" direction="right" className="bg-[#FFFFFF]" />
    </>
  );
};

export default InfoGrid;
