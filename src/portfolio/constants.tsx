import React from 'react';

export const SOCIAL_LINKS = {
  github: "https://github.com/saikrishna321",
  linkedin: "https://www.linkedin.com/in/sai-krishna-3755407b/",
  twitter: "https://twitter.com/saikrisv",
  email: "mailto:saidotkrishna@gmail.com"
};

export const SKILLS = [
  { name: 'TypeScript', icon: <TypeScriptIcon /> },
  { name: 'React', icon: <ReactIcon /> },
  { name: 'Next.js', icon: <NextJSIcon /> },
  { name: 'Node.js', icon: <NodeJSIcon /> },
  { name: 'Tailwind CSS', icon: <TailwindIcon /> },
  { name: 'Figma', icon: <FigmaIcon /> },
];

export const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce website with a modern design, product management, and a secure checkout process.",
    tags: ["React", "TypeScript", "Node.js", "Stripe"],
    image: "https://picsum.photos/seed/project1/400/300",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets, featuring various chart types and real-time data updates.",
    tags: ["React", "D3.js", "Tailwind CSS"],
    image: "https://picsum.photos/seed/project2/400/300",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management tool that helps teams organize, track, and manage their work efficiently.",
    tags: ["Next.js", "Firebase", "TypeScript"],
    image: "https://picsum.photos/seed/project3/400/300",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my skills and projects, built with a focus on animations and user experience.",
    tags: ["React", "Tailwind CSS"],
    image: "https://picsum.photos/seed/project4/400/300",
    liveUrl: "#",
    githubUrl: "#",
  },
];


// SVG Icons defined as components

function TypeScriptIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"><title>TypeScript</title><path d="M1.5 0 h21 l-1.91 21.563 L11.977 24 l-8.564-2.438 L1.5 0 Z m18.437 5.438 H6.062 l.312 3.5 h11.313 l-.313 3.5 H6.687 l.313 3.5 h10.687 l-.438 4.938 l-4.593 1.25 l-4.594-1.25 l-.312-3.5 h-3.5 l.625 7.0 L12 20.438 l6.812-1.875 L20.562 3.5 H3.438 l-.625-7.0 h17.125 Z"/></svg>
  )
}

function ReactIcon() {
    return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"><title>React</title><path d="M12.001 2.002c-5.522 0-10 4.478-10 10 0 5.523 4.478 10 10 10s10-4.477 10-10c0-5.522-4.478-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3.082-9.157c.08-.26.24-.48.48-.64.24-.16.52-.24.84-.24.32 0 .6.08.84.24.24.16.4.38.48.64l1.6 4.8c.08.24.04.52-.12.72-.16.2-.4.32-.68.32H5.401c-.28 0-.52-.12-.68-.32-.16-.2-.2-.48-.12-.72l1.6-4.8zM12 7.002c.28 0 .52.12.68.32.16.2.2.48.12.72l-1.6 4.8c-.08.26-.24.48-.48.64-.24.16-.52.24-.84.24s-.6-.08-.84-.24c-.24-.16-.4-.38-.48-.64l-1.6-4.8c-.08-.24-.04-.52.12-.72.16-.2.4-.32.68-.32H12zm5.682 3.843c.08.24.04.52-.12.72-.16.2-.4.32-.68.32H12.6c-.28 0-.52-.12-.68-.32-.16-.2-.2-.48-.12-.72l1.6-4.8c.08-.26.24-.48.48-.64.24-.16.52-.24.84-.24.32 0 .6.08.84.24.24.16.4.38.48.64l1.6 4.8z"/></svg>
    )
}

function NextJSIcon() {
    return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"><title>Next.js</title><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.071 18.788-2.143-4.232H7.714v4.232H5V5h2.714v4.714L10.071 5h2.5l-2.643 4.971L12.571 5h2.572l-2.714 5.214 2.857 8.574h-2.714l-1.786-5.893-1.786 5.893H9.929zM19 19h-2v-1.429a2.57 2.57 0 0 0-2.571-2.571H13V5h6v14z"/></svg>
    )
}

function NodeJSIcon() {
    return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"><title>Node.js</title><path d="M11.996 19.462c-2.32-.114-4.535-1.09-4.535-1.09l.487 2.455c.487 2.455 2.531 3.1 2.531 3.1s1.933.727 3.978 0c2.044-.728 2.531-3.045 2.531-3.045l.487-2.455s-2.215.976-4.535 1.09zm-2.155-2.71a17.22 17.22 0 0 1-1.218-1.579c-1.39-2.044-1.28-4.535.114-5.992.543-.543 1.28-.783 2.1-.84 1.09-.114 2.215.113 3.156.84.84.628 1.446 1.635 1.706 2.767l-.057.057c-.113-.057-.227-.057-.34-.057-.543 0-1.03.227-1.446.57l-.057-.057c-.454.454-.783 1.03-.896 1.635-.114.728.113 1.446.51 2.045l-.056.056s-1.09-.683-2.385-1.03zm.783-8.852c-.897 0-1.706.34-2.33.897-2.044 1.873-2.157 5.448-.34 7.662.628.783 1.532 1.446 2.61 1.707l1.76-8.966c-.68-.284-1.39-.284-2.044 0L9.85 3.127l1.76 8.91c.683.34 1.39.283 2.045 0l1.76-8.91-.34-1.76-8.286.727.628.34c.056 0 .056.057.056.057s.227.114.454.114c.227 0 .454-.114.454-.114l1.22-.628.226-.34c.057 0 .114 0 .114-.057zm-3.69 8.285c-.114.728.114 1.446.512 2.045l-1.106-5.56c-.057-.4-.057-.84.114-1.22.283-.628.953-1.03 1.646-1.03.51 0 .953.227 1.28.51l.057-.056-1.163 5.842c-.284.113-.568.283-.84.454z"/></svg>
    )
}

function TailwindIcon() {
    return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"><title>Tailwind CSS</title><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c-1.2,4.8,0.4,8,3.2,9.6c2.8,1.6,5.6,0.4,6.4-2.4c-2.4,1.2-4.4,0.4-5.2-1.2 c-1.2-2.4,0.4-4,2.4-4.4c2.8-0.8,4.4,0.4,4.8,2.8c-0.8-0.4-1.6-0.4-2.4,0c-1.6,0.4-2.4,2-2.4,3.6c0,2,1.2,3.2,3.2,3.2 c2.8,0,4.8-2.4,4.8-6.4C19.201,8.8,16.001,4.8,12.001,4.8z M12.001,12c-1.2,0-2.4,0.8-2.4,2c0,1.2,0.8,2,2.4,2s2.4-0.8,2.4-2 C14.401,12.8,13.601,12,12.001,12z"/></svg>
    )
}

function FigmaIcon() {
    return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"><title>Figma</title><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-18a6 6 0 0 1 6 6v6a6 6 0 1 1-12 0v-6a6 6 0 0 1 6-6zm0 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0v-6a3 3 0 0 0-3-3z"/></svg>
    )
}
