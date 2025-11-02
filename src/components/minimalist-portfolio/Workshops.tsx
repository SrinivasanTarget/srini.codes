import React from 'react';
import { motion } from 'framer-motion';
import { workshops } from '../../portfolio/workshops';
import AnimatedSection from './AnimatedSection';

const Workshops: React.FC = () => {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light">
            Workshops
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-light/70 text-lg max-w-3xl mx-auto mt-6">
            Explore hands-on workshops covering advanced Appium concepts, plugin development,
            and mobile automation best practices. Learn practical skills through interactive sessions.
          </p>
        </motion.div>

        {/* Workshops Grid */}
        {workshops.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {workshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card Container */}
                <div className="relative h-full bg-dark border border-surface/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/50">
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Image Section */}
                    <div className="relative h-64 bg-surface/30 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/40 to-transparent z-10"></div>
                      <img
                        src={new URL(`../../assets/images/${workshop.imageURL}`, import.meta.url).href}
                        alt={workshop.title}
                        className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x300/2c2c2c/64ffda?text=Workshop';
                        }}
                      />
                      {/* Workshop Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary px-3 py-1.5 rounded-full text-xs font-mono font-semibold">
                          WORKSHOP
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-8 flex flex-col">
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-light mb-3 group-hover:text-primary transition-colors duration-300">
                        {workshop.title || workshop.description}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-light/70 text-base leading-relaxed mb-6 flex-grow">
                        {workshop.subdescription}
                      </p>

                      {/* Location and CTA */}
                      <div className="space-y-4 pt-4 border-t border-surface/30">
                        {/* Location */}
                        {(workshop as any).location && (
                          <div className="flex items-center gap-2 text-light/60 text-sm">
                            <svg 
                              className="w-4 h-4 text-primary" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-mono">{(workshop as any).location}</span>
                          </div>
                        )}

                        {/* CTA Button */}
                        <motion.a
                          href={workshop.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 border border-primary text-primary rounded-lg font-mono text-sm hover:bg-primary hover:text-dark transition-all duration-300 group/btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Explore Workshop</span>
                          <svg 
                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-primary/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-primary/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🎓</div>
            <h3 className="text-3xl font-bold text-light mb-3">No workshops available</h3>
            <p className="text-light/60 max-w-md mx-auto">
              Check back soon for upcoming workshop offerings.
            </p>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default Workshops;
