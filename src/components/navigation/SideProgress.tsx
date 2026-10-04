import { useEffect, useState } from 'react';
import { expState, subscribeToState } from '../experience/ExperienceState';

const SECTIONS = [
  { id: 'hero', label: '01' },
  { id: 'water', label: '02' },
  { id: 'alkaline', label: '03' },
  { id: 'ionised', label: '04' },
  { id: 'process', label: '05' },
  { id: 'product', label: '06' },
  { id: 'final', label: '07' },
];

export default function SideProgress() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Listen to changes in the active section index from the WebGL context / ScrollTrigger
    const unsubscribe = subscribeToState((state) => {
      setActiveSection(state.currentSection);
    });
    return unsubscribe;
  }, []);

  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 items-center select-none pointer-events-auto">
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#CDEEEF]" />

      {SECTIONS.map((sec, i) => {
        const isActive = activeSection === i;
        return (
          <button
            key={sec.id}
            onClick={() => handleScrollTo(sec.id)}
            className="group flex items-center gap-3 relative cursor-pointer"
            title={`Scroll to Section ${sec.label}`}
          >
            {/* Soft outer ring for active, light dot for inactive */}
            <div className="w-5 h-5 flex items-center justify-center relative">
              <div 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[#287F91] scale-125' : 'bg-[#58747A]/30 group-hover:bg-[#287F91]'
                }`} 
              />
              {isActive && (
                <div className="absolute inset-0 border border-[#287F91] rounded-full animate-ping opacity-30" />
              )}
            </div>

            {/* Quiet, unboxed metadata indicator */}
            <span 
              className={`font-mono text-[10px] tracking-wider transition-all duration-300 ${
                isActive ? 'text-[#102A30] font-black scale-110' : 'text-[#58747A]/40 group-hover:text-[#102A30]'
              }`}
            >
              {sec.label}
            </span>
          </button>
        );
      })}

      <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-[#CDEEEF]" />
    </div>
  );
}
