
import React from 'react';
import GreenSection from './GreenSection';
import TukTukLogo from './TukTukLogo';

const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-white flex flex-col">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-black">
        
        {/* Left Column (1/3) */}
        <div className="md:col-span-1 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col">
          {/* Logo Box */}
          <div className="h-[415px] border-b-2 border-black relative flex items-center justify-center overflow-hidden bg-white">
             <div className="relative w-full h-full p-6 flex items-center justify-center">
                 <div className="relative flex items-center justify-center border-4 border-black w-full h-full p-4">
                      <div className="relative w-full h-full flex items-center justify-center">
                          <TukTukLogo 
                            className="w-[90%] h-auto" 
                            style={{ filter: 'drop-shadow(-8px 8px 0px #000)' }} 
                          />
                          {/* Media Text Overlay */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full text-center z-10">
                              <span className="font-roboto italic font-black text-6xl text-white uppercase tracking-widest select-none block leading-none"
                                    style={{ 
                                      WebkitTextStroke: '2px black', 
                                      paintOrder: 'stroke fill',
                                      textShadow: '-4px 4px 0px #000' 
                                    }}>
                                МЕДИА
                              </span>
                          </div>
                      </div>
                 </div>
             </div>
          </div>
          
          {/* Shrine Image */}
          <div className="flex-1 min-h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1528181304800-2f140819ad54?auto=format&fit=crop&q=80&w=800" 
              alt="Thai Shrine" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column (2/3) */}
        <div className="md:col-span-2 flex flex-col">
          {/* Title Box */}
          <div className="h-[214px] border-b-2 border-black flex items-center justify-center bg-white px-8">
            <h1 className="font-roboto italic font-medium text-4xl lg:text-6xl text-center uppercase leading-[1.1]">
              МЕДИА-ЖУРНАЛ <br /> О КУЛЬТУРЕ ТАИЛАНДА
            </h1>
          </div>

          {/* Text Content */}
          <div className="flex-1 p-8 md:p-16 bg-white">
            <div className="max-w-4xl space-y-8">
              <p className="font-roboto italic font-normal text-2xl md:text-[28px] leading-relaxed text-black">
                Представьте, что вы садитесь на яркий, украшенный огоньками тук-тук. Заводится мотор, ветерок освежает лицо, и начинается путешествие — не по шумным туристическим улицам, а по неизведанным тропам культурного Таиланда.
              </p>
              <p className="font-roboto italic font-normal text-2xl md:text-[28px] leading-relaxed text-black">
                Добро пожаловать в TukTuk Media — ваш медиа-журнал, который станет таким же аутентичным, быстрым и полным открытий транспортом в мир удивительной страны.
              </p>
              <p className="font-roboto italic font-normal text-2xl md:text-[28px] leading-relaxed text-black">
                Мы не просто рассказываем, мы погружаем. Наши статьи — это звук шелеста монашеских одежд в древнем храме Ват Пхра Сингх и гулкая тишина пещеры в Нанга. Это запах карри «пананг», томящегося на глиняной печи в семейной лавке Чиангмая, и терпкий аромат краски на только что созданной стрит-арт картине в бангкокском переулке.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Ornament Section */}
      <GreenSection />
    </div>
  );
};

export default AboutPage;
