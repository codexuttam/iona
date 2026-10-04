import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { updateState, expState, subscribeToState } from '../experience/ExperienceState';
import MagneticButton from '../ui/MagneticButton';
import { ChevronDown, ArrowRight, ShieldCheck, Zap, Droplet, Sparkles, X, Check, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
      </div>
    </section>
  );
}

// SECTION 6: PRODUCT SHOWCASE WITH SCROLLING CARDS & SYNCHRONIZED BOTTLE ROTATION
const PRODUCT_CARDS = [
  {
    num: '01',
    spec: '750 ML',
    badge: 'ERGONOMIC CAPACITY',
    title: '750 ML VOLUME',
    highlight: 'OPTIMAL CELLULAR HYDRATION',
    desc: 'Meticulously proportioned for complete daily cellular replenishment. Ergonomically calibrated crystal weight engineered for fine dining hospitality, executive spaces, and personal hydration rituals.',
    metric: '750',
    unit: 'ML',
    sub: '25.4 FL OZ NET · BALANCED TARE WEIGHT',
    tags: ['ERGONOMIC PUNT', 'PRECISION BORE CAP', 'CELLULAR SIZING'],
    icon: Droplet,
  },
  {
    num: '02',
    spec: 'GLASS',
    badge: 'CASING & PURITY',
    title: 'CRYSTAL GLASS',
    highlight: 'ZERO MICROPLASTICS · 100% INERT',
    desc: '100% recyclable, medical-grade inert borosilicate crystal casing. Non-porous molecular surface protects natural ion structures and eliminates chemical leaching or UV degradation entirely.',
    metric: '100%',
    unit: 'INERT',
    sub: 'PHARMACEUTICAL CRUCIBLE · 0% RESIDUE',
    tags: ['MEDICAL BOROSILICATE', 'UV RESISTANT', 'CIRCULAR LIFE'],
    icon: ShieldCheck,
  },
  {
    num: '03',
    spec: 'MINERALS',
    badge: 'BIO-AVAILABILITY',
    title: 'IONS & MINERALS',
    highlight: 'VOLCANIC COMPLEX MATRIX',
    desc: 'Naturally stabilized with bio-available ionic calcium, magnesium, and trace potassium. Rapidly crosses cellular aquaporin channels for instantaneous intracellular absorption and cellular vitality.',
    metric: '72+',
    unit: 'IONS',
    sub: 'TRACE DISSOLVED MINERALS · BIO-ACTIVE',
    tags: ['IONIC MAGNESIUM', 'BIO-CALCIUM', 'RAPID CELLULAR UPTAKE'],
    icon: Zap,
  },
  {
    num: '04',
    spec: 'ALKALINE',
    badge: 'POURING ARCHITECTURE',
    title: 'pH 8.5+ ALKALINE',
    highlight: 'SYSTEMIC CELLULAR BALANCE',
    desc: 'Heavy crystal base with concave punt refraction. Precision flame-polished lip bead ensures an effortless, velvety spill-free pour into fine stemware while preserving natural negative ORP balance.',
    metric: '8.5+',
    unit: 'pH',
    sub: 'NEGATIVE ORP · FLAME-POLISHED LIP',
    tags: ['FLAME-POLISHED LIP', 'VELVET PALATE', 'OPTIMAL -ORP'],
    icon: Sparkles,
  },
];

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  // GSAP ScrollTrigger Pinned Showcase:
  // Pins the viewport container rock-solid in place while the user scrolls down,
  // cycling through cards dynamically one-by-one and revolving the 3D bottle!
  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const st = ScrollTrigger.create({
      id: 'product-showcase-pin',
      trigger: sectionRef.current,
      pin: pinRef.current,
      start: 'top top',
      end: '+=2400',
      scrub: 0.5,
      anticipatePin: 1,
      onToggle: (self) => {
        updateState({ productActive: self.isActive });
      },
      onUpdate: (self) => {
        const rawProgress = Math.max(0, Math.min(0.999, self.progress));
        const cardProgress = rawProgress * 3;
        const cardIdx = Math.min(PRODUCT_CARDS.length - 1, Math.floor(rawProgress * PRODUCT_CARDS.length));

        updateState({
          productActive: true,
          productScrollProgress: cardProgress,
          activeProductCard: cardIdx,
        });

        setActiveCard((prev) => (prev !== cardIdx ? cardIdx : prev));
      },
    });

    return () => {
      st.kill();
      updateState({ productActive: false });
    };
  }, []);

  const selectCard = (index: number) => {
    setActiveCard(index);
    updateState({ activeProductCard: index, productScrollProgress: index, productActive: true });

    const st = ScrollTrigger.getById('product-showcase-pin');
    if (st) {
      const targetScroll = st.start + (index / (PRODUCT_CARDS.length - 1)) * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="product"
      data-section-index="5"
      className="w-full relative z-20 pointer-events-none"
    >
      {/* GSAP-Pinned Viewport Container (Centering cards and bottle) */}
      <div 
        ref={pinRef}
        className="w-full h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden relative pointer-events-none"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center gap-6">
          
          {/* Top Header & Feature Selector Tabs */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pointer-events-auto">
            <div>
              <h2 className="font-black italic uppercase leading-none tracking-tight text-3xl sm:text-5xl md:text-6xl text-[#102A30]">
                THE IONA<br />
                BOTTLE.
              </h2>
            </div>

            {/* Feature Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white/85 p-1.5 rounded-2xl border border-[#CDEEEF]/70 backdrop-blur-md shadow-sm">
              {PRODUCT_CARDS.map((card, i) => (
                <button
                  key={card.spec}
                  onClick={() => selectCard(i)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                    activeCard === i
                      ? 'bg-[#102A30] text-white shadow-md scale-102'
                      : 'text-[#58747A] hover:text-[#102A30] hover:bg-[#E7F7F6]/60'
                  }`}
                >
                  {card.spec}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Showcase Feature Cards Stack (Positioned on Left) */}
          <div className="w-full lg:w-[48%] max-w-lg relative h-[420px] pointer-events-auto">
            {PRODUCT_CARDS.map((card, i) => {
              const Icon = card.icon;
              const isActive = activeCard === i;
              const isPast = i < activeCard;
              
              return (
                <div
                  key={card.spec}
                  className={`absolute inset-0 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? 'opacity-100 translate-y-0 scale-100 blur-0 pointer-events-auto z-10'
                      : isPast
                      ? 'opacity-0 -translate-y-8 scale-95 blur-sm pointer-events-none z-0'
                      : 'opacity-0 translate-y-8 scale-95 blur-sm pointer-events-none z-0'
                  }`}
                >
                  <div className="relative bg-gradient-to-br from-white/95 via-white/85 to-[#E7F7F6]/90 backdrop-blur-3xl p-6 sm:p-8 rounded-3xl border border-white/90 shadow-[0_20px_70px_rgba(16,42,48,0.12),0_0_1px_1px_rgba(255,255,255,0.95)_inset,0_10px_25px_rgba(40,127,145,0.08)] overflow-hidden">
                    <CornerMarks />
                    
                    {/* Subtle Top Specular Light Beam */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#287F91]/50 to-transparent pointer-events-none" />

                    {/* Ambient Card Back Glow */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#CDEEEF]/40 rounded-full blur-3xl pointer-events-none" />

                    {/* Step Progress & Tag */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F7F6] border border-[#CDEEEF]/60 text-[#287F91] text-[10px] font-mono tracking-widest uppercase font-bold shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#287F91] animate-pulse" />
                        <Icon className="w-3.5 h-3.5 text-[#287F91]" />
                        <span>{card.badge}</span>
                      </div>
                      <span className="font-mono text-xs font-black text-[#58747A]/80 tracking-wider">
                        {card.num} / 04
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="font-black italic uppercase text-2xl sm:text-3xl text-[#102A30] tracking-tight mb-1">
                      {card.title}
                    </h3>

                    {/* Highlight */}
                    <div className="text-xs font-mono tracking-widest text-[#287F91] font-bold uppercase mb-3 flex items-center gap-1.5">
                      <span className="text-[#287F91]">✦</span> {card.highlight}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#58747A] font-light leading-relaxed mb-4">
                      {card.desc}
                    </p>

                    {/* Micro Feature Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-lg bg-white/70 border border-[#CDEEEF]/50 text-[10px] font-mono font-medium text-[#287F91] tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Metrics and Controls */}
                    <div className="flex justify-between items-end pt-4 border-t border-[#CDEEEF]/60">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-mono font-black text-[#102A30] tracking-tight">
                            {card.metric}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#287F91]">
                            {card.unit}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#58747A] uppercase tracking-wider font-semibold mt-0.5">
                          {card.sub}
                        </div>
                      </div>

                      {/* Arrow Controls */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => selectCard((i - 1 + PRODUCT_CARDS.length) % PRODUCT_CARDS.length)}
                          className="w-9 h-9 rounded-full border border-[#CDEEEF] bg-white/80 hover:bg-[#102A30] hover:text-white text-[#102A30] flex items-center justify-center text-sm transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                          aria-label="Previous feature"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => selectCard((i + 1) % PRODUCT_CARDS.length)}
                          className="w-9 h-9 rounded-full border border-[#CDEEEF] bg-[#102A30] text-white hover:bg-[#287F91] flex items-center justify-center text-sm transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                          aria-label="Next feature"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sleek Minimalist Progress Segments */}
          <div className="w-full max-w-lg flex items-center gap-2 pointer-events-auto">
            {PRODUCT_CARDS.map((card, idx) => (
              <button
                key={card.spec}
                onClick={() => selectCard(idx)}
                className="flex-1 flex flex-col gap-1 text-left cursor-pointer group"
              >
                <div className="w-full h-1 rounded-full bg-[#CDEEEF]/60 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      activeCard === idx
                        ? 'w-full bg-[#287F91]'
                        : idx < activeCard
                        ? 'w-full bg-[#102A30]'
                        : 'w-0 bg-transparent'
                    }`}
                  />
                </div>
                <span className={`text-[10px] font-mono tracking-wider font-semibold transition-colors ${
                  activeCard === idx ? 'text-[#102A30]' : 'text-[#58747A]/60 group-hover:text-[#58747A]'
                }`}>
                  0{idx + 1} {card.spec}
                </span>
              </button>
            ))}
          </div>

        </div>
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
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-auto overflow-y-auto"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#0A1A1E]/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Content */}
          <div 
            data-lenis-prevent="true"
            className="relative w-full max-w-md my-auto max-h-[90vh] overflow-y-auto overscroll-contain modal-scrollbar bg-gradient-to-b from-[#F8FEFD] to-[#E7F7F6] rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#CDEEEF] animate-in zoom-in-95 duration-500 fade-in slide-in-from-bottom-8 overflow-hidden z-10"
          >
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
