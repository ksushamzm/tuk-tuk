
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TukTukLogo from './TukTukLogo';
import ThaiPinkPattern from './ThaiPinkPattern';

interface HeroProps {
  content?: Record<string, string>;
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const navigate = useNavigate();

  const title = content?.['hero_title'] || 'МЕДИА-ЖУРНАЛ \n О КУЛЬТУРЕ ТАИЛАНДА';
  const linkText = content?.['hero_link_text'] || 'От храмов до небоскрёбов: \n архитектура Таиланда';
  const heroImage = content?.['hero_image'] || '/images/hero.jpg';

  return (
    <div className="w-full bg-white flex flex-col lg:flex-row border-b-2 border-black">
      
      {/* Column 1 (Left): 482px width on desktop */}
      <div className="w-full lg:w-[482px] border-b-2 lg:border-b-0 lg:border-r-2 border-black flex flex-col shrink-0">
        
        {/* Logo Block */}
        <div className="h-[300px] lg:h-[415px] border-b-2 border-black relative flex items-center justify-center bg-white shrink-0 overflow-hidden">
           <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative flex items-center justify-center w-full h-full px-8">
                     <TukTukLogo 
                       className="w-full h-auto max-h-[85%]" 
                       style={{ filter: 'drop-shadow(-10px 10px 0px #000)' }} 
                     />
                     {/* Media Text Overlay for Logo */}
                     <div className="absolute bottom-[18%] right-[8%] z-10">
                        <span className="font-roboto italic font-black text-4xl lg:text-[58px] text-white uppercase tracking-tight select-none block leading-none"
                              style={{ 
                                WebkitTextStroke: '2px black', 
                                paintOrder: 'stroke fill',
                                textShadow: '-5px 4px 0px #000' 
                              }}>
                          МЕДИА
                        </span>
                     </div>
                </div>
           </div>
        </div>
        
        {/* Shrine Image */}
        <div className="h-[300px] lg:h-[535px] relative overflow-hidden bg-gray-100 shrink-0">
           <img 
            src="/images/right1.png" 
            alt="Thai Shrine" 
            className="w-full h-full object-cover"
           />
        </div>
      </div>

      {/* Right Wrapper: 958px width on desktop */}
      <div className="flex-1 lg:w-[958px] flex flex-col min-w-0">
         
         {/* Row 1: Title Block */}
         <div className="py-12 lg:py-0 lg:h-[214px] border-b-2 border-black flex items-center justify-center bg-white px-4 shrink-0">
           <h2 className="font-roboto italic font-medium text-3xl md:text-4xl lg:text-[58px] lg:leading-[65px] text-center uppercase text-black whitespace-pre-line">
             {title}
           </h2>
         </div>

                  {/* Sticker ИНТЕРЕСНОЕ */}
                  <div className="absolute top-4 right-4 md:top-[30px] md:right-[140px] z-20">
                     <span className="font-roboto italic font-black text-3xl md:text-[42px] uppercase text-white tracking-normal block leading-none"
                           style={{ 
                             WebkitTextStroke: '2px black', 
                             paintOrder: 'stroke fill',
                             textShadow: '4px 4px 0px #000' 
                           }}>
                       ИНТЕРЕСНОЕ
                     </span>
                  </div>

         {/* Row 2: Split Pink Strip and Hero Content */}
         <div className="flex-1 flex flex-col md:flex-row lg:h-[736px]">
            
            {/* Pink Strip */}
            <div className="w-full h-24 md:h-auto md:w-24 lg:w-[140px] border-b-2 md:border-b-0 md:border-r-2 border-black shrink-0 overflow-hidden bg-[#FF008C] relative">
               <ThaiPinkPattern className="absolute top-0 left-0 w-full h-full object-cover lg:object-fill" />
            </div>

            {/* Hero Content Area */}
            <div className="flex-1 lg:w-[818px] flex flex-col min-w-0 relative">
               
               {/* Hero Image Area */}
               <div className="flex-1 lg:h-[596px] relative bg-gray-200 overflow-hidden border-b-2 border-black min-h-[400px]">
                  <img 
                    src={heroImage} 
                    alt="Hero" 
                    className="w-full h-full object-cover object-top"
                  />
                  


                  {/* Sticker Thai Symbol ๙ (Number 9) */}
                  <div className="absolute top-[-20px] right-[-20px] md:top-[-30px] md:right-[-30px] z-30 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] md:drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] animate-spin-slow">
                        <path d="M50 0 L58 18 L78 12 L73 31 L93 38 L80 52 L90 71 L70 68 L58 87 L48 71 L25 78 L33 58 L12 55 L28 41 L18 20 L40 25 Z" fill="#FFE600" stroke="black" strokeWidth="2" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center pt-2 pr-2 md:pt-4 md:pr-4">
                        <span className="font-roboto font-black text-4xl md:text-6xl text-black">๙</span>
                      </div>
                  </div>
               </div>

               {/* Bottom Link */}
               <div 
                 onClick={() => navigate('/category/Архитектура')}
                 className="py-6 lg:py-0 lg:h-[140px] bg-[#FFFAFA] flex items-center justify-between px-6 md:px-10 hover:bg-gray-50 transition-colors cursor-pointer group shrink-0 relative border-black"
               >
                   <span className="font-roboto italic font-normal text-xl md:text-2xl lg:text-[32px] leading-tight text-black group-hover:translate-x-2 transition-transform whitespace-pre-line">
                     {linkText}
                   </span>
                   <div className="transition-transform group-hover:scale-110 shrink-0 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[55px] md:h-[55px]"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                   </div>
               </div>

            </div>
         </div>

      </div>
    </div>
  );
};

export default Hero;
