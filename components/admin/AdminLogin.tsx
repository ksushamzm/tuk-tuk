import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Простой пароль для прототипа
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      onLogin();
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-roboto">
      <div className="bg-white p-8 rounded-xl shadow-hard border-2 border-black w-full max-w-md">
        <h1 className="text-3xl font-black italic uppercase mb-6 text-center">Вход в Админку</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold mb-2">Пароль</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg focus:ring-2 ring-thai-cyan outline-none"
              placeholder="Введите пароль (admin123)"
            />
          </div>
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <button 
            type="submit"
            className="w-full py-3 bg-black text-white font-bold uppercase rounded-lg hover:bg-thai-magenta transition-colors shadow-hard-sm"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
