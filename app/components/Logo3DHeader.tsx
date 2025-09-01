/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {  useGLTF, Html } from '@react-three/drei';

interface Logo3DProps {
  url: string; // путь к твоему glb-файлу
  size?: number;
}

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const ref = useRef<any | null>(null);

  // Смещаем модель вниз для центровки — подбери значение эмпирически
  React.useEffect(() => {
    if (ref.current) {
      ref.current.position.set(0, -0.4, 0);
    }
  }, []);

  return <primitive ref={ref} object={scene} scale={1.5} />;
};

export const Logo3DHeader: React.FC<Logo3DProps> = ({ url, size = 50 }) => {
  return (
    <Canvas
    style={{ width: size, height: size, display: 'block' }}
    camera={{ position: [0, 0, 2], fov: 50 }}
    gl={{ antialias: true }}
  >
  
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 2, 2]} intensity={1} />
      <Suspense fallback={<Html>Loading...</Html>}>
        <Model url={url} />
      </Suspense>
    </Canvas>
  );
};