import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { expState } from './ExperienceState';

const CAMERA_TARGETS = [
  new THREE.Vector3(0, 0, 5.8),       // Hero (Section 0)
  new THREE.Vector3(0.5, 0.1, 5.2),   // Water (Section 1)
  new THREE.Vector3(-0.5, 0.15, 4.9), // Alkaline (Section 2)
  new THREE.Vector3(0.6, 0.2, 4.7),   // Ionised (Section 3)
  new THREE.Vector3(-0.7, 0.15, 4.9), // Process (Section 4)
  new THREE.Vector3(0, 0, 4.4),       // Product (Section 5)
  new THREE.Vector3(0, 0.15, 5.5),    // Final (Section 6)
];

const BOTTLE_POS_TARGETS = [
  new THREE.Vector3(0, -0.4, 0),       // Hero
  new THREE.Vector3(1.0, -0.2, 0),     // Water (right)
  new THREE.Vector3(-0.85, -0.15, 0),  // Alkaline (left)
  new THREE.Vector3(0.9, 0.05, -0.2),  // Ionised (right)
  new THREE.Vector3(-0.95, -0.15, 0),  // Process (left)
  new THREE.Vector3(1.0, -0.25, 0.2),  // Product (right side - perfectly clear of left cards)
  new THREE.Vector3(0, -0.35, 0),      // Final
];

// Kept within subtle studio turntable angles (-20° to +20°) so the brand name "IONA" is ALWAYS crisp & visible
const BOTTLE_ROT_TARGETS = [
  new THREE.Vector3(0, 0, 0),            // Hero: Facing forward
  new THREE.Vector3(0.08, 0.32, -0.04),  // Water: Slight 18° right
  new THREE.Vector3(0.12, -0.30, 0.05),  // Alkaline: Slight 17° left
  new THREE.Vector3(-0.06, 0.22, -0.03), // Ionised: Subtle 12° right
  new THREE.Vector3(0.08, -0.20, 0.04),  // Process: Subtle 11° left - Brand ALWAYS visible!
  new THREE.Vector3(0.04, 0.08, -0.02),  // Product: Hero angle
  new THREE.Vector3(0, 0, 0),            // Final: Facing forward
];

const PRODUCT_CARD_OFFSETS = [
  // Card 0: 750 ML - Full Front Profile with subtle micro-tilt
  { pos: new THREE.Vector3(1.02, -0.25, 0.20), rot: new THREE.Vector3(0.04, 0.06, -0.02) },
  // Card 1: Crystal Glass - Angled 28° to showcase crystal refractivity & caustics
  { pos: new THREE.Vector3(0.94, -0.22, 0.30), rot: new THREE.Vector3(0.08, 0.44, -0.04) },
  // Card 2: Ions & Minerals - Subtle counter-angle (-22°) highlighting mineral purity
  { pos: new THREE.Vector3(1.02, -0.28, 0.22), rot: new THREE.Vector3(-0.06, -0.36, 0.03) },
  // Card 3: pH 8.5+ Alkaline - Grand elevated 3/4 beauty perspective
  { pos: new THREE.Vector3(0.95, -0.18, 0.35), rot: new THREE.Vector3(0.12, 0.22, -0.02) },
];

export default function CameraRig() {
  const { camera, scene } = useThree();

  const targetCamPos = useRef(new THREE.Vector3());
  const targetBottlePos = useRef(new THREE.Vector3());
  const targetBottleRot = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const progress = expState.scrollProgress * (CAMERA_TARGETS.length - 1);
    const index = Math.min(Math.floor(progress), CAMERA_TARGETS.length - 2);
    const fraction = progress - index;

    targetCamPos.current.lerpVectors(
      CAMERA_TARGETS[index],
      CAMERA_TARGETS[index + 1],
      fraction
    );

    targetBottlePos.current.lerpVectors(
      BOTTLE_POS_TARGETS[index],
      BOTTLE_POS_TARGETS[index + 1],
      fraction
    );

    targetBottleRot.current.lerpVectors(
      BOTTLE_ROT_TARGETS[index],
      BOTTLE_ROT_TARGETS[index + 1],
      fraction
    );

    // Continuous dynamic revolution & framing while the pinned Product showcase is on screen
    if (expState.productActive) {
      const p = Math.max(0, Math.min(3, expState.productScrollProgress));
      const i0 = Math.min(2, Math.floor(p));
      const i1 = Math.min(3, i0 + 1);
      const f = p - i0;
      // Ease the in-between so the bottle "settles" label-forward on every card
      const eased = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;

      const p0 = PRODUCT_CARD_OFFSETS[i0];
      const p1 = PRODUCT_CARD_OFFSETS[i1];

      const interpolatedPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, eased);
      const interpolatedRot = new THREE.Vector3().lerpVectors(p0.rot, p1.rot, eased);

      // One full 360° revolution per card transition — lands front-facing on each card
      interpolatedRot.y += (i0 + eased) * Math.PI * 2;

      // On narrow / mobile screens, shift bottle closer to center so it doesn't clip
      const isMobile = state.viewport.width < 5.5;
      if (isMobile) {
        interpolatedPos.x = 0;
        interpolatedPos.y += 0.35;
      }

      targetCamPos.current.copy(CAMERA_TARGETS[5]);
      targetBottlePos.current.copy(interpolatedPos);
      targetBottleRot.current.copy(interpolatedRot);
    } else {
      // Unwind any accumulated revolutions so leaving the section never spins backwards wildly
      const bottle = scene.getObjectByName('iona-bottle-base-group');
      if (bottle && Math.abs(bottle.rotation.y) > Math.PI) {
        bottle.rotation.y = ((bottle.rotation.y + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      }
    }

    let lerpSpeed = expState.reducedMotion ? 0.2 : 0.085;

    camera.position.lerp(targetCamPos.current, lerpSpeed);

    const targetLookAtY = targetBottlePos.current.y + 0.35;
    lookAtTarget.current.lerp(new THREE.Vector3(targetBottlePos.current.x * 0.5, targetLookAtY, 0), lerpSpeed);
    camera.lookAt(lookAtTarget.current);

    const bottleBaseGroup = scene.getObjectByName('iona-bottle-base-group');
    if (bottleBaseGroup) {
      bottleBaseGroup.position.lerp(targetBottlePos.current, lerpSpeed);
      
      bottleBaseGroup.rotation.x += (targetBottleRot.current.x - bottleBaseGroup.rotation.x) * lerpSpeed;
      bottleBaseGroup.rotation.y += (targetBottleRot.current.y - bottleBaseGroup.rotation.y) * lerpSpeed;
      bottleBaseGroup.rotation.z += (targetBottleRot.current.z - bottleBaseGroup.rotation.z) * lerpSpeed;
    }
  });

  return null;
}
