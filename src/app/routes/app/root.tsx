import { Outlet } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Float, Stars } from '@react-three/drei';

const ParticleField = () => {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sparkles
          count={200}
          scale={[10, 10, 10]}
          size={4}
          speed={0.4}
          opacity={0.7}
          color="#a8c7fa"
        />
      </Float>

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={['#050510']} />

        <ParticleField />
      </Canvas>
    </div>
  );
};

export const AppRoot = () => {
  return (
    <>
      <Background3D />

      <div className="relative z-10 min-h-dvh font-sans text-white antialiased">
        <Outlet />
      </div>
    </>
  );
};

export const AppRootErrorBoundary = () => {
  return (
    <>
      <Background3D />
      <div className="flex h-dvh flex-col items-center justify-center p-4">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-md transition-transform hover:scale-105">
          <h1 className="mb-4 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-2xl font-bold tracking-wider text-transparent drop-shadow-sm">
            えらーだよーーん
          </h1>

          <p className="mb-8 text-lg font-light text-gray-300">
            <span className="text-xs tracking-widest text-gray-500 opacity-70">
              おっかしーなーーーー
            </span>
          </p>

          <a
            href="https://dungeon.ecc-comp.com/user/app/explanation"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-8 py-3 transition-all hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span className="relative text-sm font-medium text-white group-hover:text-blue-200">
              ここ押してみてね
            </span>
          </a>
        </div>
      </div>
    </>
  );
};
