"use client";

import { useState } from "react";
import Link from "next/link";
import type { Campground } from "@/lib/campground";
import CampgroundMap from "@/components/CampgroundMap";

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

export default function SearchResults({
  results,
}: Props) {
  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          検索結果
        </h2>

        <p className="text-sm text-gray-600">
          {results.length}件
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左：一覧 */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="font-bold">
                条件に一致するキャンプ場がありません。
              </p>

              <p className="mt-2 text-sm text-gray-500">
                条件を変更して、もう一度検索してください。
              </p>
            </div>
          ) : (
            results.map((camp) => {
              const locationTags =
                getLocationTags(camp);

              const facilityTags =
                getFacilityTags(camp);

              const isSelected =
                selectedId === camp.id;

              return (
                <article
                  key={camp.id}
                  onClick={() =>
                    setSelectedId(camp.id)
                  }
                  className={`cursor-pointer rounded-xl bg-white p-5 shadow-sm transition ${
                    isSelected
                      ? "ring-2 ring-green-600"
                      : "hover:shadow-md"
                  }`}
                >
                  <div className="text-sm text-gray-500">
                    {camp.area} / {camp.city}
                  </div>

                  <h3 className="mt-1 text-xl font-bold">
                    {camp.name}
                  </h3>

                  {camp.subarea && (
                    <p className="mt-1 text-sm text-gray-500">
                      {camp.subarea}
                    </p>
                  )}

                  {locationTags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {locationTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {facilityTags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {facilityTags
                        .slice(0, 4)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}

                  {camp.description && (
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
                      {camp.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {isSelected
                        ? "地図上で選択中"
                        : "クリックして地図で確認"}
                    </span>

                    <Link
                      href={`/campground/${camp.id}`}
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                      className="font-bold text-green-700 hover:underline"
                    >
                      詳細を見る →
                    </Link>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* 右：地図 */}
        <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <div className="h-[500px] overflow-hidden rounded-xl bg-white shadow-sm lg:h-full">
            <CampgroundMap
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