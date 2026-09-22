"use client";

import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import type { Campground } from "@/lib/campground";

const markerIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Props = {
  campgrounds: Campground[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

function MapController({
  campgrounds,
  selectedId,
}: {
  campgrounds: Campground[];
  selectedId?: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;

    const campground = campgrounds.find(
      (camp) => camp.id === selectedId
    );

    if (!campground) return;

    map.flyTo(
      [
        campground.latitude,
        campground.longitude,
      ],
      10,
      {
        duration: 0.8,
      }
    );
  }, [
    selectedId,
    campgrounds,
    map,
  ]);

  return null;
}

export default function CampgroundMap({
  campgrounds,
  selectedId,
  onSelect,
}: Props) {
  const center: [number, number] = [
    43.3,
    142.7,
  ];

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController
        campgrounds={campgrounds}
        selectedId={selectedId}
      />

      {campgrounds.map((camp) => {
        const isSelected =
          camp.id === selectedId;

        return (
          <Marker
            key={camp.id}
            position={[
              camp.latitude,
              camp.longitude,
            ]}
            icon={markerIcon}
            eventHandlers={{
              click: () => {
                onSelect?.(camp.id);
              },
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <p className="text-xs text-gray-500">
                  {camp.area} / {camp.city}
                </p>

                <p className="mt-1 font-bold">
                  {camp.name}
                </p>

                {isSelected && (
                  <p className="mt-1 text-xs text-green-700">
                    選択中
                  </p>
                )}

                <Link
                  href={`/campground/${camp.id}`}
                  className="mt-2 inline-block text-sm text-green-700 underline"
                >
                  詳細を見る →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}