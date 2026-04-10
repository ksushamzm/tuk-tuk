import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, GripVertical, Image as ImageIcon, Type, Quote, Heading } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface Block {
  id?: number;
  type: 'text' | 'image' | 'quote' | 'heading' | 'test';
  content: string;
  orderIndex: number;
}

interface Article {
  id?: number;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  excerpt: string;
  blocks: Block[];
}

const defaultArticle: Article = {
  title: '',
  slug: '',
  category: '',
  coverImage: '',
  excerpt: '',
  blocks: [],
};

const ArticleEditor: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = !!slug;

  const [article, setArticle] = useState<Article>(defaultArticle);
  const [loading, setLoading] = useState(isEditing);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      fetch(`/api/articles/${slug}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch article');
          return res.json();
        })
        .then(data => {
          if (data.error) throw new Error(data.error);
          setArticle(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setErrorMsg('Error loading article');
          setTimeout(() => navigate('/admin/articles'), 2000);
        });
    }
  }, [slug, isEditing, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
    setErrorMsg(null);
  };

  const handleBlockChange = (index: number, content: string) => {
    const newBlocks = [...article.blocks];
    newBlocks[index].content = content;
    setArticle(prev => ({ ...prev, blocks: newBlocks }));
    setErrorMsg(null);
  };

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      type,
      content: '',
      orderIndex: article.blocks.length,
    };
    setArticle(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
    setErrorMsg(null);
  };

  const removeBlock = (index: number) => {
    const newBlocks = article.blocks.filter((_, i) => i !== index);
    // Reorder
    newBlocks.forEach((b, i) => b.orderIndex = i);
    setArticle(prev => ({ ...prev, blocks: newBlocks }));
    setErrorMsg(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === article.blocks.length - 1) return;

    const newBlocks = [...article.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;

    // Update orderIndex
    newBlocks.forEach((b, i) => b.orderIndex = i);
    setArticle(prev => ({ ...prev, blocks: newBlocks }));
    setErrorMsg(null);
  };

  const handleSave = async () => {
    if (!article.title || !article.slug || !article.category) {
      setErrorMsg('Title, Slug, and Category are required!');
      return;
    }

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/articles/${article.id}` : '/api/articles';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });

      if (res.ok) {
        navigate('/admin/articles');
      } else {
        const data = await res.json();
        setErrorMsg(`Failed to save article: ${data.error || 'Unknown error'} ${data.details || ''}`);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Error saving article: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      callback(base64String);
      setErrorMsg(null);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black italic uppercase">
          {isEditing ? 'Редактировать статью' : 'Новая статья'}
        </h2>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/admin/articles')}
            className="px-6 py-2 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Отмена
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-black text-white font-bold uppercase rounded-lg hover:bg-thai-magenta transition-colors shadow-hard-sm"
          >
            Сохранить статью
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 rounded-lg font-bold">
          {errorMsg}
        </div>
      )}

      {/* Meta Data */}
      <div className="bg-white p-6 border-2 border-black rounded-xl shadow-hard-sm space-y-6">
        <h3 className="text-xl font-bold italic uppercase border-b-2 border-black pb-2">Метаданные статьи</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold">Заголовок</label>
            <input 
              type="text" 
              name="title" 
              value={article.title} 
              onChange={handleChange}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              placeholder="Заголовок статьи"
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-bold">Слаг (URL)</label>
            <input 
              type="text" 
              name="slug" 
              value={article.slug} 
              onChange={handleChange}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              placeholder="article-url-slug"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Категория</label>
            <input 
              type="text" 
              name="category" 
              value={article.category} 
              onChange={handleChange}
              list="category-options"
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none uppercase bg-white"
              placeholder="Выберите или введите категорию..."
            />
            <datalist id="category-options">
              <option value="ТРАНСПОРТ" />
              <option value="БУДДИЗМ" />
              <option value="АРХИТЕКТУРА" />
              <option value="КУЛЬТУРА" />
              <option value="ОДЕЖДА" />
              <option value="ЕДА" />
              <option value="ИСТОРИЯ" />
            </datalist>
          </div>

          <div className="space-y-2">
            <label className="font-bold">Обложка</label>
            <div className="flex gap-4 items-center">
              <input 
                type="text" 
                name="coverImage" 
                value={article.coverImage} 
                onChange={handleChange}
                className="flex-1 p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
                placeholder="URL изображения или загрузите..."
              />
              <label className="cursor-pointer px-4 py-3 bg-black text-white font-bold uppercase rounded-lg hover:bg-thai-magenta transition-colors shadow-hard-sm whitespace-nowrap">
                Загрузить
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, (url) => setArticle(prev => ({ ...prev, coverImage: url })))} 
                />
              </label>
            </div>
            {article.coverImage && (
              <img src={article.coverImage} alt="Cover Preview" className="h-32 object-cover rounded-lg border-2 border-black mt-2" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold">Краткое описание (для карточки)</label>
          <textarea 
            name="excerpt" 
            value={article.excerpt} 
            onChange={handleChange}
            className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none h-24"
            placeholder="Краткое описание для карточки..."
          />
        </div>
      </div>

      {/* Content Blocks */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black italic uppercase">Блоки контента</h3>
        
        <div className="space-y-4">
          {article.blocks.map((block, index) => (
            <div key={index} className="bg-white border-2 border-black rounded-xl p-4 shadow-hard-sm flex gap-4 items-start group">
              
              {/* Controls */}
              <div className="flex flex-col gap-2 items-center text-gray-400">
                <button onClick={() => moveBlock(index, 'up')} className="hover:text-black transition-colors p-1"><GripVertical size={16} /></button>
                <span className="font-mono text-xs font-bold">{index + 1}</span>
                <button onClick={() => moveBlock(index, 'down')} className="hover:text-black transition-colors p-1"><GripVertical size={16} /></button>
              </div>

              {/* Content Input */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold uppercase text-sm bg-gray-100 px-2 py-1 rounded border border-gray-300">
                    {block.type}
                  </span>
                  <button 
                    onClick={() => removeBlock(index)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {block.type === 'text' && (
                  <div className="bg-white">
                    <ReactQuill 
                      theme="snow"
                      value={block.content}
                      onChange={(content) => handleBlockChange(index, content)}
                      className="min-h-[200px]"
                    />
                  </div>
                )}
                {block.type === 'heading' && (
                  <input 
                    type="text"
                    value={block.content}
                    onChange={(e) => handleBlockChange(index, e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-black outline-none font-bold text-xl"
                    placeholder="Текст заголовка..."
                  />
                )}
                {block.type === 'image' && (
                  <div className="space-y-2">
                    <div className="flex gap-4 items-center">
                      <input 
                        type="text"
                        value={block.content}
                        onChange={(e) => handleBlockChange(index, e.target.value)}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-black outline-none"
                        placeholder="URL изображения или загрузите..."
                      />
                      <label className="cursor-pointer px-4 py-3 bg-gray-100 text-black font-bold uppercase rounded-lg hover:bg-gray-200 border-2 border-gray-300 transition-colors whitespace-nowrap">
                        Загрузить
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (url) => handleBlockChange(index, url))} 
                        />
                      </label>
                    </div>
                    {block.content && (
                      <img src={block.content} alt="Preview" className="max-h-64 object-contain rounded-lg border-2 border-black" />
                    )}
                  </div>
                )}
                {block.type === 'quote' && (
                  <textarea 
                    value={block.content}
                    onChange={(e) => handleBlockChange(index, e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-black outline-none italic text-lg"
                    placeholder="Текст цитаты..."
                  />
                )}
                {block.type === 'test' && (
                  <div className="bg-thai-pink/10 p-4 border-2 border-thai-pink rounded-lg">
                    <p className="font-bold text-thai-pink mb-2">Интерактивный блок с тестом</p>
                    <p className="text-sm text-gray-600">
                      Этот блок отобразит интерактивный тест в статье.
                      Вы можете указать ID теста или категорию, если у вас несколько тестов,
                      или оставить поле пустым для загрузки теста по умолчанию.
                    </p>
                    <input 
                      type="text"
                      value={block.content}
                      onChange={(e) => handleBlockChange(index, e.target.value)}
                      className="w-full mt-2 p-3 border-2 border-gray-200 rounded-lg focus:border-black outline-none"
                      placeholder="Необязательно: ID теста или категория (оставьте пустым для теста по умолчанию)"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Block Buttons */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-400 rounded-xl p-6 flex flex-wrap justify-center gap-4">
          <button onClick={() => addBlock('text')} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors shadow-hard-sm">
            <Type size={18} /> Добавить текст
          </button>
          <button onClick={() => addBlock('heading')} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors shadow-hard-sm">
            <Heading size={18} /> Добавить заголовок
          </button>
          <button onClick={() => addBlock('image')} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors shadow-hard-sm">
            <ImageIcon size={18} /> Добавить изображение
          </button>
          <button onClick={() => addBlock('quote')} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors shadow-hard-sm">
            <Quote size={18} /> Добавить цитату
          </button>
          <button onClick={() => addBlock('test')} className="flex items-center gap-2 px-4 py-2 bg-thai-pink text-white border-2 border-black rounded-lg hover:bg-black transition-colors shadow-hard-sm">
            <Plus size={18} /> Добавить тест
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
