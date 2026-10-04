import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { expState, updateState } from './ExperienceState';

export default function IonaBottle() {
  const bottleGroupRef = useRef<THREE.Group>(null);
  const labelTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const bumpTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const [texturesReady, setTexturesReady] = useState(false);

  useEffect(() => {
    // 1. Generate 4K Ultra-Sharp Label Canvas (2048 x 1024)
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 2048;
    labelCanvas.height = 1024;
    const ctx = labelCanvas.getContext('2d');

    if (ctx) {
      // Semi-translucent frosted vellum backing
      ctx.fillStyle = 'rgba(244, 252, 251, 0.08)';
      ctx.fillRect(0, 0, labelCanvas.width, labelCanvas.height);

      // Technical framing hairlines (Ciao Energy inspired)
      ctx.strokeStyle = 'rgba(16, 42, 48, 0.22)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Top boundary
      ctx.moveTo(80, 80);
      ctx.lineTo(1968, 80);
      // Bottom boundary
      ctx.moveTo(80, 944);
      ctx.lineTo(1968, 944);
      // Corner tick marks
      ctx.moveTo(80, 80); ctx.lineTo(80, 140);
      ctx.moveTo(1968, 80); ctx.lineTo(1968, 140);
      ctx.moveTo(80, 944); ctx.lineTo(80, 884);
      ctx.moveTo(1968, 944); ctx.lineTo(1968, 884);
      ctx.stroke();

      // Precision Top Coordinate Data
      ctx.fillStyle = '#58747A';
      ctx.font = '600 24px "Plus Jakarta Sans", monospace';
      ctx.letterSpacing = '8px';
      ctx.textAlign = 'left';
      ctx.fillText('COORD: 46°32\'N 8°12\'E', 120, 150);
      ctx.textAlign = 'right';
      ctx.fillText('SPEC: 750 ML / 25.4 FL OZ', 1928, 150);

      // Hero Wordmark: IONA in massive heavy italic condensed
      ctx.fillStyle = '#102A30';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'italic 900 360px "Arial Narrow", "Helvetica Neue", sans-serif';
      ctx.letterSpacing = '-10px';
      ctx.fillText('IONA', labelCanvas.width / 2, labelCanvas.height / 2 - 30);

      // Subtle metallic foil underline accent
      const grad = ctx.createLinearGradient(400, 0, 1648, 0);
      grad.addColorStop(0, 'rgba(40, 127, 145, 0)');
      grad.addColorStop(0.3, 'rgba(40, 127, 145, 0.8)');
      grad.addColorStop(0.7, 'rgba(114, 189, 206, 0.8)');
      grad.addColorStop(1, 'rgba(40, 127, 145, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(400, labelCanvas.height / 2 + 150, 1248, 5);

      // Editorial Subtitles
      ctx.fillStyle = '#287F91';
      ctx.letterSpacing = '14px';
      ctx.font = '700 44px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('ALKALINE  ·  IONISED  ·  pH 8.5+', labelCanvas.width / 2, labelCanvas.height / 2 + 220);

      ctx.fillStyle = '#58747A';
      ctx.letterSpacing = '18px';
      ctx.font = '500 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('NATURALLY STRUCTURED  ·  BOROSILICATE GLASS', labelCanvas.width / 2, labelCanvas.height / 2 + 300);

      // Technical Batch & Serial Barcode Matrix at bottom
      ctx.fillStyle = 'rgba(16, 42, 48, 0.4)';
      ctx.font = '500 22px monospace';
      ctx.letterSpacing = '6px';
      ctx.textAlign = 'center';
      ctx.fillText('LOT 084-2026 // BIOLOGICAL EQUILIBRIUM ASSURED // BATCH RESERVATION', labelCanvas.width / 2, 890);

      const labelTex = new THREE.CanvasTexture(labelCanvas);
      labelTex.wrapS = THREE.RepeatWrapping;
      labelTex.wrapT = THREE.ClampToEdgeWrapping;
      labelTex.repeat.x = 1.0;
      labelTex.anisotropy = 16; // 4K anisotropic filtering
      labelTextureRef.current = labelTex;
    }

    // 2. Generate Realistic Micro-Condensation Droplets Bump Texture (1024 x 512)
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 1024;
    bumpCanvas.height = 512;
    const bCtx = bumpCanvas.getContext('2d');
    if (bCtx) {
      bCtx.fillStyle = '#808080'; // Neutral 50% gray for bump map
      bCtx.fillRect(0, 0, bumpCanvas.width, bumpCanvas.height);

      // Draw subtle micro dew drops
      for (let i = 0; i < 700; i++) {
        const x = Math.random() * bumpCanvas.width;
        const y = Math.random() * bumpCanvas.height;
        const radius = Math.random() * 2.8 + 0.8;

        const dropGrad = bCtx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius);
        dropGrad.addColorStop(0, '#FFFFFF'); // Drop highlight peak
        dropGrad.addColorStop(0.7, '#A0A0A0');
        dropGrad.addColorStop(1, '#808080'); // Neutral boundary

        bCtx.fillStyle = dropGrad;
        bCtx.beginPath();
        bCtx.arc(x, y, radius, 0, Math.PI * 2);
        bCtx.fill();
      }

      const bumpTex = new THREE.CanvasTexture(bumpCanvas);
      bumpTex.wrapS = THREE.RepeatWrapping;
      bumpTex.wrapT = THREE.RepeatWrapping;
      bumpTex.repeat.set(4, 2);
      bumpTextureRef.current = bumpTex;
    }

    setTexturesReady(true);
  }, []);

  // 3. High-Fidelity Double-Walled Lathe Profiles with Heavy Glass Punt & Rounded Lip
  const { glassPoints, waterPoints } = useMemo(() => {
    const gPoints: THREE.Vector2[] = [];
    const wPoints: THREE.Vector2[] = [];

    const wallThickness = 0.042;
    const baseThickness = 0.16; // Heavy crystal-clear glass bottom punt

    // Outer Glass Profile (from concave base punt up to lip)
    gPoints.push(new THREE.Vector2(0, -1.22)); // Indented center punt
    gPoints.push(new THREE.Vector2(0.18, -1.26));
    gPoints.push(new THREE.Vector2(0.42, -1.32));
    gPoints.push(new THREE.Vector2(0.48, -1.30)); // Outer bottom bevel
    gPoints.push(new THREE.Vector2(0.485, 0.58)); // Straight cylindrical body
    gPoints.push(new THREE.Vector2(0.47, 0.76));  // Shoulder curve
    gPoints.push(new THREE.Vector2(0.36, 0.98));  // Elegant neck taper
    gPoints.push(new THREE.Vector2(0.19, 1.18));  // Lower neck
    gPoints.push(new THREE.Vector2(0.18, 1.34));  // Screw neck collar
    gPoints.push(new THREE.Vector2(0.195, 1.36)); // Collar ring ridge
    gPoints.push(new THREE.Vector2(0.18, 1.38));
    gPoints.push(new THREE.Vector2(0.18, 1.48));  // Mouth outer lip
    gPoints.push(new THREE.Vector2(0.16, 1.48));  // Rounded lip crest

    // Inner Glass Wall (tracing back down creating real glass thickness)
    gPoints.push(new THREE.Vector2(0.18 - wallThickness, 1.46));
    gPoints.push(new THREE.Vector2(0.18 - wallThickness, 1.18));
    gPoints.push(new THREE.Vector2(0.36 - wallThickness, 0.98));
    gPoints.push(new THREE.Vector2(0.47 - wallThickness, 0.76));
    gPoints.push(new THREE.Vector2(0.485 - wallThickness, 0.58));
    gPoints.push(new THREE.Vector2(0.485 - wallThickness, -1.30 + baseThickness));
    gPoints.push(new THREE.Vector2(0, -1.22 + baseThickness)); // Inner base floor

    // Water Profile (snug fit with slight meniscus at neck shoulder)
    const wMargin = 0.003;
    const wR = wallThickness + wMargin;
    wPoints.push(new THREE.Vector2(0, -1.22 + baseThickness + wMargin));
    wPoints.push(new THREE.Vector2(0.485 - wR, -1.30 + baseThickness + wMargin));
    wPoints.push(new THREE.Vector2(0.485 - wR, 0.58));
    wPoints.push(new THREE.Vector2(0.47 - wR, 0.76));
    wPoints.push(new THREE.Vector2(0.36 - wR, 0.88));
    wPoints.push(new THREE.Vector2(0.12, 0.885)); // Curved meniscus dip
    wPoints.push(new THREE.Vector2(0, 0.89));     // Water line

    return { glassPoints: gPoints, waterPoints: wPoints };
  }, []);

  // 4. Micro-Bubbles inside water (suspended sparkling ions)
  const bubblePositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 48; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.38;
      const y = (Math.random() * 1.8) - 1.0;
      pos.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    return pos;
  }, []);

  // Fluid micro-floating loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const group = bottleGroupRef.current;
    if (!group) return;

    if (expState.isDragging) {
      expState.dragYRotation += (expState.targetDragYRotation - expState.dragYRotation) * 0.12;
    } else {
      expState.dragYRotation += (0 - expState.dragYRotation) * 0.05;
    }

    let floatingAmp = expState.reducedMotion ? 0.008 : 0.035;
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
          bumpTexture={bumpTextureRef.current}
          texturesReady={texturesReady}
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
  bumpTexture: THREE.CanvasTexture | null;
  texturesReady: boolean;
}

function BottleVisuals({
  glassPoints,
  waterPoints,
  bubblePositions,
  labelTexture,
  bumpTexture,
}: VisualsProps) {
  const visualGroupRef = useRef<THREE.Group>(null);
  const bubblesGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = visualGroupRef.current;
    if (!group) return;

    let rx = 0;
    let ry = 0;
    if (!expState.reducedMotion) {
      rx = expState.mouse.y * 0.08;
      ry = expState.mouse.x * 0.15;
    }

    group.rotation.x = rx;
    group.rotation.y = ry + expState.dragYRotation;

    // Micro-wobble bubbles gently
    if (bubblesGroupRef.current && !expState.reducedMotion) {
      const t = state.clock.getElapsedTime();
      bubblesGroupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={visualGroupRef}>
      {/* 1. 4K Ultra-Refractive Glass Body with Spectral Dispersion & Cold Condensation */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[glassPoints, 128]} />
        <meshPhysicalMaterial
          color="#F2FBFA"
          roughness={0.012}
          metalness={0.0}
          transmission={0.99} // Maximum optical glass transmission
          ior={1.52} // Authentic optical borosilicate glass IOR
          thickness={0.88} // Real glass refraction depth
          clearcoat={1.0}
          clearcoatRoughness={0.015}
          attenuationColor="#A2ECE6"
          attenuationDistance={1.8}
          dispersion={0.045} // 4K Spectral Rainbow Dispersion
          bumpMap={bumpTexture || undefined}
          bumpScale={0.0025} // Delicate chilled condensation dew
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Pristine Alkaline Water Column */}
      <mesh position={[0, 0, 0]} scale={[0.998, 1.0, 0.998]}>
        <latheGeometry args={[waterPoints, 128]} />
        <meshPhysicalMaterial
          color="#D2F6F4"
          emissive="#72BDCE"
          emissiveIntensity={0.07}
          roughness={0.008}
          metalness={0.0}
          transmission={0.98}
          ior={1.333} // Water IOR
          thickness={1.3}
          clearcoat={0.6}
          attenuationColor="#287F91"
          attenuationDistance={0.95}
          transparent
          opacity={0.94}
        />
      </mesh>

      {/* 3. Suspended Micro-Bubbles (Ionised Sparkling Clarity) */}
      <group ref={bubblesGroupRef}>
        {bubblePositions.map((pos, idx) => (
          <mesh key={idx} position={pos} scale={0.008 + (idx % 4) * 0.004}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              emissive="#EAFBF9"
              emissiveIntensity={0.4}
              roughness={0.0}
              transmission={0.9}
              ior={1.1}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* 4. Luxury Brushed Aluminum Cap with Chamfered Edge & Knurled Texture */}
      <group position={[0, 1.48, 0]}>
        {/* Cap Main Cylinder */}
        <mesh castShadow>
          <cylinderGeometry args={[0.185, 0.185, 0.22, 64]} />
          <meshStandardMaterial
            color="#D9F0EF"
            roughness={0.22}
            metalness={0.9} // Brushed aluminum
          />
        </mesh>

        {/* Cap Top Chamfer Rim */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.18, 0.185, 0.02, 64]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>

        {/* Subtle Cap Lower Seal Band */}
        <mesh position={[0, -0.115, 0]}>
          <cylinderGeometry args={[0.188, 0.188, 0.015, 64]} />
          <meshStandardMaterial
            color="#287F91"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* 5. 4K Cylindrical Editorial Label Wrap */}
      {labelTexture && (
        <mesh position={[0, -0.22, 0]} scale={[1.004, 1.0, 1.004]}>
          <cylinderGeometry args={[0.485, 0.485, 0.9, 128, 1, true]} />
          <meshPhysicalMaterial
            map={labelTexture}
            transparent
            alphaTest={0.01}
            roughness={0.18}
            metalness={0.05}
            transmission={0.55} // Translucent vellum paper label
            thickness={0.03}
            side={THREE.DoubleSide}
            depthWrite={true}
          />
        </mesh>
      )}
    </group>
  );
}
