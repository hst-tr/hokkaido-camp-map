import fs from "fs";
import path from "path";
import Papa from "papaparse";

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
  price_from: number;
  official_url: string;
  source_url: string;
  data_note: string;

  image: string;
};

const csvPath = path.join(process.cwd(), "data", "campgrounds.csv");

export function getCampgrounds(): Campground[] {
  const csv = fs.readFileSync(csvPath, "utf-8");

  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data.map((row) => ({
    id: row.id,
    name: row.name,
    area: row.area,
    city: row.city,
    subarea: row.subarea,
    address: row.address,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    coordinate_type: row.coordinate_type,

    style_auto: row.style_auto === "1",
    style_free: row.style_free === "1",
    style_cottage: row.style_cottage === "1",
    style_glamping: row.style_glamping === "1",

    location_sea: row.location_sea === "1",
    location_lake: row.location_lake === "1",
    location_river: row.location_river === "1",
    location_forest: row.location_forest === "1",
    location_highland: row.location_highland === "1",

    facility_onsen: row.facility_onsen === "1",
    facility_shower: row.facility_shower === "1",
    facility_power: row.facility_power === "1",
    facility_toilet: row.facility_toilet === "1",
    facility_garbage: row.facility_garbage === "1",
    facility_pet: row.facility_pet === "1",
    facility_wifi: row.facility_wifi === "1",

    description: row.description,
    price_from: Number(row.price_from),
    official_url: row.official_url,
    source_url: row.source_url,
    data_note: row.data_note,

    image: row.image || "/images/camp-01.jpg",
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
  const keyword = params.keyword?.trim().toLowerCase();

  return campgrounds.filter((camp) => {
    if (keyword) {
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

    if (params.area && camp.area !== params.area) {
      return false;
    }

    if (params.styles && params.styles.length > 0) {
      const styleMatches = params.styles.some((style) => {
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

      if (!styleMatches) {
        return false;
      }
    }

    if (params.locations && params.locations.length > 0) {
      const locationMatches = params.locations.some((location) => {
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

      if (!locationMatches) {
        return false;
      }
    }

    if (params.facilities && params.facilities.length > 0) {
      const facilityMatches = params.facilities.every((facility) => {
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

      if (!facilityMatches) {
        return false;
      }
    }

    return true;
  });
}