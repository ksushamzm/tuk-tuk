import React, { useState, useEffect } from 'react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

const SiteContentEditor: React.FC = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      handleChange(key, base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        alert('Контент сайта успешно обновлен!');
      } else {
        alert('Ошибка при обновлении контента');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка при обновлении контента');
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const blocks = JSON.parse(content['home_blocks'] || '[]');
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;

    handleChange('home_blocks', JSON.stringify(newBlocks));
  };

  const addBlock = (blockName: string) => {
    const blocks = JSON.parse(content['home_blocks'] || '[]');
    handleChange('home_blocks', JSON.stringify([...blocks, blockName]));
  };

  const removeBlock = (index: number) => {
    const blocks = JSON.parse(content['home_blocks'] || '[]');
    const newBlocks = blocks.filter((_: any, i: number) => i !== index);
    handleChange('home_blocks', JSON.stringify(newBlocks));
  };

  if (loading) return <div>Загрузка...</div>;

  const availableBlocks = ['Hero', 'RecentArticles', 'CategoryGrid', 'BlueSection', 'GreenSection', 'PinkSection', 'YellowSection', 'InfoGrid', 'MuayThai'];
  const currentBlocks = JSON.parse(content['home_blocks'] || '[]');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black italic uppercase">Контент сайта</h2>
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-black text-white border-2 border-black rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-hard-sm"
        >
          Сохранить изменения
        </button>
      </div>

      <div className="bg-white p-8 border-2 border-black rounded-xl shadow-hard-sm space-y-8">
        
        {/* Home Blocks Constructor */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase border-b-2 border-black pb-2">Конструктор главной страницы</h3>
          <p className="text-gray-600">Добавляйте нужные блоки и перетащите их для изменения порядка на главной странице.</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <select 
              className="p-2 border-2 border-black rounded-lg font-bold outline-none focus:ring-2 ring-thai-cyan"
              onChange={(e) => {
                if (e.target.value) {
                  addBlock(e.target.value);
                  e.target.value = "";
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>+ Добавить блок</option>
              {availableBlocks.map(block => (
                <option key={block} value={block}>{block}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            {currentBlocks.map((block: string, index: number) => (
              <div key={`${block}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black rounded-lg group">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveBlock(index, 'up')} className="hover:text-thai-magenta"><GripVertical size={16} /></button>
                    <button onClick={() => moveBlock(index, 'down')} className="hover:text-thai-magenta"><GripVertical size={16} /></button>
                  </div>
                  <span className="font-bold text-lg">{block}</span>
                </div>
                <button 
                  onClick={() => removeBlock(index)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Hero Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase border-b-2 border-black pb-2">Секция Hero (Главная)</h3>
          
          <div className="space-y-2">
            <label className="font-bold">Заголовок</label>
            <textarea 
              value={content['hero_title'] || ''} 
              onChange={(e) => handleChange('hero_title', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none h-24 font-roboto"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Текст ссылки внизу</label>
            <input 
              type="text" 
              value={content['hero_link_text'] || ''} 
              onChange={(e) => handleChange('hero_link_text', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Главное изображение</label>
            <div className="flex gap-4 items-center">
              <input 
                type="text" 
                value={content['hero_image'] || ''} 
                onChange={(e) => handleChange('hero_image', e.target.value)}
                className="flex-1 p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
                placeholder="URL изображения или загрузите..."
              />
              <label className="cursor-pointer px-4 py-3 bg-black text-white font-bold uppercase rounded-lg hover:bg-thai-magenta transition-colors shadow-hard-sm whitespace-nowrap">
                Загрузить
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, 'hero_image')} 
                />
              </label>
            </div>
            {content['hero_image'] && (
              <img src={content['hero_image']} alt="Preview" className="h-32 object-cover rounded-lg border-2 border-black mt-2" />
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase border-b-2 border-black pb-2">Секция Категорий</h3>
          
          <div className="space-y-2">
            <label className="font-bold">Текст бегущей строки</label>
            <input 
              type="text" 
              value={content['category_ticker'] || ''} 
              onChange={(e) => handleChange('category_ticker', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              placeholder="СТАТЬИ"
            />
          </div>

          {[1, 2, 3].map(num => (
            <div key={num} className="p-4 border-2 border-gray-200 rounded-lg space-y-4">
              <h4 className="font-bold text-lg">Категория {num}</h4>
              <div className="space-y-2">
                <label className="font-bold">Название</label>
                <input 
                  type="text" 
                  value={content[`category_${num}_title`] || ''} 
                  onChange={(e) => handleChange(`category_${num}_title`, e.target.value)}
                  className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Изображение</label>
                <div className="flex gap-4 items-center">
                  <input 
                    type="text" 
                    value={content[`category_${num}_image`] || ''} 
                    onChange={(e) => handleChange(`category_${num}_image`, e.target.value)}
                    className="flex-1 p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
                  />
                  <label className="cursor-pointer px-4 py-3 bg-black text-white font-bold uppercase rounded-lg hover:bg-thai-magenta transition-colors shadow-hard-sm whitespace-nowrap">
                    Загрузить
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, `category_${num}_image`)} />
                  </label>
                </div>
                {content[`category_${num}_image`] && (
                  <img src={content[`category_${num}_image`]} alt="Preview" className="h-32 object-cover rounded-lg border-2 border-black mt-2" />
                )}
              </div>
            </div>
          ))}
        </section>

        {/* InfoGrid Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase border-b-2 border-black pb-2">Секция Инфо (Тест, Этика, Буква)</h3>
          <div className="space-y-2">
            <label className="font-bold">Изображение для блока Тест</label>
            <div className="flex gap-4 items-center">
              <input 
                type="text" 
                value={content['info_test_image'] || ''} 
                onChange={(e) => handleChange('info_test_image', e.target.value)}
                className="flex-1 p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              />
              <label className="cursor-pointer px-4 py-3 bg-black text-white font-bold uppercase rounded-lg hover:bg-thai-magenta transition-colors shadow-hard-sm whitespace-nowrap">
                Загрузить
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'info_test_image')} />
              </label>
            </div>
            {content['info_test_image'] && (
              <img src={content['info_test_image']} alt="Preview" className="h-32 object-cover rounded-lg border-2 border-black mt-2" />
            )}
          </div>

          <div className="space-y-2">
            <label className="font-bold">Текст для блока Этика</label>
            <textarea 
              value={content['info_etiquette_text'] || ''} 
              onChange={(e) => handleChange('info_etiquette_text', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none h-24"
              placeholder="На сколько хорошо Вы знаете тайский этикет?"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Буква дня (Символ)</label>
            <input 
              type="text" 
              value={content['info_letter_char'] || ''} 
              onChange={(e) => handleChange('info_letter_char', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              placeholder="ก"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Буква дня (Транскрипция)</label>
            <input 
              type="text" 
              value={content['info_letter_transcription'] || ''} 
              onChange={(e) => handleChange('info_letter_transcription', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              placeholder="«ко кай»"
            />
          </div>
        </section>

        {/* Recent Articles Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase border-b-2 border-black pb-2">Секция Свежие статьи</h3>
          <div className="space-y-2">
            <label className="font-bold">Текст бегущей строки</label>
            <input 
              type="text" 
              value={content['recent_articles_ticker'] || ''} 
              onChange={(e) => handleChange('recent_articles_ticker', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              placeholder="НОВЫЕ СТАТЬИ"
            />
          </div>
        </section>

        {/* About Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase border-b-2 border-black pb-2">Секция О нас</h3>
          
          <div className="space-y-2">
            <label className="font-bold">Абзац 1</label>
            <textarea 
              value={content['about_text_1'] || ''} 
              onChange={(e) => handleChange('about_text_1', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none h-32"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Абзац 2</label>
            <textarea 
              value={content['about_text_2'] || ''} 
              onChange={(e) => handleChange('about_text_2', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none h-32"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Абзац 3</label>
            <textarea 
              value={content['about_text_3'] || ''} 
              onChange={(e) => handleChange('about_text_3', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none h-32"
            />
          </div>
        </section>

        {/* Muay Thai Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase border-b-2 border-black pb-2">Секция Тайский Бокс</h3>
          
          <div className="space-y-2">
            <label className="font-bold">Заголовок</label>
            <input 
              type="text" 
              value={content['muay_thai_title'] || ''} 
              onChange={(e) => handleChange('muay_thai_title', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Описание</label>
            <textarea 
              value={content['muay_thai_text'] || ''} 
              onChange={(e) => handleChange('muay_thai_text', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none h-32"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Изображение</label>
            <div className="flex gap-4 items-center">
              <input 
                type="text" 
                value={content['muay_thai_image'] || ''} 
                onChange={(e) => handleChange('muay_thai_image', e.target.value)}
                className="flex-1 p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              />
              <label className="cursor-pointer px-4 py-3 bg-black text-white font-bold uppercase rounded-lg hover:bg-thai-magenta transition-colors shadow-hard-sm whitespace-nowrap">
                Загрузить
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'muay_thai_image')} />
              </label>
            </div>
            {content['muay_thai_image'] && (
              <img src={content['muay_thai_image']} alt="Preview" className="h-32 object-cover rounded-lg border-2 border-black mt-2" />
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default SiteContentEditor;
