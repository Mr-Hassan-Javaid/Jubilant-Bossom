
import React, { useEffect } from 'react';
import { X, Hammer } from 'lucide-react';
import { DigitalCraftsmanTabs } from './DigitalCraftsmanTabs';

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

        {/* Tabs Content */}
        <div className="p-8 md:p-12">
          <DigitalCraftsmanTabs />
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
