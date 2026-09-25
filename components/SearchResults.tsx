"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchResultsMap from "@/components/SearchResultsMap";

import type { Campground } from "@/lib/campground";

type Props = {
  results: Campground[];
};

function getLocationTags(camp: Campground) {
  const tags: string[] = [];

  if (camp.location_sea) tags.push("海");
  if (camp.location_lake) tags.push("湖");
  if (camp.location_river) tags.push("川");
  if (camp.location_forest) tags.push("林間");
  if (camp.location_highland) tags.push("高原");

  return tags;
}

function getFacilityTags(camp: Campground) {
  const tags: string[] = [];

  if (camp.facility_onsen) tags.push("温泉");
  if (camp.facility_shower) tags.push("シャワー");
  if (camp.facility_power) tags.push("AC電源");
  if (camp.facility_toilet) tags.push("水洗トイレ");
  if (camp.facility_garbage) tags.push("ゴミ捨て場");
  if (camp.facility_pet) tags.push("ペットOK");
  if (camp.facility_wifi) tags.push("Wi-Fi");

  return tags;
}

export default function SearchResults({ results }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">検索結果</h2>

        <p className="text-sm text-gray-600">
          {results.length}件
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* キャンプ場一覧 */}
        <div className="order-2 space-y-4 lg:order-1">
          {results.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <p className="font-medium">
                条件に一致するキャンプ場がありません。
              </p>

              <p className="mt-2 text-sm text-gray-500">
                条件を変更して、もう一度検索してください。
              </p>
            </div>
          ) : (
            results.map((camp) => {
              const isSelected = camp.id === selectedId;

              const locationTags = getLocationTags(camp);
              const facilityTags = getFacilityTags(camp);

              return (
                <article
                  key={camp.id}
                  onClick={() => setSelectedId(camp.id)}
                  className={`cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md ${
                    isSelected
                      ? "ring-2 ring-green-600"
                      : ""
                  }`}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={camp.image}
                      alt={`${camp.name}のデモ用イメージ`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700">
                      {camp.area}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-gray-500">
                      {camp.city}
                    </p>

                    <h3 className="mt-1 text-lg font-bold">
                      {camp.name}
                    </h3>

                    {locationTags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {locationTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {facilityTags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {facilityTags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4">
                      <Link
                        href={`/campground/${camp.id}`}
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                        className="text-sm font-medium text-green-700 hover:underline"
                      >
                        詳細を見る →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* 地図 */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <div className="h-[400px] overflow-hidden rounded-2xl bg-white shadow-sm lg:h-full">
            <SearchResultsMap
              campgrounds={results}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}