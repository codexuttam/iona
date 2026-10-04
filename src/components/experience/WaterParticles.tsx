import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { expState } from './ExperienceState';

const PARTICLE_COUNT = 150;

export default function WaterParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate initial particle coordinates and characteristics
  const { positions, randomData, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const rand = new Float32Array(PARTICLE_COUNT * 3); // [speed, amplitude, phase]
    const cols = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distributed around the bottle in a cylindrical shell
      const r = 0.5 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5; // y spread
      pos[i * 3 + 2] = Math.sin(theta) * r;

      // Random metadata for animations
      rand[i * 3] = 0.3 + Math.random() * 0.7; // Speed scale
      rand[i * 3 + 1] = 0.1 + Math.random() * 0.4; // Sine amplitude
      rand[i * 3 + 2] = Math.random() * Math.PI * 2; // Sine phase offset

      // Pure white, soft aqua, water blue colors
      const colorSeed = Math.random();
      if (colorSeed < 0.4) {
        // Pure soft white
        cols[i * 3] = 0.97;
        cols[i * 3 + 1] = 0.99;
        cols[i * 3 + 2] = 0.99;
      } else if (colorSeed < 0.8) {
        // Soft aqua (#B8E6EA)
        cols[i * 3] = 0.72;
        cols[i * 3 + 1] = 0.90;
        cols[i * 3 + 2] = 0.92;
      } else {
        // Water blue (#72BDCE)
        cols[i * 3] = 0.45;
        cols[i * 3 + 1] = 0.74;
        cols[i * 3 + 2] = 0.81;
      }
    }

    return { positions: pos, randomData: rand, colors: cols };
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const time = state.clock.getElapsedTime();
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const section = expState.currentSection;
    const processStage = expState.activeProcessStage;

    // Define behaviors based on scroll states
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const speed = randomData[idx];
      const amp = randomData[idx + 1];
      const phase = randomData[idx + 2];

      // Base coordinates
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);

      // Section-specific animations
      if (section === 0) {
        // 0. HERO: Slow, calm floating in place, subtle drift
        y += Math.sin(time * 0.2 + phase) * 0.0015;
        x += Math.cos(time * 0.1 + phase) * 0.0008;
      } 
      else if (section === 1) {
        // 1. WATER: Side-shifting flow
        y += Math.sin(time * 0.3 + phase) * 0.002;
        x += Math.sin(time * 0.15 + phase) * 0.001;
      } 
      else if (section === 2) {
        // 2. ALKALINE (pH 8.5+): Bubbles rising steadily up to simulate carbonation/oxygenation
        const riseSpeed = 0.008 * speed;
        y += riseSpeed;
        x += Math.sin(time * 1.5 + phase) * 0.003; // wiggle

        // Recycle bubbles when they go too high
        if (y > 2.5) {
          y = -2.5;
          x = (Math.random() - 0.5) * 2;
          z = (Math.random() - 0.5) * 2;
        }
      } 
      else if (section === 3) {
        // 3. IONISED: Spiral/vortex flow around the bottle simulating electrical charges
        const angleSpeed = 0.015 * speed;
        // Convert to cylindrical
        let r = Math.sqrt(x * x + z * z);
        let theta = Math.atan2(z, x);

        theta += angleSpeed; // Rotate
        r += Math.sin(time * 0.5 + phase) * 0.001; // subtle breathing

        x = Math.cos(theta) * r;
        z = Math.sin(theta) * r;
        y += Math.sin(time * 0.4 + phase) * 0.002; // vertical drift
      } 
      else if (section === 4) {
        // 4. PROCESS: Depends on process steps (SOURCE, PURIFY, IONISE, REFINE)
        if (processStage === 0) {
          // SOURCE: Heavy cascade representing rushing spring water source
          y -= 0.015 * speed;
          if (y < -2.5) y = 2.5;
        } else if (processStage === 1) {
          // PURIFY: Settling, slowing down, pure linear motion
          y += Math.sin(time * 0.2 + phase) * 0.001;
          x += Math.cos(time * 0.2 + phase) * 0.001;
        } else if (processStage === 2) {
          // IONISE: Sparkly rapid vibrations
          y += Math.sin(time * 2.0 + phase) * 0.006 * amp;
          x += Math.cos(time * 2.0 + phase) * 0.006 * amp;
        } else {
          // REFINE: Crystal clear, almost completely suspended, extremely tiny micro-drifts
          y += Math.sin(time * 0.1 + phase) * 0.0003;
          x += Math.cos(time * 0.1 + phase) * 0.0003;
        }
      } 
      else {
        // 5 & 6. PRODUCT & FINAL: Gentle calm field
        y += Math.sin(time * 0.3 + phase) * 0.0015;
        x += Math.cos(time * 0.2 + phase) * 0.0008;
      }

      // Constrain inside viewport boundaries roughly
      if (y > 3.5) y = -3.5;
      if (y < -3.5) y = 3.5;

      posAttr.setXYZ(i, x, y, z);
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        // Custom texture is created procedurally for soft, round, elegant light dots rather than blocky squares
        map={createCircleTexture()}
        depthWrite={false}
      />
    </points>
  );
}

// Procedural soft glowing circular particle texture
function createCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(205, 238, 239, 0.8)');
    gradient.addColorStop(0.7, 'rgba(114, 189, 206, 0.2)');
    gradient.addColorStop(1, 'rgba(114, 189, 206, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
