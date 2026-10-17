import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshRefractionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Sub-component: Floating particles with subtle drift
const ParticleField: React.FC<{ count?: number }> = ({ count = 750 }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // distribute in a spherical volume
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sca[i] = Math.random() * 0.8 + 0.2;
    }
    return [pos, sca];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#c084fc"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// Sub-component: The Central Abstract Metallic & Glass Sculpture
const CoreSculpture: React.FC<{ scrollOffset: number; isMobile?: boolean }> = ({ scrollOffset, isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const outerTorusRef = useRef<THREE.Mesh>(null!);
  const innerKnotRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const { pointer } = state;

    // Smooth continuous floating rotation
    if (groupRef.current) {
      // Lerp mouse follow interaction
      const targetRotX = pointer.y * 0.35 + scrollOffset * Math.PI * 0.6;
      const targetRotY = pointer.x * 0.45 + state.clock.elapsedTime * 0.15 + scrollOffset * Math.PI * 0.8;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

      // Scroll position displacement
      const targetPosY = (isMobile ? 0.3 : 0) - scrollOffset * 2.2;
      const targetPosZ = -scrollOffset * 1.5;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.05);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.05);
    }

    // Secondary differential rotations for internal geometry
    if (innerKnotRef.current) {
      innerKnotRef.current.rotation.x -= delta * 0.2;
      innerKnotRef.current.rotation.z += delta * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3;
      ring1Ref.current.rotation.y += delta * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.25;
      ring2Ref.current.rotation.z += delta * 0.2;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.18;
      ring3Ref.current.rotation.x -= delta * 0.12;
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.75 : 1}>
      {/* Centerpiece: Smooth curved metallic Torus Knot */}
      <mesh ref={innerKnotRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.2, 0.36, 160, 32, 2, 3]} />
        <meshStandardMaterial
          color="#dbeafe"
          metalness={0.92}
          roughness={0.16}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Internal Glass Core Sphere */}
      <mesh>
        <sphereGeometry args={[0.75, 48, 48]} />
        <meshPhysicalMaterial
          color="#a855f7"
          emissive="#3b0764"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.1}
          transmission={0.85}
          ior={1.6}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Thin Orbital Rings (Metallic Silver) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.018, 16, 120]} />
        <meshStandardMaterial
          color="#f8fafc"
          metalness={0.98}
          roughness={0.1}
          emissive="#c084fc"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 120]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.95}
          roughness={0.15}
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.012, 16, 120]} />
        <meshStandardMaterial
          color="#e2e8f0"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* Floating orbital micro-satellites */}
      <group rotation={[0.4, 0.2, 0]}>
        <mesh position={[2.2, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#c084fc" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-2.5, 0.3, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#a855f7" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
};

// Scene Lighting & Rig
const SceneRig: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  useFrame((state) => {
    // Subtle camera parallax
    const { pointer, camera } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.6 - scrollOffset * 1.5, 0.03);
    camera.lookAt(0, -scrollOffset * 1.2, 0);
  });

  return (
    <>
      {/* Cinematic key light: Metallic cool white */}
      <directionalLight position={[6, 8, 5]} intensity={2.2} color="#f8fafc" />

      {/* Futuristic Purple fill & back light */}
      <pointLight position={[-6, -4, -4]} intensity={3.5} color="#8b5cf6" distance={20} />
      
      {/* Electric violet accent spot */}
      <spotLight
        position={[0, 6, 2]}
        angle={0.6}
        penumbra={0.9}
        intensity={3.8}
        color="#a855f7"
        distance={15}
      />

      {/* Ambient charcoal foundation */}
      <ambientLight intensity={0.4} color="#1e1b4b" />
    </>
  );
};

export const Hero3DCanvas: React.FC = () => {
  const [scrollOffset, setScrollOffset] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY / window.innerHeight;
      setScrollOffset(Math.min(offset, 2.5));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 7.5 : 6], fov: isMobile ? 50 : 45, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <color attach="background" args={['#050508']} />
        <fog attach="fog" args={['#050508', 5, 14]} />

        <SceneRig scrollOffset={scrollOffset} />
        <ParticleField count={isMobile ? 380 : 650} />
        <CoreSculpture scrollOffset={scrollOffset} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};
