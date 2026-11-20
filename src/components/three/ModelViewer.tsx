"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls as Orbit } from "three/examples/jsm/controls/OrbitControls.js";

function Model({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${url}`);
  const ref = useRef<THREE.Group>(null);
  useEffect(() => {
    // Centra e scala il modello in un'unità standard
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new THREE.Vector3()).length() || 1;
    const center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.sub(center);
    gltf.scene.scale.setScalar(4 / size);
  }, [gltf]);
  return (
    <group ref={ref}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef<Orbit | null>(null);
  useEffect(() => {
    const c = new Orbit(camera, gl.domElement);
    c.enableDamping = true;
    c.enablePan = false;
    c.autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    c.autoRotateSpeed = 0.6;
    controls.current = c;
    return () => c.dispose();
  }, [camera, gl]);
  useFrame(() => controls.current?.update());
  return null;
}

export default function ModelViewer({ url, label }: { url: string; label: string }) {
  return (
    <div className="aspect-[16/9] w-full bg-charcoal" role="img" aria-label={label}>
      <Canvas dpr={[1, 1.75]} camera={{ position: [4, 2.5, 4], fov: 40 }} gl={{ antialias: true, powerPreference: "low-power" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 3]} intensity={1.4} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <Controls />
      </Canvas>
    </div>
  );
}
