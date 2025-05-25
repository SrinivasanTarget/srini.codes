import { projects } from '../../portfolio/projects'
import Project from '../../components/project/Project' // Import the Project component
// NavigationArrow import might be needed if we add "See all projects" link back
// import NavigationArrow from '../../components/navigationArrow/NavigationArrow' 

export default function Projects() {
  // Determine number of projects to show. For now, let's show up to 3 for a common layout.
  // The original showed 2 in a custom layout, then implied more elsewhere.
  // This section in Home.tsx is a preview.
  const projectsToShow = projects.slice(0, 3);

  return (
    // Changed id to 'projects' to match nav link. Original was 'opensource'.
    // Simplified padding, relying on section padding in Home.tsx.
    <div className='container mx-auto px-4 sm:px-6 lg:px-8' id='projects'> 
      <div className='text-center mb-12 md:mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-custom-highlight'>Open Source Contributions</h2>
        <p className='text-lg md:text-xl text-custom-gray-medium mt-2'>
          I love contributing to Open Source Projects. Here are a few I'm passionate about:
        </p>
      </div>
      {/* Grid for project cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
        {projectsToShow.map((project, i) => (
          // The Project component itself has col-span-4, which is for a 4-col or 12-col base grid.
          // Here, we are defining the grid spots for each Project card.
          // So, Project component's outer div should ideally not have col-span.
          // For now, this will work, but Project's outer div could be simplified.
          <Project key={i} project={project} />
        ))}
      </div>
      {/* 
        If a "See all projects" link is desired later, NavigationArrow can be added here.
        Example:
        <div className='text-center mt-12'>
          <NavigationArrow arrow={{ link: '#', context: 'See all my projects' }} /> 
        </div>
      */}
       {/* Removed the large spacer div, section padding should handle spacing */}
    </div>
  )
}
