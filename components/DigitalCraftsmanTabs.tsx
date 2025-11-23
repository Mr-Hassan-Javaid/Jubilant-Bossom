/**
 * DigitalCraftsmanTabs Component
 * 
 * A vertical tab layout with engraved text styling and glassmorphism content card.
 * 
 * Features:
 * - Left-side vertical tab list with engraved (inner-shadow) text effect
 * - Active tab highlight with subtle glow
 * - Right-side glassmorphism bento-style content card
 * - Smooth fade + slide animations using Framer Motion
 * - Both tabs and card remain visible simultaneously on desktop (lg breakpoint)
 * - Responsive: stacks vertically on smaller screens
 * - Full keyboard accessibility with ARIA attributes
 * 
 * To extend:
 * 1. Add new tab entries to the `tabs` array
 * 2. Add corresponding content to the `tabContents` array
 * 3. Update the `TabId` type to include new tab IDs
 * 
 * Design tokens used:
 * - Colors: ink (#1A1A18), sand (#E6E5E0), stone shades
 * - Typography: Space Grotesk (mono), Inter (sans)
 * - Spacing: Tailwind default scale
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Cpu, Monitor, Code2, Palette, Terminal, FileCode, Zap, Box } from 'lucide-react';

type TabId = 'philosophy' | 'methodology' | 'workbench';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TabContent {
  id: TabId;
  content: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'philosophy', label: 'Philosophy', icon: PenTool },
  { id: 'methodology', label: 'Methodology', icon: Cpu },
  { id: 'workbench', label: 'The Workbench', icon: Monitor },
];

const tabContents: TabContent[] = [
  {
    id: 'philosophy',
    content: (
      <div className="space-y-6">
        <div className="group">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-1 h-1 bg-ink rounded-full mt-2 opacity-60"></div>
            <strong className="text-ink text-base font-medium tracking-tight">Build for Durability</strong>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed ml-4 pl-3 border-l border-stone-200">
            Digital artifacts degrade not through rust, but through debt. I write code that is self-documenting, strongly typed, and modular by default.
          </p>
        </div>
        <div className="group">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-1 h-1 bg-ink rounded-full mt-2 opacity-60"></div>
            <strong className="text-ink text-base font-medium tracking-tight">Interaction is Narrative</strong>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed ml-4 pl-3 border-l border-stone-200">
            Every hover state, transition, and loader tells a story about the system's health and intent. These micro-interactions are where the craftsmanship shines.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'methodology',
    content: (
      <ul className="space-y-5">
        {[
          { step: '01', title: 'Component Atomization' },
          { step: '02', title: 'Type-Safe Architecture' },
          { step: '03', title: 'Performance Budgeting' },
          { step: '04', title: 'Accessibility Auditing' },
        ].map((item, idx) => (
          <motion.li 
            key={item.step}
            className="block group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 + 0.2, duration: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono uppercase text-stone-400 font-bold tracking-wider min-w-[3rem]">
                Step {item.step}
              </span>
              <div className="flex-1 h-px bg-stone-200 group-hover:bg-stone-300 transition-colors"></div>
              <span className="text-sm font-medium text-ink">{item.title}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    ),
  },
  {
    id: 'workbench',
    content: (
      <>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {[
            { name: 'VS Code', icon: Code2, color: 'bg-blue-50/80 border-blue-200/50 text-blue-800/90 hover:bg-blue-100/80 hover:border-blue-300/60' },
            { name: 'Figma', icon: Palette, color: 'bg-purple-50/80 border-purple-200/50 text-purple-800/90 hover:bg-purple-100/80 hover:border-purple-300/60' },
            { name: 'Terminal', icon: Terminal, color: 'bg-stone-50/80 border-stone-200/50 text-stone-800/90 hover:bg-stone-100/80 hover:border-stone-300/60' },
            { name: 'Linear', icon: Zap, color: 'bg-amber-50/80 border-amber-200/50 text-amber-800/90 hover:bg-amber-100/80 hover:border-amber-300/60' },
            { name: 'Raycast', icon: Box, color: 'bg-indigo-50/80 border-indigo-200/50 text-indigo-800/90 hover:bg-indigo-100/80 hover:border-indigo-300/60' },
            { name: 'Blender', icon: FileCode, color: 'bg-orange-50/80 border-orange-200/50 text-orange-800/90 hover:bg-orange-100/80 hover:border-orange-300/60' },
          ].map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 + 0.2, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`
                  group relative px-4 py-3.5 rounded-sm border backdrop-blur-sm
                  transition-all duration-300 cursor-default
                  ${tool.color}
                `}
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.6, delay: idx * 0.1 + 0.5 }}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </motion.div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
                    {tool.name}
                  </span>
                </div>
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none"
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
        
        {/* Enhanced Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative p-6 md:p-8 bg-gradient-to-br from-stone-50 to-stone-100/50 border border-stone-200/80 rounded-sm"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 12px rgba(0,0,0,0.04)',
          }}
        >
          {/* Decorative quote mark */}
          <div className="absolute top-4 left-4 text-4xl font-serif text-stone-300/60 leading-none select-none">
            "
          </div>
          
          <div className="relative z-10 pl-8">
            <p className="text-sm md:text-base text-stone-700 leading-relaxed font-medium mb-2">
              A poor craftsman blames his tools.
            </p>
            <p className="text-sm md:text-base text-ink font-semibold leading-relaxed">
              A master craftsman builds his own.
            </p>
            
            {/* Attribution */}
            <div className="mt-4 pt-4 border-t border-stone-200/60">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                — Digital Craftsman's Creed
              </span>
            </div>
          </div>
        </motion.div>
      </>
    ),
  },
];

export const DigitalCraftsmanTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('philosophy');

  const activeContent = tabContents.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[450px]">
      {/* Left Side - Vertical Tab List */}
      <div className="flex-shrink-0 lg:w-56">
        <nav 
          role="tablist" 
          aria-label="Digital Craftsman sections"
          className="flex flex-col gap-1 relative"
        >
          {/* Decorative vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent hidden lg:block"></div>
          
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ x: isActive ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  group relative px-5 py-4 text-left transition-all duration-500
                  focus:outline-none focus:ring-2 focus:ring-ink/20 focus:ring-offset-2 rounded-sm
                  ${isActive 
                    ? 'bg-gradient-to-r from-stone-50/80 to-stone-50/40' 
                    : 'hover:bg-stone-50/30'
                  }
                `}
              >
                {/* Active indicator bar */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-ink rounded-r-sm"
                  initial={false}
                  animate={{ 
                    opacity: isActive ? 1 : 0,
                    scaleY: isActive ? 1 : 0.3
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
                
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      rotate: isActive ? 0 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-ink' : 'text-stone-400 group-hover:text-stone-600'}`} />
                  </motion.div>
                  <span 
                    className={`
                      font-mono text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 relative
                      ${isActive 
                        ? 'text-ink' 
                        : 'text-stone-500 group-hover:text-stone-700'
                      }
                    `}
                    style={{
                      textShadow: isActive 
                        ? '0 1px 0 rgba(255,255,255,0.8), 0 -1px 1px rgba(0,0,0,0.3), inset 0 1px 3px rgba(0,0,0,0.2), inset 0 -1px 1px rgba(255,255,255,0.4)' 
                        : '0 1px 0 rgba(255,255,255,0.5), 0 -1px 0 rgba(0,0,0,0.15), inset 0 1px 2px rgba(0,0,0,0.1)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {tab.label}
                  </span>
                </div>
                
                {/* Active tab glow and highlight */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-sm pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(26,26,24,0.08) 0%, rgba(26,26,24,0.02) 50%, transparent 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.05), 0 2px 12px rgba(26,26,24,0.08)',
                    }}
                  />
                )}
                
                {/* Subtle hover effect */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(26,26,24,0.02) 100%)',
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Right Side - Glassmorphism Content Card */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1] 
            }}
            className="
              p-10 md:p-12
              border border-stone-200/70
              rounded-sm
              min-h-[350px]
              relative
              overflow-hidden
            "
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-stone-100/40 to-transparent pointer-events-none"></div>
            
            {/* Subtle texture overlay */}
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
              }}
            ></div>
            
            {/* Header with icon and label */}
            <motion.div 
              className="flex items-center gap-3 mb-8 text-ink relative z-10 pb-6 border-b border-stone-200/50"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {(() => {
                const Icon = tabs.find(t => t.id === activeTab)?.icon || PenTool;
                return (
                  <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Icon className="w-6 h-6 text-ink" strokeWidth={1.5} />
                  </motion.div>
                );
              })()}
              <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
                {tabs.find(t => t.id === activeTab)?.label}
              </span>
            </motion.div>
            
            {/* Content */}
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {activeContent}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

