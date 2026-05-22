
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
      {/* Block 1: Full-width title */}
      <div className=" p-8 md:p-12">
        <h1 className="font-roboto font-black italic text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.1] tracking-tight">
          ТЕСТ <br />
          НА СКОЛЬКО ХОРОШО <br />
          ВЫ ЗНАЕТЕ ТАЙСКИЙ <br />
          ЭТИКЕТ?
        </h1>
      </div>

      {/* Block 2: 50/50 split — empty left, question+options right */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2  min-h-[500px]">

        {/* Left: empty white space */}
        <div className="hidden md:block " />

        {/* Right: question + options */}
        <div className="flex flex-col bg-white relative p-8 md:p-12">
          <h2 className="font-roboto font-bold text-xl md:text-2xl leading-snug mb-10">
            {currentQuestion.question}
          </h2>

          <div className="space-y-6 flex-1">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full text-left text-black font-roboto italic text-xl md:text-2xl hover:translate-x-2 transition-transform duration-200 block bg-transparent border-0 p-0 cursor-pointer ${
                  selectedOption === option.id ? 'font-bold' : 'font-normal'
                } ${selectedOption && option.id === currentQuestion.correctId ? 'text-green-600' : ''} ${selectedOption && selectedOption === option.id && option.id !== currentQuestion.correctId ? 'text-red-600' : ''}`}
              >
                {option.id}) {option.text}
              </button>
            ))}
          </div>

          {/* Answer Result */}
          {selectedOption && (
            <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="font-roboto italic font-normal text-xl md:text-2xl mb-4">
                {selectedOption === currentQuestion.correctId ? '✅ Верно!' : '❌ Неверно.'} Правильный ответ: {currentQuestion.correctId})
              </p>
              <p className="font-roboto italic font-normal text-xl md:text-2xl leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Next Arrow */}
          {selectedOption && (
            <div
              onClick={handleNext}
              className="absolute bottom-12 right-12 cursor-pointer hover:scale-110 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
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
