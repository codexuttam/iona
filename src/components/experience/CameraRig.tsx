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
  new THREE.Vector3(0, 0, 3.8),       // Product (Section 5)
  new THREE.Vector3(0, 0.15, 5.5),    // Final (Section 6)
];

const BOTTLE_POS_TARGETS = [
  new THREE.Vector3(0, -0.4, 0),       // Hero
  new THREE.Vector3(1.0, -0.2, 0),     // Water (right)
  new THREE.Vector3(-0.85, -0.15, 0),  // Alkaline (left)
  new THREE.Vector3(0.9, 0.05, -0.2),  // Ionised (right)
  new THREE.Vector3(-0.95, -0.15, 0),  // Process (left)
  new THREE.Vector3(0, -0.3, 0.4),     // Product (centered)
  new THREE.Vector3(0, -0.35, 0),      // Final
];

// Kept within subtle studio turntable angles (-20° to +20°) so the brand name "IONA" is ALWAYS crisp & visible
const BOTTLE_ROT_TARGETS = [
  new THREE.Vector3(0, 0, 0),            // Hero: Facing forward
  new THREE.Vector3(0.08, 0.32, -0.04),  // Water: Slight 18° right
  new THREE.Vector3(0.12, -0.30, 0.05),  // Alkaline: Slight 17° left
  new THREE.Vector3(-0.06, 0.22, -0.03), // Ionised: Subtle 12° right
  new THREE.Vector3(0.08, -0.20, 0.04),  // Process: Subtle 11° left - Brand ALWAYS visible!
  new THREE.Vector3(0.04, 0.12, -0.02),  // Product: Hero angle
  new THREE.Vector3(0, 0, 0),            // Final: Facing forward
];

const PRODUCT_CARD_OFFSETS = [
  { pos: new THREE.Vector3(0.75, -0.3, 0.2), rot: new THREE.Vector3(0.04, 0.12, -0.02) },
  { pos: new THREE.Vector3(0.68, -0.22, 0.35), rot: new THREE.Vector3(0.08, 0.42, -0.05) },
  { pos: new THREE.Vector3(0.75, -0.28, 0.25), rot: new THREE.Vector3(-0.06, -0.28, 0.04) },
  { pos: new THREE.Vector3(0.68, -0.16, 0.42), rot: new THREE.Vector3(0.14, 0.10, -0.03) },
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

    // Dynamic rotation & framing based on active product card when in Product Section
    if (expState.currentSection === 5 && PRODUCT_CARD_OFFSETS[expState.activeProductCard]) {
      const cardTarget = PRODUCT_CARD_OFFSETS[expState.activeProductCard];
      targetBottlePos.current.lerp(cardTarget.pos, 0.8);
      targetBottleRot.current.lerp(cardTarget.rot, 0.8);
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
