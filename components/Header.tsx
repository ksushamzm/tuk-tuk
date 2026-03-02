
import React from 'react';
import { Search, Mail, Menu } from 'lucide-react';
import TukTukLogo from './TukTukLogo';

interface HeaderProps {
  onAboutClick?: () => void;
  onHomeClick?: () => void;
  onMailClick?: () => void;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onHomeClick, onMailClick, onMenuClick }) => {
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
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center" onClick={onHomeClick}>
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
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-8">
        <span 
          onClick={onAboutClick}
          className="hidden md:block font-roboto text-2xl italic font-normal text-black cursor-pointer hover:underline underline-offset-4"
        >
          О журнале
        </span>
        <div className="flex gap-6">
          <button 
            onClick={onMailClick}
            className="hover:opacity-60 transition-opacity"
          >
            <Mail size={36} strokeWidth={1} />
          </button>
          <button className="hover:opacity-60 transition-opacity">
            <Search size={36} strokeWidth={1} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
