
import React from 'react';
import { Link } from 'react-router-dom';
import TukTukLogo from './TukTukLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black min-h-[400px] border-t-2 border-black relative overflow-hidden flex flex-col justify-between p-8 md:p-12 lg:p-16">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start w-full">
         
         {/* Logo Block */}
         <div className="mb-12 md:mb-0">
            <div className="relative flex items-end">
                <TukTukLogo 
                  className="h-32 w-auto" 
                  style={{ filter: 'drop-shadow(-4px 4px 0px #000)' }} 
                />
                {/* Media Badge */}
                <span className="absolute -bottom-1 -right-8 text-xl font-black uppercase tracking-widest z-10 text-white select-none italic" 
                      style={{ 
                          WebkitTextStroke: '1.2px black',
                          paintOrder: 'stroke fill',
                          textShadow: '3px 3px 0px #000'
                      }}>
                  МЕДИА
                </span>
            </div>
         </div>

         {/* Contacts */}
         <div className="text-right flex flex-col gap-2">
            <h3 className="font-roboto italic font-normal text-3xl md:text-4xl leading-tight text-black mb-2">Контакты:</h3>
            <a href="tel:+79200202020" className="font-roboto italic font-normal text-3xl md:text-4xl leading-tight hover: Thai-magenta transition-colors">
               +7(920)020-20-20
            </a>
            <a href="mailto:tuktuk@mail.com" className="font-roboto italic font-normal text-3xl md:text-4xl leading-tight hover: Thai-magenta transition-colors">
               tuktuk@mail.com
            </a>
         </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto pt-16 flex justify-between items-end">
         <p className="font-roboto italic font-normal text-2xl md:text-3xl leading-tight text-black">
           © 2023 Медиа-журнал о культуре Таиланда. <br className="md:hidden" /> Все права защищены.
         </p>
         <Link 
           to="/admin" 
           className="px-4 py-2 bg-black text-white font-bold uppercase text-sm hover:bg-thai-magenta transition-colors rounded-lg shadow-hard-sm" 
           title="Вход для администратора"
         >
           Админ-панель
         </Link>
      </div>

    </footer>
  );
};

export default Footer;
