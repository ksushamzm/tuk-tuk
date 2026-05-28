import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-thai-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white border-2 border-black p-12 shadow-hard text-center">
        <h1 className="font-roboto font-black italic text-8xl uppercase mb-4 text-thai-magenta"
            style={{ 
              WebkitTextStroke: '2px black', 
              paintOrder: 'stroke fill',
              textShadow: '6px 6px 0px #000' 
            }}>
          404
        </h1>
        <h2 className="font-roboto font-black italic text-3xl uppercase mb-6">
          Страница не найдена
        </h2>
        <p className="font-roboto text-xl mb-8 text-gray-700">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white font-bold uppercase py-4 px-8 hover:bg-thai-magenta transition-colors shadow-hard-sm"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
