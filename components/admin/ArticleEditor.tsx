import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Plus, Trash2, Eye } from 'lucide-react';
import { categoriesData } from '../../data/categoriesData';
import { templateArticlesApi, uploadApi, TemplateArticle } from '../../services/api';

interface TextBlock {
  id: string;
  text: string;
}

interface ArticleForm {
  id: string;
  categoryId: string;
  templateId: number;
  title: string;
  section1Title: string;
  section1Text: TextBlock[];
  image1: string;
  image2: string;
  section2Title: string;
  section2Text: TextBlock[];
}

const defaultArticle: ArticleForm = {
  id: '',
  categoryId: '',
  templateId: 1,
  title: '',
  section1Title: '',
  section1Text: [{ id: crypto.randomUUID(), text: '' }],
  image1: '',
  image2: '',
  section2Title: '',
  section2Text: [{ id: crypto.randomUUID(), text: '' }],
};

const categoryOptions = Object.entries(categoriesData).map(([key, val]) => ({
  value: key,
  label: val.title,
}));

const ArticleEditor: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = !!slug;

  const [article, setArticle] = useState<ArticleForm>(defaultArticle);
  const [loading, setLoading] = useState(isEditing);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing && slug) {
      templateArticlesApi.getBySlug(slug)
        .then(data => {
          setArticle({
            id: data.id,
            categoryId: data.categoryId,
            templateId: data.templateId,
            title: data.title,
            section1Title: data.section1Title || '',
            section1Text: data.section1Text?.length 
              ? data.section1Text.map(text => ({ id: crypto.randomUUID(), text }))
              : [{ id: crypto.randomUUID(), text: '' }],
            image1: data.image1 || '',
            image2: data.image2 || '',
            section2Title: data.section2Title || '',
            section2Text: data.section2Text?.length 
              ? data.section2Text.map(text => ({ id: crypto.randomUUID(), text }))
              : [{ id: crypto.randomUUID(), text: '' }],
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setErrorMsg('Ошибка загрузки статьи');
          setTimeout(() => navigate('/admin/articles'), 2000);
        });
    }
  }, [slug, isEditing, navigate]);

  const handleChange = (field: keyof ArticleForm, value: string | number) => {
    setArticle(prev => ({ ...prev, [field]: value }));
    setErrorMsg(null);
  };

  const handleTextArrayChange = (field: 'section1Text' | 'section2Text', id: string, value: string) => {
    const arr = [...article[field]];
    const index = arr.findIndex(block => block.id === id);
    if (index !== -1) {
      arr[index] = { ...arr[index], text: value };
      setArticle(prev => ({ ...prev, [field]: arr }));
      setErrorMsg(null);
    }
  };

  const addTextLine = (field: 'section1Text' | 'section2Text') => {
    setArticle(prev => ({ 
      ...prev, 
      [field]: [...prev[field], { id: crypto.randomUUID(), text: '' }] 
    }));
  };

  const removeTextLine = (field: 'section1Text' | 'section2Text', id: string) => {
    const arr = article[field].filter(block => block.id !== id);
    if (arr.length === 0) arr.push({ id: crypto.randomUUID(), text: '' });
    setArticle(prev => ({ ...prev, [field]: arr }));
  };

  const handleImageUpload = async (field: 'image1' | 'image2', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { url } = await uploadApi.uploadImage(file);
      handleChange(field, url);
    } catch (err) {
      setErrorMsg('Ошибка загрузки изображения: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleSave = async () => {
    if (!article.id || !article.title || !article.categoryId) {
      setErrorMsg('ID, заголовок и категория обязательны!');
      return;
    }

    setSaving(true);
    try {
      const body: TemplateArticle = {
        ...article,
        section1Text: article.section1Text.map(b => b.text).filter(t => t.trim() !== ''),
        section2Text: article.section2Text.map(b => b.text).filter(t => t.trim() !== ''),
      };

      if (isEditing) {
        await templateArticlesApi.update(slug!, body);
      } else {
        await templateArticlesApi.create(body);
      }
      
      navigate('/admin/articles');
    } catch (error) {
      setErrorMsg('Ошибка сохранения: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-lg">Загрузка...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
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
          {isEditing && (
            <a
              href={`/article/${encodeURIComponent(article.id)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <Eye size={18} /> Просмотр
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-black text-white font-bold uppercase rounded-lg hover:bg-thai-magenta transition-colors shadow-hard-sm disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
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
            <label className="font-bold">ID статьи (slug для URL) *</label>
            <input
              type="text"
              value={article.id}
              onChange={(e) => handleChange('id', e.target.value)}
              disabled={isEditing}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none disabled:bg-gray-100"
              placeholder="например: my_article"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Заголовок статьи *</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              placeholder="Заголовок статьи"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold">Категория *</label>
            <select
              value={article.categoryId}
              onChange={(e) => handleChange('categoryId', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none bg-white"
            >
              <option value="">Выберите категорию...</option>
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-bold">Шаблон</label>
            <select
              value={article.templateId}
              onChange={(e) => handleChange('templateId', Number(e.target.value))}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none bg-white"
            >
              <option value={1}>Шаблон 1 — Заголовок + текст → фото → текст</option>
              <option value={2}>Шаблон 2 — Текст → заголовок + текст → фото</option>
              <option value={3}>Шаблон 3 — Заголовок + текст → фото → заголовок + текст</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <div className="bg-white p-6 border-2 border-black rounded-xl shadow-hard-sm space-y-6">
        <h3 className="text-xl font-bold italic uppercase border-b-2 border-black pb-2">
          Секция 1
          {article.templateId === 2 && <span className="text-sm font-normal ml-2 text-gray-500">(без заголовка в этом шаблоне)</span>}
        </h3>

        {article.templateId !== 2 && (
          <div className="space-y-2">
            <label className="font-bold">Заголовок секции 1</label>
            <input
              type="text"
              value={article.section1Title}
              onChange={(e) => handleChange('section1Title', e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              placeholder="ЗАГОЛОВОК СЕКЦИИ"
            />
          </div>
        )}

        <div className="space-y-3">
          <label className="font-bold">Параграфы секции 1</label>
          {article.section1Text.map((block) => (
            <div key={block.id} className="flex gap-2 items-start">
              <span className="text-gray-400 font-mono text-sm mt-3 w-6 text-right">•</span>
              <textarea
                value={block.text}
                onChange={(e) => handleTextArrayChange('section1Text', block.id, e.target.value)}
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-black outline-none min-h-[80px] resize-y"
                placeholder="Текст параграфа... (можно начать с • для списка)"
              />
              <button
                onClick={() => removeTextLine('section1Text', block.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                title="Удалить параграф"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addTextLine('section1Text')}
            className="flex items-center gap-2 text-sm px-4 py-2 border-2 border-dashed border-gray-400 rounded-lg hover:border-black transition-colors text-gray-600 hover:text-black"
          >
            <Plus size={16} /> Добавить параграф
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white p-6 border-2 border-black rounded-xl shadow-hard-sm space-y-6">
        <h3 className="text-xl font-bold italic uppercase border-b-2 border-black pb-2">Изображения</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(['image1', 'image2'] as const).map((field, idx) => (
            <div key={field} className="space-y-3">
              <label className="font-bold">Фото {idx + 1}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={article[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-black outline-none text-sm"
                  placeholder="URL изображения..."
                />
                <label className="cursor-pointer px-4 py-3 bg-black text-white font-bold rounded-lg hover:bg-thai-magenta transition-colors whitespace-nowrap flex items-center gap-2">
                  <ImageIcon size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(field, e)}
                  />
                </label>
              </div>
              {article[field] && (
                <div className="relative group">
                  <img
                    src={article[field]}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-lg border-2 border-black"
                  />
                  <button
                    onClick={() => handleChange(field, '')}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white p-6 border-2 border-black rounded-xl shadow-hard-sm space-y-6">
        <h3 className="text-xl font-bold italic uppercase border-b-2 border-black pb-2">Секция 2</h3>

        <div className="space-y-2">
          <label className="font-bold">Заголовок секции 2</label>
          <input
            type="text"
            value={article.section2Title}
            onChange={(e) => handleChange('section2Title', e.target.value)}
            className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
            placeholder="ЗАГОЛОВОК СЕКЦИИ 2"
          />
        </div>

        <div className="space-y-3">
          <label className="font-bold">Параграфы секции 2</label>
          {article.section2Text.map((block) => (
            <div key={block.id} className="flex gap-2 items-start">
              <span className="text-gray-400 font-mono text-sm mt-3 w-6 text-right">•</span>
              <textarea
                value={block.text}
                onChange={(e) => handleTextArrayChange('section2Text', block.id, e.target.value)}
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-black outline-none min-h-[80px] resize-y"
                placeholder="Текст параграфа... (можно начать с • для списка)"
              />
              <button
                onClick={() => removeTextLine('section2Text', block.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                title="Удалить параграф"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addTextLine('section2Text')}
            className="flex items-center gap-2 text-sm px-4 py-2 border-2 border-dashed border-gray-400 rounded-lg hover:border-black transition-colors text-gray-600 hover:text-black"
          >
            <Plus size={16} /> Добавить параграф
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
