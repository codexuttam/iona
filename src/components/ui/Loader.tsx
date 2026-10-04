import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { updateState } from '../experience/ExperienceState';
import { Sparkles } from 'lucide-react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('ISOLATING ALPINE SPRING AQUIFER');
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bottleSilhouetteRef = useRef<SVGSVGElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic progressive status states inspired by Ciao Energy's technical loading
    let count = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 6) + 3;
      count += increment;

      if (count < 25) {
        setStatusText('ISOLATING ALPINE SPRING AQUIFER');
      } else if (count < 55) {
        setStatusText('MULTI-PASS SUB-MICRON PURIFICATION');
      } else if (count < 85) {
        setStatusText('ELECTROLYTIC PLATINUM IONISATION · pH 8.5+');
      } else {
        setStatusText('CALIBRATING 4K OPTICAL REFRACTION');
      }

      if (count >= 100) {
        setProgress(100);
        updateState({ loadingProgress: 100 });
        clearInterval(interval);

        // Smooth cinematic lens flare reveal
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setVisible(false);
              updateState({ isLoaded: true });
            }
          });

          // 1. Expand glow burst
          tl.to(glowRef.current, {
            scale: 2.5,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.in',
          })
          // 2. Fade texts & silhouette
          .to([bottleSilhouetteRef.current, infoRef.current], {
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            ease: 'power2.in',
          }, '-=0.4')
          // 3. Majestic iris reveal (curtain wipe)
          .to(containerRef.current, {
            opacity: 0,
            filter: 'blur(20px)',
            duration: 0.9,
            ease: 'power3.inOut',
          }, '-=0.2');

        }, 400);
      } else {
        setProgress(count);
        updateState({ loadingProgress: count });
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen bg-[#071317] flex flex-col justify-between items-center z-[200] select-none overflow-hidden p-8 sm:p-12"
    >
      {/* Dynamic Background Volumetric Light Atmosphere */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none transition-transform"
        style={{
          background: 'radial-gradient(circle at center, rgba(40, 127, 145, 0.45) 0%, rgba(114, 189, 206, 0.18) 40%, rgba(7, 19, 23, 0) 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary Top Light Flare */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(205, 238, 239, 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Top Header Wordmark */}
      <div className="w-full flex justify-between items-center max-w-6xl relative z-10">
        <div className="flex items-center gap-3">
          <span className="font-black italic uppercase text-2xl tracking-tighter text-white">
            IONA
          </span>
          <span className="hidden sm:inline-block text-[9px] tracking-[0.3em] font-mono text-[#72BDCE] uppercase py-0.5 px-2 rounded-full border border-[#287F91]/40 bg-[#102A30]/50">
            4K IMMERSIVE
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] font-mono text-[#72BDCE] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#287F91] animate-ping" />
          <span>SYSTEM READY</span>
        </div>
      </div>

      {/* Center Stage: Glowing Bottle Silhouette with Liquid Fill & Light Sweep */}
      <div className="relative flex flex-col items-center justify-center my-auto z-10">
        
        {/* Animated Radial Pulse Ring */}
        <div className="absolute w-72 h-72 rounded-full border border-[#287F91]/20 animate-pulse pointer-events-none" />
        <div className="absolute w-96 h-96 rounded-full border border-[#CDEEEF]/10 pointer-events-none" />

        {/* Technical Corner Brackets (Ciao Energy Style) */}
        <div className="relative p-8">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#72BDCE]/60" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#72BDCE]/60" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#72BDCE]/60" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#72BDCE]/60" />

          {/* Precision SVG Bottle Silhouette with Liquid Fill Mask */}
          <svg
            ref={bottleSilhouetteRef}
            viewBox="0 0 160 380"
            className="w-28 sm:w-36 h-auto drop-shadow-[0_0_35px_rgba(40,127,145,0.7)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Vertical Liquid Fill Clip Path */}
              <clipPath id="bottle-liquid-mask">
                <rect 
                  x="0" 
                  y={380 - (progress / 100) * 380} 
                  width="160" 
                  height="380" 
                  className="transition-all duration-150 ease-out"
                />
              </clipPath>

              {/* Glowing Liquid Gradient */}
              <linearGradient id="liquid-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EAFBF9" />
                <stop offset="25%" stopColor="#72BDCE" />
                <stop offset="70%" stopColor="#287F91" />
                <stop offset="100%" stopColor="#102A30" />
              </linearGradient>

              {/* Laser Scan Horizon Beam */}
              <linearGradient id="scan-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Faint Outer Glass Silhouette Outline */}
            <path
              d="M 68 20 L 92 20 L 92 48 L 108 80 L 124 130 L 124 330 C 124 350 114 360 80 360 C 46 360 36 350 36 330 L 36 130 L 52 80 L 68 48 Z"
              stroke="#287F91"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.5"
            />

            {/* Aluminum Cap Outline */}
            <rect x="66" y="8" width="28" height="16" rx="2" stroke="#72BDCE" strokeWidth="1.5" opacity="0.7" />

            {/* Filled Liquid Body (Clipped by progress) */}
            <path
              d="M 68 20 L 92 20 L 92 48 L 108 80 L 124 130 L 124 330 C 124 350 114 360 80 360 C 46 360 36 350 36 330 L 36 130 L 52 80 L 68 48 Z"
              fill="url(#liquid-glow)"
              clipPath="url(#bottle-liquid-mask)"
            />

            {/* Active Scanning Surface Beam */}
            <line
              x1="20"
              y1={380 - (progress / 100) * 380}
              x2="140"
              y2={380 - (progress / 100) * 380}
              stroke="url(#scan-line)"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_8px_#ffffff]"
            />
          </svg>
        </div>

        {/* Large Tabular Percentage Number */}
        <div className="mt-4 flex items-baseline gap-1 font-mono text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums drop-shadow-[0_0_20px_rgba(114,189,206,0.6)]">
          <span>{progress.toString().padStart(3, '0')}</span>
          <span className="text-sm font-light text-[#72BDCE]">%</span>
        </div>
      </div>

      {/* Bottom Footer Telemetry */}
      <div ref={infoRef} className="w-full max-w-xl flex flex-col items-center gap-3 relative z-10">
        
        {/* Progress bar track */}
        <div className="w-full max-w-xs sm:max-w-md h-[2px] bg-[#102A30] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#287F91] via-[#72BDCE] to-[#EAFBF9] transition-all duration-150 ease-out shadow-[0_0_12px_#72BDCE]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Status Text */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#72BDCE] tracking-[0.2em] uppercase text-center mt-1">
          <Sparkles className="w-3 h-3 text-[#EAFBF9] animate-spin" />
          <span>{statusText}</span>
        </div>

        <div className="text-[9px] font-mono text-[#58747A] tracking-widest uppercase">
          CALIBRATED FOR ULTRA-HIGH RESOLUTION DISPLAY
        </div>
      </div>
    </div>
  );
}
