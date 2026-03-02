
import React from 'react';

interface TickerProps {
  text: string;
  className?: string;
  direction?: 'left' | 'right';
}

const Ticker: React.FC<TickerProps> = ({ text, className = "bg-white", direction = 'left' }) => {
  return (
    <div className={`w-full border-b-2 border-black py-3 overflow-hidden whitespace-nowrap flex select-none ${className}`}>
      <div className={`flex shrink-0 items-center ${direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {Array.from({ length: 15 }).map((_, i) => (
           <React.Fragment key={i}>
             <span className="font-roboto font-normal italic uppercase text-2xl tracking-[0.15em]">
               {text}
             </span>
             <span className="mx-8 text-black/30 font-bold text-2xl select-none">•</span>
           </React.Fragment>
        ))}
      </div>
       <div className={`flex shrink-0 items-center ${direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee'}`} aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
           <React.Fragment key={i}>
             <span className="font-roboto font-normal italic uppercase text-2xl tracking-[0.15em]">
               {text}
             </span>
             <span className="mx-8 text-black/30 font-bold text-2xl select-none">•</span>
           </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
