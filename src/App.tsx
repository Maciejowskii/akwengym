import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Spa from './pages/Spa';
import Pricing from './pages/Pricing';
import BlogList from './pages/Blog/BlogList';
import BlogPost from './pages/Blog/BlogPost';
import AdminPanel from './pages/Admin/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  
  useState(() => {
    // Prosta obsługa adresów URL dla admina (?page=admin lub #admin)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('page') === 'admin' || window.location.hash === '#admin') {
      setCurrentPage('admin');
    }
  });

  const handlePostClick = (slug: string) => {
    setSelectedPostSlug(slug);
    setCurrentPage('blog-post');
    window.scrollTo(0, 0);
  };

  const handleBackToBlog = () => {
    setSelectedPostSlug(null);
    setCurrentPage('blog');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home key="home" setPage={setCurrentPage} />;
      case 'spa': return <Spa key="spa" setPage={setCurrentPage} />;
      case 'pricing': return <Pricing key="pricing" setPage={setCurrentPage} />;
      case 'blog': return <BlogList key="blog" setPage={setCurrentPage} onPostClick={handlePostClick} />;
      case 'blog-post': 
        return selectedPostSlug ? (
          <BlogPost key={`post-${selectedPostSlug}`} slug={selectedPostSlug} onBack={handleBackToBlog} />
        ) : (
          <BlogList key="blog-fallback" setPage={setCurrentPage} onPostClick={handlePostClick} />
        );
      case 'admin': return <AdminPanel key="admin" />;
      default: return <Home key="home" setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col selection:bg-tertiary-fixed-dim selection:text-on-tertiary-fixed">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage === 'blog-post' ? `blog-post-${selectedPostSlug}` : currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-grow pt-24"
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>
      <Footer setPage={setCurrentPage} />
    </div>
  );
}
