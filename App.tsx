import React, { useState } from 'react';
import DitherCanvas from './components/DitherCanvas';
import { BentoGrid, allProjects } from './components/BentoGrid';
import { ProcessSection } from './components/ProcessSection';
import { ToolkitSection } from './components/ToolkitSection';
import { AIChat } from './components/AIChat';
import { ManifestOverlay } from './components/ManifestOverlay';
import { ProjectDetailOverlay } from './components/ProjectDetailOverlay';
import { AboutOverlay } from './components/AboutOverlay';
import { CraftsmanOverlay } from './components/CraftsmanOverlay';
import { ContactOverlay } from './components/ContactOverlay';
import { Github, Twitter, Mail, ArrowDown } from 'lucide-react';
import { Project } from './types';

function App() {
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCraftsmanOpen, setIsCraftsmanOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Manual scroll handler to ensure accurate positioning with fixed header
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Header height + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-sand text-ink font-sans selection:bg-ink selection:text-sand relative overflow-x-hidden">
      
      {/* Overlays */}
      {isManifestOpen && <ManifestOverlay onClose={() => setIsManifestOpen(false)} />}
      {isAboutOpen && <AboutOverlay onClose={() => setIsAboutOpen(false)} onOpenContact={() => setIsContactOpen(true)} />}
      {isCraftsmanOpen && <CraftsmanOverlay onClose={() => setIsCraftsmanOpen(false)} />}
      {isContactOpen && <ContactOverlay onClose={() => setIsContactOpen(false)} />}
      {selectedProject && (
        <ProjectDetailOverlay 
            project={selectedProject} 
            onProjectSelect={setSelectedProject}
            onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Interactive Global Dither Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <DitherCanvas className="w-full h-full" fullscreen={true} />
      </div>

      {/* Static Grain Overlay (for texture depth) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.04] mix-blend-multiply" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 border-b border-ink/10 bg-sand/95 backdrop-blur-md flex justify-between items-center transition-all duration-300 shadow-sm">
        <div className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-ink cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          Studio Aether
        </div>
        <div className="flex gap-8 text-xs font-mono uppercase tracking-wider text-ink font-semibold">
          <button onClick={() => scrollToSection('work')} className="hover:text-stone-500 transition-colors hover:underline decoration-1 underline-offset-4">Work</button>
          <button onClick={() => scrollToSection('process')} className="hover:text-stone-500 transition-colors hover:underline decoration-1 underline-offset-4">Process</button>
          <button onClick={() => setIsAboutOpen(true)} className="hover:text-stone-500 transition-colors hover:underline decoration-1 underline-offset-4">About</button>
        </div>
      </nav>

      <div className="relative z-10"> {/* Content Wrapper */}

        {/* Hero Section */}
        <header className="relative w-full min-h-screen flex flex-col md:flex-row border-b border-ink/20 pt-16 md:pt-0">
          
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-24 md:py-0 relative z-10 bg-sand/80 backdrop-blur-sm md:bg-sand/60">
            <div className="max-w-lg">
              <div className="mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-ink animate-pulse"></div>
                  <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Available for hire</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tight mb-8">
                  DESIGN<br/>
                  ENGINEER
              </h1>
              
              <p className="text-sm md:text-base text-stone-600 font-mono max-w-sm leading-relaxed mb-10">
                Crafting digital artifacts at the intersection of algorithmic precision and organic chaos.
              </p>

              <div className="flex gap-4">
                  <button 
                    onClick={() => scrollToSection('work')} 
                    className="px-6 py-3 bg-ink text-sand text-xs font-mono uppercase tracking-wider hover:bg-stone-800 transition-colors border border-transparent"
                  >
                    View Projects
                  </button>
                  <button 
                    onClick={() => setIsManifestOpen(true)}
                    className="px-6 py-3 bg-transparent text-ink text-xs font-mono uppercase tracking-wider border border-ink hover:bg-ink hover:text-sand transition-colors"
                  >
                    Read Manifest
                  </button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-12 animate-bounce hidden md:block cursor-pointer" onClick={() => scrollToSection('work')}>
              <ArrowDown className="w-5 h-5 text-ink" />
            </div>
          </div>

          {/* Right Visual (High Contrast Dither Canvas) */}
          <div className="w-full md:w-1/2 h-[400px] md:h-auto relative bg-stone-200 border-t md:border-t-0 md:border-l border-ink overflow-hidden">
            <DitherCanvas className="w-full h-full" />
            
            {/* Overlay Text element */}
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-ink/40 pointer-events-none">
              INTERACTION_MODE: REACTIVE
            </div>
          </div>

        </header>

        {/* Projects Grid Section */}
        <section id="work" className="py-20 border-b border-ink/10 bg-[#EAE9E5]/80 backdrop-blur-sm">
          <div className="px-6 mb-8 max-w-7xl mx-auto flex justify-between items-end">
              <h2 className="text-4xl font-medium tracking-tighter">Selected Works</h2>
              <span className="font-mono text-xs text-stone-500">[ 2023 — 2024 ]</span>
          </div>
          <BentoGrid 
            onProjectSelect={setSelectedProject} 
            onBioSelect={() => setIsCraftsmanOpen(true)}
          />
        </section>

        {/* Development Toolkit Section (New) */}
        <div id="toolkit">
          <ToolkitSection />
        </div>

        {/* Process Section */}
        <div id="process">
          <ProcessSection />
        </div>

        {/* Footer */}
        <footer className="bg-ink text-sand py-20 px-6 border-t border-stone-800 relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div>
              <h3 className="text-2xl font-medium mb-6">Let's build the future.</h3>
              <p className="text-stone-400 font-mono text-sm max-w-xs mb-8 leading-relaxed">
                Open for collaborations on experimental web, AI interfaces, and product design systems.
              </p>
              <a href="mailto:hello@studioaether.dev" className="text-xl underline decoration-1 underline-offset-4 hover:text-white transition-colors">
                hello@studioaether.dev
              </a>
            </div>

            <div className="flex flex-col justify-between items-start md:items-end">
              <div className="flex gap-4 mb-8">
                <a 
                  href="https://github.com/Mr-Hassan-Javaid" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 border border-stone-700 hover:border-sand text-stone-400 hover:text-sand transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 border border-stone-700 hover:border-sand text-stone-400 hover:text-sand transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="p-2 border border-stone-700 hover:border-sand text-stone-400 hover:text-sand transition-all"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-right">
                <div className="text-[10px] font-mono text-stone-500 uppercase mb-1">
                  Location: San Francisco, CA
                </div>
                <div className="text-[10px] font-mono text-stone-600 uppercase">
                  © 2025 Studio Aether. All rights reserved.
                </div>
              </div>
            </div>

          </div>
        </footer>

      </div>

      {/* Floating Chat */}
      <AIChat onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}

export default App;