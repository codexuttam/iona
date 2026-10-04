import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  color: string;
  lineWidth: number;
}

interface SplashDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

interface FloatingDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  alpha: number;
}

export default function WaterDropletsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const ripples: Ripple[] = [];
    const splashDroplets: SplashDroplet[] = [];
    const floatingDroplets: FloatingDroplet[] = [];

    // Initialize ambient floating droplets
    const AMBIENT_COUNT = Math.min(24, Math.floor(width / 60));
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      floatingDroplets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.35, // gently drift upwards like pure mineral effervescence
        radius,
        baseRadius: radius,
        pulsePhase: Math.random() * Math.PI * 2,
        alpha: 0.25 + Math.random() * 0.45,
      });
    }

    // Function to spawn a rich water ripple + splash
    const createWaterDropEffect = (clientX: number, clientY: number, isMajor = true) => {
      // 1. Concentric shockwave ripples
      const count = isMajor ? 3 : 2;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          ripples.push({
            x: clientX,
            y: clientY,
            radius: 2,
            maxRadius: isMajor ? 75 + i * 25 : 45,
            opacity: 0.65 - i * 0.12,
            speed: 2.2 + i * 0.4,
            color: i % 2 === 0 ? 'rgba(40, 127, 145,' : 'rgba(114, 189, 206,',
            lineWidth: 2.5 - i * 0.5,
          });
        }, i * 90);
      }

      // 2. Micro splash droplets bursting outward
      if (isMajor) {
        const splashCount = 10 + Math.floor(Math.random() * 6);
        for (let i = 0; i < splashCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const force = 1.5 + Math.random() * 4.0;
          splashDroplets.push({
            x: clientX,
            y: clientY,
            vx: Math.cos(angle) * force,
            vy: Math.sin(angle) * force - 1.2, // slight upward bias
            radius: 1.5 + Math.random() * 2.2,
            alpha: 0.85,
            decay: 0.02 + Math.random() * 0.02,
          });
        }
      }
    };

    // Global click listener: creates realistic droplet ripple wherever user clicks
    const handleWindowClick = (e: MouseEvent) => {
      createWaterDropEffect(e.clientX, e.clientY, true);
    };
    window.addEventListener('click', handleWindowClick);

    // Periodic gentle ambient raindrop drop
    let nextAmbientDrop = Date.now() + 2500;

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now > nextAmbientDrop) {
        // Spawn gentle random droplet somewhere in view
        createWaterDropEffect(
          width * 0.15 + Math.random() * width * 0.7,
          height * 0.15 + Math.random() * height * 0.7,
          false
        );
        nextAmbientDrop = now + 3500 + Math.random() * 2500;
      }

      // 1. Render and update Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity *= 0.965; // exponential decay

        if (r.opacity < 0.01 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw crisp caustic refractive outer ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color} ${r.opacity})`;
        ctx.lineWidth = r.lineWidth;
        ctx.stroke();

        // Inner highlight glint
        ctx.beginPath();
        ctx.arc(r.x - 1, r.y - 1, Math.max(1, r.radius - 2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.7})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Render and update Splash Droplets
      for (let i = splashDroplets.length - 1; i >= 0; i--) {
        const p = splashDroplets[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.vx *= 0.96; // air drag
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          splashDroplets.splice(i, 1);
          continue;
        }

        ctx.save();
        // Droplet body with water lens gradient
        const grad = ctx.createRadialGradient(
          p.x - p.radius * 0.3,
          p.y - p.radius * 0.3,
          0,
          p.x,
          p.y,
          p.radius
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha})`);
        grad.addColorStop(0.4, `rgba(168, 234, 230, ${p.alpha * 0.9})`);
        grad.addColorStop(1, `rgba(40, 127, 145, ${p.alpha * 0.4})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Render and update Ambient Floating Droplets
      for (let i = 0; i < floatingDroplets.length; i++) {
        const d = floatingDroplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.pulsePhase += 0.03;

        // Wrap around boundaries
        if (d.y < -20) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        if (d.x < -20) d.x = width + 10;
        if (d.x > width + 20) d.x = -10;

        const currentR = d.baseRadius + Math.sin(d.pulsePhase) * 0.6;

        ctx.save();
        // Shadow/glow ring
        ctx.beginPath();
        ctx.arc(d.x, d.y + 1, currentR + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 42, 48, ${d.alpha * 0.08})`;
        ctx.fill();

        // Droplet body
        const dropGrad = ctx.createRadialGradient(
          d.x - currentR * 0.35,
          d.y - currentR * 0.35,
          currentR * 0.1,
          d.x,
          d.y,
          currentR
        );
        dropGrad.addColorStop(0, `rgba(255, 255, 255, ${d.alpha})`);
        dropGrad.addColorStop(0.4, `rgba(205, 238, 239, ${d.alpha * 0.8})`);
        dropGrad.addColorStop(0.85, `rgba(114, 189, 206, ${d.alpha * 0.4})`);
        dropGrad.addColorStop(1, `rgba(40, 127, 145, ${d.alpha * 0.15})`);

        ctx.beginPath();
        ctx.arc(d.x, d.y, currentR, 0, Math.PI * 2);
        ctx.fillStyle = dropGrad;
        ctx.fill();

        // Specular highlight dot (glint of light on the droplet)
        ctx.beginPath();
        ctx.arc(d.x - currentR * 0.35, d.y - currentR * 0.35, Math.max(0.6, currentR * 0.25), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha * 0.95})`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[15] select-none"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
