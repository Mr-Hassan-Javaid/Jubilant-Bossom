import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const ManifestOverlay: React.FC<Props> = ({ onClose }) => {
  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-ink text-sand flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-500 overflow-y-auto selection:bg-sand selection:text-ink">
       {/* Header */}
       <div className="flex justify-between items-center p-6 border-b border-sand/10 sticky top-0 bg-ink/95 backdrop-blur-sm z-10">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-sand animate-pulse"></div>
                <div className="text-xs font-mono uppercase tracking-widest">Studio Aether // Manifest_v1.0</div>
            </div>
            <button onClick={onClose} className="hover:text-white transition-colors group flex items-center gap-2">
                <span className="text-xs font-mono uppercase hidden md:inline group-hover:opacity-100 opacity-0 transition-opacity">Close</span>
                <X className="w-6 h-6" />
            </button>
       </div>
       
       <div className="flex-1 max-w-5xl mx-auto px-6 py-20 md:py-32 flex flex-col justify-center">
            <h1 className="text-5xl md:text-8xl font-medium mb-16 leading-[0.85] tracking-tighter">
                CODE IS<br/>
                <span className="text-stone-600">THE MEDIUM.</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-mono text-sm leading-relaxed text-stone-400">
                <div className="space-y-8">
                    <p>
                        <span className="text-sand text-lg block mb-4 font-sans font-medium">The Anti-Smooth</span>
                        We reject the polished lie of modern interface design. We believe in the raw honesty of the pixel, the glitch, and the dither. 
                        Technology should feel like technology—sharp, precise, and occasionally chaotic.
                    </p>
                    <p>
                        <span className="text-sand text-lg block mb-4 font-sans font-medium">Systemic Beauty</span>
                        Our process is a dialogue between human intent and algorithmic serendipity. We don't just build products; we cultivate digital ecosystems 
                        that breathe, react, and evolve.
                    </p>
                </div>
                
                <div className="space-y-6 border-l border-sand/10 pl-8 md:pl-12">
                    <div>
                        <strong className="text-sand text-xs uppercase tracking-widest block mb-2">01 // PRECISION</strong>
                        <p>Every pixel serves a purpose. No rounded corners, no soft shadows. Only clarity.</p>
                    </div>
                    <div>
                        <strong className="text-sand text-xs uppercase tracking-widest block mb-2">02 // CHAOS</strong>
                        <p>Embrace the noise. Smoothness is stagnation. Texture is life.</p>
                    </div>
                    <div>
                        <strong className="text-sand text-xs uppercase tracking-widest block mb-2">03 // FUNCTION</strong>
                        <p>Aesthetics are nothing without utility. We build tools, not toys.</p>
                    </div>
                </div>
            </div>
       </div>
       
       <div className="p-6 border-t border-sand/10 text-center bg-ink">
            <button onClick={onClose} className="px-8 py-4 bg-sand text-ink text-xs font-mono uppercase tracking-widest hover:bg-white transition-colors font-bold">
                [ Acknowledge & Return ]
            </button>
       </div>
    </div>
  );
};