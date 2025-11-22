import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight, Cpu } from 'lucide-react';

interface Props {
  onProjectSelect: (project: Project) => void;
  onBioSelect: () => void;
}

export const allProjects: Project[] = [
  {
    id: 'p1',
    title: 'SYNTH_OS',
    category: 'PRODUCT DESIGN',
    description: 'A conceptual operating system for spatial computing interfaces.',
    fullDescription: 'SYNTH_OS represents a paradigm shift in spatial computing. Designed for the post-screen era, it utilizes gaze-tracking and hand gestures to manipulate windows in 3D space. The visual language strips away skeuomorphism in favor of pure data visualization and high-contrast HUD elements.',
    client: 'Internal R&D',
    year: '2024',
    role: 'Lead Designer',
    techStack: ['Unity', 'C#', 'Figma', 'Spline'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop', // 3D Abstract
    gridArea: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'p2',
    title: 'VOID_TYPE',
    category: 'UI/UX',
    description: 'Variable font family designed for high-velocity data displays.',
    fullDescription: 'Void_Type is a custom variable typeface engineered for readability in high-density information dashboards. It features specific ink-traps that look digital-native and weights that adjust automatically based on ambient light sensors.',
    client: 'Monotype Challenge',
    year: '2023',
    role: 'Typography & UI',
    techStack: ['Glyphs App', 'CSS Variables', 'React'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop', // Code/Type
    gridArea: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 'p3',
    title: 'KINETIC_LABS',
    category: 'PROTOTYPING',
    description: 'Experimental physics engine integration for web interactions.',
    fullDescription: 'A web-based playground exploring the intersection of Matter.js physics and DOM elements. This project proves that web interfaces can have mass, weight, and collision, making digital interactions feel tangible.',
    client: 'Personal',
    year: '2023',
    role: 'Creative Dev',
    techStack: ['Matter.js', 'React-Spring', 'Canvas API'],
    // Fixed image URL to a more reliable physics/tech abstract image
    imagePlaceholder: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    gridArea: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'p4',
    title: 'ECHO_CHAMBER',
    category: 'PROTOTYPING',
    description: 'Real-time audio reactivity suite for live performances.',
    fullDescription: 'Echo_Chamber visualizes audio frequencies in real-time using the Web Audio API. Used in live DJ sets, it generates fractal geometry that pulses with the beat, creating a synesthetic experience for the audience.',
    client: 'Underground SF',
    year: '2023',
    role: 'Visualist',
    techStack: ['Three.js', 'Web Audio API', 'GLSL'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', // Glitch/Abstract
    gridArea: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 'p5',
    title: 'HYPER_DASH',
    category: 'UI/UX',
    description: 'Automotive HMI system for autonomous fleet management.',
    fullDescription: 'Hyper_Dash is a centralized control system for autonomous trucking fleets. The UI prioritizes alert hierarchy and map data, ensuring operators can monitor hundreds of vehicles simultaneously with minimal cognitive load.',
    client: 'Volvo Trucks (Concept)',
    year: '2022',
    role: 'Product Designer',
    techStack: ['Figma', 'Protopie', 'After Effects'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', // Data/Dashboard
    gridArea: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'p6',
    title: 'FLUX_CORE',
    category: 'PRODUCT DESIGN',
    description: 'Hardware interface design for a modular synthesizer.',
    fullDescription: 'Physical product design for a Eurorack synthesizer module. The focus was on knob ergonomics, jack spacing, and a clear distinct panel layout that remains readable in dark club environments.',
    client: 'Modular Systems',
    year: '2022',
    role: 'Industrial Design',
    techStack: ['SolidWorks', 'Rendering', 'Human Factors'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', // Hardware
    gridArea: 'md:col-span-1 md:row-span-1',
  }
];

const CATEGORIES = ['ALL', 'PRODUCT DESIGN', 'UI/UX', 'PROTOTYPING'];

export const BentoGrid: React.FC<Props> = ({ onProjectSelect, onBioSelect }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredProjects = allProjects.filter(p => 
    activeFilter === 'ALL' || p.category === activeFilter
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0">
      
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-ink/10 pb-4 items-center">
        {CATEGORIES.map(cat => (
            <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] md:text-xs font-mono uppercase px-3 py-2 border transition-all duration-200 font-medium tracking-wider ${
                    activeFilter === cat 
                    ? 'bg-ink text-sand border-ink' 
                    : 'bg-transparent text-stone-400 border-transparent hover:border-ink/20 hover:text-ink'
                }`}
            >
                {cat}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] md:auto-rows-[200px] gap-4">
        
        {/* Bio Data Card */}
        {activeFilter === 'ALL' && (
            <div 
              onClick={onBioSelect}
              className="bg-ink text-sand p-6 md:col-span-2 md:row-span-1 flex flex-col justify-between border border-ink rounded-none cursor-pointer group hover:bg-stone-900 transition-all relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <ArrowUpRight className="w-12 h-12 text-sand" />
                </div>

                <div className="flex justify-between items-start relative z-10">
                  <Cpu className="w-6 h-6 text-stone-400 group-hover:text-sand transition-colors" />
                  <span className="text-xs font-mono tracking-widest opacity-60">BIO_DATA_01</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-medium leading-tight mb-2 underline decoration-transparent group-hover:decoration-sand underline-offset-4 transition-all">Digital Craftsman</h3>
                  <p className="text-sm text-stone-400 font-mono group-hover:text-stone-300">
                      Bridging the gap between rigorous engineering and expressive interaction design.
                  </p>
                </div>
            </div>
        )}

        {/* Projects */}
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => onProjectSelect(project)}
            className={`cursor-pointer bg-sand border border-ink/10 relative group overflow-hidden flex flex-col rounded-none ${activeFilter === 'ALL' ? project.gridArea : 'md:col-span-2 md:row-span-1'}`}
          >
            {/* Image Background */}
            <div className="absolute inset-0 z-0 bg-stone-300">
               <img 
                 src={project.imagePlaceholder} 
                 alt={project.title}
                 loading="lazy"
                 className="block w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 mix-blend-multiply group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto p-4 bg-sand/95 backdrop-blur-md border-t border-ink/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
               <div className="flex justify-between items-center mb-1">
                 <span className="text-[10px] font-bold tracking-widest uppercase text-stone-500">{project.category}</span>
                 <ArrowUpRight className="w-4 h-4 text-ink" />
               </div>
               <h3 className="text-lg font-bold text-ink mb-1">{project.title}</h3>
               <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{project.description}</p>
            </div>
            
            {/* Static Label (visible when not hovering) */}
            <div className="absolute top-4 left-4 z-10 bg-sand px-2 py-1 border border-ink/10 group-hover:opacity-0 transition-opacity duration-300">
              <span className="text-xs font-mono font-bold">{project.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};