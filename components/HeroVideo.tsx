"use client";

import { useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        src="/top.mp4"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 背景を少し暗くする */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}