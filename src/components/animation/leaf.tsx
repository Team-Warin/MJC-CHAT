'use client';

import { useEffect, useMemo } from 'react';

import { gsap } from 'gsap';

import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { Canvas, useLoader } from '@react-three/fiber';

const LEAVES_COUNT = 150;
const ANIMATION_SPEED = 3;

function Leaf({ color }: { color: 'sky' | 'blue' }) {
  const { scene } = useLoader(
    GLTFLoader,
    color === 'sky' ? '/sky.glb' : '/blue.glb'
  );

  const cacheObject = useMemo(() => {
    scene.position.y =
      THREE.MathUtils.randInt(1, 5) * THREE.MathUtils.randInt(5, 20);
    scene.position.x =
      THREE.MathUtils.randInt(1, 5) * THREE.MathUtils.randInt(5, 20);
    scene.position.z = THREE.MathUtils.randInt(-5, 2);

    scene.scale.set(0.2, 0.2, 0.2);

    return scene.clone();
  }, [scene]);

  function animate(object: THREE.Group<THREE.Object3DEventMap>) {
    const rnd = THREE.MathUtils.randInt(0, 3);
    const rndDuration = THREE.MathUtils.randFloat(1.5, 3);

    if (rnd === 0) {
      gsap.to(object.rotation, {
        z: object.rotation.z + Math.PI * 2,
        ease: 'none',
        duration: rndDuration,
        repeat: -1,
      });
    } else if (rnd === 1) {
      gsap.to(object.rotation, {
        y: object.rotation.y + Math.PI * 2,
        ease: 'none',
        duration: rndDuration,
        repeat: -1,
      });
    } else if (rnd === 2) {
      gsap.to(object.rotation, {
        z: object.rotation.z + Math.PI * 2,
        y: object.rotation.y + Math.PI * 2,
        ease: 'none',
        repeat: -1,
        duration: rndDuration,
      });
    } else if (rnd === 3) {
      gsap.to(object.rotation, {
        x: object.rotation.x + Math.PI * 2,
        y: object.rotation.y + Math.PI * 2,
        z: object.rotation.z + Math.PI * 2,
        ease: 'none',
        repeat: -1,
        duration: rndDuration,
      });
    }

    gsap.fromTo(
      object.position,
      { id: object.id, x: 'random(20, 120, 0.1)', y: 'random(0, 120, 0.1)' },
      {
        id: object.id,
        x: -20,
        y: -5,
        ease: 'none',
        duration: (object.position.x + 20) / ANIMATION_SPEED,
        repeat: -1,
        repeatRefresh: true,
      }
    );
  }

  useEffect(() => {
    animate(cacheObject);
  }, []);

  return (
    <group>
      <primitive object={cacheObject} />
    </group>
  );
}

export default function Mjc_Animation() {
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <directionalLight intensity={1} />
      {Array.from({ length: LEAVES_COUNT }).map((_, i) => (
        <Leaf key={i} color={i % 2 === 0 ? 'sky' : 'blue'} />
      ))}
    </Canvas>
  );
}
