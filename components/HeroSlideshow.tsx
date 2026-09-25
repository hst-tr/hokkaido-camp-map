"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/images/top-01.jpg",
  "/images/top-02.jpg",
  "/images/top-03.jpg",
  "/images/top-04.jpg",
  "/images/top-05.jpg",
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* 写真を少し暗くして文字を読みやすくする */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}