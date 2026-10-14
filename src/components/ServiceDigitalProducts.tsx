import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Cpu, Globe, Cloud, Sparkles, Database, Layout, ShieldCheck } from 'lucide-react';

interface EcosystemNode {
  id: string;
  name: string;
  category: string;
  coords: [number, number, number];
  icon: React.ElementType;
  specs: string;
  latency: string;
  color: string;
}

const nodes: EcosystemNode[] = [
  { id: 'web', name: 'WEB PLATFORMS', category: 'SPATIAL CLIENT', coords: [2.6, 1.2, 0.4], icon: Globe, specs: 'Next.js 15 • Three.js • WebGPU', latency: '12ms', color: '#c084fc' },
  { id: 'mobile', name: 'MOBILE ECOSYSTEM', category: 'NATIVE RUNTIME', coords: [-2.5, 1.4, -0.2], icon: Layout, specs: 'SwiftUI • Kotlin • Metal 3', latency: '16ms', color: '#a855f7' },
  { id: 'cloud', name: 'CLOUD INFRASTRUCTURE', category: 'GLOBAL EDGE', coords: [2.4, -1.3, -0.5], icon: Cloud, specs: 'Distributed Kubernetes • Terraform', latency: '4ms', color: '#8b5cf6' },
  { id: 'ai', name: 'AI & NEURAL MODELS', category: 'INTELLIGENCE', coords: [-2.6, -1.2, 0.5], icon: Sparkles, specs: 'LLM Orchestration • Vector Index', latency: '48ms', color: '#e879f9' },
  { id: 'data', name: 'DATA PIPELINES', category: 'STREAMING CORE', coords: [0, 2.7, 0.8], icon: Database, specs: 'Apache Kafka • Redis • ClickHouse', latency: '2ms', color: '#d8b4fe' },
  { id: 'interfaces', name: 'DIGITAL INTERFACES', category: 'SURFACE HUD', coords: [0, -2.7, -0.6], icon: Cpu, specs: 'Spatial HUD • WebGL 2.0 • Canvas', latency: '8ms', color: '#f3e8ff' },
];

// 3D Scene Inside the Ecosystem Canvas
const EcosystemScene: React.FC<{ activeNodeId: string | null; onSelectNode: (id: string) => void }> = ({ activeNodeId, onSelectNode }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Pulsing 3D Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#581c87"
          emissiveIntensity={1.2}
          wireframe
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#c084fc"
          emissiveIntensity={2}
          transmission={0.6}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Connected Nodes and Dynamic Beams */}
      {nodes.map((node) => {
        const isSelected = activeNodeId === node.id;
        return (
          <group key={node.id} position={node.coords}>
            {/* Satellite Mesh */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node.id);
              }}
            >
              <sphereGeometry args={[isSelected ? 0.35 : 0.22, 24, 24]} />
              <meshStandardMaterial
                color={isSelected ? '#ffffff' : node.color}
                emissive={node.color}
                emissiveIntensity={isSelected ? 3 : 1.5}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>

            {/* Glowing Orbit Rings for active node */}
            {isSelected && (
              <mesh>
                <ringGeometry args={[0.45, 0.5, 32]} />
                <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.8} />
              </mesh>
            )}

            {/* Connecting Luminous Line to Center [0, 0, 0] */}
            <Line
              points={[[0, 0, 0], node.coords]}
              color={isSelected ? '#ffffff' : '#8b5cf6'}
              lineWidth={isSelected ? 3 : 1.2}
              transparent
              opacity={isSelected ? 0.9 : 0.4}
            />
          </group>
        );
      })}
    </group>
  );
};

export const ServiceDigitalProducts: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ai');
  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
  const Icon = activeNode.icon;

  return (
    <section
      id="service-custom-products"
      className="relative py-32 px-6 md:px-12 bg-[#050508] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow-purple w-[750px] h-[750px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-purple-400 mb-6 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>// 06 DISCIPLINE DEEP DIVE</span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs tracking-[0.25em] text-slate-500 uppercase mb-3">
            04 • CONNECTED DIGITAL ECOSYSTEM
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight leading-[1.02]">
            BUILT FOR YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              NEXT BIG IDEA.
            </span>
          </h2>
          <p className="mt-6 text-slate-300 text-lg font-light leading-relaxed">
            We don’t build isolated tools. We engineer deeply unified digital ecosystems where web, mobile, cloud infrastructure, AI intelligence, and real-time data flow through a singular high-velocity core.
          </p>
        </div>

        {/* The 3D Connected Ecosystem Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive 3D WebGL Ecosystem Canvas */}
          <div className="lg:col-span-8 relative h-[480px] md:h-[580px] rounded-3xl bg-[#08080f]/90 border border-white/10 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
            {/* Interactive hint */}
            <div className="absolute top-6 left-6 z-20 font-mono text-[10px] tracking-widest text-slate-400 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="text-purple-400 mr-2">●</span> INTERACTIVE 3D ORBIT // CLICK NODES TO INSPECT
            </div>

            <Canvas
              camera={{ position: [0, 0, 7.5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={2.5} color="#c084fc" />
              <pointLight position={[-5, -5, -5]} intensity={2} color="#8b5cf6" />
              <EcosystemScene activeNodeId={selectedNodeId} onSelectNode={(id) => setSelectedNodeId(id)} />
            </Canvas>

            {/* Bottom Quick Selector Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 justify-center bg-[#0d0d16]/80 backdrop-blur-md p-2 rounded-2xl border border-white/10">
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] tracking-wider transition-all duration-200 ${
                    selectedNodeId === node.id
                      ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {node.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Selected Node Telemetry Card */}
          <div className="lg:col-span-4 cyber-glass rounded-3xl p-8 border border-purple-500/30 shadow-[0_20px_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800">
                NODE LATENCY: {activeNode.latency}
              </span>
            </div>

            <div className="font-mono text-[10px] tracking-[0.3em] text-purple-400 uppercase">
              {activeNode.category}
            </div>
            <h3 className="font-display font-black text-2xl text-white mt-1">
              {activeNode.name}
            </h3>

            <div className="mt-6 space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-[10px] text-slate-400 uppercase">DEPLOYMENT STACK</div>
                <div className="text-white mt-1 font-semibold">{activeNode.specs}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-[10px] text-slate-400 uppercase">SYNCHRONIZATION PROTOCOL</div>
                <div className="text-purple-300 mt-1 flex items-center justify-between">
                  <span>WEBSOCKET RPC</span>
                  <span className="text-emerald-400 text-[10px]">● ENCRYPTED</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-[10px] text-slate-400 uppercase">SECURITY ARCHITECTURE</div>
                <div className="text-slate-300 mt-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Trust Microsegmentation</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>ECOSYSTEM CORE V2</span>
              <span className="text-purple-400 font-semibold">HARMONIZED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
