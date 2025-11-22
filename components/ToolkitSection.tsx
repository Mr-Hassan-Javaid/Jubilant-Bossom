import React from 'react';
import { Code2, Cpu, Palette, Terminal, Database, Layout, Box, Layers, Wrench } from 'lucide-react';

export const ToolkitSection: React.FC = () => {
  const categories = [
    {
      title: "Engineering Core",
      icon: Terminal,
      description: "Foundational technologies for scalable applications.",
      skills: ["TypeScript", "React / Next.js", "Node.js", "PostgreSQL", "Python"]
    },
    {
      title: "Creative Engineering",
      icon: Cpu,
      description: "Tools for immersive and interactive web experiences.",
      skills: ["WebGL / Three.js", "GLSL Shaders", "Generative AI / Gemini", "Framer Motion", "Canvas API"]
    },
    {
      title: "Design & Prototyping",
      icon: Palette,
      description: "Visualizing systems before writing a single line of code.",
      skills: ["Figma", "Blender 3D", "Spline", "Adobe Suite", "Linear"]
    }
  ];

  return (
    <section className="w-full py-24 bg-ink text-sand relative border-b border-stone-800">
       {/* Section Header */}
       <div className="max-w-7xl mx-auto px-6 mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-4 bg-sand"></div>
                        <span className="font-mono text-xs uppercase tracking-widest text-stone-400">Technical Arsenal</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-sand">Development Toolkit</h2>
                </div>
                <div className="max-w-xs text-left md:text-right">
                    <p className="text-xs font-mono text-stone-500 leading-relaxed">
                        A curated selection of instruments for digital fabrication.
                    </p>
                </div>
            </div>
       </div>

       {/* Grid */}
       <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800 border border-stone-800">
             {categories.map((cat, idx) => (
                <div key={idx} className="bg-ink p-8 md:p-10 min-h-[320px] relative group hover:bg-stone-900 transition-colors duration-500">
                    
                    {/* Header */}
                    <div className="mb-10 relative z-10">
                        <cat.icon className="w-8 h-8 text-stone-500 group-hover:text-sand transition-colors duration-300 mb-6" />
                        <h3 className="text-xl font-medium text-sand mb-2">{cat.title}</h3>
                        <p className="text-xs text-stone-500 font-mono leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-0 group-hover:h-auto overflow-hidden">
                            {cat.description}
                        </p>
                    </div>
                    
                    {/* Skills List */}
                    <ul className="space-y-3 relative z-10">
                        {cat.skills.map(skill => (
                            <li key={skill} className="flex items-center gap-3 text-sm font-mono text-stone-400 group-hover:text-sand transition-colors duration-300">
                                <div className="w-1 h-1 bg-stone-700 group-hover:bg-sand transition-colors duration-300"></div>
                                {skill}
                            </li>
                        ))}
                    </ul>

                    {/* Decorative Number */}
                    <div className="absolute top-8 right-8 text-4xl font-mono font-bold text-stone-800 group-hover:text-stone-800/50 transition-colors select-none pointer-events-none">
                        0{idx + 1}
                    </div>
                    
                    {/* Hover Corner Effect */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-l border-t border-transparent group-hover:border-stone-700 transition-all duration-500"></div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};