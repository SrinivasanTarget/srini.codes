import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return () => controls.stop();
  }, [value, duration, count]);

  return (
    <motion.span className="text-5xl md:text-6xl font-bold text-primary">
      {rounded}
    </motion.span>
  );
};

const About: React.FC = () => {
  // Statistics
  const conferencesCount = 50;
  const projectsCount = 40;
  const yearsExperience = 14;

  const stats = [
    { value: conferencesCount, label: 'Conference Talks', icon: '🎤', description: 'Global speaking engagements' },
    { value: projectsCount, label: 'Open Source Projects', icon: '💻', description: 'Active contributions' },
    { value: yearsExperience, label: 'Years in Engineering', icon: '🚀', description: 'Industry experience' },
  ];

  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto space-y-24 px-6 md:px-12 lg:px-24">
        {/* Hero Section - Centered */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-light leading-tight">
            Passion Fuels{' '}
            <span className="text-primary">Purpose!</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {/* Main Content Section - Biography Left, Statistics Right */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Biography Section - Left Side (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-dark border border-surface/30 rounded-2xl p-8 md:p-10 space-y-5">
              <h3 className="text-2xl font-bold text-primary mb-4">Professional Journey</h3>
              <div className="space-y-4 text-base text-light/80 leading-relaxed">
                <p>
                  Hello! I'm <span className="text-primary font-semibold">Sai Krishna</span>, a passionate technologist and leader in the software testing and automation space. As Director of Engineering at LambdaTest, I drive innovation in cloud-based testing platforms that serve millions of developers worldwide, enabling seamless cross-browser and mobile testing.
                </p>
                
                <p>
                  My journey in open source began with contributing to Appium, where I became a core maintainer and helped architect Appium 2.0. I've created multiple plugins including Device Farm, Wait Plugin, and Gestures Plugin that are used by thousands of developers globally. Recently, I've pioneered Model Context Protocol (MCP) servers for mobile automation, bridging AI and testing workflows.
                </p>
              </div>
            </div>

            <div className="bg-dark border border-surface/30 rounded-2xl p-8 md:p-10 space-y-5">
              <h3 className="text-2xl font-bold text-primary mb-4">Beyond the Code</h3>
              <div className="space-y-4 text-base text-light/80 leading-relaxed">
                <p>
                  As an international speaker, I've presented at <span className="text-primary font-semibold">50+ conferences</span> including SeleniumConf, AppiumConf, QuestForQuality, Belgrade Test Conference, AutomationGuild, TestμConf, Nordic Testing Days, and Agile India, sharing insights on mobile automation, clean code practices, and the future of testing.
                </p>
                
                <p>
                  Beyond the code, I'm a passionate <span className="text-primary font-semibold">sneakerhead</span> with an ever-growing collection, always hunting for the latest drops and rare finds. When I'm not coding or speaking, you'll find me on my skateboard—there's something about the rhythm of wheels on pavement that clears my mind and sparks creativity. These passions fuel my work just as much as my technical expertise, reminding me that innovation happens at the intersection of diverse interests.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Cards - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative bg-dark border border-surface/30 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, borderColor: '#64ffda' }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 text-center">
                  <div className="flex flex-col items-center gap-3 mb-3">
                    <span className="text-3xl">{stat.icon}</span>
                    <h3 className="text-primary font-mono text-xs uppercase tracking-wider">
                      {stat.label}
                    </h3>
                  </div>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-3xl font-bold text-primary">+</span>
                  </div>
                  <p className="text-light/60 text-xs font-mono">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default About;
