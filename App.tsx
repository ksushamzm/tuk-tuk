import { useState, lazy, Suspense } from 'react';
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
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

// Lazy load admin components
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const ArticlesList = lazy(() => import('./components/admin/ArticlesList'));
const ArticleEditor = lazy(() => import('./components/admin/ArticleEditor'));
const SiteContentEditor = lazy(() => import('./components/admin/SiteContentEditor'));
const TestEditor = lazy(() => import('./components/admin/TestEditor'));

// Loading component
const AdminLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-2xl font-bold">Загрузка...</div>
  </div>
);

function App() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#EBEBEB] font-roboto text-black selection:bg-thai-cyan selection:text-black">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={
            <Suspense fallback={<AdminLoading />}>
              <AdminLayout />
            </Suspense>
          }>
            <Route index element={<Suspense fallback={<AdminLoading />}><AdminDashboard /></Suspense>} />
            <Route path="articles" element={<Suspense fallback={<AdminLoading />}><ArticlesList /></Suspense>} />
            <Route path="articles/new" element={<Suspense fallback={<AdminLoading />}><ArticleEditor /></Suspense>} />
            <Route path="articles/edit/:slug" element={<Suspense fallback={<AdminLoading />}><ArticleEditor /></Suspense>} />
            <Route path="content" element={<Suspense fallback={<AdminLoading />}><SiteContentEditor /></Suspense>} />
            <Route path="test" element={<Suspense fallback={<AdminLoading />}><TestEditor /></Suspense>} />
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
            <Route path="/test" element={<TestPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
