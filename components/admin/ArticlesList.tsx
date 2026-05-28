import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { templateArticlesApi, TemplateArticle } from '../../services/api';

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<TemplateArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      const data = await templateArticlesApi.getAll();
      setArticles(data);
      setErrorMsg(null);
    } catch (error) {
      console.error('Failed to fetch articles', error);
      setErrorMsg('Не удалось загрузить статьи');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }
    try {
      await templateArticlesApi.delete(id);
      fetchArticles();
      setErrorMsg(null);
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete article', error);
      setErrorMsg(error instanceof Error ? error.message : 'Не удалось удалить статью');
    }
  };

  const templateLabels: Record<number, string> = {
    1: 'Шаблон 1',
    2: 'Шаблон 2',
    3: 'Шаблон 3',
  };

  if (loading) return <div className="p-8 text-lg">Загрузка...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black italic uppercase">Статьи</h2>
        <Link
          to="/admin/articles/new"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          <span>Новая статья</span>
        </Link>
      </div>

      {errorMsg && (
        <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 rounded-lg font-bold">
          {errorMsg}
        </div>
      )}

      {articles.length === 0 ? (
        <div className="bg-white border-2 border-black rounded-xl p-12 text-center shadow-hard-sm">
          <p className="text-gray-500 text-lg mb-4">Статьи не найдены. Создайте первую!</p>
          <Link
            to="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-thai-magenta transition-colors font-bold"
          >
            <Plus size={20} /> Создать статью
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-hard-sm group hover:shadow-hard transition-shadow"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-gray-100 overflow-hidden">
                {article.image1 ? (
                  <img
                    src={article.image1}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-4xl">📄</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg leading-tight line-clamp-2">{article.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">{article.categoryId}</span>
                  <span>•</span>
                  <span>{templateLabels[article.templateId] || `Шаблон ${article.templateId}`}</span>
                </div>
                {article.createdAt && (
                  <p className="text-xs text-gray-400">{new Date(article.createdAt).toLocaleDateString('ru-RU')}</p>
                )}
              </div>

              {/* Actions */}
              <div className="border-t-2 border-gray-100 p-3 flex justify-between items-center">
                <a
                  href={`/article/${encodeURIComponent(article.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                  title="Просмотр на сайте"
                >
                  <Eye size={18} />
                </a>
                <div className="flex gap-1">
                  <Link
                    to={`/admin/articles/edit/${encodeURIComponent(article.id)}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Редактировать"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      deleteConfirm === article.id
                        ? 'bg-red-500 text-white'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                    title={deleteConfirm === article.id ? 'Нажмите ещё раз для подтверждения' : 'Удалить'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
