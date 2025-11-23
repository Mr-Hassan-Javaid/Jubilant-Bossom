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
import { PenTool, Cpu, Monitor } from 'lucide-react';

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
      <>
        <p className="text-sm text-stone-600 leading-relaxed mb-4">
          <strong className="text-ink block mb-1">Build for Durability</strong>
          Digital artifacts degrade not through rust, but through debt. I write code that is self-documenting, strongly typed, and modular by default.
        </p>
        <p className="text-sm text-stone-600 leading-relaxed">
          <strong className="text-ink block mb-1">Interaction is Narrative</strong>
          Every hover state, transition, and loader tells a story about the system's health and intent. These micro-interactions are where the craftsmanship shines.
        </p>
      </>
    ),
  },
  {
    id: 'methodology',
    content: (
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
    ),
  },
  {
    id: 'workbench',
    content: (
      <>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">VS Code</span>
          <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Figma</span>
          <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Terminal</span>
          <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Linear</span>
          <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Raycast</span>
          <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-mono uppercase">Blender</span>
        </div>
        <div className="pt-8 border-t border-ink/5">
          <p className="text-xs text-stone-500 font-mono leading-relaxed">
            "A poor craftsman blames his tools. A master craftsman builds his own."
          </p>
        </div>
      </>
    ),
  },
];

export const DigitalCraftsmanTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('philosophy');

  const activeContent = tabContents.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[400px]">
      {/* Left Side - Vertical Tab List */}
      <div className="flex-shrink-0 lg:w-52">
        <nav 
          role="tablist" 
          aria-label="Digital Craftsman sections"
          className="flex flex-col gap-2"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative px-4 py-3 text-left transition-all duration-300 rounded-sm
                  focus:outline-none focus:ring-2 focus:ring-ink/20 focus:ring-offset-2
                  ${isActive 
                    ? 'bg-stone-100/50 border-l-2 border-ink' 
                    : 'border-l-2 border-transparent hover:bg-stone-50/50'
                  }
                `}
              >
                <div className="flex items-center gap-2 relative z-10">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-ink' : 'text-stone-400 group-hover:text-stone-600'}`} />
                  <span 
                    className={`
                      font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 relative
                      ${isActive 
                        ? 'text-ink' 
                        : 'text-stone-500 group-hover:text-stone-700'
                      }
                    `}
                    style={{
                      textShadow: isActive 
                        ? '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.2), inset 0 1px 2px rgba(0,0,0,0.15)' 
                        : '0 1px 0 rgba(255,255,255,0.2), 0 -1px 0 rgba(0,0,0,0.1), inset 0 1px 1px rgba(0,0,0,0.08)',
                    }}
                  >
                    {tab.label}
                  </span>
                </div>
                
                {/* Active tab glow effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-sm pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'linear-gradient(90deg, rgba(26,26,24,0.05) 0%, rgba(26,26,24,0.02) 100%)',
                      boxShadow: 'inset 0 0 20px rgba(26,26,24,0.06), 0 0 8px rgba(26,26,24,0.05)',
                    }}
                  />
                )}
              </button>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1] 
            }}
            className="
              p-8 md:p-10
              border border-stone-200/60
              rounded-sm
              min-h-[300px]
              relative
            "
            style={{
              background: 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            }}
          >
            <div className="flex items-center gap-2 mb-6 text-ink">
              {(() => {
                const Icon = tabs.find(t => t.id === activeTab)?.icon || PenTool;
                return <Icon className="w-5 h-5" />;
              })()}
              <span className="font-mono text-xs uppercase tracking-widest font-bold">
                {tabs.find(t => t.id === activeTab)?.label}
              </span>
            </div>
            
            <div className="relative z-10">
              {activeContent}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

