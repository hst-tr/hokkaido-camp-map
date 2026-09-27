"use client";

import { useEffect, useRef, useState } from "react";

const OPENING_KEY = "hokkaido-camp-opening-played";

export default function OpeningAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // このセッションですでに再生済みなら何もしない
    const alreadyPlayed = sessionStorage.getItem(OPENING_KEY);

    if (alreadyPlayed === "true") {
      return;
    }

    // 今回のセッションでは再生済みとして記録
    sessionStorage.setItem(OPENING_KEY, "true");

    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // 動画終了 → フェードアウト
      setClosing(true);

      // フェードアウト完了後に削除
      setTimeout(() => {
        setVisible(false);
      }, 800);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden bg-black transition-opacity duration-[800ms] ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src="/op.mp4"
        autoPlay
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    </div>
  );
}