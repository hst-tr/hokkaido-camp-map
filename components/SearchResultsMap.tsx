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
  campgrounds: Campground[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function SearchResultsMap({
  campgrounds,
  selectedId,
  onSelect,
}: Props) {
  return (
    <CampgroundMap
      campgrounds={campgrounds}
      selectedId={selectedId}
      onSelect={onSelect}
    />
  );
}