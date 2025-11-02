import React from 'react';
import AnimatedSection from './AnimatedSection';
import { SOCIAL_LINKS } from '../../portfolio/constants';

const Contact: React.FC = () => {
  return (
    <AnimatedSection>
        <div className="max-w-xl mx-auto text-center">
            <p className="text-primary font-mono mb-2">07. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">Get In Touch</h2>
            <p className="text-light/75 mb-8">
                I'm currently open to new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll do my best to get back to you!
            </p>
            <a 
                href={SOCIAL_LINKS.email} 
                className="inline-block px-8 py-4 border border-primary text-primary rounded font-mono hover:bg-primary/10 transition-colors duration-300"
            >
                Say Hello
            </a>
        </div>
    </AnimatedSection>
  );
};

export default Contact;
