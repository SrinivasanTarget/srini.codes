import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { videos } from '../../portfolio/videos';
import AnimatedSection from './AnimatedSection';

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Get all unique tags
  const allTags = Array.from(new Set(videos.flatMap(video => video.tags))).sort();

  // Filter videos based on search term and selected tag, then sort by date (newest first)
  const filteredVideos = videos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === '' || video.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-light mb-8 flex items-center justify-center">
          Video Library
          <span className="ml-6 h-px w-32 bg-surface"></span>
        </h2>
        
        <p className="text-light/75 mb-8 max-w-2xl mx-auto text-center">
        Explore my collection of technical videos covering mobile automation, testing frameworks, 
        DevOps practices, and software engineering best practices.
      </p>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-surface rounded-lg text-light placeholder-light/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono"
          />
          <svg 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light/50"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2">
          <motion.button
            onClick={() => setSelectedTag('')}
            className={`px-4 py-2 rounded-full text-sm font-mono transition-colors duration-300 ${
              selectedTag === '' 
                ? 'bg-primary text-dark' 
                : 'bg-surface text-light/75 hover:text-primary hover:border hover:border-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          {allTags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-colors duration-300 ${
                selectedTag === tag 
                  ? 'bg-primary text-dark' 
                  : 'bg-surface text-light/75 hover:text-primary hover:border hover:border-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-light/50 font-mono text-sm">
          {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
          {selectedTag && ` in "${selectedTag}"`}
        </div>
      </div>

          {/* Videos Grid */}
          {filteredVideos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-surface rounded-lg overflow-hidden border border-surface hover:border-primary transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/640x360/2c2c2c/f5f5f5?text=Video+Thumbnail';
                    }}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-dark/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-dark/90 text-light text-xs px-2 py-1 rounded font-mono">
                      {video.duration}
                    </div>
                  )}
                </div>

                {/* Video Content */}
                <div className="p-4">
                  <h3 
                    className="text-lg font-bold text-light mb-2 hover:text-primary transition-colors cursor-pointer"
                    onClick={() => window.open(video.url, '_blank', 'noopener,noreferrer')}
                  >
                    {video.title}
                  </h3>
                  <p className="text-light/75 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {video.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {video.tags.length > 3 && (
                      <span className="text-light/50 text-xs px-2 py-1 font-mono">
                        +{video.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Published Date */}
                  <div className="text-light/50 text-xs font-mono">
                    {new Date(video.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎥</div>
          <h3 className="text-2xl font-bold text-light mb-2">No videos found</h3>
          <p className="text-light/75 mb-6">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <motion.button
            onClick={() => {
              setSearchTerm('');
              setSelectedTag('');
            }}
            className="px-6 py-3 border border-primary text-primary rounded font-mono hover:bg-primary/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Filters
          </motion.button>
        </div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default Videos;
