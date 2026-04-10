
import React, { useState, useEffect } from 'react';
import GreenSection from './GreenSection';

interface Question {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation: string;
}

interface TestPageProps {
  onHomeClick?: () => void;
}

const TestPage: React.FC<TestPageProps> = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch('/api/test-questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load questions', err);
        setLoading(false);
      });
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);
    if (optionId === currentQuestion.correctId) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Загрузка...</div>;
  }

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Тест пока недоступен</div>;
  }

  if (isFinished) {
    return (
      <div className="w-full bg-white flex flex-col min-h-[800px]">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border-b-2 border-black">
          <h1 className="font-roboto font-black italic text-5xl md:text-7xl uppercase leading-[1.1] tracking-tight mb-8">
            РЕЗУЛЬТАТЫ ТЕСТА
          </h1>
          <p className="font-roboto italic text-3xl md:text-4xl mb-12">
            Вы ответили правильно на {score} из {questions.length} вопросов.
          </p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedOption(null);
              setScore(0);
              setIsFinished(false);
            }}
            className="bg-black text-white px-12 py-6 rounded-full font-bold text-2xl hover:bg-thai-magenta transition-colors"
          >
            ПРОЙТИ ЕЩЕ РАЗ
          </button>
        </div>
        <GreenSection />
      </div>
    );
  }

  return (
    <div className="w-full bg-white flex flex-col min-h-[800px]">
      {/* Main Grid Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 border-b-2 border-black min-h-[600px]">
        
        {/* Left Column (Title) */}
        <div className="md:col-span-1 border-b-2 md:border-b-0 md:border-r-2 border-black p-8 md:p-12 bg-white">
          <h1 className="font-roboto font-black italic text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.1] tracking-tight">
            ТЕСТ <br />
            НА СКОЛЬКО ХОРОШО <br />
            ВЫ ЗНАЕТЕ ТАЙСКИЙ <br />
            ЭТИКЕТ?
          </h1>
          <p className="mt-8 font-bold text-xl text-gray-500">
            Вопрос {currentIndex + 1} из {questions.length}
          </p>
        </div>

        {/* Right Column (Question + Answers) */}
        <div className="md:col-span-2 flex flex-col bg-white relative">
          
          <div className="p-8 md:p-16 flex-1">
            {/* Question */}
            <h2 className="font-roboto italic font-normal text-2xl md:text-3xl mb-12 max-w-2xl">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-6">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className={`w-full text-left font-roboto italic text-xl md:text-2xl hover:translate-x-2 transition-transform duration-200 block ${
                    selectedOption === option.id ? 'font-bold' : 'font-normal'
                  } ${selectedOption && option.id === currentQuestion.correctId ? 'text-green-600' : ''} ${selectedOption && selectedOption === option.id && option.id !== currentQuestion.correctId ? 'text-red-600' : ''}`}
                >
                  {option.id}) {option.text}
                </button>
              ))}
            </div>

            {/* Answer Result Block */}
            {selectedOption && (
              <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="font-roboto italic font-normal text-xl md:text-2xl mb-4">
                  {selectedOption === currentQuestion.correctId ? '✅ Верно!' : '❌ Неверно.'} Правильный ответ: {currentQuestion.correctId})
                </p>
                <p className="font-roboto italic font-normal text-xl md:text-2xl leading-relaxed max-w-2xl">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Next Arrow */}
          {selectedOption && (
            <div 
              onClick={handleNext}
              className="absolute bottom-12 right-12 cursor-pointer hover:scale-110 transition-transform"
            >
               <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NSIgaGVpZ2h0PSI1NSIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNSAxMmgyNDQgbTctNyA3IDctNyA3IiB0cmFuc2Zvcm09InNjYWxlKDAuMDUpIi8+PHBhdGggZD0iTTUgMTJoMTQiIC8+PHBhdGggZD0ibTEyIDUgNyA3LTcgNyIgLz48L3N2Zz4=" alt="arrow" className="w-16 h-16" />
            </div>
          )}
        </div>
      </div>

      {/* Ornament Section */}
      <GreenSection />
    </div>
  );
};

export default TestPage;
