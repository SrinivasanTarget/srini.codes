import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../portfolio/constants';
import AnimatedSection from './AnimatedSection';

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const Projects: React.FC = () => {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-light mb-8 flex items-center justify-center">
            <span className="text-primary font-mono text-2xl mr-4">02.</span>
            Some Things I've Built
            <span className="ml-6 h-px w-32 bg-surface"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => (
                <motion.div 
                    key={index} 
                    className="bg-surface p-6 rounded-lg shadow-lg group flex flex-col"
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-primary text-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><title>Folder</title><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                        </span>
                        <div className="flex items-center space-x-4 text-light/75 group-hover:text-primary">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><GithubIcon /></a>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><ExternalLinkIcon /></a>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-light mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                        <p className="text-light/75 text-sm">{project.description}</p>
                    </div>
                    <ul className="flex flex-wrap items-center mt-6 text-xs font-mono text-light/75">
                        {project.tags.map(tag => <li key={tag} className="mr-4">{tag}</li>)}
                    </ul>
                </motion.div>
            ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Projects;
