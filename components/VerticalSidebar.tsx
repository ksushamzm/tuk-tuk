
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VerticalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Архитектура", "Аюрведа", "Буддизм", "Гастрономия", "Драматические искусства",
  "Духовность", "Единоборства", "Животные", "Золото", "Инструменты",
  "История", "Йога", "Кинематограф", "Кухня", "Литература",
  "Музыка", "Медицина", "Монархия", "Народные промыслы", "Орнаменты",
  "Одежда", "Праздники", "Религия", "Рынки", "Скульптура",
  "Спорт", "Танцы", "Утварь и посуда", "Украшения", "Уличная еда",
  "Фестивали", "Философия", "Храмы", "Хозяйство", "Церемонии",
  "Чайные традиции", "Этика", "Ювелирное дело", "Юмор", "Язык"
];

const VerticalSidebar: React.FC<VerticalSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[320px] bg-white z-[80] border-r-2 border-black transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header inside Sidebar */}
        <div className="p-8 border-b-2 border-black flex items-center justify-between">
           <div className="w-12 h-1 bg-black rounded-full" /> {/* Decorative element like the menu button lines */}
           <button onClick={onClose} className="hover:rotate-90 transition-transform">
              <X size={40} strokeWidth={1} />
           </button>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-8">
          <nav className="flex flex-col gap-3">
            {categories.map((cat, index) => (
              <Link 
                key={index} 
                to={`/category/${cat}`} 
                className="font-roboto font-bold text-[22px] leading-tight text-black hover:text-thai-magenta transition-colors"
                onClick={onClose}
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default VerticalSidebar;
