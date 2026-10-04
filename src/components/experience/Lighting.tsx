import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { expState } from './ExperienceState';

export default function Lighting() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const frontSpecularRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (keyLightRef.current && !expState.reducedMotion) {
      keyLightRef.current.position.x = 3.5 + Math.sin(time * 0.3) * 0.3;
      keyLightRef.current.position.y = 4.5 + Math.cos(time * 0.25) * 0.2;
    }
  });

  return (
    <group name="studio-lighting-pure">
      {/* 1. Photometric Studio Softbox Environment (Pure white / crystal silver specular reflections) */}
      <Environment resolution={512}>
        <group rotation={[-Math.PI / 4, -0.2, 0]}>
          {/* Key Softbox Strip: Left vertical highlight */}
          <Lightformer
            form="rect"
            intensity={5.0}
            position={[-3.8, 0.5, 2.5]}
            scale={[1.5, 9, 1]}
            color="#FFFFFF"
          />

          {/* Fill Softbox Strip: Right vertical highlight */}
          <Lightformer
            form="rect"
            intensity={3.2}
            position={[4.0, 0.5, 2.0]}
            scale={[1.2, 8, 1]}
            color="#FFFFFF"
          />

          {/* Overhead Cap Softbox */}
          <Lightformer
            form="rect"
            intensity={3.5}
            position={[0, 6, 0]}
            scale={[4, 4, 1]}
            color="#FFFFFF"
          />

          {/* Pure Neutral Backlight: Crystal clear transmission without green/teal tint */}
          <Lightformer
            form="rect"
            intensity={3.0}
            position={[0, 1, -5]}
            scale={[7, 9, 1]}
            color="#FFFFFF"
          />

          {/* Bottom Bounce */}
          <Lightformer
            form="ring"
            intensity={1.2}
            position={[0, -3.5, 0]}
            scale={[5, 5, 1]}
            color="#F0F8F8"
          />
        </group>
      </Environment>

      {/* 2. Soft Ambient Neutral Fill */}
      <ambientLight intensity={0.7} color="#F8FEFD" />

      {/* 3. Direct Key Light for Crisp Studio Highlights */}
      <directionalLight
        ref={keyLightRef}
        position={[3.5, 5, 4]}
        intensity={2.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00005}
      />

      {/* 4. Front Fill Light for Razor Sharp Label Illumination */}
      <directionalLight
        ref={frontSpecularRef}
        position={[0, 0.5, 5]}
        intensity={1.4}
        color="#FFFFFF"
      />

      {/* 5. Rim Highlights for Crystal Glass Edges */}
      <directionalLight
        ref={rimLightRef}
        position={[-3, 4, -4]}
        intensity={3.2}
        color="#FFFFFF"
      />

      <directionalLight
        ref={fillLightRef}
        position={[3, -1, -4]}
        intensity={2.0}
        color="#FFFFFF"
      />

      {/* 6. Cap Spotlight */}
      <spotLight
        position={[0, 5.5, 1]}
        intensity={2.2}
        angle={0.35}
        penumbra={0.6}
        color="#FFFFFF"
      />
    </group>
  );
}
