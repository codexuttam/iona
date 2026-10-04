import { useEffect, useRef, useState } from 'react';
import { expState, updateState } from '../experience/ExperienceState';
import MagneticButton from '../ui/MagneticButton';
import { ChevronDown, ArrowRight, ShieldCheck, Zap, Droplet, Sparkles } from 'lucide-react';

// SECTION 1: HERO
export function HeroSection() {
  return (
    <section 
      id="hero"
      data-section-index="0"
      className="section-block w-full min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-12 relative z-20 pointer-events-none select-none"
    >
      <div /> {/* Spacer */}

      <div className="max-w-4xl pt-16 md:pt-24 pointer-events-auto">
        <h1 className="font-black italic uppercase leading-[0.85] tracking-tighter text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] text-[#102A30] text-wrap-balance">
          PURE<br />
          WATER.<br />
          REFINED.
        </h1>
        <p className="mt-6 text-lg md:text-xl lg:text-2xl text-[#58747A] font-light max-w-xl">
          Alkaline. Ionised. Crafted for exceptional clarity and ultimate cell hydration.
        </p>
      </div>

      <div className="w-full flex flex-row justify-between items-end pointer-events-auto">
        <div className="flex items-center gap-4 text-xs tracking-widest text-[#58747A] uppercase font-semibold">
          <span className="w-8 h-[1px] bg-[#58747A]" />
          <span>ALKALINE  ·  pH 8.5+</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 animate-bounce cursor-pointer"
             onClick={() => {
               const waterSec = document.getElementById('water');
               waterSec?.scrollIntoView({ behavior: 'smooth' });
             }}>
          <span className="text-[10px] tracking-widest text-[#58747A] uppercase font-bold">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 text-[#287F91]" />
        </div>
      </div>
    </section>
  );
}

// SECTION 2: WATER REIMAGINED
export function WaterSection() {
  return (
    <section 
      id="water"
      data-section-index="1"
      className="section-block w-full min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 relative z-20 pointer-events-none"
    >
      <div className="max-w-xl md:ml-auto md:mr-12 pointer-events-auto bg-[#F8FEFD]/70 backdrop-blur-md p-8 rounded-3xl border border-[#CDEEEF]/30 shadow-sm">
        <span className="text-xs tracking-[0.25em] font-bold text-[#287F91] uppercase block mb-4">
          01 / PURPOSE
        </span>
        <h2 className="font-black italic uppercase leading-tight tracking-tight text-5xl md:text-7xl text-[#102A30] text-wrap-balance">
          WATER,<br />
          REIMAGINED.
        </h2>
        <p className="mt-6 text-base md:text-lg text-[#58747A] leading-relaxed">
          Redefining everyday hydration through precision filtration. We extract every impurity, leaving behind a crisp, ultra-clean mineral balance that feels incredibly light on the palate.
        </p>
        <div className="mt-8 flex gap-6">
          <div>
            <div className="text-2xl font-bold font-mono text-[#102A30]">0.00%</div>
            <div className="text-xs text-[#58747A] uppercase tracking-wider mt-1">Impurities</div>
          </div>
          <div className="w-[1px] bg-[#CDEEEF]" />
          <div>
            <div className="text-2xl font-bold font-mono text-[#102A30]">100%</div>
            <div className="text-xs text-[#58747A] uppercase tracking-wider mt-1">Bioavailability</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// SECTION 3: ALKALINE
export function AlkalineSection() {
  const [phProgress, setPhProgress] = useState(7.0);

  useEffect(() => {
    // Dynamic counter effect simulating pH scanning
    let start = 7.0;
    const interval = setInterval(() => {
      start += 0.05;
      if (start >= 8.5) {
        setPhProgress(8.5);
        clearInterval(interval);
      } else {
        setPhProgress(parseFloat(start.toFixed(2)));
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="alkaline"
      data-section-index="2"
      className="section-block w-full min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 relative z-20 pointer-events-none"
    >
      <div className="max-w-xl pointer-events-auto bg-[#F2FBFA]/80 backdrop-blur-md p-8 rounded-3xl border border-[#CDEEEF]/30 shadow-sm">
        <span className="text-xs tracking-[0.25em] font-bold text-[#287F91] uppercase block mb-4">
          02 / EQUILIBRIUM
        </span>
        <h2 className="font-black italic uppercase leading-none tracking-tight text-5xl md:text-7xl text-[#102A30] text-wrap-balance">
          BALANCED<br />
          BY NATURE.
        </h2>
        
        {/* Dynamic pH gauge */}
        <div className="my-8 flex items-center gap-6 bg-white/60 p-4 rounded-2xl border border-[#CDEEEF]/50">
          <div className="font-mono text-5xl md:text-6xl font-black text-[#287F91] flex items-baseline">
            <span>pH</span>
            <span className="ml-2 tabular-nums text-[#102A30]">{phProgress.toFixed(1)}</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-[#58747A] font-bold mb-1">
              <span>ACIDIC (7.0)</span>
              <span>ALKALINE (8.5+)</span>
            </div>
            <div className="w-full h-2 bg-[#E7F7F6] rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-[#72BDCE] to-[#287F91] rounded-full transition-all duration-300"
                style={{ width: `${((phProgress - 6) / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-base text-[#58747A] leading-relaxed">
          Structured naturally with essential alkaline minerals. Unlike chemically manufactured substitutes, IONA mirrors the pure mineral cycles of volcanic mountain aquifers to help your body preserve its natural vitality.
        </p>
      </div>
    </section>
  );
}

// SECTION 4: IONISED
export function IonisedSection() {
  return (
    <section 
      id="ionised"
      data-section-index="3"
      className="section-block w-full min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 relative z-20 pointer-events-none"
    >
      <div className="max-w-xl md:ml-auto md:mr-12 pointer-events-auto bg-[#F8FEFD]/70 backdrop-blur-md p-8 rounded-3xl border border-[#CDEEEF]/30 shadow-sm">
        <span className="text-xs tracking-[0.25em] font-bold text-[#287F91] uppercase block mb-4">
          03 / ABSORPTION
        </span>
        <h2 className="font-black italic uppercase leading-none tracking-tight text-5xl md:text-7xl text-[#102A30] text-wrap-balance">
          IONISED.<br />
          REFINED.
        </h2>
        <p className="mt-6 text-base md:text-lg text-[#58747A] leading-relaxed">
          Advanced electrolysis restructures water molecules into micro-clusters. Smaller molecular clusters easily bypass cellular aquaporins, replenishing your system faster than traditional spring water.
        </p>

        {/* Custom interactive details instead of simple pills */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#E7F7F6]/50 border border-[#CDEEEF]/30 flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#287F91] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-[#102A30]">Electrolysis</div>
              <p className="text-xs text-[#58747A] mt-0.5">Slight negative charge for oxidation defense.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#E7F7F6]/50 border border-[#CDEEEF]/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#287F91] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-[#102A30]">Micro-clustered</div>
              <p className="text-xs text-[#58747A] mt-0.5">Smaller cell structures speed hydration delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// SECTION 5: THE PROCESS STAGES
const STAGES = [
  {
    num: '01',
    title: 'SOURCE',
    desc: 'Extracted from protected high-mountain springs, isolated from all environmental contamination.',
    icon: Droplet,
  },
  {
    num: '02',
    title: 'PURIFY',
    desc: 'Subjected to multi-step sub-micron membrane filtration, eliminating all sediment and impurities.',
    icon: ShieldCheck,
  },
  {
    num: '03',
    title: 'IONISE',
    desc: 'High-density platinum-plated chambers restream and structure the molecular charge.',
    icon: Zap,
  },
  {
    num: '04',
    title: 'REFINE',
    desc: 'Stabilized with micro-balanced trace calcium and magnesium for a distinctively clean finish.',
    icon: Sparkles,
  },
];

export function ProcessSection() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    updateState({ activeProcessStage: activeStage });
  }, [activeStage]);

  return (
    <section 
      id="process"
      data-section-index="4"
      className="section-block w-full min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 relative z-20 pointer-events-none"
    >
      <div className="max-w-2xl pointer-events-auto">
        <span className="text-xs tracking-[0.25em] font-bold text-[#287F91] uppercase block mb-4">
          04 / ORIGINS
        </span>
        <h2 className="font-black italic uppercase leading-none tracking-tight text-5xl md:text-7xl text-[#102A30] text-wrap-balance mb-8">
          THE IONA<br />
          PROCESS.
        </h2>

        {/* Custom process visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = activeStage === i;
            return (
              <button
                key={i}
                onClick={() => setActiveStage(i)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#CDEEEF]/60 border-[#287F91] shadow-sm scale-102' 
                    : 'bg-white/40 border-[#CDEEEF]/30 hover:bg-[#E7F7F6]/50'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs font-bold text-[#287F91]">{stage.num}</span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#102A30]' : 'text-[#58747A]'}`} />
                </div>
                <h3 className="font-bold text-sm text-[#102A30] uppercase tracking-wider mb-2">{stage.title}</h3>
                <p className="text-xs text-[#58747A] leading-relaxed line-clamp-3">{stage.desc}</p>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-[#58747A] italic text-right">
          *Click a process stage to alter the 3D WebGL water environment.
        </p>
      </div>
    </section>
  );
}

// SECTION 6: PRODUCT SHOWCASE
export function ProductSection() {
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);

  return (
    <section 
      id="product"
      data-section-index="5"
      className="section-block w-full min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-16 relative z-20 pointer-events-none"
    >
      <div className="w-full flex justify-between items-start pointer-events-auto">
        <div>
          <span className="text-xs tracking-[0.25em] font-bold text-[#287F91] uppercase block mb-4">
            05 / ARTIFACT
          </span>
          <h2 className="font-black italic uppercase leading-none tracking-tight text-5xl md:text-7xl text-[#102A30]">
            THE IONA<br />
            BOTTLE.
          </h2>
        </div>
        <div className="text-right font-mono text-sm hidden md:block">
          <div className="text-[#102A30] font-bold">IONA™ BOTTLING CO.</div>
          <div className="text-[#58747A] mt-1">CAPACITY: 750 ML</div>
          <div className="text-[#58747A]">MATERIAL: RECYCLABLE GLASS</div>
        </div>
      </div>

      {/* Floating Connecting Spec Labels surrounding the 3D Canvas area */}
      <div className="w-full flex-1 relative py-12 pointer-events-auto">
        {/* Spec 1: 750 ML */}
        <div 
          className="absolute top-[10%] left-[5%] md:left-[12%] group transition-all"
          onMouseEnter={() => setHoveredSpec('size')}
          onMouseLeave={() => setHoveredSpec(null)}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#287F91] inline-block animate-pulse" />
            <div className="h-[1px] w-8 md:w-16 bg-[#287F91]/50 group-hover:bg-[#287F91] transition-colors" />
            <div>
              <div className="text-xs text-[#58747A] tracking-wider uppercase font-semibold">Volume</div>
              <div className="font-bold text-lg text-[#102A30] font-mono">750 ML</div>
            </div>
          </div>
        </div>

        {/* Spec 2: PREMIUM GLASS */}
        <div 
          className="absolute top-[20%] right-[5%] md:right-[12%] group transition-all text-right"
          onMouseEnter={() => setHoveredSpec('glass')}
          onMouseLeave={() => setHoveredSpec(null)}
        >
          <div className="flex items-center justify-end gap-3">
            <div>
              <div className="text-xs text-[#58747A] tracking-wider uppercase font-semibold">Casing</div>
              <div className="font-bold text-lg text-[#102A30]">PREMIUM GLASS</div>
            </div>
            <div className="h-[1px] w-8 md:w-16 bg-[#287F91]/50 group-hover:bg-[#287F91] transition-colors" />
            <span className="w-2 h-2 rounded-full bg-[#287F91] inline-block" />
          </div>
        </div>

        {/* Spec 3: BALANCED MINERALS */}
        <div 
          className="absolute bottom-[30%] left-[5%] md:left-[15%] group transition-all"
          onMouseEnter={() => setHoveredSpec('minerals')}
          onMouseLeave={() => setHoveredSpec(null)}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#287F91] inline-block" />
            <div className="h-[1px] w-8 md:w-16 bg-[#287F91]/50 group-hover:bg-[#287F91] transition-colors" />
            <div>
              <div className="text-xs text-[#58747A] tracking-wider uppercase font-semibold">Structure</div>
              <div className="font-bold text-lg text-[#102A30]">IONS & MINERALS</div>
            </div>
          </div>
        </div>

        {/* Spec 4: REFRACTION */}
        <div 
          className="absolute bottom-[20%] right-[5%] md:right-[15%] group transition-all text-right"
          onMouseEnter={() => setHoveredSpec('refraction')}
          onMouseLeave={() => setHoveredSpec(null)}
        >
          <div className="flex items-center justify-end gap-3">
            <div>
              <div className="text-xs text-[#58747A] tracking-wider uppercase font-semibold">Structure</div>
              <div className="font-bold text-lg text-[#102A30]">pH 8.5+ ALKALINE</div>
            </div>
            <div className="h-[1px] w-8 md:w-16 bg-[#287F91]/50 group-hover:bg-[#287F91] transition-colors" />
            <span className="w-2 h-2 rounded-full bg-[#287F91] inline-block animate-pulse" />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-[#58747A] pointer-events-auto">
        Swipe or Drag directly on the bottle to examine details
      </div>
    </section>
  );
}

// SECTION 7: FINAL CALL TO ACTION
export function FinalSection() {
  return (
    <section 
      id="final"
      data-section-index="6"
      className="section-block w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-16 relative z-20 text-center"
    >
      <div className="max-w-3xl pointer-events-auto flex flex-col items-center">
        <span className="text-xs tracking-[0.25em] font-bold text-[#287F91] uppercase block mb-6">
          06 / TRANSFORMATION
        </span>
        <h2 className="font-black italic uppercase leading-[0.9] tracking-tighter text-6xl sm:text-7xl md:text-9xl text-[#102A30] text-wrap-balance mb-8">
          PURE WATER.<br />
          CLEARER TOMORROWS.
        </h2>
        <p className="text-lg md:text-xl text-[#58747A] font-light max-w-xl leading-relaxed mb-10">
          Experience water meticulously designed around absolute purity, biological balance, and pristine clarity. Elevate your everyday state.
        </p>

        {/* Magnetic CTA button */}
        <MagneticButton onClick={() => alert('IONA Premium Water - Booking system coming soon!')}>
          <span className="flex items-center gap-2 font-bold tracking-wider text-sm uppercase">
            Discover Iona <ArrowRight className="w-4 h-4" />
          </span>
        </MagneticButton>
      </div>
    </section>
  );
}
