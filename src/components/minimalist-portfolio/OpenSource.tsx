import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../portfolio/projects';
import AnimatedSection from './AnimatedSection';

interface GitHubStats {
  stars: number;
  forks: number;
  language: string | null;
}

const OpenSource: React.FC = () => {
  const [githubStats, setGithubStats] = useState<Record<string, GitHubStats>>({});

  useEffect(() => {
    const fetchStats = async () => {
      const stats: Record<string, GitHubStats> = {};
      
      for (const project of projects) {
        if (project.source.includes('github.com')) {
          try {
            const sourcePath = project.source.split('github.com/')[1];
            if (sourcePath) {
              const response = await fetch(`https://api.github.com/repos/${sourcePath}`);
              if (response.ok) {
                const data = await response.json();
                stats[project.source] = {
                  stars: data.stargazers_count || 0,
                  forks: data.forks_count || 0,
                  language: data.language || null,
                };
              }
            }
          } catch (error) {
            console.error(`Failed to fetch stats for ${project.title}:`, error);
          }
        }
      }
      
      setGithubStats(stats);
    };

    fetchStats();
  }, []);

  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-light mb-8 flex items-center justify-center">
          Open Source
          <span className="ml-6 h-px w-32 bg-surface"></span>
        </h2>
        
        <p className="text-light/75 mb-8 max-w-2xl mx-auto text-center">
        Contributing to open source projects that advance mobile automation, testing frameworks, 
        and developer tools. Explore the projects I've worked on and contributed to.
      </p>

        {/* Open Source Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const stats = githubStats[project.source];
            const imagePath = new URL(`../../assets/images/${project.imgSource}`, import.meta.url).href;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface rounded-lg overflow-hidden border border-surface hover:border-primary transition-all duration-300 group"
                whileHover={{ y: -8 }}
              >
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-dark/50 flex items-center justify-center overflow-hidden p-6">
                    <img
                      src={imagePath}
                      alt={project.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/200x200/2c2c2c/64ffda?text=' + encodeURIComponent(project.title);
                      }}
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-primary font-mono text-xs">OPEN SOURCE</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-light mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-light/75 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* GitHub Stats */}
                    {stats && project.source.includes('github.com') && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center text-light/75 text-xs">
                          <svg 
                            className="w-4 h-4 mr-1 text-primary" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                          <span className="font-mono">{stats.stars}</span>
                        </div>
                        <div className="flex items-center text-light/75 text-xs">
                          <svg 
                            className="w-4 h-4 mr-1 text-primary" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-mono">{stats.forks}</span>
                        </div>
                        {stats.language && (
                          <div className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono">
                            {stats.language}
                          </div>
                        )}
                      </div>
                    )}

                    {/* View Repository Button */}
                    <div className="flex items-center text-primary text-sm font-mono group-hover:underline">
                      View Repository
                      <svg 
                        className="ml-2 w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💻</div>
            <h3 className="text-2xl font-bold text-light mb-2">No open source projects</h3>
            <p className="text-light/75">
              Check back soon for open source contributions.
            </p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default OpenSource;
