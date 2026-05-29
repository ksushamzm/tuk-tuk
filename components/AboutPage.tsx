
import React from 'react';
import { Link } from 'react-router-dom';
import GreenSection from './GreenSection';
import PinkSection from './PinkSection';
import TukTukLogo from './TukTukLogo';
import ThaiPinkPattern from './ThaiPinkPattern';
const yellowOrnament2 = '/images/yellow_ornament_2.svg';

/* ─── Shared helpers ─── */

const labelStyle: React.CSSProperties = {
  textShadow: '-6px 3px 0px #000',
  WebkitTextStroke: '4px #000',
  paintOrder: 'stroke fill',
};

const PhotoCard: React.FC<{
  src: string;
  label: string;
  className?: string;
  to?: string;
  labelSize?: string;
}> = ({ src, label, className = '', to, labelSize = 'text-3xl md:text-[4vw]' }) => {
  const inner = (
    <>
      <img src={src} alt={label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <span className={`relative z-10 self-end w-full text-right font-roboto font-black italic text-white uppercase tracking-wider ${labelSize}`}
            style={labelStyle}>
        {label}
      </span>
    </>
  );
  const base = `relative overflow-hidden group flex flex-col justify-end p-4 md:p-[2vw] ${className}`;
  return to
    ? <Link to={to} className={base}>{inner}</Link>
    : <div className={base}>{inner}</div>;
};

const StarIcon: React.FC<{ src: string; className?: string }> = ({ src, className = '' }) => (
  <img src={src} alt="" className={`w-32 h-32 md:w-40 md:h-40 object-contain select-none pointer-events-none drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] ${className}`} />
);

/* ─── Page ─── */

const AboutPage: React.FC = () => (
  <div className="w-full bg-white flex flex-col">

    {/* ══════════════════════════════════════════
        MOBILE LAYOUT  (visible below md)
    ══════════════════════════════════════════ */}
    <div className="md:hidden flex flex-col">

      {/* 1. Hero Grid — logo + ornament (top) and title + ornament (bottom) */}
      <div className="border-b-2 border-black grid" style={{ gridTemplateColumns: '88% 12%' }}>
        {/* Left column: Logo + Title */}
        <div className="border-r-2 border-black">
          {/* Logo cell */}
          <div className="border-b-2 border-black bg-white flex items-center justify-center p-4"
               style={{ height: 'clamp(240px, 65vw, 360px)' }}>
            <TukTukLogo className="w-full h-auto max-h-[90%]"
                        style={{ filter: 'drop-shadow(-6px 6px 0px #000)' }} />
          </div>
          {/* Title cell */}
          <div className="px-4 py-3 flex items-center justify-center bg-white">
            <h1 className="font-roboto italic font-medium text-center uppercase leading-tight whitespace-nowrap"
                style={{ fontSize: 'clamp(12px, 4vw, 16px)' }}>
              МЕДИА-ЖУРНАЛ О КУЛЬТУРЕ ТАИЛАНДА
            </h1>
          </div>
        </div>
        {/* Right column: Ornament spanning both rows */}
        <div>
          <ThaiPinkPattern />
        </div>
      </div>

      {/* 2. About paragraphs */}
      <div className="border-b-2 border-black px-5 py-4 bg-white space-y-0">
        <p className="font-roboto italic font-normal text-[17px] leading-snug">
          Представьте, что вы садитесь на яркий, украшенный огоньками тук-тук. Заводится мотор, ветерок освежает лицо, и начинается путешествие — не по шумным туристическим улицам, а по неизведанным тропам культурного Таиланда.
        </p>
        <p className="font-roboto italic font-normal text-[17px] leading-snug">
          Добро пожаловать в TukTuk Media — ваш медиа-журнал, который станет таким же аутентичным, быстрым и полным открытий транспортом в мир удивительной страны.
        </p>
        <p className="font-roboto italic font-normal text-[17px] leading-snug">
          Мы не просто рассказываем, мы погружаем. Наши статьи — это звук шелеста монашеских одежд в древнем храме Ват Пхра Сингх и гулкая тишина пещеры в Нанга. Это запах карри «пананг», томящегося на глиняной печи в семейной лавке Чиангмая, и терпкий аромат краски на только что созданной стрит-арт картине в бангкокском переулке.
        </p>
      </div>

      {/* 3. Float image left — rotated ornament top-right, text wraps continuously */}
      <div className="relative border-b-2 border-black overflow-visible">
        <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Festivals.png"
             alt="" className="absolute top-0 left-[35%] -translate-x-1/2 -translate-y-[40%] w-14 h-14 object-contain pointer-events-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] z-20" />
        <div className="bg-white overflow-hidden">
          <div
            className="float-left border-r-2 border-black overflow-hidden"
            style={{ width: '47%', height: 'clamp(180px, 50vw, 260px)' }}
          >
            <img
              src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Spirituality_3.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="border-b-2 border-black overflow-hidden relative"
            style={{ 
              height: '36px',
              backgroundColor: '#FF008C',
              backgroundImage: `url(${yellowOrnament2})`,
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'center center',
              backgroundSize: 'auto 100%',
            }}
          >
          </div>
          <p className="px-4 pt-2 pb-4 font-roboto italic font-normal text-[17px] leading-snug">
            Медиа-журнал о культуре Таиланда <strong>«TukTuk Media»</strong> — это уникальный проект, посвящённый богатому культурному наследию и современным тенденциям жизни в этой удивительной страны. Журнал охватывает широкий спектр тем, включая тайскую кухню, традиционные искусства, фестивали, музыку и моду, а также современные культурные явления. «TukTuk» предлагает читателям погрузиться в атмосферу Таиланда через увлекательные статьи, интервью с местными художниками и ремесленниками, а также репортажи о значимых событиях.
          </p>
          <div className="clear-both" />
        </div>
      </div>

      {/* 4. Photo row 1: СТАТЬИ | ФОТО */}
      <div className="relative border-b-2 border-black overflow-visible">
        <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Buddhism.png"
             alt="" className="absolute top-0 left-[35%] -translate-x-1/2 -translate-y-[40%] w-14 h-14 object-contain pointer-events-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] z-20" />
        <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Language.png"
             alt="" className="absolute top-0 left-[88%] -translate-x-1/2 -translate-y-[40%] w-14 h-14 object-contain pointer-events-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] z-20" />
        <div className="grid grid-cols-2">
          <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Temples_2.jpg"
                     label="СТАТЬИ" to="/"
                     className="h-[48vw] border-r-2 border-black" />
          <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Festivals_1.jpg"
                     label="ФОТО"
                     className="h-[48vw]" />
        </div>
      </div>

      {/* Pink ornament */}
      <PinkSection />

      {/* 5. Text 1 */}
      <div className="border-b-2 border-black px-5 py-4 bg-white">
        <p className="font-roboto italic font-normal text-[17px] leading-snug">
          Особое внимание уделяется взаимодействию традиций и современности, что позволяет лучше понять, как тайская культура страны развивается и адаптируется к новым реалиям.
        </p>
      </div>

      {/* 6. Photo row 2: ТЕСТЫ | ИСТОРИИ */}
      <div className="relative border-b-2 border-black overflow-visible">
        <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Yoga.png"
             alt="" className="absolute top-0 left-[35%] -translate-x-1/2 -translate-y-[40%] w-14 h-14 object-contain pointer-events-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] z-20" />
        <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Philosophy.png"
             alt="" className="absolute top-0 left-[88%] -translate-x-1/2 -translate-y-[40%] w-14 h-14 object-contain pointer-events-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] z-20" />
        <div className="grid grid-cols-2">
          <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Economy_2.jpg"
                     label="ТЕСТЫ" to="/test"
                     className="h-[48vw] border-r-2 border-black" />
          <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Spirituality_3.jpg"
                     label="ИСТОРИИ"
                     className="h-[48vw]" />
        </div>
      </div>

      {/* 7. Text 2 */}
      <div className="border-b-2 border-black px-5 py-4 bg-white">
        <p className="font-roboto italic font-normal text-[17px] leading-snug">
          С помощью ярких фотографий и интересного контента <strong>«TukTuk Media»</strong> стремится вдохновить читателей на путешествия и открытие новых граней тайской культуры, а также создать платформу для обмена идеями и опытом между людьми из разных уголков мира.
        </p>
      </div>

      {/* 8. Photo row 3: ЛЮДИ | БЫТ */}
      <div className="relative border-b-2 border-black overflow-visible">
        <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Dramatic%20Arts.png"
             alt="" className="absolute top-0 left-[35%] -translate-x-1/2 -translate-y-[40%] w-14 h-14 object-contain pointer-events-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] z-20" />
        <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Tea.png"
             alt="" className="absolute top-0 left-[88%] -translate-x-1/2 -translate-y-[40%] w-14 h-14 object-contain pointer-events-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] z-20" />
        <div className="grid grid-cols-2">
          <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Humor_1.jpg"
                     label="ЛЮДИ"
                     className="h-[48vw] border-r-2 border-black" />
          <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Tea_2.jpg"
                     label="БЫТ"
                     className="h-[48vw]" />
        </div>
      </div>

      {/* 9. Full-width: КУЛЬТУРА */}
      <div className="relative border-b-2 border-black overflow-visible">
        <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Buddhism.png"
             alt="" className="absolute top-0 left-[88%] -translate-x-1/2 -translate-y-[40%] w-14 h-14 object-contain pointer-events-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] z-20" />
        <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Philosophy_1.jpg"
                   label="КУЛЬТУРА"
                   className="h-[60vw]" />
      </div>

      <GreenSection />
    </div>

    {/* ══════════════════════════════════════════
        DESKTOP LAYOUT  (visible from md up)
    ══════════════════════════════════════════ */}
    <div className="hidden md:flex md:flex-col">

      {/* Row 1: Logo col + Title+Text col */}
      <div className="grid grid-cols-3 border-b-2 border-black">

        {/* Left 1/3: logo + shrine */}
        <div className="col-span-1 border-r-2 border-black flex flex-col relative">
          <div className="h-[415px] border-b-2 border-black relative flex items-center justify-center overflow-hidden bg-white">
            <div className="relative w-full h-full flex items-center justify-center px-8">
              <TukTukLogo className="w-full h-auto max-h-[85%]"
                          style={{ filter: 'drop-shadow(-10px 10px 0px #000)' }} />
              <div className="absolute bottom-[18%] right-[8%] z-10">
                <span className="font-roboto italic font-black lg:text-[58px] text-white uppercase tracking-tight select-none block leading-none"
                      style={{ WebkitTextStroke: '2px black', paintOrder: 'stroke fill', textShadow: '-5px 4px 0px #000' }}>
                  МЕДИА
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[500px] relative">
            <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Spirituality_3.jpg"
                 alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 z-20">
              <StarIcon src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Festivals.png" />
            </div>
          </div>
        </div>

        {/* Right 2/3: title + about text */}
        <div className="col-span-2 flex flex-col">
          <div className="h-[214px] border-b-2 border-black flex items-center justify-center bg-white px-8">
            <h1 className="font-roboto italic font-medium text-4xl lg:text-6xl text-center uppercase leading-[1.1]">
              МЕДИА-ЖУРНАЛ <br /> О КУЛЬТУРЕ ТАИЛАНДА
            </h1>
          </div>
          <div className="flex-1 px-10 py-8 bg-white">
            <div className="space-y-2">
              <p className="font-roboto italic font-normal text-[28px] leading-snug">
                Представьте, что вы садитесь на яркий, украшенный огоньками тук-тук. Заводится мотор, ветерок освежает лицо, и начинается путешествие — не по шумным туристическим улицам, а по неизведанным тропам культурного Таиланда.
              </p>
              <p className="font-roboto italic font-normal text-[28px] leading-snug">
                Добро пожаловать в TukTuk Media — ваш медиа-журнал, который станет таким же аутентичным, быстрым и полным открытий транспортом в мир удивительной страны.
              </p>
              <p className="font-roboto italic font-normal text-[28px] leading-snug">
                Мы не просто рассказываем, мы погружаем. Наши статьи — это звук шелеста монашеских одежд в древнем храме Ват Пхра Сингх и гулкая тишина пещеры в Нанга. Это запах карри «пананг», томящегося на глиняной печи в семейной лавке Чиангмая, и терпкий аромат краски на только что созданной стрит-арт картине в бангкокском переулке.
              </p>
            </div>
          </div>
        </div>
      </div>

      <GreenSection color="green" />

      {/* Row 2: Text block + right photo */}
      <div className="grid grid-cols-3 border-b-2 border-black min-h-[500px] relative">
        <div className="col-span-2 border-r-2 border-black flex flex-col justify-center px-10 py-8">
          <div className="space-y-2">
            <p className="font-roboto italic font-normal text-[28px] leading-snug">
              Медиа-журнал о культуре Таиланда <strong>«TukTuk Media»</strong> — это уникальный проект, посвящённый богатому культурному наследию и современным тенденциям жизни в этой удивительной стране. Журнал охватывает широкий спектр тем, включая тайскую кухню, традиционные искусства, фестивали, музыку и моду, а также современные культурные явления.
            </p>
            <p className="font-roboto italic font-normal text-[28px] leading-snug">
              «TukTuk» предлагает читателям погрузиться в атмосферу Таиланда через увлекательные статьи, интервью с местными художниками и ремесленниками, а также репортажи о значимых событиях.
            </p>
          </div>
        </div>
        <div className="col-span-1 overflow-visible relative">
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 z-20">
            <StarIcon src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Buddhism.png" />
          </div>
          <img src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Humor_3.jpg"
               alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Row 3: Photo grid СТАТЬИ | ФОТО | ТЕСТЫ */}
      <div className="relative grid grid-cols-3 h-[37.15vw] overflow-visible border-b-2 border-black">
        <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Temples_2.jpg"
                   label="СТАТЬИ" to="/"
                   className="border-r-2 border-black" />
        <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Festivals_1.jpg"
                   label="ФОТО"
                   className="border-r-2 border-black" />
        <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Economy_2.jpg"
                   label="ТЕСТЫ" to="/test" />
        <div className="absolute top-0 left-[28%] -translate-x-1/2 -translate-y-1/4 z-20 pointer-events-none">
          <StarIcon src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Language.png" />
        </div>
        <div className="absolute top-0 left-[61%] -translate-x-1/2 -translate-y-1/4 z-20 pointer-events-none">
          <StarIcon src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Yoga.png" />
        </div>
        <div className="absolute top-0 right-4 -translate-y-1/4 z-20 pointer-events-none">
          <StarIcon src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Philosophy.png" />
        </div>
      </div>

      <GreenSection color="blue" />

      {/* Text blocks */}
      <div className="border-b-2 border-black px-10 py-8 bg-white space-y-6">
        <p className="font-roboto italic font-normal text-[28px] leading-snug">
          Особое внимание уделяется взаимодействию традиций и современности, что позволяет лучше понять, как тайская культура страны развивается и адаптируется к новым реалиям.
        </p>
        <p className="font-roboto italic font-normal text-[28px] leading-snug">
          С помощью ярких фотографий и интересного контента <strong>«TukTuk Media»</strong> стремится вдохновить читателей на путешествия и открытие новых граней тайской культуры, а также создать платформу для обмена идеями и опытом между людьми из разных уголков мира.
        </p>
      </div>

      {/* Row 4: Photo grid ЛЮДИ | БЫТ | КУЛЬТУРА */}
      <div className="relative grid grid-cols-3 h-[37.15vw] overflow-visible border-b-2 border-black">
        <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Humor_1.jpg"
                   label="ЛЮДИ"
                   className="border-r-2 border-black" />
        <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Tea_2.jpg"
                   label="БЫТ"
                   className="border-r-2 border-black" />
        <PhotoCard src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Philosophy_1.jpg"
                   label="КУЛЬТУРА" />
        <div className="absolute top-0 left-[28%] -translate-x-1/2 -translate-y-1/4 z-20 pointer-events-none">
          <StarIcon src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Dramatic%20Arts.png" />
        </div>
        <div className="absolute top-0 left-[61%] -translate-x-1/2 -translate-y-1/4 z-20 pointer-events-none">
          <StarIcon src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Tea.png" />
        </div>
        <div className="absolute top-0 right-4 -translate-y-1/4 z-20 pointer-events-none">
          <StarIcon src="https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/icon/Buddhism.png" />
        </div>
      </div>

      <GreenSection color="pink" />
    </div>

  </div>
);

export default AboutPage;
