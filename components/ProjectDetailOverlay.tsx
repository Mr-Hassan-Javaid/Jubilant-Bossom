import React, { useEffect } from 'react';
import { X, ArrowUpRight, Calendar, User, Code, ArrowRight, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { allProjects } from './BentoGrid';

interface Props {
  project: Project;
  onProjectSelect: (project: Project) => void;
  onClose: () => void;
}

export const ProjectDetailOverlay: React.FC<Props> = ({ project, onProjectSelect, onClose }) => {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Find current index for navigation logic
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const nextIndex = (currentIndex + 1) % allProjects.length;
  const nextProject = allProjects[nextIndex];

  return (
    <div className="fixed inset-0 z-[60] bg-sand/95 backdrop-blur-xl flex justify-center items-center p-4 animate-in fade-in duration-300">
      
      {/* Vertical Carousel Navigation (Desktop Only) - Refined & Minimal */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[70] hidden md:flex flex-col items-center gap-3 py-4">
        {allProjects.map((p, idx) => {
          const isCurrent = p.id === project.id;
          const distance = Math.abs(idx - currentIndex);
          
          // Sizing Logic - Much smaller and refined
          let containerClass = "w-6 h-6 opacity-40 hover:opacity-100 hover:scale-110 grayscale";
          let imgClass = "grayscale";
          
          if (isCurrent) {
            containerClass = "w-12 h-12 opacity-100 shadow-lg scale-100 ring-1 ring-ink ring-offset-2 ring-offset-sand";
            imgClass = "grayscale-0";
          } else if (distance === 1) {
            containerClass = "w-8 h-8 opacity-70 hover:opacity-100 hover:scale-105 hover:grayscale-0";
            imgClass = "grayscale";
          }

          return (
            <button
              key={p.id}
              onClick={() => onProjectSelect(p)}
              className={`relative rounded-full overflow-hidden transition-all duration-500 ease-out group ${containerClass}`}
            >
               <img 
                 src={p.imagePlaceholder} 
                 alt={p.title} 
                 className={`w-full h-full object-cover transition-all duration-500 ${imgClass} group-hover:grayscale-0`}
               />
               
               {/* Minimal Tooltip */}
               <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                 <div className="bg-ink text-sand text-[10px] font-mono uppercase px-2 py-1 whitespace-nowrap shadow-sm">
                   {p.title}
                 </div>
                 {/* Tiny triangle connector */}
                 <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[4px] border-l-ink"></div>
               </div>
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-5xl bg-stone-50 border border-ink shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col relative animate-in zoom-in-95 duration-300 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-ink/20">
        
        {/* Top Bar */}
        <div className="sticky top-0 bg-ink text-sand p-4 flex justify-between items-center z-10 shrink-0">
           <div className="flex items-center gap-3">
             <span className="font-mono text-xs uppercase tracking-[0.2em]">Case_Study // {project.id}</span>
             <div className="h-px w-8 bg-stone-600 hidden md:block"></div>
             <span className="font-mono text-xs uppercase text-stone-400 hidden md:block">{project.category}</span>
           </div>
           <button onClick={onClose} className="group flex items-center gap-2 hover:text-white transition-colors">
             <span className="text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
             <div className="border border-stone-600 p-1 group-hover:bg-sand group-hover:text-ink transition-colors">
                <X className="w-4 h-4" />
             </div>
           </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col md:flex-row h-full">
          
          {/* Left: Image Area */}
          <div className="w-full md:w-1/2 bg-stone-200 relative border-b md:border-b-0 md:border-r border-ink/10 group h-auto md:min-h-[600px]">
            <img 
              src={project.imagePlaceholder} 
              alt={project.title}
              className="block w-full h-auto md:h-full object-cover grayscale contrast-125 mix-blend-multiply group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')]"></div>
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            
            <h2 className="text-3xl md:text-6xl font-medium tracking-tighter leading-none mb-8 text-ink break-words">
              {project.title}
            </h2>

            <div className="flex flex-wrap gap-6 mb-10 border-b border-ink/10 pb-8">
                {project.client && (
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase text-stone-500 flex items-center gap-1"><User className="w-3 h-3"/> Client</span>
                        <span className="text-sm font-medium">{project.client}</span>
                    </div>
                )}
                {project.year && (
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase text-stone-500 flex items-center gap-1"><Calendar className="w-3 h-3"/> Year</span>
                        <span className="text-sm font-medium">{project.year}</span>
                    </div>
                )}
                {project.role && (
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase text-stone-500 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> Role</span>
                        <span className="text-sm font-medium">{project.role}</span>
                    </div>
                )}
            </div>

            <div className="prose prose-stone max-w-none mb-10 flex-grow">
              <p className="text-lg leading-relaxed font-light text-stone-800">
                {project.fullDescription || project.description}
              </p>
              <p className="text-sm text-stone-500 mt-4 leading-relaxed">
                  The objective was to deconstruct traditional interfaces and rebuild them with a focus on latency, brutalist aesthetics, and user agency. By leveraging WebGL and React, we achieved a runtime performance that feels native, wrapped in a visual language that feels alien yet familiar.
              </p>
            </div>

            {project.techStack && (
                <div className="mb-8">
                    <span className="text-[10px] font-mono uppercase text-stone-500 flex items-center gap-1 mb-3"><Code className="w-3 h-3"/> Tech Stack</span>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-ink text-sand text-xs font-mono uppercase">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Mobile Next Button (bottom) - Slightly refined */}
            <div className="md:hidden mt-auto pt-8 border-t border-ink/10">
                <button 
                    onClick={() => onProjectSelect(nextProject)}
                    className="w-full flex justify-between items-center text-xs font-mono uppercase font-bold text-ink border border-ink p-4 hover:bg-ink hover:text-sand transition-all group"
                >
                    <span>Next Project</span>
                    <div className="flex items-center gap-2">
                        <span className="opacity-50">{nextProject.title}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>
            </div>

            {/* Desktop Next Link (text based, minimalistic alternative to carousel) */}
            <div className="hidden md:flex justify-end mt-4 pt-4 border-t border-ink/10">
                 <button 
                    onClick={() => onProjectSelect(nextProject)}
                    className="text-xs font-mono uppercase text-stone-400 hover:text-ink transition-colors flex items-center gap-2 group"
                 >
                    <span>Next: {nextProject.title}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                 </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};