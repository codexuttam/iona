import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { expState } from './ExperienceState';

export default function Lighting() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const backRimRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    // Dynamic organic breathing for specular glints
    const time = state.clock.getElapsedTime();
    if (keyLightRef.current && !expState.reducedMotion) {
      keyLightRef.current.position.x = 3.5 + Math.sin(time * 0.3) * 0.4;
      keyLightRef.current.position.y = 4.5 + Math.cos(time * 0.25) * 0.3;
    }
    if (rimLightRef.current && !expState.reducedMotion) {
      rimLightRef.current.position.y = 3 + Math.cos(time * 0.4) * 0.4;
    }
  });

  return (
    <group name="studio-lighting-4k">
      {/* 1. Ultra-HD Studio Environment Map with Photometric Softbox Lightformers */}
      <Environment resolution={512}>
        <group rotation={[-Math.PI / 4, -0.2, 0]}>
          {/* Main Key Softbox: Creates the signature vertical reflection strip down the left side */}
          <Lightformer
            form="rect"
            intensity={4.5}
            position={[-4, 1, 2]}
            scale={[1.8, 9, 1]}
            color="#FFFFFF"
          />

          {/* Secondary Fill Softbox: Subtle cool wrap reflection on the right */}
          <Lightformer
            form="rect"
            intensity={2.8}
            position={[4.5, 0.5, 1]}
            scale={[1.5, 8, 1]}
            color="#D6F4F7"
          />

          {/* Overhead Cap Highlight: Crisp metallic rim specular */}
          <Lightformer
            form="rect"
            intensity={3.2}
            position={[0, 6, 0]}
            scale={[5, 5, 1]}
            color="#FFFFFF"
          />

          {/* Intense Backlight: Illuminates the water body through the glass */}
          <Lightformer
            form="rect"
            intensity={5.0}
            position={[0, 1, -6]}
            scale={[8, 10, 1]}
            color="#A8EAE6"
          />

          {/* Bottom Caustic Reflection Ring */}
          <Lightformer
            form="ring"
            intensity={2.0}
            position={[0, -3.5, 0]}
            scale={[6, 6, 1]}
            color="#287F91"
          />
        </group>
      </Environment>

      {/* 2. Ambient Fill: Crisp neutral tint to prevent black crush in shadows */}
      <ambientLight intensity={0.6} color="#EAFBF9" />

      {/* 3. Physical Key Directional Light: Hard directional shadows & sharp caustics */}
      <directionalLight
        ref={keyLightRef}
        position={[3.5, 5, 4]}
        intensity={2.5}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[2048, 2048]} // 4K shadow map for razor sharp contact shadows
        shadow-bias={-0.00005}
      />

      {/* 4. Soft Fill Light: Gentle teal wash */}
      <directionalLight
        ref={fillLightRef}
        position={[-5, 2, 3]}
        intensity={1.2}
        color="#BEE9EE"
      />

      {/* 5. Razor Sharp Rim Highlights */}
      <directionalLight
        ref={rimLightRef}
        position={[-3, 4, -5]}
        intensity={3.8}
        color="#FFFFFF"
      />

      <directionalLight
        ref={backRimRef}
        position={[3, -1, -5]}
        intensity={2.5}
        color="#72BDCE"
      />

      {/* 6. Precision Cap Spotlight */}
      <spotLight
        position={[0, 5.5, 1]}
        intensity={2.0}
        angle={0.35}
        penumbra={0.7}
        color="#F8FEFD"
      />
    </group>
  );
}
