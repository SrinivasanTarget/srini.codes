import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../../assets/images/profile_sai.webp';
import lambdaTestLogo from '../../assets/images/LambdaTest-logo1.png';
import backgroundImage from '../../assets/images/background1.png';
import { SOCIAL_LINKS } from '../../portfolio/constants';

interface LandingHeroProps {
  onGetInTouch: () => void;
  onViewProjects: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onGetInTouch, onViewProjects }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'Blogger',
    'Open source contributor',
    'Mentor',
    'Conference Speaker',
    'Community Organizer',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Purple Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgb(17, 15, 31) 50%, rgb(19, 7, 96) 80%, rgb(38, 29, 96) 100%)',
        }}
      ></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary/30 rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-primary/30 rotate-12"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 border border-primary/30 -rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-primary/30 rotate-45"></div>
      </div>

      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat mix-blend-overlay"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Code background text */}
      <div className="absolute inset-0 opacity-10 font-mono text-xs text-primary overflow-hidden">
        <div className="absolute top-20 left-10 transform rotate-12">
          <pre className="text-primary/50">{`$base_url = 'https://url-of-
smseagle/index.php/http_api/send_sms';
$params = array(
  'access_token' => '00059OjCOlMH8F2BP8',
  'to'    => '1234567',
  'message' => 'my message',
);
$data = '?'.http_build_query($params);
$ret = fopen($base_url.$data,'r');
$result = fread($ret,1024);
fclose($ret);
if (substr($result,0,2) == "OK") {
  echo "Message has been sent successfully!";
} else {
  echo "Send message failed!";
}`}</pre>
        </div>

        <div className="absolute top-40 right-10 transform -rotate-6">
          <pre className="text-primary/50">{`const appium = require('appium');
const driver = await appium.remote({
  platformName: 'Android',
  deviceName: 'emulator',
  app: '/path/to/app.apk'
});

await driver.findElement('id', 'login-btn').click();
const result = await driver.getPageSource();
console.log('Test completed successfully!');`}</pre>
        </div>
      </div>

      {/* Social Media Icons - Right Side */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        <motion.a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
          style={{ backgroundColor: '#c2f900' }}
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </motion.a>
        <motion.a
          href={SOCIAL_LINKS.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
          style={{ backgroundColor: '#c2f900' }}
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </motion.a>
        <motion.a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
          style={{ backgroundColor: '#c2f900' }}
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </motion.a>
        <motion.a
          href={SOCIAL_LINKS.email}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
          style={{ backgroundColor: '#c2f900' }}
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.98L12 10.09l9.384-6.269h.98c.904 0 1.636.732 1.636 1.636z" />
          </svg>
        </motion.a>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-8 lg:gap-12">
          
          {/* Left side - Professional Profile Image */}
          <div className="flex-shrink-0 flex justify-center order-1 lg:order-1">
            <div className="relative">
              {/* Main Profile Image */}
              <div className="relative w-[25rem] h-[16.8rem] md:w-[20.4rem] md:h-[20.4rem] lg:w-96 lg:h-96 mx-auto">
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-0 border-white/10 backdrop-blur-sm">
                  <img
                    src={heroImage}
                    alt="Sai Krishna"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      objectPosition: '50% 30%',
                    }}
                  />
                </div>
                
                {/* Professional Tech Indicators */}
                <motion.div 
                  className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
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
                  className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
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
                  className="absolute top-1/4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
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
            </div>
          </div>

          {/* Right side - Text Content */}
          <div className="flex-3 order-2 lg:order-2 max-w-2xl">
            {/* Greeting */}
            <motion.div 
              className="mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl md:text-3xl lg:text-4xl text-light/75 font-light tracking-wide">
                Hello, I&apos;m
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span 
                className="gradient-text"
                style={{
                  background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #3B82F6, #8B5CF6)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient-shift 3s ease-in-out infinite'
                }}
              >
                Sai Krishna
              </span>
            </motion.h1>

            {/* Title */}
            <motion.div 
              className="mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl text-light font-semibold mb-2">
                Director of Engineering
              </h2>
              <div className="flex justify-center lg:justify-start items-center mb-6">
                <span className="text-lg md:text-xl text-light/75 mr-3">at</span>
                <img src={lambdaTestLogo} alt="LambdaTest Logo" className="w-32 md:w-40 h-auto" />
              </div>
            </motion.div>

            {/* Dynamic Role */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-light/75">
                Also a{' '}
                <span className="text-primary font-semibold transition-all duration-500 ease-in-out bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {roles[currentRoleIndex]}
                </span>
                <span className="text-primary animate-pulse ml-1">|</span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                onClick={onGetInTouch}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
              <motion.button
                onClick={onViewProjects}
                className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-dark transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Stats Section - Within Hero Section */}
        <motion.div 
          className="relative z-10 w-full max-w-4xl mx-auto pb-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              className="bg-surface/30 p-6 rounded-full border border-surface w-40 h-40 mx-auto flex flex-col items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-light/75 text-sm">Conference Talks</div>
            </motion.div>
            <motion.div 
              className="bg-surface/30 p-6 rounded-full border border-surface w-40 h-40 mx-auto flex flex-col items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-light/75 text-sm">Technical Articles</div>
            </motion.div>
            <motion.div 
              className="bg-surface/30 p-6 rounded-full border border-surface w-40 h-40 mx-auto flex flex-col items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-light/75 text-sm">Open Source Projects</div>
            </motion.div>
            <motion.div 
              className="bg-surface/30 p-6 rounded-full border border-surface w-40 h-40 mx-auto flex flex-col items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">13+</div>
              <div className="text-light/75">Years in Testing</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Gradient text animation styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradient-shift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        `
      }} />
    </section>
  );
};

export default LandingHero;
