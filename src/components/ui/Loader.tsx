import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { updateState } from '../experience/ExperienceState';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant incremental count simulation for immersive cinematic effect
    let count = 0;
    const interval = setInterval(() => {
      // Accelerate progress slightly over time
      const increment = Math.floor(Math.random() * 8) + 4;
      count += increment;

      if (count >= 100) {
        setProgress(100);
        updateState({ loadingProgress: 100 });
        clearInterval(interval);

        // Smoothly dissolve the preloader when progress reaches 100%
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setVisible(false);
              updateState({ isLoaded: true });
            }
          });

          // Dissolve texts, shrink line, fade background
          tl.to([titleRef.current, subRef.current, barRef.current], {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.in',
          })
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          }, '-=0.2');

        }, 400);
      } else {
        setProgress(count);
        updateState({ loadingProgress: count });
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen bg-[#F8FEFD] flex flex-col justify-center items-center z-50 select-none overflow-hidden"
    >
      <div className="flex flex-col items-center max-w-sm w-full px-8">
        {/* Massive elegant wordmark */}
        <h1
          ref={titleRef}
          className="font-black italic uppercase leading-none tracking-tighter text-6xl md:text-8xl text-[#102A30] text-center mb-2"
        >
          IONA
        </h1>

        {/* Minimal subtitles */}
        <div
          ref={subRef}
          className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#58747A] font-bold text-center mb-8"
        >
          PURE WATER / DIGITAL EXPERIENCE
        </div>

        {/* Loading line bar wrapper */}
        <div className="w-48 h-[1px] bg-[#CDEEEF] relative overflow-hidden" ref={barRef}>
          <div
            className="h-full bg-[#287F91] transition-all duration-150 ease-out absolute left-0 top-0"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tabular numeric loader percentage */}
        <div className="mt-4 font-mono text-xs font-bold text-[#287F91] tracking-widest tabular-nums">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}
