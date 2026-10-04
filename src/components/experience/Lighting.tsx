import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { expState } from './ExperienceState';

export default function Lighting() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const backRimRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    // Dynamic micro-animation for reflections (e.g., subtle movement of key/rim light to make reflections feel alive)
    const time = state.clock.getElapsedTime();
    if (keyLightRef.current && !expState.reducedMotion) {
      keyLightRef.current.position.x = 4 + Math.sin(time * 0.4) * 0.5;
    }
    if (rimLightRef.current && !expState.reducedMotion) {
      rimLightRef.current.position.y = 2 + Math.cos(time * 0.5) * 0.3;
    }
  });

  return (
    <group name="studio-lighting">
      {/* 1. Ambient Background Fill: Pale aqua/blue tint for overall soft luminescence */}
      <ambientLight intensity={0.8} color="#E7F7F6" />

      {/* 2. Key Light: Main directional light, slightly warm, mimics sunlight or soft studio panel */}
      <directionalLight
        ref={keyLightRef}
        position={[4, 5, 4]}
        intensity={2.2}
        color="#F8FEFD"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* 3. Fill Light: Soft cool light opposite the key to lift dark shadows with soft blueish tones */}
      <directionalLight
        ref={fillLightRef}
        position={[-5, 2, 2]}
        intensity={1.2}
        color="#B8E6EA"
      />

      {/* 4. Sharp Back Rim Light (Left): Creates high-contrast rim highlights on the glass edges */}
      <directionalLight
        ref={rimLightRef}
        position={[-3, 3, -6]}
        intensity={3.5}
        color="#F8FEFD"
      />

      {/* 5. Glistening Back Rim Light (Right): Extra glint for liquid reflection */}
      <directionalLight
        ref={backRimRef}
        position={[3, -2, -6]}
        intensity={2.8}
        color="#CDEEEF"
      />

      {/* 6. Subtle overhead spotlight to highlight the brushed aluminum cap */}
      <spotLight
        position={[0, 6, 0]}
        intensity={1.5}
        angle={0.4}
        penumbra={0.8}
        color="#F2FBFA"
      />
    </group>
  );
}
