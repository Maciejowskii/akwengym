import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Spa from './pages/Spa';
import Pricing from './pages/Pricing';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home key="home" setPage={setCurrentPage} />;
      case 'spa': return <Spa key="spa" setPage={setCurrentPage} />;
      case 'pricing': return <Pricing key="pricing" setPage={setCurrentPage} />;
      default: return <Home key="home" setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col selection:bg-tertiary-fixed-dim selection:text-on-tertiary-fixed">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
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
