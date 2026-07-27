"use client";

import dynamic from "next/dynamic";

// The 3D scene touches window/WebGL, so it only ever renders on the client.
const MysticScene = dynamic(() => import("./MysticScene"), { ssr: false });

export default function MysticHero() {
  return <MysticScene />;
}
