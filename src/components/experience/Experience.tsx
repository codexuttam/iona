import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
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
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.18,
        }}
        dpr={[1, 2.5]} // 4K retina rendering fidelity
        shadows
        camera={{
          fov: 44,
          near: 0.1,
          far: 50,
          position: [0, 0, 6],
        }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <Suspense fallback={null}>
          {/* 4K Studio Lighting with Environment Softboxes */}
          <Lighting />

          {/* Core Floating IONA Bottle with 4K Materials */}
          <IonaBottle />

          {/* Realistic Grounding Contact Shadows */}
          <ContactShadows
            position={[0, -1.36, 0]}
            opacity={0.6}
            scale={3.6}
            blur={2.4}
            far={1.6}
            color="#0E2C33"
          />

          {/* Adaptation Particle Field */}
          <WaterParticles />

          {/* Choreographed Camera Rig */}
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
