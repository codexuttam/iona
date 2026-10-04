import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { expState, updateState } from './ExperienceState';

export default function IonaBottle() {
  const bottleGroupRef = useRef<THREE.Group>(null);
  const labelTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const [texturesReady, setTexturesReady] = useState(false);

  useEffect(() => {
    // 1. Generate Ultra-Crisp, High-Contrast Luxury Label Badge (2048 x 1024)
    // Opaque prestige textured paper with metallic foil detailing so brand name is 100% sharp & visible
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 2048;
    labelCanvas.height = 1024;
    const ctx = labelCanvas.getContext('2d');

    if (ctx) {
      // Crisp, solid off-white luxury vellum paper background (Opaque, NOT dull or transparent)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, labelCanvas.width, labelCanvas.height);

      // Subtle warm-ivory paper texture gradient
      const paperGrad = ctx.createLinearGradient(0, 0, labelCanvas.width, labelCanvas.height);
      paperGrad.addColorStop(0, '#FFFFFF');
      paperGrad.addColorStop(0.5, '#F9FDFA');
      paperGrad.addColorStop(1, '#F2F8F7');
      ctx.fillStyle = paperGrad;
      ctx.fillRect(12, 12, labelCanvas.width - 24, labelCanvas.height - 24);

      // Outer Dual Metallic Pinstripe Frame
      ctx.strokeStyle = '#287F91';
      ctx.lineWidth = 6;
      ctx.strokeRect(36, 36, labelCanvas.width - 72, labelCanvas.height - 72);

      ctx.strokeStyle = 'rgba(16, 42, 48, 0.35)';
      ctx.lineWidth = 2;
      ctx.strokeRect(52, 52, labelCanvas.width - 104, labelCanvas.height - 104);

      // Corner technical marks (Ciao Energy aesthetic)
      const bracketSize = 40;
      ctx.strokeStyle = '#287F91';
      ctx.lineWidth = 8;
      // Top-Left
      ctx.beginPath(); ctx.moveTo(60, 60 + bracketSize); ctx.lineTo(60, 60); ctx.lineTo(60 + bracketSize, 60); ctx.stroke();
      // Top-Right
      ctx.beginPath(); ctx.moveTo(labelCanvas.width - 60 - bracketSize, 60); ctx.lineTo(labelCanvas.width - 60, 60); ctx.lineTo(labelCanvas.width - 60, 60 + bracketSize); ctx.stroke();
      // Bottom-Left
      ctx.beginPath(); ctx.moveTo(60, labelCanvas.height - 60 - bracketSize); ctx.lineTo(60, labelCanvas.height - 60); ctx.lineTo(60 + bracketSize, labelCanvas.height - 60); ctx.stroke();
      // Bottom-Right
      ctx.beginPath(); ctx.moveTo(labelCanvas.width - 60 - bracketSize, labelCanvas.height - 60); ctx.lineTo(labelCanvas.width - 60, labelCanvas.height - 60); ctx.lineTo(labelCanvas.width - 60, labelCanvas.height - 60 - bracketSize); ctx.stroke();

      // Top Editorial Subhead
      ctx.fillStyle = '#58747A';
      ctx.font = '700 28px "Plus Jakarta Sans", monospace';
      ctx.letterSpacing = '12px';
      ctx.textAlign = 'center';
      ctx.fillText('HIGH ALKALINE SPRING AQUIFER · EST. 2026', labelCanvas.width / 2, 140);

      // Hero Brand Name: "IONA" in deep obsidian black with subtle metallic bevel
      ctx.fillStyle = '#08171B'; // Deep crisp black-slate
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'italic 900 370px "Arial Narrow", "Helvetica Neue", sans-serif';
      ctx.letterSpacing = '-8px';
      ctx.fillText('IONA', labelCanvas.width / 2, labelCanvas.height / 2 - 35);

      // Solid Metallic Teal Accent Bar below IONA
      const barGrad = ctx.createLinearGradient(400, 0, 1648, 0);
      barGrad.addColorStop(0, '#102A30');
      barGrad.addColorStop(0.5, '#287F91');
      barGrad.addColorStop(1, '#102A30');
      ctx.fillStyle = barGrad;
      ctx.fillRect(450, labelCanvas.height / 2 + 155, 1148, 8);

      // Alkaline Mineral Badge Pill
      ctx.fillStyle = '#E7F7F6';
      ctx.strokeStyle = '#287F91';
      ctx.lineWidth = 3;
      const pillW = 560;
      const pillH = 70;
      const pillX = labelCanvas.width / 2 - pillW / 2;
      const pillY = labelCanvas.height / 2 + 200;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 35);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#287F91';
      ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('ALKALINE · pH 8.5+', labelCanvas.width / 2, pillY + 44);

      // Supporting Editorial Metrics
      ctx.fillStyle = '#102A30';
      ctx.font = '600 30px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '12px';
      ctx.fillText('NATURALLY IONISED · 750 ML / 25.4 FL OZ', labelCanvas.width / 2, labelCanvas.height / 2 + 340);

      // Bottom Serial Matrix
      ctx.fillStyle = '#58747A';
      ctx.font = '500 24px monospace';
      ctx.letterSpacing = '6px';
      ctx.fillText('LOT 084 · SWISS ALPINE BEDROCK · 0.00% IMPURITIES', labelCanvas.width / 2, 900);

      const labelTex = new THREE.CanvasTexture(labelCanvas);
      labelTex.wrapS = THREE.ClampToEdgeWrapping;
      labelTex.wrapT = THREE.ClampToEdgeWrapping;
      labelTex.anisotropy = 16;
      labelTex.colorSpace = THREE.SRGBColorSpace;
      labelTextureRef.current = labelTex;
    }

    setTexturesReady(true);
  }, []);

  // 2. High-Precision Double-Walled Lathe Profiles with Heavy Solid Crystal Base
  const { glassPoints, waterPoints } = useMemo(() => {
    const gPoints: THREE.Vector2[] = [];
    const wPoints: THREE.Vector2[] = [];

    const wallThickness = 0.042;
    const baseSolidHeight = 0.18; // Heavy luxury crystal-glass base

    // Outer Glass Profile
    gPoints.push(new THREE.Vector2(0, -1.25)); // Center concave punt
    gPoints.push(new THREE.Vector2(0.2, -1.28));
    gPoints.push(new THREE.Vector2(0.42, -1.32));
    gPoints.push(new THREE.Vector2(0.485, -1.30)); // Base bevel
    gPoints.push(new THREE.Vector2(0.485, 0.62));  // Main body cylinder
    gPoints.push(new THREE.Vector2(0.47, 0.78));   // Elegant shoulder taper
    gPoints.push(new THREE.Vector2(0.36, 1.0));    // Neck curve
    gPoints.push(new THREE.Vector2(0.185, 1.20));  // Neck column
    gPoints.push(new THREE.Vector2(0.185, 1.35));  // Collar
    gPoints.push(new THREE.Vector2(0.20, 1.37));   // Collar thread ring
    gPoints.push(new THREE.Vector2(0.185, 1.39));
    gPoints.push(new THREE.Vector2(0.185, 1.48));  // Mouth lip
    gPoints.push(new THREE.Vector2(0.165, 1.48));  // Rounded lip crest

    // Inner Glass Wall (cavity)
    gPoints.push(new THREE.Vector2(0.185 - wallThickness, 1.46));
    gPoints.push(new THREE.Vector2(0.185 - wallThickness, 1.20));
    gPoints.push(new THREE.Vector2(0.36 - wallThickness, 1.0));
    gPoints.push(new THREE.Vector2(0.47 - wallThickness, 0.78));
    gPoints.push(new THREE.Vector2(0.485 - wallThickness, 0.62));
    gPoints.push(new THREE.Vector2(0.485 - wallThickness, -1.30 + baseSolidHeight));
    gPoints.push(new THREE.Vector2(0, -1.25 + baseSolidHeight)); // Inner bottom floor

    // Water Profile (100% pure crystal liquid filling the inner cavity)
    const wMargin = 0.002;
    const wR = wallThickness + wMargin;
    wPoints.push(new THREE.Vector2(0, -1.25 + baseSolidHeight + wMargin));
    wPoints.push(new THREE.Vector2(0.485 - wR, -1.30 + baseSolidHeight + wMargin));
    wPoints.push(new THREE.Vector2(0.485 - wR, 0.62));
    wPoints.push(new THREE.Vector2(0.47 - wR, 0.78));
    wPoints.push(new THREE.Vector2(0.36 - wR, 0.90));
    wPoints.push(new THREE.Vector2(0.14, 0.905)); // Liquid meniscus
    wPoints.push(new THREE.Vector2(0, 0.91));

    return { glassPoints: gPoints, waterPoints: wPoints };
  }, []);

  // 3. Sparkling Micro-Ions inside water
  const bubblePositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 36; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.36;
      const y = (Math.random() * 1.6) - 0.9;
      pos.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const group = bottleGroupRef.current;
    if (!group) return;

    if (expState.isDragging) {
      expState.dragYRotation += (expState.targetDragYRotation - expState.dragYRotation) * 0.12;
    } else {
      expState.dragYRotation += (0 - expState.dragYRotation) * 0.05;
    }

    let floatingAmp = expState.reducedMotion ? 0.006 : 0.025;
    let floatingFreq = expState.reducedMotion ? 0.3 : 0.75;
    const floatY = Math.sin(time * floatingFreq) * floatingAmp;

    group.position.y += (floatY - group.position.y * 0.1) * 0.1;

    if (!expState.reducedMotion) {
      expState.mouse.x += (expState.mouse.targetX - expState.mouse.x) * 0.1;
      expState.mouse.y += (expState.mouse.targetY - expState.mouse.y) * 0.1;
    }
  });

  return (
    <group ref={bottleGroupRef} name="iona-bottle-base-group">
      <group 
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          updateState({ isDragging: true });
          const initialX = e.clientX;
          const initialRot = expState.targetDragYRotation;
          
          const handlePointerMove = (moveEvt: PointerEvent) => {
            const deltaX = moveEvt.clientX - initialX;
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
          glassPoints={glassPoints} 
          waterPoints={waterPoints}
          bubblePositions={bubblePositions}
          labelTexture={labelTextureRef.current}
        />
      </group>
    </group>
  );
}

interface VisualsProps {
  glassPoints: THREE.Vector2[];
  waterPoints: THREE.Vector2[];
  bubblePositions: THREE.Vector3[];
  labelTexture: THREE.CanvasTexture | null;
}

function BottleVisuals({
  glassPoints,
  waterPoints,
  bubblePositions,
  labelTexture,
}: VisualsProps) {
  const visualGroupRef = useRef<THREE.Group>(null);
  const bubblesGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = visualGroupRef.current;
    if (!group) return;

    let rx = 0;
    let ry = 0;
    if (!expState.reducedMotion) {
      rx = expState.mouse.y * 0.06;
      ry = expState.mouse.x * 0.12;
    }

    group.rotation.x = rx;
    group.rotation.y = ry + expState.dragYRotation;

    if (bubblesGroupRef.current && !expState.reducedMotion) {
      const t = state.clock.getElapsedTime();
      bubblesGroupRef.current.rotation.y = t * 0.04;
    }
  });

  return (
    <group ref={visualGroupRef}>
      {/* 1. Crystal Diamond Optical Glass: Maximum transparency, luminous clarity */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[glassPoints, 128]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.008}
          metalness={0.0}
          transmission={0.995} // Diamond pure optical glass
          ior={1.52}
          thickness={0.85}
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          attenuationColor="#F0FCFB" // Pure neutral crystal tint (NO murky green/teal)
          attenuationDistance={2.5}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Crystal Clear Water Column: Pure, sparkling, transparent */}
      <mesh position={[0, 0, 0]} scale={[0.998, 1.0, 0.998]}>
        <latheGeometry args={[waterPoints, 128]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.005}
          metalness={0.0}
          transmission={0.995} // Clear water
          ior={1.333}
          thickness={1.2}
          clearcoat={0.8}
          attenuationColor="#EBFBFA" // Subtle diamond crispness (NO dark murky blue/teal)
          attenuationDistance={2.0}
          transparent
          opacity={0.97}
        />
      </mesh>

      {/* 3. Suspended Micro-Ions (Sparkling Refractive Bubbles) */}
      <group ref={bubblesGroupRef}>
        {bubblePositions.map((pos, idx) => (
          <mesh key={idx} position={pos} scale={0.007 + (idx % 3) * 0.003}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              emissive="#EAFBF9"
              emissiveIntensity={0.6}
              roughness={0.0}
              transmission={0.95}
              ior={1.15}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* 4. Luxury Brushed Platinum / Aluminum Cap with Precision Knurling */}
      <group position={[0, 1.48, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.185, 0.185, 0.22, 64]} />
          <meshStandardMaterial
            color="#E6EFF0"
            roughness={0.2}
            metalness={0.92} // Premium brushed aluminum
          />
        </mesh>

        {/* Polished Chamfered Top Rim */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.18, 0.185, 0.02, 64]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.12}
            metalness={0.95}
          />
        </mesh>

        {/* Accent Neck Band */}
        <mesh position={[0, -0.115, 0]}>
          <cylinderGeometry args={[0.188, 0.188, 0.015, 64]} />
          <meshStandardMaterial
            color="#102A30"
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>
      </group>

      {/* 5. Front-Facing Luxury Brand Sticker Badge (100% Solid & Crisp - NOT dull or transparent) */}
      {labelTexture && (
        <mesh position={[0, -0.18, 0]}>
          {/* Curved front label patch wrapping 130 degrees around the front of the bottle */}
          <cylinderGeometry args={[0.488, 0.488, 0.88, 64, 1, true, -Math.PI * 0.36, Math.PI * 0.72]} />
          <meshStandardMaterial
            map={labelTexture}
            roughness={0.28}
            metalness={0.05}
            side={THREE.FrontSide} // Only front face rendered: no double-sided overlap or ghosting!
            polygonOffset
            polygonOffsetFactor={-1} // Prevents z-fighting with glass
          />
        </mesh>
      )}
    </group>
  );
}
