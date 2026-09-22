export type Campground = {
  id: string;
  name: string;
  area: string;
  city: string;
  subarea: string;
  address: string;

  latitude: number;
  longitude: number;

  coordinate_type: string;

  style_auto: boolean;
  style_free: boolean;
  style_cottage: boolean;
  style_glamping: boolean;

  location_sea: boolean;
  location_lake: boolean;
  location_river: boolean;
  location_forest: boolean;
  location_highland: boolean;

  facility_onsen: boolean;
  facility_shower: boolean;
  facility_power: boolean;
  facility_toilet: boolean;
  facility_garbage: boolean;
  facility_pet: boolean;
  facility_wifi: boolean;

  description: string;
  price_from: string;
  official_url: string;
  source_url: string;
  data_note: string;
};

import fs from "fs";
import path from "path";
import Papa from "papaparse";

const csvPath = path.join(
  process.cwd(),
  "data",
  "campgrounds.csv"
);

const toBoolean = (value: string | undefined) => {
  return value === "1";
};

export function getCampgrounds(): Campground[] {
  const csv = fs.readFileSync(csvPath, "utf8");

  const result = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data.map((row) => ({
    id: row.id,
    name: row.name,
    area: row.area,
    city: row.city,
    subarea: row.subarea,
    address: row.address,

    latitude: Number(row.latitude),
    longitude: Number(row.longitude),

    coordinate_type: row.coordinate_type,

    style_auto: toBoolean(row.style_auto),
    style_free: toBoolean(row.style_free),
    style_cottage: toBoolean(row.style_cottage),
    style_glamping: toBoolean(row.style_glamping),

    location_sea: toBoolean(row.location_sea),
    location_lake: toBoolean(row.location_lake),
    location_river: toBoolean(row.location_river),
    location_forest: toBoolean(row.location_forest),
    location_highland: toBoolean(row.location_highland),

    facility_onsen: toBoolean(row.facility_onsen),
    facility_shower: toBoolean(row.facility_shower),
    facility_power: toBoolean(row.facility_power),
    facility_toilet: toBoolean(row.facility_toilet),
    facility_garbage: toBoolean(row.facility_garbage),
    facility_pet: toBoolean(row.facility_pet),
    facility_wifi: toBoolean(row.facility_wifi),

    description: row.description,
    price_from: row.price_from,
    official_url: row.official_url,
    source_url: row.source_url,
    data_note: row.data_note,
  }));
}

export type SearchParams = {
  keyword?: string;
  area?: string;
  styles?: string[];
  locations?: string[];
  facilities?: string[];
};

export function searchCampgrounds(
  campgrounds: Campground[],
  params: SearchParams
): Campground[] {
  return campgrounds.filter((camp) => {
    // キーワード
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase();

      const target = [
        camp.name,
        camp.city,
        camp.subarea,
        camp.address,
      ]
        .join(" ")
        .toLowerCase();

      if (!target.includes(keyword)) {
        return false;
      }
    }

    // エリア
    if (params.area && camp.area !== params.area) {
      return false;
    }

    // キャンプスタイル
    if (params.styles && params.styles.length > 0) {
      const matched = params.styles.some((style) => {
        switch (style) {
          case "auto":
            return camp.style_auto;

          case "free":
            return camp.style_free;

          case "cottage":
            return camp.style_cottage;

          case "glamping":
            return camp.style_glamping;

          default:
            return false;
        }
      });

      if (!matched) {
        return false;
      }
    }

    // ロケーション
    if (params.locations && params.locations.length > 0) {
      const matched = params.locations.some((location) => {
        switch (location) {
          case "sea":
            return camp.location_sea;

          case "lake":
            return camp.location_lake;

          case "river":
            return camp.location_river;

          case "forest":
            return camp.location_forest;

          case "highland":
            return camp.location_highland;

          default:
            return false;
        }
      });

      if (!matched) {
        return false;
      }
    }

    // 設備
    if (params.facilities && params.facilities.length > 0) {
      const matched = params.facilities.every((facility) => {
        switch (facility) {
          case "onsen":
            return camp.facility_onsen;

          case "shower":
            return camp.facility_shower;

          case "power":
            return camp.facility_power;

          case "toilet":
            return camp.facility_toilet;

          case "garbage":
            return camp.facility_garbage;

          case "pet":
            return camp.facility_pet;

          case "wifi":
            return camp.facility_wifi;

          default:
            return false;
        }
      });

      if (!matched) {
        return false;
      }
    }

    return true;
  });
}