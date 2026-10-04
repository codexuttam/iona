import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { expState, updateState } from './ExperienceState';

export default function IonaBottle() {
  const bottleGroupRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const waterRef = useRef<THREE.Mesh>(null);
  const labelTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Generate dynamic canvas texture for the label
  const labelCanvas = useRef<HTMLCanvasElement | null>(null);
  const [hasCreatedLabel, setHasCreatedLabel] = useState(false);

  useEffect(() => {
    // Create label canvas dynamically for ultra-sharp rendering
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // 1. Sleek semi-translucent elegant label backing
      ctx.fillStyle = 'rgba(242, 251, 250, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fine hairline decorative horizontal lines top/bottom
      ctx.strokeStyle = 'rgba(16, 42, 48, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, 40);
      ctx.lineTo(974, 40);
      ctx.moveTo(50, 472);
      ctx.lineTo(974, 472);
      ctx.stroke();

      // 2. Premium Branding: IONA in massive heavy italic condensed
      ctx.fillStyle = '#102A30';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Use bold, condensed, italic serif/grotesque style
      ctx.font = 'italic 900 180px "Arial Narrow", "Helvetica Neue", sans-serif';
      ctx.letterSpacing = '-4px';
      ctx.fillText('IONA', canvas.width / 2, canvas.height / 2 - 20);

      // 3. Supporting Editorial Labels
      ctx.fillStyle = '#58747A';
      ctx.letterSpacing = '6px';
      ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('ALKALINE  ·  IONISED  ·  pH 8.5+', canvas.width / 2, canvas.height / 2 + 100);

      ctx.fillStyle = 'rgba(16, 42, 48, 0.4)';
      ctx.letterSpacing = '12px';
      ctx.font = '400 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('NATURALLY FILTERED  ·  PREMIUM GLASS', canvas.width / 2, canvas.height / 2 + 160);

      labelCanvas.current = canvas;
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = 1.0; // Wrap around label cylinder cleanly
      labelTextureRef.current = texture;
      setHasCreatedLabel(true);
    }
  }, []);

  // Set up double-walled bottle geometries (points starting bottom-center and tracing wall up and back down)
  const glassPoints = useRef<THREE.Vector2[]>([]);
  const waterPoints = useRef<THREE.Vector2[]>([]);

  if (glassPoints.current.length === 0) {
    const thickness = 0.035;
    // Outer wall
    glassPoints.current.push(new THREE.Vector2(0, -1.3));
    glassPoints.current.push(new THREE.Vector2(0.48, -1.3));
    glassPoints.current.push(new THREE.Vector2(0.48, 0.6));
    glassPoints.current.push(new THREE.Vector2(0.46, 0.75));
    glassPoints.current.push(new THREE.Vector2(0.35, 0.95));
    glassPoints.current.push(new THREE.Vector2(0.18, 1.15));
    glassPoints.current.push(new THREE.Vector2(0.16, 1.45));
    glassPoints.current.push(new THREE.Vector2(0.18, 1.45));

    // Inner wall (creates glass thickness for refraction)
    glassPoints.current.push(new THREE.Vector2(0.18 - thickness, 1.44));
    glassPoints.current.push(new THREE.Vector2(0.18 - thickness, 1.15 + 0.01));
    glassPoints.current.push(new THREE.Vector2(0.35 - thickness, 0.95));
    glassPoints.current.push(new THREE.Vector2(0.46 - thickness, 0.75));
    glassPoints.current.push(new THREE.Vector2(0.48 - thickness, 0.6));
    glassPoints.current.push(new THREE.Vector2(0.48 - thickness, -1.3 + thickness));
    glassPoints.current.push(new THREE.Vector2(0, -1.3 + thickness));
  }

  if (waterPoints.current.length === 0) {
    const thickness = 0.035;
    const waterMargin = 0.005;
    const offset = thickness + waterMargin;

    // Water level stops at neck shoulder
    waterPoints.current.push(new THREE.Vector2(0, -1.3 + offset));
    waterPoints.current.push(new THREE.Vector2(0.48 - offset, -1.3 + offset));
    waterPoints.current.push(new THREE.Vector2(0.48 - offset, 0.6));
    waterPoints.current.push(new THREE.Vector2(0.46 - offset, 0.75));
    waterPoints.current.push(new THREE.Vector2(0.35 - offset, 0.82));
    waterPoints.current.push(new THREE.Vector2(0, 0.82)); // Flat water top surface
  }

  // Animation frame loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const group = bottleGroupRef.current;
    if (!group) return;

    // 1. Fluid background/scroll transitions update
    // Update dragging rotation interpolation
    if (expState.isDragging) {
      expState.dragYRotation += (expState.targetDragYRotation - expState.dragYRotation) * 0.12;
    } else {
      // Return slowly to 0 drag offset or slowly decay rotation
      expState.dragYRotation += (0 - expState.dragYRotation) * 0.05;
    }

    // 2. Micro-floating animation (sinusoidal)
    let floatingAmp = 0.04;
    let floatingFreq = 0.8;
    if (expState.reducedMotion) {
      floatingAmp = 0.008;
      floatingFreq = 0.3;
    }
    const floatY = Math.sin(time * floatingFreq) * floatingAmp;

    // We will set relative positioning, but the ScrollTrigger camera rig and direct timeline transforms will control core group dynamics.
    // However, to keep it extremely unified, we let the ScrollTrigger drive group target positions/rotations and we interpolate here.
    
    // Smoothly apply floating to bottle y coordinate
    group.position.y += (floatY - group.position.y * 0.1) * 0.1;

    // 3. Mouse cursor reactivity (very subtle)
    let rx = 0;
    let ry = 0;
    if (!expState.reducedMotion) {
      // Calculate mouse target rotation
      // expState.mouse has values -1 to 1 based on page coordinates
      expState.mouse.x += (expState.mouse.targetX - expState.mouse.x) * 0.1;
      expState.mouse.y += (expState.mouse.targetY - expState.mouse.y) * 0.1;

      rx = expState.mouse.y * 0.06;
      ry = expState.mouse.x * 0.12;
    }

    // Apply basic rotations
    // The ScrollTrigger timeline will target another container or add to this group's rotation.
    // To allow BOTH ScrollTrigger timeline control AND mouse/drag, we separate them:
    // bottleGroupRef contains the ScrollTrigger base rotation, and an inner group handles mouse/drag!
  });

  return (
    <group ref={bottleGroupRef} name="iona-bottle-base-group">
      {/* Inner group for mouse tilt and swipe rotation so it is cumulative with GSAP ScrollTrigger timeline */}
      <group 
        onPointerDown={(e) => {
          // Trigger drag state
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          updateState({ isDragging: true });
          const initialX = e.clientX;
          const initialRot = expState.targetDragYRotation;
          
          const handlePointerMove = (moveEvt: PointerEvent) => {
            const deltaX = moveEvt.clientX - initialX;
            // Map 1px of drag to ~0.01 radians of rotation
            updateState({ targetDragYRotation: initialRot + deltaX * 0.008 });
          };

          const handlePointerUp = () => {
            updateState({ isDragging: false });
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
          };

          window.addEventListener('pointermove', handlePointerMove);
          window.addEventListener('pointerup', handlePointerUp);
        }}
      >
        <BottleVisuals 
          glassPoints={glassPoints.current} 
          waterPoints={waterPoints.current}
          labelTexture={labelTextureRef.current}
        />
      </group>
    </group>
  );
}

interface VisualsProps {
  glassPoints: THREE.Vector2[];
  waterPoints: THREE.Vector2[];
  labelTexture: THREE.CanvasTexture | null;
}

function BottleVisuals({ glassPoints, waterPoints, labelTexture }: VisualsProps) {
  const visualGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const group = visualGroupRef.current;
    if (!group) return;

    // Apply Mouse Tilts and Swipe Rotations directly here
    // This isolates them from GSAP timeline rotations applied to the parent group!
    let rx = 0;
    let ry = 0;
    if (!expState.reducedMotion) {
      rx = expState.mouse.y * 0.08;
      ry = expState.mouse.x * 0.15;
    }

    // Cumulative rotation = mouse tilt + swipe drag rotation
    group.rotation.x = rx;
    group.rotation.y = ry + expState.dragYRotation;
  });

  return (
    <group ref={visualGroupRef}>
      {/* 1. Glass Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[glassPoints, 64]} />
        <meshPhysicalMaterial
          color="#EAFBF9"
          roughness={0.06}
          metalness={0.02}
          transmission={0.98} // High transmission for beautiful glass refraction
          ior={1.52} // Real glass IOR
          thickness={0.5} // Gives depth to refraction
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          attenuationColor="#CDEEEF"
          attenuationDistance={1.2}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Inner Water */}
      <mesh position={[0, 0, 0]} scale={[0.99, 1.0, 0.99]}>
        <latheGeometry args={[waterPoints, 64]} />
        <meshPhysicalMaterial
          color="#9FD6E2"
          emissive="#72BDCE"
          emissiveIntensity={0.12}
          roughness={0.01}
          metalness={0.05}
          transmission={0.95} // Water is transmissive
          ior={1.333} // Real water IOR
          thickness={0.8}
          clearcoat={0.3}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 3. Sleek Premium Cap */}
      <mesh position={[0, 1.44, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.24, 64]} />
        <meshStandardMaterial
          color="#CDEEEF"
          roughness={0.25}
          metalness={0.85} // Premium brushed aluminum feel
        />
      </mesh>

      {/* 4. Elegant Cylindrical Label Wrap */}
      {labelTexture && (
        <mesh position={[0, -0.2, 0]} scale={[1.004, 1.0, 1.004]}>
          <cylinderGeometry args={[0.48, 0.48, 0.8, 64, 1, true]} />
          <meshPhysicalMaterial
            map={labelTexture}
            transparent
            alphaTest={0.01}
            roughness={0.15}
            metalness={0.0}
            transmission={0.6} // Semi-translucent vellum paper label
            thickness={0.02}
            side={THREE.DoubleSide}
            depthWrite={true}
          />
        </mesh>
      )}
    </group>
  );
}
