import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import IonaBottle from './IonaBottle';
import Lighting from './Lighting';
import CameraRig from './CameraRig';
import WaterParticles from './WaterParticles';

export default function Experience() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 select-none overflow-hidden">
      <Canvas
        className="pointer-events-auto"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]} // Performance optimized dpr cap
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
          position: [0, 0, 6],
        }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <Suspense fallback={null}>
          {/* Studio Lights */}
          <Lighting />

          {/* Core Floating IONA Bottle */}
          <IonaBottle />

          {/* Adaptation Particle Field */}
          <WaterParticles />

          {/* Choreographed Camera Rig */}
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
