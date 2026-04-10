import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Settings, ArrowRight } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ articles: 0 });

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setStats({ articles: data.length });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black italic uppercase">Дашборд</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Articles Card */}
        <div className="bg-white p-6 border-2 border-black rounded-xl shadow-hard-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-thai-cyan rounded-lg border-2 border-black">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Всего статей</h3>
              <p className="text-3xl font-black">{stats.articles}</p>
            </div>
          </div>
          <Link 
            to="/admin/articles"
            className="flex items-center justify-between mt-4 pt-4 border-t-2 border-gray-100 text-gray-600 hover:text-black font-bold transition-colors"
          >
            Управление статьями <ArrowRight size={20} />
          </Link>
        </div>

        {/* Site Content Card */}
        <div className="bg-white p-6 border-2 border-black rounded-xl shadow-hard-sm flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-thai-pink rounded-lg border-2 border-black">
              <Settings size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Контент сайта</h3>
              <p className="text-gray-600">Управление текстами и блоками</p>
            </div>
          </div>
          <Link 
            to="/admin/content"
            className="flex items-center justify-between mt-4 pt-4 border-t-2 border-gray-100 text-gray-600 hover:text-black font-bold transition-colors"
          >
            Редактировать контент <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
