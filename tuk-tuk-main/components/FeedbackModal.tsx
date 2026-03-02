
import React from 'react';
import { X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#FFFAFA] border-2 border-black w-full max-w-2xl p-8 md:p-12 shadow-hard relative overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 hover:rotate-90 transition-transform duration-200"
        >
          <X size={32} />
        </button>

        <h2 className="font-roboto font-black text-4xl md:text-5xl text-center uppercase mb-8 italic tracking-tight">
          ОБРАТНАЯ СВЯЗЬ
        </h2>

        <div className="space-y-6">
          <section>
            <p className="font-roboto italic text-xl mb-2">Есть о чём сказать? Напишите нам!</p>
            <textarea 
              className="w-full border-2 border-black p-4 h-32 bg-white outline-none focus:ring-2 ring-thai-cyan transition-all font-roboto"
            />
          </section>

          <section className="pt-4">
            <p className="font-roboto italic text-xl mb-6">
              А также можете подписаться на нас и получать рассылку о новых публикациях.
            </p>
            
            <div className="space-y-4">
              <div>
                <p className="font-roboto italic text-xl mb-2">Ваше имя:</p>
                <input 
                  type="text"
                  className="w-full border-2 border-black p-4 bg-white outline-none focus:ring-2 ring-thai-cyan transition-all font-roboto"
                />
              </div>

              <div>
                <p className="font-roboto italic text-xl mb-2">Ваша электронная почта:</p>
                <input 
                  type="email"
                  className="w-full border-2 border-black p-4 bg-white outline-none focus:ring-2 ring-thai-cyan transition-all font-roboto"
                />
              </div>
            </div>
          </section>

          <div className="pt-4">
            <button className="border-2 border-black px-8 py-3 font-roboto italic text-xl hover:bg-black hover:text-white transition-colors duration-200 active:translate-y-1">
              Получать рассылку!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
