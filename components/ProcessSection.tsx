import React from 'react';
import { Scan, GitMerge, Terminal, Send } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      id: '01',
      title: 'Discover & Define',
      icon: Scan,
      desc: 'Deconstruct the problem space using data-driven research and user empathy patterns.',
    },
    {
      id: '02',
      title: 'Architect & Wire',
      icon: GitMerge,
      desc: 'Establish core flows and information hierarchy with low-fidelity algorithmic structures.',
    },
    {
      id: '03',
      title: 'Prototype & Code',
      icon: Terminal,
      desc: 'Inject fidelity through rapid React prototyping and WebGL interactions.',
    },
    {
      id: '04',
      title: 'Refine & Deploy',
      icon: Send,
      desc: 'Optimization loops for performance, accessibility, and visual dither aesthetics.',
    },
  ];

  return (
    <section className="w-full py-24 border-b border-ink/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-4 bg-ink"></div>
                    <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Workflow Protocol</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-ink">
                    The Process
                </h2>
            </div>
            <div className="hidden md:block max-w-xs text-right">
                <p className="text-xs font-mono text-stone-500 leading-relaxed">
                    Systematic creativity driven by code, chaos, and precise execution.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
          {steps.map((step, index) => (
            <div key={step.id} className="group relative bg-sand p-8 min-h-[320px] flex flex-col justify-between hover:bg-white transition-colors duration-300">
              
              {/* Dithered Background Pattern on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity duration-500"
                   style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='2' height='2' fill='%23000'/%3E%3C/svg%3E")`, backgroundSize: '4px 4px'}}>
              </div>

              <div className="relative z-10">
                <span className="block text-xs font-mono font-bold text-stone-400 mb-6 border-b border-stone-200 pb-2 w-fit">
                    STEP_{step.id}
                </span>
                <step.icon className="w-10 h-10 text-ink mb-4 stroke-1" />
                <h3 className="text-xl font-medium mb-3 text-ink">{step.title}</h3>
              </div>
              
              <div className="relative z-10">
                <p className="text-sm text-stone-600 leading-relaxed font-mono">
                    {step.desc}
                </p>
              </div>

              {/* Active Corner Marker */}
              <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-transparent group-hover:border-ink transition-colors duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};