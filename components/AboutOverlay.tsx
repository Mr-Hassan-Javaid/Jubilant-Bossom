import React, { useEffect, useState } from 'react';
import { X, Fingerprint, Target, Zap, ArrowRight } from 'lucide-react';

interface Props {
  onClose: () => void;
  onOpenContact?: () => void;
}

interface SystemItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

const systemItems: SystemItem[] = [
  {
    id: '01',
    title: 'Product Strategy',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
    description: 'Aligning technical feasibility with business goals. I define the "why" before the "how", creating sustainable product roadmaps that prioritize user value and market viability.'
  },
  {
    id: '02',
    title: 'UI/UX Systems',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    description: 'Architecting atomic design libraries. I build consistent, accessible, and scalable interface systems that streamline development and ensure visual harmony across all touchpoints.'
  },
  {
    id: '03',
    title: 'Full-Stack Dev',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    description: 'Engineering performant applications with React, Node.js, and TypeScript. My focus is on clean architecture, type safety, and minimizing technical debt for long-term maintainability.'
  },
  {
    id: '04',
    title: 'Creative Prototyping',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
    description: 'Validating concepts through high-fidelity code. I use WebGL and interaction design tools to build functional prototypes that test physics, animation, and user flow before production.'
  }
];

export const AboutOverlay: React.FC<Props> = ({ onClose, onOpenContact }) => {
  const [activeItem, setActiveItem] = useState<SystemItem | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-sand flex flex-col overflow-y-auto animate-in slide-in-from-right duration-500">
       
       {/* Nav/Header */}
       <div className="sticky top-0 z-[110] flex justify-between items-center px-6 py-6 bg-sand/95 backdrop-blur-md border-b border-ink/10">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] font-bold">About_The_Designer</h2>
          <button onClick={onClose} className="p-2 hover:bg-ink hover:text-sand transition-colors border border-transparent hover:border-ink">
            <X className="w-6 h-6" />
          </button>
       </div>

       <div className="max-w-4xl mx-auto w-full px-6 py-20 relative">
          
          {/* Header */}
          <div className="mb-24">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8">
              AETHER<br/>STUDIO
            </h1>
            <div className="flex items-start gap-4 text-stone-600 max-w-xl">
                <div className="w-20 h-[1px] bg-ink mt-3 shrink-0"></div>
                <p className="text-lg font-light leading-relaxed">
                   I am a multidisciplinary Design Engineer based in San Francisco. I blend technical architecture with avant-garde art direction to create digital products that feel significant.
                </p>
            </div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            
            {/* Section 1: Who I am */}
            <div className="space-y-6">
               <div className="flex items-center gap-2 text-ink/50">
                 <Fingerprint className="w-5 h-5" />
                 <span className="font-mono text-xs uppercase tracking-widest">Who I Am</span>
               </div>
               <h3 className="text-2xl font-medium">The Hybrid Interface</h3>
               <p className="text-stone-600 leading-relaxed text-sm">
                  I don't fit neatly into a box. I am as comfortable in a Figma canvas as I am in a VS Code terminal. My background spans industrial design, full-stack engineering, and generative art. This hybrid perspective allows me to solve problems holistically—ensuring the code honors the design, and the design respects the medium.
               </p>
            </div>

            {/* Section 2: What I Do */}
            <div className="space-y-6">
               <div className="flex items-center gap-2 text-ink/50">
                 <Target className="w-5 h-5" />
                 <span className="font-mono text-xs uppercase tracking-widest">What I Do</span>
               </div>
               <h3 className="text-2xl font-medium">Systemic Creation</h3>
               <div className="flex flex-col border-t border-ink/10">
                  {systemItems.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => setActiveItem(item)}
                        className="flex justify-between items-center border-b border-ink/10 py-3 cursor-pointer group hover:bg-ink/5 transition-all px-2 -mx-2 text-left"
                    >
                        <span className="group-hover:translate-x-2 transition-transform duration-300 text-sm font-medium flex items-center gap-2">
                            {item.title}
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-stone-400" />
                        </span>
                        <span className="text-stone-400 font-mono text-xs group-hover:text-ink transition-colors">{item.id}</span>
                    </button>
                  ))}
               </div>
            </div>

             {/* Section 3: Why Choose Me */}
             <div className="md:col-span-2 bg-ink text-sand p-10 md:p-16 relative overflow-hidden group">
               {/* Decoration */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-20 group-hover:opacity-30 transition-opacity"></div>

               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                    <div className="flex items-center gap-2 text-stone-400 mb-6">
                        <Zap className="w-5 h-5" />
                        <span className="font-mono text-xs uppercase tracking-widest">Why Choose Me</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-medium leading-tight mb-4">
                        Not just a designer.<br/>A builder.
                    </h3>
                 </div>
                 <div className="flex flex-col justify-center">
                    <p className="text-stone-300 leading-relaxed mb-8">
                        Most portfolios are static images. Mine is running code. I bring that same level of execution to your projects. I don't just hand off mockups; I deliver production-ready assets, design systems that scale, and logic that works.
                    </p>
                    <button 
                        onClick={() => {
                            onClose();
                            onOpenContact?.();
                        }} 
                        className="self-start border border-sand px-6 py-3 text-xs font-mono uppercase hover:bg-sand hover:text-ink transition-colors"
                    >
                        Start the Process
                    </button>
                 </div>
               </div>
            </div>
          </div>

          {/* Modal Popup for Capabilities */}
          {activeItem && (
            <div 
                className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-sand/30 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={() => setActiveItem(null)}
            >
                <div 
                    className="w-full max-w-[400px] bg-ink text-sand shadow-2xl relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-stone-800"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button 
                        onClick={() => setActiveItem(null)}
                        className="absolute top-3 right-3 z-20 p-2 bg-black/40 hover:bg-sand hover:text-ink backdrop-blur-md border border-white/10 transition-all rounded-none"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* Image */}
                    <div className="h-48 w-full relative overflow-hidden">
                        <img 
                            src={activeItem.image} 
                            alt={activeItem.title} 
                            className="w-full h-full object-cover opacity-80 grayscale mix-blend-overlay contrast-125" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
                        
                        {/* ID Tag */}
                        <div className="absolute bottom-3 left-4 font-mono text-xs text-stone-400 bg-black/50 px-2 py-1 backdrop-blur-sm border border-white/10">
                            {activeItem.id}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                        <h3 className="text-2xl font-medium mb-4 text-white">{activeItem.title}</h3>
                        <p className="text-sm font-mono text-stone-400 leading-relaxed">
                            {activeItem.description}
                        </p>
                    </div>

                    {/* Decorative footer line */}
                    <div className="h-1 w-full bg-stone-800 mt-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-sand w-1/3 animate-[shimmer_2s_infinite_linear]"></div>
                    </div>
                </div>
            </div>
          )}
       </div>
    </div>
  );
};