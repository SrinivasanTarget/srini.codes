import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  name: string;
}

interface HeaderProps {
  sections: Section[];
  onNavigate: (id: string) => void;
  activeSectionId: string;
}

const Header: React.FC<HeaderProps> = ({ sections, onNavigate, activeSectionId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = sections.findIndex(s => s.id === activeSectionId);

      if (activeIndex !== -1 && navRef.current) {
        const activeNavItem = navItemsRef.current[activeIndex];
        if (activeNavItem) {
          const rect = activeNavItem.getBoundingClientRect();
          const navRect = navRef.current.getBoundingClientRect();
          setIndicatorStyle({
            left: rect.left - navRect.left,
            width: rect.width,
          });
        }
      } else {
        setIndicatorStyle({ left: 0, width: 0 });
      }
    };

    // Initial update
    updateIndicator();

    // Update on window resize
    window.addEventListener('resize', updateIndicator);
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(updateIndicator);
    
    // Also use a small timeout as fallback
    const timeout = setTimeout(updateIndicator, 100);

    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timeout);
    };
  }, [activeSectionId, sections]);
  
  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  const topBarVariants = {
    open: { rotate: 45, y: 5 },
    closed: { rotate: 0, y: 0 },
  };
  const middleBarVariants = {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  };
  const bottomBarVariants = {
    open: { rotate: -45, y: -5 },
    closed: { rotate: 0, y: 0 },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center h-20">
        <button onClick={() => onNavigate('home')} className="text-2xl font-bold text-primary font-mono">SK</button>
        
        <nav className="hidden md:block">
          <ul ref={navRef} className="flex items-center space-x-8 relative">
            {sections.map((section, index) => (
              <li key={section.id} ref={el => { navItemsRef.current[index] = el; }}>
                <motion.button
                  onClick={() => handleLinkClick(section.id)}
                  className={`text-base md:text-lg font-mono transition-colors duration-300 ${activeSectionId === section.id ? 'text-primary' : 'text-light hover:text-primary'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.name}
                </motion.button>
              </li>
            ))}
             <motion.div
              className="absolute bottom-[-10px] h-0.5 bg-primary"
              initial={false}
              animate={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </ul>
        </nav>
        
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-around">
            <motion.span
              className="block w-full h-0.5 bg-primary origin-center"
              variants={topBarVariants}
              animate={isMenuOpen ? 'open' : 'closed'}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span
              className="block w-full h-0.5 bg-primary"
              variants={middleBarVariants}
              animate={isMenuOpen ? 'open' : 'closed'}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span
              className="block w-full h-0.5 bg-primary origin-center"
              variants={bottomBarVariants}
              animate={isMenuOpen ? 'open' : 'closed'}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </div>
        </button>

        <div className={`fixed top-0 right-0 h-full w-3/4 bg-surface shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <ul className="flex flex-col items-center justify-center h-full space-y-8">
            {sections.map((section, index) => (
              <li key={section.id}>
                <motion.button
                  onClick={() => handleLinkClick(section.id)}
                  className="text-xl font-mono text-light hover:text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.name}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
