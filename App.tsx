
import React, { useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import FeedbackModal from './components/FeedbackModal';
import TestPage from './components/TestPage';
import VerticalSidebar from './components/VerticalSidebar';
import ArticlePage from './components/ArticlePage';
import CategoryPage from './components/CategoryPage';
import Home from './components/Home';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import ArticlesList from './components/admin/ArticlesList';
import ArticleEditor from './components/admin/ArticleEditor';
import SiteContentEditor from './components/admin/SiteContentEditor';
import TestEditor from './components/admin/TestEditor';

function App() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#EBEBEB] font-roboto text-black selection:bg-thai-cyan selection:text-black">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="articles" element={<ArticlesList />} />
          <Route path="articles/new" element={<ArticleEditor />} />
          <Route path="articles/edit/:slug" element={<ArticleEditor />} />
          <Route path="content" element={<SiteContentEditor />} />
          <Route path="test" element={<TestEditor />} />
        </Route>

        {/* Main Site Routes */}
        <Route element={
          <div className="w-full max-w-[1440px] mx-auto bg-white shadow-2xl relative border-x-0 md:border-x-2 border-black overflow-x-hidden">
            <VerticalSidebar 
              isOpen={isSidebarOpen} 
              onClose={() => setIsSidebarOpen(false)} 
            />

            <Header 
              onAboutClick={() => navigate('/about')} 
              onHomeClick={() => navigate('/')} 
              onMailClick={() => setIsFeedbackOpen(true)}
              onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            
            <main className="flex flex-col w-full">
              <Outlet />
            </main>

            <Footer />

            <FeedbackModal 
              isOpen={isFeedbackOpen} 
              onClose={() => setIsFeedbackOpen(false)} 
            />
          </div>
        }>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/test" element={<TestPage onHomeClick={() => navigate('/')} />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
