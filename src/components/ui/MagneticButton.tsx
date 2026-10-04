import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function MagneticButton({ children, onClick, className = '' }: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic strength: translate button and text slightly differently to create depth
      gsap.to(button, {
        x: x * 0.35,
        y: y * 0.35,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1.0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative p-4 inline-block select-none pointer-events-auto">
      <button
        ref={buttonRef}
        onClick={onClick}
        className={`px-8 py-4 bg-[#102A30] text-[#F8FEFD] hover:bg-[#287F91] border border-transparent hover:border-[#CDEEEF]/30 transition-colors duration-200 rounded-full cursor-pointer shadow-md ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span className="block transform-gpu" style={{ transform: 'translateZ(10px)' }}>
          {children}
        </span>
      </button>
    </div>
  );
}
