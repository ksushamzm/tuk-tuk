import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import AdminLogin from './AdminLogin';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('isAdmin');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (loading) return null;

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    { name: 'Дашборд', path: '/admin', icon: LayoutDashboard },
    { name: 'Статьи', path: '/admin/articles', icon: FileText },
    { name: 'Контент сайта', path: '/admin/content', icon: Settings },
    { name: 'Редактор тестов', path: '/admin/test', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 font-roboto">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r-2 border-black flex flex-col">
        <div className="p-6 border-b-2 border-black">
          <h1 className="text-2xl font-black italic uppercase tracking-tight">Админ панель</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-2 border-black space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Выйти</span>
          </button>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
          >
            <span className="font-medium">На сайт</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
