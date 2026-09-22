"use client";

import dynamic from "next/dynamic";
import type { Campground } from "@/lib/campground";

const CampgroundMap = dynamic(
  () => import("@/components/CampgroundMap"),
  {
    ssr: false,
  }
);

type Props = {
  campground: Campground;
};

export default function CampgroundDetailMap({
  campground,
}: Props) {
  return (
    <div className="h-[400px] overflow-hidden rounded-xl">
      <CampgroundMap
        campgrounds={[campground]}
      />
    </div>
  );
}