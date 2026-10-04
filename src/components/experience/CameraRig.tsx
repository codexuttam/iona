import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { expState } from './ExperienceState';

const CAMERA_TARGETS = [
  new THREE.Vector3(0, 0, 5.8),       // Hero (Section 0)
  new THREE.Vector3(0.6, 0.1, 5.2),   // Water (Section 1)
  new THREE.Vector3(-0.6, 0.15, 4.8), // Alkaline (Section 2)
  new THREE.Vector3(0.8, 0.3, 4.5),   // Ionised (Section 3)
  new THREE.Vector3(-0.9, 0.15, 5.0), // Process (Section 4)
  new THREE.Vector3(0, 0, 3.6),       // Product (Section 5)
  new THREE.Vector3(0, 0.15, 5.5),   // Final (Section 6)
];

const BOTTLE_POS_TARGETS = [
  new THREE.Vector3(0, -0.4, 0),       // Hero
  new THREE.Vector3(1.1, -0.2, 0),    // Water (moved right)
  new THREE.Vector3(-0.9, -0.15, 0),   // Alkaline (moved left)
  new THREE.Vector3(1.0, 0.1, -0.3),   // Ionised (moved right)
  new THREE.Vector3(-1.1, -0.15, 0),   // Process (moved left)
  new THREE.Vector3(0, -0.3, 0.5),     // Product (centered & closer)
  new THREE.Vector3(0, -0.35, 0),      // Final
];

const BOTTLE_ROT_TARGETS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.15, 0.5, -0.1),
  new THREE.Vector3(0.25, -0.5, 0.15),
  new THREE.Vector3(-0.1, 1.3, -0.05),
  new THREE.Vector3(0.15, 2.5, 0.1),
  new THREE.Vector3(0.05, 4.5, -0.05),
  new THREE.Vector3(0, 6.2831, 0),
];

export default function CameraRig() {
  const { camera, scene } = useThree();

  // Temporary vectors to avoid garbage collection overhead
  const targetCamPos = useRef(new THREE.Vector3());
  const targetBottlePos = useRef(new THREE.Vector3());
  const targetBottleRot = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    // Determine the transition state using our scroll values
    const progress = expState.scrollProgress * (CAMERA_TARGETS.length - 1);
    const index = Math.min(Math.floor(progress), CAMERA_TARGETS.length - 2);
    const fraction = progress - index;

    // Linear interpolation between active sections
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

    // Apply damping for smooth cinematic camera movement
    let lerpSpeed = 0.085;
    if (expState.reducedMotion) {
      lerpSpeed = 0.2; // faster snap when motion is reduced
    }

    camera.position.lerp(targetCamPos.current, lerpSpeed);

    // Smoothly focus on the bottle (slight vertical offset for elegant balancing)
    const targetLookAtY = targetBottlePos.current.y + 0.35;
    lookAtTarget.current.lerp(new THREE.Vector3(targetBottlePos.current.x * 0.5, targetLookAtY, 0), lerpSpeed);
    camera.lookAt(lookAtTarget.current);

    // Animate the bottle group in the scene
    const bottleBaseGroup = scene.getObjectByName('iona-bottle-base-group');
    if (bottleBaseGroup) {
      bottleBaseGroup.position.lerp(targetBottlePos.current, lerpSpeed);
      
      // Interpolate rotation. Add subtle idle sway/spin logic
      bottleBaseGroup.rotation.x += (targetBottleRot.current.x - bottleBaseGroup.rotation.x) * lerpSpeed;
      bottleBaseGroup.rotation.y += (targetBottleRot.current.y - bottleBaseGroup.rotation.y) * lerpSpeed;
      bottleBaseGroup.rotation.z += (targetBottleRot.current.z - bottleBaseGroup.rotation.z) * lerpSpeed;
    }
  });

  return null;
}
