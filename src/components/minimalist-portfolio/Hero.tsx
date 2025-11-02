import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { SOCIAL_LINKS } from '../../portfolio/constants';
import lambdaTestLogo from '../../assets/images/LambdaTest-logo1.png';
import heroImage from '../../assets/images/profile_sai.webp';

// Animated SVG Path Drawing Component
const PathDrawing: React.FC = () => {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <motion.svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      initial="hidden"
      animate="visible"
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      style={{ maxWidth: '80vw' }}
    >
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        stroke="#64ffda"
        variants={draw}
        custom={1}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.line
        x1="220"
        y1="30"
        x2="360"
        y2="170"
        stroke="#64ffda"
        variants={draw}
        custom={2}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.line
        x1="220"
        y1="170"
        x2="360"
        y2="30"
        stroke="#64ffda"
        variants={draw}
        custom={2.5}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.rect
        width="140"
        height="140"
        x="410"
        y="30"
        rx="20"
        stroke="#64ffda"
        variants={draw}
        custom={3}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.circle
        cx="100"
        cy="300"
        r="80"
        stroke="#64ffda"
        variants={draw}
        custom={2}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.line
        x1="220"
        y1="230"
        x2="360"
        y2="370"
        stroke="#64ffda"
        custom={3}
        variants={draw}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.line
        x1="220"
        y1="370"
        x2="360"
        y2="230"
        stroke="#64ffda"
        custom={3.5}
        variants={draw}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.rect
        width="140"
        height="140"
        x="410"
        y="230"
        rx="20"
        stroke="#64ffda"
        custom={4}
        variants={draw}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.circle
        cx="100"
        cy="500"
        r="80"
        stroke="#64ffda"
        variants={draw}
        custom={3}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.line
        x1="220"
        y1="430"
        x2="360"
        y2="570"
        stroke="#64ffda"
        variants={draw}
        custom={4}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.line
        x1="220"
        y1="570"
        x2="360"
        y2="430"
        stroke="#64ffda"
        variants={draw}
        custom={4.5}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
      <motion.rect
        width="140"
        height="140"
        x="410"
        y="430"
        rx="20"
        stroke="#64ffda"
        variants={draw}
        custom={5}
        style={{ strokeWidth: 10, strokeLinecap: 'round', fill: 'transparent' }}
      />
    </motion.svg>
  );
};

interface HeroProps {
    onGetInTouch: () => void;
}

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);

const Hero: React.FC<HeroProps> = ({ onGetInTouch }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Conference Speaker',
    'Blogger',
    'Open source contributor',
    'Mentor',
    'Community Organizer',
  ];

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentRole.length) {
      // Typing out
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 100);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      // Finished typing, wait before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 50);
    } else if (isDeleting && displayText.length === 0) {
      // Finished deleting, move to next role
      setIsDeleting(false);
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3, 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div 
      className="w-full h-screen flex items-center justify-center relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated SVG Background Decorations */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Top Right */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <PathDrawing />
        </div>
        {/* Bottom Left */}
        <div className="absolute bottom-10 left-10 w-64 h-64 opacity-10 rotate-180">
          <PathDrawing />
        </div>
        {/* Center Background - Subtle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
          <PathDrawing />
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 relative z-10">
        {/* Profile Image - Left Side */}
        <motion.div 
          className="flex-shrink-0 order-2 lg:order-1"
          variants={itemVariants}
        >
          <div className="relative">
            {/* Gradient background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-2xl transform scale-110"></div>
            
            {/* Moving Orbs */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary/40 rounded-full blur-sm -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: [-200, -180, -160, -140, -120, -100, -120, -140, -160, -180, -200, -220, -240, -220, -200],
                y: [0, -30, -50, -60, -50, -30, 0, 30, 50, 60, 50, 30, 0, -30, -50],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary/30 rounded-full blur-sm -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: [180, 200, 220, 230, 220, 200, 180, 160, 140, 130, 140, 160, 180, 200, 220],
                y: [0, -20, -40, -50, -40, -20, 0, 20, 40, 50, 40, 20, 0, -20, -40],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-5 h-5 bg-primary/50 rounded-full blur-sm -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: [-150, -130, -110, -90, -70, -90, -110, -130, -150, -170, -190, -170, -150],
                y: [-80, -100, -110, -100, -80, -60, -40, -60, -80, -100, -110, -100, -80],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-3.5 h-3.5 bg-primary/35 rounded-full blur-sm -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: [120, 140, 160, 180, 200, 180, 160, 140, 120, 100, 80, 100, 120],
                y: [90, 110, 120, 110, 90, 70, 50, 70, 90, 110, 120, 110, 90],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
                delay: 1.5
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-primary/40 rounded-full blur-sm -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: [-100, -120, -140, -160, -140, -120, -100, -80, -60, -80, -100],
                y: [120, 140, 150, 140, 120, 100, 80, 100, 120, 140, 120],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear",
                delay: 2
              }}
            />
            
            {/* Main image container */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl group z-10">
              <img
                src={heroImage}
                alt="Sai Krishna"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                  objectPosition: '50% 30%',
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent group-hover:opacity-75 transition-opacity duration-500"></div>
            </div>
            
            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-primary/30 rounded-br-2xl"></div>
            
            {/* Floating Tech Indicators */}
            <motion.div 
              className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-dark z-10"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-white font-bold text-xs">JS</span>
            </motion.div>
            <motion.div 
              className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border-2 border-dark z-10"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <span className="text-white font-bold text-xs">AI</span>
            </motion.div>
            <motion.div 
              className="absolute top-1/4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-dark z-10"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <span className="text-white font-bold text-xs">⚡</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content - Right Side */}
        <div className="flex-1 max-w-2xl order-1 lg:order-2 text-center lg:text-left mx-auto lg:mx-0">
          <motion.p variants={itemVariants} className="text-primary font-mono">Hi, my name is</motion.p>
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-light mt-4">Sai Krishna.</motion.h1>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-light/75 mt-2">Director of Engineering</motion.h2>
          <motion.div variants={itemVariants} className="mt-4 flex items-center gap-3 justify-center lg:justify-start">
            <span className="text-lg text-light/75">at</span>
            <img src={lambdaTestLogo} alt="LambdaTest Logo" className="h-8 md:h-10" />
          </motion.div>
          <motion.div variants={itemVariants} className="mt-4">
            <p className="text-lg text-light/75 text-center lg:text-left">
              Also a{' '}
              <span className="text-primary font-semibold">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </span>
            </p>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 max-w-xl text-lg text-light/75 text-center lg:text-left mx-auto lg:mx-0">
            I'm a passionate technologist and leader in the software testing and automation space. As Director of Engineering at LambdaTest, I drive innovation in cloud-based testing platforms that serve millions of developers worldwide.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-12 flex justify-center lg:justify-start">
            <motion.a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border-2 border-primary text-primary rounded-lg font-mono hover:bg-primary/10 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.a>
          </motion.div>
        </div>
      </div>
       <div className="fixed bottom-0 left-12 hidden md:flex flex-col items-center space-y-6">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-light/75 hover:text-primary transition-all duration-300 transform hover:-translate-y-1">
                <GithubIcon />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-light/75 hover:text-primary transition-all duration-300 transform hover:-translate-y-1">
                <LinkedinIcon />
            </a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-light/75 hover:text-primary transition-all duration-300 transform hover:-translate-y-1">
                <TwitterIcon />
            </a>
            <div className="w-px h-24 bg-light/75"></div>
        </div>
         <div className="fixed bottom-0 right-12 hidden md:flex flex-col items-center space-y-6">
            <a href={SOCIAL_LINKS.email} className="font-mono text-sm tracking-widest text-light/75 hover:text-primary transition-all duration-300 transform hover:-translate-y-1" style={{ writingMode: 'vertical-rl' }}>
                saidotkrishna@gmail.com
            </a>
            <div className="w-px h-24 bg-light/75"></div>
        </div>
    </motion.div>
  );
};

export default Hero;
