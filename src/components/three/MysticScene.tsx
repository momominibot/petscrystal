"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { products } from "@/lib/products";

/**
 * Scroll-driven mystical watercolor scene rendered fixed behind the homepage
 * hero. Native page scroll is the single scroll authority: a passive listener
 * writes progress into `scrollState`, and the camera rig reads it every frame.
 */
const scrollState = { t: 0 };

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Watercolor backdrop (painted in-shader) ---------------- */

const BACKDROP_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BACKDROP_FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.1;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.03;

    // Slowly drifting pigment washes over a cream paper base.
    vec3 cream    = vec3(0.984, 0.965, 0.933); // #FBF6EE
    vec3 lavender = vec3(0.769, 0.710, 0.831); // #C4B5D4
    vec3 rose     = vec3(0.910, 0.835, 0.816); // #E8D5D0
    vec3 sage     = vec3(0.773, 0.835, 0.753); // #C5D5C0
    vec3 gold     = vec3(0.941, 0.847, 0.612); // #F0D89C

    float wash1 = fbm(uv * 2.2 + vec2(t, -t * 0.7));
    float wash2 = fbm(uv * 3.1 + vec2(-t * 0.6, t) + 5.0);
    float wash3 = fbm(uv * 1.6 + vec2(t * 0.4, t * 0.5) + 11.0);

    vec3 col = cream;
    col = mix(col, lavender, smoothstep(0.45, 0.85, wash1) * 0.55);
    col = mix(col, rose,     smoothstep(0.50, 0.90, wash2) * 0.45);
    col = mix(col, sage,     smoothstep(0.55, 0.95, wash3) * 0.20);
    col = mix(col, gold,     smoothstep(0.68, 0.98, fbm(uv * 4.0 + 23.0 + t)) * 0.18);

    // Dreamy lavender horizon glow pooling toward the waterline.
    col = mix(col, vec3(0.72, 0.66, 0.86), smoothstep(0.55, 0.05, uv.y) * 0.40);
    col = mix(col, vec3(0.93, 0.82, 0.86), smoothstep(0.35, 0.18, uv.y) * 0.25);

    // Pigment pooling at wash edges — the watercolor "bloom" line.
    float edge = abs(wash1 - 0.55);
    col *= 1.0 - smoothstep(0.02, 0.0, edge) * 0.05;

    // Paper grain.
    col += (hash(uv * 900.0) - 0.5) * 0.03;

    // Gentle light falloff toward the corners.
    float d = distance(uv, vec2(0.5, 0.55));
    col = mix(col, cream * 0.97, smoothstep(0.35, 0.85, d) * 0.5);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function WatercolorBackdrop() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame((state) => {
    if (mat.current && !reducedMotion)
      mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh position={[0, 1, -10]}>
      <planeGeometry args={[46, 26]} />
      <shaderMaterial
        ref={mat}
        vertexShader={BACKDROP_VERT}
        fragmentShader={BACKDROP_FRAG}
        uniforms={uniforms}
        fog={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------------- Reflective water (the Peach signature) ---------------- */

function Water() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
      <planeGeometry args={[70, 70]} />
      <MeshReflectorMaterial
        resolution={512}
        mixBlur={1}
        mixStrength={4}
        roughness={0.5}
        depthScale={0.6}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#CFC3E4"
        metalness={0.15}
        mirror={0.45}
      />
    </mesh>
  );
}

/* ---------------- Crystals ---------------- */

/**
 * Gem material — real refraction with chromatic dispersion (three r168+),
 * crisp flat-shaded facets, and strong specular response so the stones
 * catch glints from the Lightformers.
 */
function GemMaterial({ color, saturated = false }: { color: string; saturated?: boolean }) {
  return (
    <meshPhysicalMaterial
      color={color}
      transmission={1}
      thickness={saturated ? 1.2 : 0.9}
      roughness={0.03}
      ior={1.65}
      dispersion={0.45}
      iridescence={0.5}
      iridescenceIOR={1.3}
      clearcoat={1}
      clearcoatRoughness={0.04}
      specularIntensity={1.6}
      envMapIntensity={2.4}
      attenuationColor={color}
      attenuationDistance={saturated ? 1.2 : 2.0}
      emissive={color}
      emissiveIntensity={0.05}
      flatShading
    />
  );
}

/**
 * A quartz point: one tapered six-sided obelisk (single mesh, crisp facets).
 * The hero point gets drei's MeshTransmissionMaterial — true refraction with
 * chromatic aberration — while supporting points use the cheaper physical
 * transmission so only one extra scene render is paid per frame.
 */
function QuartzPoint({
  color,
  position,
  rotation,
  scale,
  hero = false,
}: {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  hero?: boolean;
}) {
  // Hexagonal prism with a pyramidal termination, as one lathed mesh:
  // bottom → straight walls → shoulder → point.
  const geometry = useMemo(() => {
    const profile = [
      new THREE.Vector2(0.001, -1.15),
      new THREE.Vector2(0.52, -1.05),
      new THREE.Vector2(0.44, 0.55),
      new THREE.Vector2(0.001, 1.15),
    ];
    return new THREE.LatheGeometry(profile, 6);
  }, []);
  return (
    <mesh position={position} rotation={rotation} scale={scale} geometry={geometry}>
      {hero ? (
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          transmission={1}
          thickness={0.9}
          roughness={0.05}
          ior={1.6}
          chromaticAberration={0.35}
          anisotropicBlur={0.3}
          distortion={0.12}
          distortionScale={0.3}
          temporalDistortion={0.08}
          color="#CDBCEF"
          attenuationColor="#7B5FC0"
          attenuationDistance={2}
          clearcoat={1}
          envMapIntensity={2.4}
          flatShading
        />
      ) : (
        <GemMaterial color={color} />
      )}
    </mesh>
  );
}

/** Floating amethyst cluster — the hero object. */
function CrystalCluster() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = 0.5 + Math.sin(t * 0.5) * 0.12;
    group.current.rotation.y = t * 0.08;
  });
  return (
    <group ref={group} position={[0, 0.5, 0]}>
      <QuartzPoint hero color="#8F6FC9" position={[0, 0.25, 0]} rotation={[0.05, 0.4, -0.04]} scale={[0.85, 1.05, 0.85]} />
      <QuartzPoint color="#A794D9" position={[0.85, -0.45, 0.25]} rotation={[0.28, 1.1, 0.42]} scale={[0.5, 0.6, 0.5]} />
      <QuartzPoint color="#EFB0A4" position={[-0.8, -0.5, 0.3]} rotation={[-0.18, 0.7, -0.38]} scale={[0.46, 0.55, 0.46]} />
      <QuartzPoint color="#A9D0A1" position={[0.35, -0.6, -0.7]} rotation={[0.42, 0.2, 0.2]} scale={[0.38, 0.45, 0.38]} />
      <QuartzPoint color="#EFC97E" position={[-0.4, -0.55, -0.55]} rotation={[-0.3, 1.4, 0.3]} scale={[0.34, 0.4, 0.34]} />
    </group>
  );
}

/** Ring of twelve stones — one per healing-stone set, using real product colors. */
function StoneRing() {
  const group = useRef<THREE.Group>(null);
  const stones = useMemo(
    () =>
      products.slice(0, 12).map((p, i) => {
        const a = (i / 12) * Math.PI * 2;
        return {
          // Lift dark stones toward the watercolor palette so none read as
          // black silhouettes against the cream wash.
          color: `#${new THREE.Color(p.colors[0]).lerp(new THREE.Color("#FBF6EE"), 0.3).getHexString()}`,
          angle: a,
          y: Math.sin(a * 3) * 0.3,
          wobble: i * 1.7,
        };
      }),
    []
  );
  useFrame((state) => {
    if (!group.current) return;
    // The ring spins with scroll and drifts idly on top.
    const idle = reducedMotion ? 0 : state.clock.elapsedTime * 0.04;
    group.current.rotation.y = scrollState.t * Math.PI * 1.2 + idle;
  });
  return (
    <group ref={group} position={[0, 0.6, 0]}>
      {stones.map((s, i) => (
        <group key={i} rotation={[0, s.angle, 0]}>
          <mesh position={[4.3, s.y, 0]} rotation={[0.4, s.wobble, 0.2]} scale={[0.18, 0.32, 0.18]}>
            <octahedronGeometry args={[1, 0]} />
            <GemMaterial color={s.color} saturated />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Two gems that drift together in the final act — you and your companion. */
function BondPair() {
  const human = useRef<THREE.Mesh>(null);
  const pet = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (!human.current || !pet.current) return;
    // 0 before the last act, 1 once the gems have met.
    const k = THREE.MathUtils.smoothstep(scrollState.t, 0.55, 0.95);
    const bob = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.9) * 0.06;
    const lerpDamp = (m: THREE.Mesh, x: number, y: number, z: number) => {
      m.position.x = THREE.MathUtils.damp(m.position.x, x, 3, dt);
      m.position.y = THREE.MathUtils.damp(m.position.y, y + bob, 3, dt);
      m.position.z = THREE.MathUtils.damp(m.position.z, z, 3, dt);
    };
    lerpDamp(human.current, THREE.MathUtils.lerp(-4.2, -0.42, k), THREE.MathUtils.lerp(2.6, 0.85, k), THREE.MathUtils.lerp(-2, 1.6, k));
    lerpDamp(pet.current, THREE.MathUtils.lerp(4.4, 0.42, k), THREE.MathUtils.lerp(2.2, 0.8, k), THREE.MathUtils.lerp(-2.4, 1.6, k));
    human.current.rotation.y += dt * 0.4;
    pet.current.rotation.y -= dt * 0.4;
  });
  return (
    <>
      <mesh ref={human} scale={[0.3, 0.55, 0.3]}>
        <octahedronGeometry args={[1, 0]} />
        <GemMaterial color="#9B8EC4" saturated />
      </mesh>
      <mesh ref={pet} scale={[0.22, 0.4, 0.22]}>
        <octahedronGeometry args={[1, 0]} />
        <GemMaterial color="#D4A84B" saturated />
      </mesh>
    </>
  );
}

/* ---------------- Watercolor spirits (existing brand art as billboards) ---- */

function Spirit({
  url,
  position,
  scale,
  phase,
}: {
  url: string;
  position: [number, number, number];
  scale: number;
  phase: number;
}) {
  const texture = useTexture(url);
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 0.4 + phase) * 0.3;
    group.current.position.x = position[0] + Math.sin(t * 0.23 + phase * 2) * 0.15;
  });
  return (
    <group ref={group} position={position}>
      <Billboard>
        <mesh scale={scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={texture} transparent opacity={0.85} depthWrite={false} />
        </mesh>
      </Billboard>
    </group>
  );
}

function Spirits() {
  return (
    <>
      <Spirit url="/art/pet-moon.png" position={[-3.4, 2.6, -3]} scale={1.15} phase={0} />
      <Spirit url="/art/pet-gem.png" position={[3.6, 2.1, -2.4]} scale={0.9} phase={2.1} />
      <Spirit url="/art/pet-paw.png" position={[-2.6, -0.9, -1.6]} scale={0.7} phase={4.2} />
      <Spirit url="/art/pet-bone.png" position={[2.9, -1.2, -2]} scale={0.6} phase={5.6} />
    </>
  );
}

/* ---------------- Camera rig ---------------- */

/**
 * [orbit angle, radius, height, side] poses for the three scroll acts.
 * `side` shifts the look-at target along the camera's right axis so the
 * cluster sits opposite the copy — the Peach "text beside the subject" frame.
 */
const POSES: [number, number, number, number][] = [
  [0.12, 7.4, 1.0, -1.45], // act 1 — meet the cluster, copy left / crystal right
  [1.9, 9.0, 2.1, 1.35], // act 2 — reveal the ring, copy right / crystal left
  [2.7, 5.8, 0.85, -1.15], // act 3 — draw close for the bond, copy left
];

const CENTER = new THREE.Vector3(0, 0.55, 0);
const UP = new THREE.Vector3(0, 1, 0);
const tmpPos = new THREE.Vector3();
const tmpDir = new THREE.Vector3();
const tmpRight = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

function Rig() {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const { size } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    if (!cam.current) return;
    const t = scrollState.t;

    // Piecewise pose interpolation with eased segments.
    const seg = THREE.MathUtils.clamp(t * 2 || 0, 0, 1.999);
    const i = Math.floor(seg);
    const f = THREE.MathUtils.smoothstep(seg - i, 0, 1);
    const a = THREE.MathUtils.lerp(POSES[i][0], POSES[i + 1][0], f);
    let r = THREE.MathUtils.lerp(POSES[i][1], POSES[i + 1][1], f);
    const h = THREE.MathUtils.lerp(POSES[i][2], POSES[i + 1][2], f);
    let side = THREE.MathUtils.lerp(POSES[i][3], POSES[i + 1][3], f);

    // Portrait screens: pull back and recentre — copy overlays the scene.
    if (size.width / size.height < 0.8) {
      r *= 1.35;
      side *= 0.3;
    }

    // Pointer parallax — small, damped, layered on top of the scroll pose.
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, state.pointer.x, 3, dt);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, state.pointer.y, 3, dt);
    const pa = a + pointer.current.x * 0.06;

    const lambda = reducedMotion ? 50 : 4;
    tmpPos.set(Math.sin(pa) * r, h + pointer.current.y * 0.25, Math.cos(pa) * r);
    cam.current.position.x = THREE.MathUtils.damp(cam.current.position.x, tmpPos.x, lambda, dt);
    cam.current.position.y = THREE.MathUtils.damp(cam.current.position.y, tmpPos.y, lambda, dt);
    cam.current.position.z = THREE.MathUtils.damp(cam.current.position.z, tmpPos.z, lambda, dt);

    // Shift the framing sideways: look at a point offset along camera-right.
    tmpDir.copy(CENTER).sub(cam.current.position).normalize();
    tmpRight.crossVectors(tmpDir, UP).normalize();
    tmpLook.copy(CENTER).addScaledVector(tmpRight, side);
    cam.current.lookAt(tmpLook);
  });

  return <PerspectiveCamera ref={cam} makeDefault fov={42} near={0.1} far={60} position={[0.4, 1.1, 7.4]} />;
}

/* ---------------- Scene root ---------------- */

export default function MysticScene() {
  const wrapper = useRef<HTMLDivElement>(null);

  // One passive scroll listener drives both the rig (via scrollState) and the
  // canvas fade-out once the collection sheet begins to cover the scene.
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight || 1;
      scrollState.t = THREE.MathUtils.clamp(window.scrollY / (vh * 2.2), 0, 1);
      if (wrapper.current) {
        const fade = 1 - THREE.MathUtils.smoothstep(window.scrollY, vh * 2.1, vh * 2.9);
        wrapper.current.style.opacity = String(fade);
        wrapper.current.style.visibility = fade === 0 ? "hidden" : "visible";
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={wrapper} className="fixed inset-0 z-0" aria-hidden>
      <Canvas dpr={[1, 1.75]} gl={{ antialias: true }}>
        <color attach="background" args={["#F2EBF2"]} />
        <fog attach="fog" args={["#F2EBF2", 14, 32]} />

        <Rig />

        {/* Lights — warm key, cool lavender rim, soft ambient. */}
        <ambientLight intensity={0.6} color="#F3EDE3" />
        <directionalLight position={[4, 6, 3]} intensity={2.2} color="#FFF4E0" />
        <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#C4B5D4" />
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={1.1} position={[0, 5, -9]} scale={[12, 10, 1]} color="#FFF8EC" />
          <Lightformer intensity={0.7} position={[-6, 2, 2]} scale={[4, 8, 1]} color="#DCD9EC" />
          <Lightformer intensity={0.6} position={[6, 3, 2]} scale={[4, 8, 1]} color="#F2E4E4" />
          {/* Small hot spots — the facet glints that make gems sparkle. */}
          <Lightformer form="circle" intensity={6} position={[3, 4, 4]} scale={1.2} color="#FFFFFF" />
          <Lightformer form="circle" intensity={5} position={[-4, 3, 3]} scale={0.9} color="#FFF2D8" />
          <Lightformer form="circle" intensity={4} position={[0, -3, 4]} scale={0.8} color="#EDE6FF" />
        </Environment>

        <Suspense fallback={null}>
          <WatercolorBackdrop />
          <Water />
          <CrystalCluster />
          <StoneRing />
          <BondPair />
          <Spirits />
          <Sparkles count={90} scale={[11, 7, 7]} position={[0, 1, 0]} size={2.6} speed={reducedMotion ? 0 : 0.25} color="#D4A84B" opacity={0.55} />
          <Sparkles count={50} scale={[8, 5, 5]} position={[0, 0.8, 0]} size={1.8} speed={reducedMotion ? 0 : 0.18} color="#9B8EC4" opacity={0.4} />
        </Suspense>

        {/* The grade — subtle: soft glow, paper grain, faint edge darkening. */}
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0.82} luminanceSmoothing={0.3} />
          <Vignette offset={0.28} darkness={0.32} eskil={false} />
          <Noise opacity={0.055} blendFunction={BlendFunction.OVERLAY} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
