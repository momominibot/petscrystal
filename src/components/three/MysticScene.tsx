"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  Environment,
  Lightformer,
  PerspectiveCamera,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { products } from "@/lib/products";

/**
 * The descent — a scroll-driven journey in four acts:
 *   act 1  galaxy   — spirit-lit crystal beads drift among the stars
 *   act 2  sky      — the beads fall through sunlit clouds
 *   act 3  meadow   — they arrive over the green world
 *   act 4  the dog  — the beads sweep into a necklace arc and hand off to a
 *                     real photo of a white Pomeranian wearing the set
 *
 * Photoreal backdrops are AI stills crossfaded on full-bleed planes inside the
 * canvas so the beads' refraction and the film grade unify everything.
 * Native page scroll is the single scroll authority via `scrollState`.
 */
const scrollState = { t: 0 };

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Backdrops (AI stills, crossfaded) ---------------- */

/**
 * One OPAQUE plane blending the four stills by scroll progress. Opacity-based
 * layering would exclude the imagery from the transmission render pass and
 * turn the glass beads black — an opaque shader plane keeps real refraction.
 */
const BACKDROP_FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uGalaxy;
  uniform sampler2D uSky;
  uniform sampler2D uMeadow;
  uniform sampler2D uDog;
  uniform float uT;

  // Slight zoom gives headroom for vertical parallax: each layer drifts
  // upward as the journey passes through it, so the four stills read as one
  // continuous world you are descending through — not four separate slides.
  vec2 par(vec2 uv, float drift) {
    return (uv - 0.5) / 1.09 + 0.5 + vec2(0.0, clamp(drift, -0.04, 0.04));
  }

  void main() {
    vec3 col = texture2D(uGalaxy, par(vUv, uT * -0.07)).rgb;
    col = mix(col, texture2D(uSky,    par(vUv, (uT - 0.31) * -0.09)).rgb, smoothstep(0.16, 0.46, uT));
    col = mix(col, texture2D(uMeadow, par(vUv, (uT - 0.57) * -0.09)).rgb, smoothstep(0.44, 0.70, uT));
    col = mix(col, texture2D(uDog,    par(vUv, (uT - 0.82) * -0.07)).rgb, smoothstep(0.70, 0.93, uT));
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

const BACKDROP_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Backdrop() {
  const [galaxy, sky, meadow, dog] = useTexture([
    "/scene/galaxy.jpg",
    "/scene/sky.jpg",
    "/scene/meadow.jpg",
    "/scene/pomeranian.jpg",
  ]);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => {
    for (const t of [galaxy, sky, meadow, dog]) t.colorSpace = THREE.SRGBColorSpace;
    return {
      uGalaxy: { value: galaxy },
      uSky: { value: sky },
      uMeadow: { value: meadow },
      uDog: { value: dog },
      uT: { value: 0 },
    };
  }, [galaxy, sky, meadow, dog]);

  useFrame(() => {
    if (mat.current) mat.current.uniforms.uT.value = scrollState.t;
  });

  return (
    <mesh position={[0, 0, -8]}>
      <planeGeometry args={[27, 15.2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={BACKDROP_VERT}
        fragmentShader={BACKDROP_FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/* ---------------- Spirit beads ---------------- */

/**
 * A crystal bead: glassy sphere with a glowing core — the "spirit light".
 * Spheres are what the real bracelets are made of, and they read premium in a
 * way faceted low-poly gems never will.
 */
function Bead({ color, seed }: { color: string; seed: number }) {
  const group = useRef<THREE.Group>(null);
  const glass = useRef<THREE.MeshPhysicalMaterial>(null);
  const core = useRef<THREE.MeshBasicMaterial>(null);

  // Deterministic scatter from the seed (no Math.random — stable frames).
  const home = useMemo(() => {
    const rnd = (n: number) => {
      const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      x: (rnd(1) - 0.5) * 9,
      y: (rnd(2) - 0.5) * 5.5 + 0.8,
      z: (rnd(3) - 0.5) * 4 - 1,
      bob: rnd(4) * Math.PI * 2,
      size: 0.16 + rnd(5) * 0.14,
      turns: 2 + rnd(6) * 2.5, // how many spiral turns on the way down
      spiral: 0.35 + rnd(7) * 0.55, // spiral radius
    };
  }, [seed]);

  useFrame((state) => {
    if (!group.current) return;
    const t = scrollState.t;
    const time = state.clock.elapsedTime;

    // The descent — 0..1 through the sky and meadow acts.
    const fallP = THREE.MathUtils.smoothstep(t, 0.22, 0.8);
    const fall = fallP * 4.4;
    // Spiral down, not straight: each bead corkscrews around its own axis,
    // widest mid-fall, tightening as it settles.
    const swirl = home.bob + fallP * Math.PI * 2 * home.turns;
    const radius = home.spiral * Math.sin(fallP * Math.PI);
    // The hand-off: beads dissolve into shimmer as the real necklace photo
    // takes over — they never pile on top of the dog.
    const fade = 1 - THREE.MathUtils.smoothstep(t, 0.72, 0.88);

    const bob = reducedMotion ? 0 : Math.sin(time * 0.6 + home.bob) * 0.12;
    const sway = reducedMotion ? 0 : Math.sin(time * 0.35 + home.bob * 2) * 0.08;

    group.current.position.x = home.x + sway + Math.cos(swirl) * radius;
    group.current.position.y = home.y + bob - fall;
    group.current.position.z = home.z + Math.sin(swirl) * radius;

    // Tumble while spiraling — the facets catch and flash the light.
    const spin = reducedMotion ? 0 : time * 0.5;
    group.current.rotation.y = home.bob + swirl * 0.8 + spin;
    group.current.rotation.x = home.bob * 2 + fallP * Math.PI * home.turns * 0.5;

    const s = home.size * (0.25 + fade * 0.75);
    group.current.scale.setScalar(Math.max(s, 0.001));

    if (glass.current) glass.current.opacity = fade;
    if (core.current) core.current.opacity = fade * (0.6 + Math.sin(time * 1.4 + home.bob) * 0.25);
  });

  return (
    <group ref={group}>
      {/* faceted gem shell — cut like real bracelet beads, so it glints */}
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          ref={glass}
          color={color}
          transparent
          transmission={1}
          thickness={1.2}
          roughness={0.015}
          ior={1.75}
          dispersion={0.5}
          clearcoat={1}
          clearcoatRoughness={0.02}
          iridescence={0.7}
          iridescenceIOR={1.3}
          specularIntensity={2}
          envMapIntensity={3}
          attenuationColor={color}
          attenuationDistance={0.8}
          flatShading
        />
      </mesh>
      {/* spirit light core */}
      <mesh scale={0.4}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial ref={core} color={color} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

function Beads() {
  // Two beads per healing stone — 24 spirits, colored from the real products.
  const beads = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const p = products[i % products.length];
        // Boost saturation and clamp lightness so even the darkest stones
        // (navy labradorite) glow colorful instead of reading black.
        const raw = new THREE.Color(p.colors[0]);
        const hsl = { h: 0, s: 0, l: 0 };
        raw.getHSL(hsl);
        raw.setHSL(hsl.h, Math.min(hsl.s * 1.35 + 0.15, 1), Math.max(hsl.l, 0.58));
        return {
          color: `#${raw.getHexString()}`,
          seed: i + 1,
        };
      }).concat(
        // Clear quartz beads — colorless, all fire and sparkle.
        Array.from({ length: 8 }, (_, i) => ({
          color: "#F8F6FC",
          seed: 101 + i,
        }))
      ),
    []
  );
  return (
    <>
      {beads.map((b) => (
        <Bead key={b.seed} {...b} />
      ))}
    </>
  );
}

/**
 * Act 4: the dissolved beads live on as shimmer around the necklace the
 * Pomeranian is already wearing in the photo — light, not clutter.
 */
function NecklaceShimmer() {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    const k = THREE.MathUtils.smoothstep(scrollState.t, 0.76, 0.9);
    group.current.scale.setScalar(Math.max(k, 0.001));
    group.current.visible = k > 0.01;
  });
  return (
    <group ref={group} position={[0, -0.9, 2.2]} visible={false}>
      <Sparkles count={90} scale={[3.4, 1.6, 0.6]} size={3.2} speed={reducedMotion ? 0 : 0.5} color="#FFF0C9" opacity={0.9} />
      <Sparkles count={50} scale={[2.8, 1.2, 0.5]} size={2.2} speed={reducedMotion ? 0 : 0.35} color="#E8CFF5" opacity={0.7} />
    </group>
  );
}

/* ---------------- Watercolor spirits (galaxy act only) ---------------- */

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
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    if (!group.current || !mat.current) return;
    const t = scrollState.t;
    const time = state.clock.elapsedTime;
    mat.current.opacity = 0.8 * (1 - THREE.MathUtils.smoothstep(t, 0.16, 0.3));
    if (reducedMotion) return;
    group.current.position.y = position[1] + Math.sin(time * 0.4 + phase) * 0.3;
    group.current.position.x = position[0] + Math.sin(time * 0.23 + phase * 2) * 0.15;
  });
  return (
    <group ref={group} position={position}>
      <Billboard>
        <mesh scale={scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial ref={mat} map={texture} transparent opacity={0.8} depthWrite={false} />
        </mesh>
      </Billboard>
    </group>
  );
}

function Spirits() {
  return (
    <>
      <Spirit url="/art/pet-moon.png" position={[-3.6, 2.4, -3]} scale={1.15} phase={0} />
      <Spirit url="/art/pet-gem.png" position={[3.7, 1.9, -2.6]} scale={0.85} phase={2.1} />
      <Spirit url="/art/pet-paw.png" position={[-2.9, -1.2, -2]} scale={0.65} phase={4.2} />
    </>
  );
}

/* ---------------- Camera rig ---------------- */

function Rig() {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    if (!cam.current) return;
    const t = scrollState.t;

    // A slow vertical drift sells the descent; a gentle dolly-in lands on the
    // dog for the finale.
    const y = THREE.MathUtils.lerp(1.3, -0.4, THREE.MathUtils.smoothstep(t, 0.1, 0.8));
    const z = THREE.MathUtils.lerp(7.4, 6.2, THREE.MathUtils.smoothstep(t, 0.75, 1));

    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, state.pointer.x, 3, dt);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, state.pointer.y, 3, dt);

    const lambda = reducedMotion ? 50 : 4;
    cam.current.position.x = THREE.MathUtils.damp(cam.current.position.x, pointer.current.x * 0.35, lambda, dt);
    cam.current.position.y = THREE.MathUtils.damp(cam.current.position.y, y + pointer.current.y * 0.2, lambda, dt);
    cam.current.position.z = THREE.MathUtils.damp(cam.current.position.z, z, lambda, dt);
    cam.current.lookAt(0, cam.current.position.y * 0.55, 0);
  });

  return <PerspectiveCamera ref={cam} makeDefault fov={42} near={0.1} far={60} position={[0, 1.3, 7.4]} />;
}

/* ---------------- Scene root ---------------- */

const HERO_ACTS = 4;

export default function MysticScene() {
  const wrapper = useRef<HTMLDivElement>(null);

  // One passive scroll listener drives the rig (via scrollState) and fades the
  // canvas once the collection sheet covers the scene.
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight || 1;
      scrollState.t = THREE.MathUtils.clamp(
        window.scrollY / (vh * (HERO_ACTS - 0.8)),
        0,
        1
      );
      if (wrapper.current) {
        const fade =
          1 -
          THREE.MathUtils.smoothstep(
            window.scrollY,
            vh * (HERO_ACTS - 0.9),
            vh * (HERO_ACTS - 0.1)
          );
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
        <color attach="background" args={["#171231"]} />

        <Rig />

        {/* Lights for the beads — the backdrops are unlit stills. */}
        <ambientLight intensity={0.7} color="#F3EDE3" />
        <directionalLight position={[4, 6, 3]} intensity={2} color="#FFF4E0" />
        <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#C4B5D4" />
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={1.1} position={[0, 5, -9]} scale={[12, 10, 1]} color="#FFF8EC" />
          <Lightformer intensity={0.7} position={[-6, 2, 2]} scale={[4, 8, 1]} color="#DCD9EC" />
          <Lightformer form="circle" intensity={8} position={[3, 4, 4]} scale={1} color="#FFFFFF" />
          <Lightformer form="circle" intensity={6} position={[-4, 3, 3]} scale={0.8} color="#FFF2D8" />
          <Lightformer form="circle" intensity={5} position={[2, -2, 5]} scale={0.6} color="#FFFFFF" />
        </Environment>

        <Suspense fallback={null}>
          <Backdrop />
          <Beads />
          <NecklaceShimmer />
          <Spirits />
          <Sparkles count={110} scale={[12, 8, 6]} position={[0, 0.5, -1]} size={2.4} speed={reducedMotion ? 0 : 0.3} color="#FFF3D6" opacity={0.6} />
          <Sparkles count={60} scale={[9, 6, 5]} position={[0, 0.5, 0]} size={1.6} speed={reducedMotion ? 0 : 0.2} color="#C9B8EF" opacity={0.45} />
        </Suspense>

        {/* The grade — spirit-light glow, paper grain, soft edge darkening. */}
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.8} luminanceSmoothing={0.3} />
          <Vignette offset={0.26} darkness={0.38} eskil={false} />
          <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
