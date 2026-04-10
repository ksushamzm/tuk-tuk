import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      if (!res.ok) throw new Error('Failed to fetch articles');
      const data = await res.json();
      setArticles(data);
      setErrorMsg(null);
    } catch (error) {
      console.error('Failed to fetch articles', error);
      setErrorMsg('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    // Removed confirm() as it might be blocked in sandboxed iframes
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      fetchArticles();
      setErrorMsg(null);
    } catch (error) {
      console.error('Failed to delete article', error);
      setErrorMsg(error instanceof Error ? error.message : 'Failed to delete article');
    }
  };

  if (loading) return <div>Загрузка...</div>;

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

      <div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-hard-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black bg-gray-50">
              <th className="p-4 font-bold">Заголовок</th>
              <th className="p-4 font-bold">Категория</th>
              <th className="p-4 font-bold">Дата</th>
              <th className="p-4 font-bold text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">Статьи не найдены. Создайте первую!</td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 font-medium">{article.title}</td>
                  <td className="p-4 text-gray-600">{article.category}</td>
                  <td className="p-4 text-gray-600">{new Date(article.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <Link 
                      to={`/admin/articles/edit/${article.slug}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(article.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticlesList;
