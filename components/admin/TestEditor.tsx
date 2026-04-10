import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id?: number;
  question: string;
  options: Option[];
  correctId: string;
  explanation: string;
}

const TestEditor: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/test-questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setErrorMsg('Failed to load test questions');
        setLoading(false);
      });
  }, []);

  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleOptionIdChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].id = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: [
          { id: 'а', text: '' },
          { id: 'б', text: '' },
          { id: 'в', text: '' },
          { id: 'г', text: '' },
        ],
        correctId: 'а',
        explanation: '',
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/test-questions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questions),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Не удалось обновить вопросы теста');
      }

      alert('Вопросы теста успешно обновлены!');
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : 'Ошибка при обновлении вопросов теста');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black italic uppercase">Редактор Теста</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Ошибка! </strong>
          <span className="block sm:inline">{errorMsg}</span>
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white p-6 rounded-xl border-2 border-black shadow-hard-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Вопрос {qIndex + 1}</h3>
              <button
                onClick={() => removeQuestion(qIndex)}
                className="text-red-500 hover:text-red-700 p-2"
                title="Удалить вопрос"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Текст вопроса</label>
                <textarea
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                  className="w-full p-3 border-2 border-black rounded-lg"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Варианты ответов</label>
                <div className="space-y-2">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={opt.id}
                        onChange={(e) => handleOptionIdChange(qIndex, oIndex, e.target.value)}
                        className="w-16 p-2 border-2 border-black rounded-lg text-center font-bold"
                        placeholder="ID"
                      />
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className="flex-1 p-2 border-2 border-black rounded-lg"
                        placeholder="Текст варианта"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Правильный ответ (ID)</label>
                  <select
                    value={q.correctId}
                    onChange={(e) => handleQuestionChange(qIndex, 'correctId', e.target.value)}
                    className="w-full p-3 border-2 border-black rounded-lg font-bold"
                  >
                    {q.options.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.id}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Объяснение</label>
                <textarea
                  value={q.explanation}
                  onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                  className="w-full p-3 border-2 border-black rounded-lg"
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addQuestion}
        className="mt-8 w-full py-4 border-2 border-dashed border-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <Plus size={24} />
        Добавить вопрос
      </button>
    </div>
  );
};

export default TestEditor;
