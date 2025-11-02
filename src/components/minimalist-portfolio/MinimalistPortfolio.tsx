import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Videos from './Videos';
import Workshops from './Workshops';
import OpenSource from './OpenSource';
import Footer from './Footer';
import TransitionEffect from './TransitionEffect';

const MinimalistPortfolio: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState('home');

  const sectionComponents: { [key: string]: React.ReactNode } = {
    home: <Hero onGetInTouch={() => changeSection('about')} />,
    about: <About />,
    videos: <Videos />,
    workshops: <Workshops />,
    opensource: <OpenSource />,
  };
  
  const sectionsForHeader = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'videos', name: 'Videos' },
    { id: 'workshops', name: 'Workshops' },
    { id: 'opensource', name: 'Open Source' },
  ];

  const changeSection = (newSectionId: string) => {
    if (newSectionId === activeSectionId) return;
    setActiveSectionId(newSectionId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark overflow-x-hidden">
      <Header 
        sections={sectionsForHeader} 
        onNavigate={changeSection}
        activeSectionId={activeSectionId}
      />
      
      <TransitionEffect key={activeSectionId} />
      
      <main className={`flex-grow flex flex-col ${activeSectionId === 'home' ? '' : 'container mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-12'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSectionId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {sectionComponents[activeSectionId]}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default MinimalistPortfolio;
