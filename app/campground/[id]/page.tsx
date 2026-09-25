import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCampgrounds } from "@/lib/campground";
import CampgroundDetailMap from "@/components/CampgroundDetailMap";
import Image from "next/image";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const campgrounds = getCampgrounds();

  return campgrounds.map((camp) => ({
    id: camp.id,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const campground = getCampgrounds().find(
    (camp) => camp.id === id
  );

  if (!campground) {
    return {
      title: "キャンプ場が見つかりません",
    };
  }

  return {
    title: campground.name,

    description:
      `${campground.city}にある${campground.name}のキャンプ場情報。` +
      `キャンプスタイル、ロケーション、設備などの情報を確認できます。`,

    openGraph: {
      title: campground.name,
      description:
        `${campground.city}にある${campground.name}のキャンプ場情報。`,
      type: "website",
    },
  };
}

export default async function CampgroundPage({
  params,
}: Props) {
  const { id } = await params;

  const campground = getCampgrounds().find(
    (camp) => camp.id === id
  );

  if (!campground) {
    notFound();
  }

  const locationTags: string[] = [];

  if (campground.location_sea) {
    locationTags.push("海");
  }

  if (campground.location_lake) {
    locationTags.push("湖");
  }

  if (campground.location_river) {
    locationTags.push("川");
  }

  if (campground.location_forest) {
    locationTags.push("林間");
  }

  if (campground.location_highland) {
    locationTags.push("高原");
  }

  const styleTags: string[] = [];

  if (campground.style_auto) {
    styleTags.push("オートサイト");
  }

  if (campground.style_free) {
    styleTags.push("フリーサイト");
  }

  if (campground.style_cottage) {
    styleTags.push("コテージ・バンガロー");
  }

  if (campground.style_glamping) {
    styleTags.push("グランピング");
  }

  const facilityTags: string[] = [];

  if (campground.facility_onsen) {
    facilityTags.push("温泉・入浴施設");
  }

  if (campground.facility_shower) {
    facilityTags.push("シャワー");
  }

  if (campground.facility_power) {
    facilityTags.push("AC電源");
  }

  if (campground.facility_toilet) {
    facilityTags.push("水洗トイレ");
  }

  if (campground.facility_garbage) {
    facilityTags.push("ゴミ捨て場");
  }

  if (campground.facility_pet) {
    facilityTags.push("ペットOK");
  }

  if (campground.facility_wifi) {
    facilityTags.push("Wi-Fi");
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Campground",

    name: campground.name,

    description: campground.description,

    address: {
      "@type": "PostalAddress",
      addressLocality: campground.city,
      streetAddress: campground.address,
      addressCountry: "JP",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: campground.latitude,
      longitude: campground.longitude,
    },

    url: campground.official_url,
  };

  return (
    <>
      {/* Campground JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-8">

          {/* パンくず */}
          <div className="text-sm">
            <Link
              href="/"
              className="text-green-700 hover:underline"
            >
              北海道のキャンプ場MAP
            </Link>

            <span className="mx-2 text-gray-400">
              /
            </span>

            <Link
              href="/search"
              className="text-green-700 hover:underline"
            >
              キャンプ場検索
            </Link>

            <span className="mx-2 text-gray-400">
              /
            </span>

            <span className="text-gray-500">
              {campground.name}
            </span>
          </div>

          {/* 基本情報 */}
          <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="relative mt-6 h-64 overflow-hidden rounded-2xl sm:h-96">
              <Image
                src={campground.image}
                alt={`${campground.name}のデモ用イメージ`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="text-sm text-gray-500">
              {campground.area} / {campground.city}
            </div>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              {campground.name}
            </h1>

            {campground.subarea && (
              <p className="mt-2 text-gray-500">
                {campground.subarea}
              </p>
            )}

            {/* ロケーション */}
            {locationTags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {locationTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* スタイル */}
            {styleTags.length > 0 && (
              <div className="mt-4">
                <h2 className="text-sm font-bold">
                  キャンプスタイル
                </h2>

                <div className="mt-2 flex flex-wrap gap-2">
                  {styleTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 説明 */}
            {campground.description && (
              <p className="mt-6 whitespace-pre-line leading-8 text-gray-700">
                {campground.description}
              </p>
            )}
          </section>

          {/* 設備 */}
          {facilityTags.length > 0 && (
            <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold">
                設備・サービス
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {facilityTags.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-lg bg-gray-50 px-4 py-3"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 所在地・料金 */}
          <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">
              基本情報
            </h2>

            <dl className="mt-5 divide-y">
              <div className="grid gap-2 py-4 sm:grid-cols-3">
                <dt className="font-bold text-gray-600">
                  所在地
                </dt>

                <dd className="sm:col-span-2">
                  {campground.address}
                </dd>
              </div>

              <div className="grid gap-2 py-4 sm:grid-cols-3">
                <dt className="font-bold text-gray-600">
                  料金目安
                </dt>

                <dd className="sm:col-span-2">
                  {campground.price_from
                    ? `¥${campground.price_from}〜`
                    : "要確認"}
                </dd>
              </div>
            </dl>

            {campground.official_url && (
              <div className="mt-6">
                <a
                  href={campground.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
                >
                  公式サイトを見る →
                </a>
              </div>
            )}
          </section>

          {/* 地図 */}
          <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">
              地図
            </h2>

            <div className="mt-4">
              <CampgroundDetailMap
                campground={campground}
              />
            </div>
          </section>

          {/* データ注記 */}
          {campground.data_note && (
            <section className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="text-sm leading-6 text-yellow-900">
                {campground.data_note}
              </p>
            </section>
          )}

          <div className="mt-8">
            <Link
              href="/search"
              className="text-sm font-bold text-green-700 hover:underline"
            >
              ← キャンプ場検索に戻る
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}