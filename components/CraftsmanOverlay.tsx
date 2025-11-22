
import React, { useEffect } from 'react';
import { X, Hammer, PenTool, Monitor, Cpu } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const CraftsmanOverlay: React.FC<Props> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-stone-100/50 backdrop-blur-xl flex justify-center items-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-4xl bg-white border border-ink shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-ink text-sand p-6 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Hammer className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">The_Digital_Craftsman</span>
          </div>
          <button onClick={onClose} className="p-2 border border-stone-600 hover:bg-sand hover:text-ink hover:border-sand transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Area */}
        <div className="p-8 md:p-12 border-b border-ink/10 bg-stone-50">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6 leading-tight">
            Logic as Material.<br/>Code as Chisel.
          </h1>
          <p className="text-lg md:text-xl font-light text-stone-600 max-w-2xl leading-relaxed">
            The role of the Digital Craftsman is not just to assemble frameworks, but to understand the grain of the web. It is a discipline that values performance as much as aesthetics, and maintainability as much as velocity.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink/10">
          
          {/* Philosophy */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6 text-ink">
              <PenTool className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Philosophy</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed mb-4">
              <strong className="text-ink block mb-1">Build for Durability</strong>
              Digital artifacts degrade not through rust, but through debt. I write code that is self-documenting, strongly typed, and modular by default.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              <strong className="text-ink block mb-1">Interaction is Narrative</strong>
              Every hover state, transition, and loader tells a story about the system's health and intent. These micro-interactions are where the craftsmanship shines.
            </p>
          </div>

          {/* Methodology */}
          <div className="p-8">
             <div className="flex items-center gap-2 mb-6 text-ink">
              <Cpu className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Methodology</span>
            </div>
             <ul className="space-y-4">
               <li className="block">
                 <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Step 01</span>
                 <span className="text-sm font-medium">Component Atomization</span>
               </li>
               <li className="block">
                 <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Step 02</span>
                 <span className="text-sm font-medium">Type-Safe Architecture</span>
               </li>
               <li className="block">
                 <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Step 03</span>
                 <span className="text-sm font-medium">Performance Budgeting</span>
               </li>
               <li className="block">
                 <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Step 04</span>
                 <span className="text-sm font-medium">Accessibility Auditing</span>
               </li>
             </ul>
          </div>

          {/* Tooling */}
          <div className="p-8 bg-stone-50">
             <div className="flex items-center gap-2 mb-6 text-ink">
              <Monitor className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">The Workbench</span>
            </div>
            <div className="flex flex-wrap gap-2">
               <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">VS Code</span>
               <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Figma</span>
               <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Terminal</span>
               <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Linear</span>
               <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Raycast</span>
               <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Blender</span>
            </div>
            <div className="mt-8 pt-8 border-t border-ink/5">
              <p className="text-xs text-stone-500 font-mono leading-relaxed">
                "A poor craftsman blames his tools. A master craftsman builds his own."
              </p>
            </div>
          </div>

        </div>
        
        {/* Footer Action */}
        <div className="p-6 border-t border-ink/10 bg-stone-50 flex justify-end">
           <button onClick={onClose} className="px-6 py-3 bg-ink text-sand text-xs font-mono uppercase hover:bg-stone-800 transition-colors">
             Close File
           </button>
        </div>
      </div>
    </div>
  );
};
