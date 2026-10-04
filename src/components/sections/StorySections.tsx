import { useEffect, useState } from 'react';
import { updateState } from '../experience/ExperienceState';
import MagneticButton from '../ui/MagneticButton';
import { ChevronDown, ArrowRight, ShieldCheck, Zap, Droplet, Sparkles, X, Check, Lock } from 'lucide-react';

// Ciao Energy Technical Corner Marks Helper
function CornerMarks() {
  return (
    <>
      <div className="absolute top-3 left-3 w-3 h-3 border-t-1.5 border-l-1.5 border-[#287F91]/40 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-1.5 border-r-1.5 border-[#287F91]/40 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-1.5 border-l-1.5 border-[#287F91]/40 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-1.5 border-r-1.5 border-[#287F91]/40 pointer-events-none" />
    </>
  );
}

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
        {/* Ciao Energy inspired subhead pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F7F6]/80 backdrop-blur-md border border-[#CDEEEF] text-[#287F91] text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase font-bold mb-6">
          <Sparkles className="w-3 h-3" />
          <span>4K ALKALINE RESTORATION</span>
        </div>

        <h1 className="font-black italic uppercase leading-[0.85] tracking-tighter text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] text-[#102A30] text-wrap-balance">
          PURE<br />
          WATER.<br />
          REFINED.
        </h1>
        <p className="mt-6 text-lg md:text-xl lg:text-2xl text-[#58747A] font-light max-w-xl leading-relaxed">
          Alkaline. Ionised. Crafted for exceptional clarity, cellular bioavailability, and everyday vitality.
        </p>
      </div>

      <div className="w-full flex flex-row justify-between items-end pointer-events-auto">
        <div className="flex items-center gap-4 text-xs tracking-widest text-[#58747A] uppercase font-semibold">
          <span className="w-8 h-[1px] bg-[#58747A]" />
          <span>ALKALINE  ·  pH 8.5+  ·  BOROSILICATE GLASS</span>
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
      <div className="max-w-xl md:ml-auto md:mr-12 pointer-events-auto relative bg-[#F8FEFD]/75 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-[#CDEEEF]/60 shadow-[0_15px_40px_rgba(16,42,48,0.06)] overflow-hidden">
        <CornerMarks />
        
        {/* Ambient Back Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#CDEEEF]/50 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F7F6] text-[#287F91] text-[10px] font-mono tracking-[0.25em] uppercase font-bold mb-4">
          <span>01 / PURPOSE</span>
        </div>

        <h2 className="font-black italic uppercase leading-tight tracking-tight text-5xl md:text-7xl text-[#102A30] text-wrap-balance">
          WATER,<br />
          REIMAGINED.
        </h2>
        <p className="mt-6 text-base md:text-lg text-[#58747A] leading-relaxed font-light">
          Redefining everyday hydration through precision multi-stage filtration. We extract every sub-micron impurity, leaving behind a crisp, ultra-clean mineral balance that feels weightless on the palate.
        </p>

        {/* Benefits Metrics Row (Ciao Energy Style) */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/70 border border-[#CDEEEF]/50">
            <div className="text-3xl font-black font-mono text-[#102A30]">0.00%</div>
            <div className="text-[11px] text-[#58747A] uppercase tracking-wider font-semibold mt-1">Impurities & Sediments</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 border border-[#CDEEEF]/50">
            <div className="text-3xl font-black font-mono text-[#287F91]">100%</div>
            <div className="text-[11px] text-[#58747A] uppercase tracking-wider font-semibold mt-1">Cell Bioavailability</div>
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
      <div className="max-w-xl pointer-events-auto relative bg-[#F2FBFA]/85 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-[#CDEEEF]/60 shadow-[0_15px_40px_rgba(16,42,48,0.06)] overflow-hidden">
        <CornerMarks />

        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#72BDCE]/25 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F7F6] text-[#287F91] text-[10px] font-mono tracking-[0.25em] uppercase font-bold mb-4">
          <Zap className="w-3 h-3" />
          <span>02 / EQUILIBRIUM</span>
        </div>

        <h2 className="font-black italic uppercase leading-none tracking-tight text-5xl md:text-7xl text-[#102A30] text-wrap-balance">
          BALANCED<br />
          BY NATURE.
        </h2>
        
        {/* Dynamic pH gauge */}
        <div className="my-8 flex items-center gap-6 bg-white/70 p-5 rounded-2xl border border-[#CDEEEF]/60 shadow-sm">
          <div className="font-mono text-5xl md:text-6xl font-black text-[#287F91] flex items-baseline">
            <span className="text-2xl font-light text-[#58747A] mr-1">pH</span>
            <span className="tabular-nums text-[#102A30]">{phProgress.toFixed(1)}</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-[#58747A] font-bold mb-1.5 tracking-wider">
              <span>NEUTRAL (7.0)</span>
              <span className="text-[#287F91]">OPTIMAL ALKALINE (8.5+)</span>
            </div>
            <div className="w-full h-2.5 bg-[#E7F7F6] rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-[#72BDCE] to-[#287F91] rounded-full transition-all duration-300"
                style={{ width: `${((phProgress - 6) / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-base text-[#58747A] leading-relaxed font-light">
          Structured naturally with essential trace minerals. Unlike chemically manufactured substitutes, IONA mirrors the pure mineral cycles of volcanic mountain aquifers to help your cellular ecosystem preserve its natural vitality.
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
      <div className="max-w-xl md:ml-auto md:mr-12 pointer-events-auto relative bg-[#F8FEFD]/75 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-[#CDEEEF]/60 shadow-[0_15px_40px_rgba(16,42,48,0.06)] overflow-hidden">
        <CornerMarks />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F7F6] text-[#287F91] text-[10px] font-mono tracking-[0.25em] uppercase font-bold mb-4">
          <Sparkles className="w-3 h-3" />
          <span>03 / ABSORPTION</span>
        </div>

        <h2 className="font-black italic uppercase leading-none tracking-tight text-5xl md:text-7xl text-[#102A30] text-wrap-balance">
          IONISED.<br />
          REFINED.
        </h2>
        <p className="mt-6 text-base md:text-lg text-[#58747A] leading-relaxed font-light">
          Advanced electrolysis restructures water molecules into micro-clusters. Smaller molecular clusters easily bypass cellular aquaporins, replenishing your system faster than traditional spring water.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/70 border border-[#CDEEEF]/50 flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#287F91] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-[#102A30]">Electrolysis</div>
              <p className="text-xs text-[#58747A] mt-0.5 font-light">Slight negative charge for oxidation defense.</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 border border-[#CDEEEF]/50 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#287F91] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-[#102A30]">Micro-clustered</div>
              <p className="text-xs text-[#58747A] mt-0.5 font-light">Smaller cell structures speed hydration delivery.</p>
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F7F6] text-[#287F91] text-[10px] font-mono tracking-[0.25em] uppercase font-bold mb-4">
          <span>04 / ORIGINS</span>
        </div>

        <h2 className="font-black italic uppercase leading-none tracking-tight text-5xl md:text-7xl text-[#102A30] text-wrap-balance mb-8">
          THE IONA<br />
          PROCESS.
        </h2>

        {/* Process visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = activeStage === i;
            return (
              <button
                key={i}
                onClick={() => setActiveStage(i)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive 
                    ? 'bg-[#CDEEEF]/70 border-[#287F91] shadow-md scale-102' 
                    : 'bg-white/50 border-[#CDEEEF]/40 hover:bg-[#E7F7F6]/60'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs font-bold text-[#287F91]">{stage.num}</span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#102A30]' : 'text-[#58747A]'}`} />
                </div>
                <h3 className="font-bold text-sm text-[#102A30] uppercase tracking-wider mb-2">{stage.title}</h3>
                <p className="text-xs text-[#58747A] leading-relaxed line-clamp-3 font-light">{stage.desc}</p>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-[#58747A] italic text-right font-light">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F7F6] text-[#287F91] text-[10px] font-mono tracking-[0.25em] uppercase font-bold mb-4">
            <span>05 / ARTIFACT</span>
          </div>
          <h2 className="font-black italic uppercase leading-none tracking-tight text-5xl md:text-7xl text-[#102A30]">
            THE IONA<br />
            BOTTLE.
          </h2>
        </div>
        <div className="text-right font-mono text-xs hidden md:block p-4 rounded-2xl bg-white/60 border border-[#CDEEEF]/50 backdrop-blur-sm">
          <div className="text-[#102A30] font-bold">IONA™ BOTTLING CO.</div>
          <div className="text-[#58747A] mt-1">CAPACITY: 750 ML / 25.4 OZ</div>
          <div className="text-[#58747A]">MATERIAL: PHARMACEUTICAL GLASS</div>
          <div className="text-[#287F91] mt-1 font-bold">RESOLUTION: 4K HIGH FIDELITY</div>
        </div>
      </div>

      {/* Floating Connecting Spec Labels */}
      <div className="w-full flex-1 relative py-12 pointer-events-auto">
        {/* Spec 1: 750 ML */}
        <div 
          className="absolute top-[10%] left-[5%] md:left-[12%] group transition-all"
          onMouseEnter={() => setHoveredSpec('size')}
          onMouseLeave={() => setHoveredSpec(null)}
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#287F91] inline-block animate-pulse shadow-[0_0_10px_#287F91]" />
            <div className="h-[1px] w-8 md:w-16 bg-[#287F91]/50 group-hover:bg-[#287F91] transition-colors" />
            <div className="p-3 rounded-xl bg-white/70 border border-[#CDEEEF]/60 backdrop-blur-sm shadow-sm">
              <div className="text-[10px] text-[#58747A] tracking-wider uppercase font-semibold">Volume</div>
              <div className="font-bold text-base text-[#102A30] font-mono">750 ML</div>
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
            <div className="p-3 rounded-xl bg-white/70 border border-[#CDEEEF]/60 backdrop-blur-sm shadow-sm text-left">
              <div className="text-[10px] text-[#58747A] tracking-wider uppercase font-semibold">Casing</div>
              <div className="font-bold text-base text-[#102A30]">CRYSTAL GLASS</div>
            </div>
            <div className="h-[1px] w-8 md:w-16 bg-[#287F91]/50 group-hover:bg-[#287F91] transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#287F91] inline-block shadow-[0_0_10px_#287F91]" />
          </div>
        </div>

        {/* Spec 3: BALANCED MINERALS */}
        <div 
          className="absolute bottom-[30%] left-[5%] md:left-[15%] group transition-all"
          onMouseEnter={() => setHoveredSpec('minerals')}
          onMouseLeave={() => setHoveredSpec(null)}
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#287F91] inline-block shadow-[0_0_10px_#287F91]" />
            <div className="h-[1px] w-8 md:w-16 bg-[#287F91]/50 group-hover:bg-[#287F91] transition-colors" />
            <div className="p-3 rounded-xl bg-white/70 border border-[#CDEEEF]/60 backdrop-blur-sm shadow-sm">
              <div className="text-[10px] text-[#58747A] tracking-wider uppercase font-semibold">Infusion</div>
              <div className="font-bold text-base text-[#102A30]">IONS & MINERALS</div>
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
            <div className="p-3 rounded-xl bg-white/70 border border-[#CDEEEF]/60 backdrop-blur-sm shadow-sm text-left">
              <div className="text-[10px] text-[#58747A] tracking-wider uppercase font-semibold">Ionisation</div>
              <div className="font-bold text-base text-[#102A30]">pH 8.5+ ALKALINE</div>
            </div>
            <div className="h-[1px] w-8 md:w-16 bg-[#287F91]/50 group-hover:bg-[#287F91] transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#287F91] inline-block animate-pulse shadow-[0_0_10px_#287F91]" />
          </div>
        </div>
      </div>

      <div className="text-center text-xs font-mono text-[#58747A] pointer-events-auto">
        ✦ INTERACTIVE 4K VIEWPORT · DRAG DIRECTLY ON THE BOTTLE TO EXAMINE
      </div>
    </section>
  );
}

// SECTION 7: FINAL CALL TO ACTION
interface FinalSectionProps {
  onOpenContact?: () => void;
}

export function FinalSection({ onOpenContact }: FinalSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistDone, setWaitlistDone] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistDone(true);
  };

  return (
    <section 
      id="final"
      data-section-index="6"
      className="section-block w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-16 relative z-20 text-center"
    >
      <div className="max-w-4xl pointer-events-auto flex flex-col items-center">
        <span className="text-xs tracking-[0.3em] font-bold text-[#287F91] uppercase block mb-6 flex items-center gap-4">
          <span className="w-8 md:w-16 h-[1px] bg-[#287F91]/50" />
          06 / TRANSFORMATION
          <span className="w-8 md:w-16 h-[1px] bg-[#287F91]/50" />
        </span>
        
        <h2 className="font-black italic uppercase leading-[0.9] tracking-tighter text-6xl sm:text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-[#102A30] via-[#1A4550] to-[#287F91] text-wrap-balance mb-8 filter drop-shadow-sm">
          PURE WATER.<br />
          CLEARER TOMORROW.
        </h2>
        
        <p className="text-lg md:text-xl text-[#58747A] font-light max-w-2xl leading-relaxed mb-12">
          Experience water meticulously designed around absolute purity, biological balance, and pristine clarity. Elevate your everyday state.
        </p>

        {/* Magnetic CTA button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <MagneticButton onClick={() => setShowModal(true)}>
            <span className="flex items-center gap-3 font-bold tracking-widest text-sm uppercase px-3 py-1 group">
              Discover Iona <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </MagneticButton>

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="px-6 py-3.5 rounded-full border border-[#CDEEEF] bg-white/60 hover:bg-white text-xs font-bold uppercase tracking-widest text-[#102A30] transition-all shadow-sm hover:shadow cursor-pointer"
            >
              Contact Concierge Desk
            </button>
          )}
        </div>
      </div>

      {/* Premium Exclusive Access Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-auto">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0A1A1E]/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#F8FEFD] to-[#E7F7F6] rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#CDEEEF] animate-in zoom-in-95 duration-500 fade-in slide-in-from-bottom-8 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#CDEEEF] rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#72BDCE] rounded-full blur-3xl opacity-20 pointer-events-none" />
            
            <button 
              onClick={() => {
                setShowModal(false);
                setWaitlistDone(false);
              }}
              className="absolute top-6 right-6 text-[#58747A] hover:text-[#102A30] transition-colors hover:rotate-90 duration-300 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            
            {waitlistDone ? (
              <div className="flex flex-col items-center text-center relative z-10 py-4">
                <span className="w-14 h-14 rounded-full bg-[#E7F7F6] border border-[#287F91]/40 flex items-center justify-center mb-6 shadow-sm">
                  <Check className="w-6 h-6 text-[#287F91]" />
                </span>
                
                <h3 className="text-2xl font-black italic uppercase text-[#102A30] mb-2">
                  ALLOCATION LOGGED
                </h3>
                
                <p className="text-[#58747A] text-sm leading-relaxed mb-6 font-light">
                  Thank you. Your email <span className="font-semibold text-[#102A30]">{waitlistEmail}</span> has been enrolled on the private priority ledger.
                </p>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setWaitlistDone(false);
                  }}
                  className="px-6 py-2.5 bg-[#102A30] text-white rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#287F91] transition-colors cursor-pointer"
                >
                  Return to Experience
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center relative z-10">
                <span className="w-14 h-14 rounded-full bg-white shadow-sm border border-[#CDEEEF] flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-[#287F91]" />
                </span>
                
                <h3 className="text-3xl font-black italic uppercase text-[#102A30] mb-3">
                  Exclusive Access
                </h3>
                
                <p className="text-[#58747A] leading-relaxed mb-6 text-sm font-light">
                  The IONA premium water booking system is strictly allocated by batch reservation. Join our private registry to secure your vintage.
                </p>
                
                <form onSubmit={handleWaitlistSubmit} className="w-full relative group mb-4">
                  <input 
                    type="email" 
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/70 backdrop-blur-sm border border-[#CDEEEF] rounded-xl text-[#102A30] px-4 py-3.5 pr-24 focus:outline-none focus:border-[#287F91] focus:ring-1 focus:ring-[#287F91] transition-all placeholder:text-[#A0B8BC] text-xs shadow-inner"
                  />
                  <button 
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#102A30] hover:bg-[#287F91] text-white rounded-lg px-4 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-1 shadow-md cursor-pointer"
                  >
                    Join <ArrowRight className="w-3 h-3" />
                  </button>
                </form>

                {onOpenContact && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      onOpenContact();
                    }}
                    className="text-xs text-[#287F91] hover:text-[#102A30] font-semibold underline underline-offset-4 cursor-pointer"
                  >
                    Need a bespoke hospitality quotation? Inquire here →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
