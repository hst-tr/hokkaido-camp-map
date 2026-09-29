import Link from "next/link";
import Image from "next/image";
import OpeningAnimation from "@/components/OpeningAnimation";
import HeroVideo from "@/components/HeroVideo";
import { getCampgrounds } from "@/lib/campground";

function getLocationTags(
  camp: ReturnType<typeof getCampgrounds>[number]
) {
  const tags: string[] = [];

  if (camp.location_sea) tags.push("海");
  if (camp.location_lake) tags.push("湖");
  if (camp.location_river) tags.push("川");
  if (camp.location_forest) tags.push("林間");
  if (camp.location_highland) tags.push("高原");

  return tags;
}

export default function HomePage() {
  const campgrounds = getCampgrounds();

  const featured = campgrounds.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: "北海道のキャンプ場MAP",

    description:
      "北海道のキャンプ場を条件や地図から探せるキャンプ場検索サイト。",

    url: "https://hokkaido-camp-map.vercel.app",
  };

  return (
    <>
      {/* WebSite JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="min-h-screen bg-white">
        <OpeningAnimation />
        {/* ヒーロー */}
        <section className="relative min-h-[560px] overflow-hidden">
          <HeroVideo />

          <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-20">
            <div className="relative h-auto w-full max-w-3xl lg:max-w-[80vw]">
              <a
                href="/search"
                className="group flex w-full flex-col items-center justify-center gap-6 px-6 transition-transform duration-300 hover:scale-[1.02] sm:flex-row sm:gap-12 lg:px-16"
                aria-label="キャンプ場を検索"
              >
                <Image
                  src="/title.svg"
                  alt="北海道のキャンプ場を、条件から探す。"
                  width={1230}
                  height={590}
                  className="h-auto w-full min-w-0 flex-1 transition-transform duration-300 group-hover:scale-[1.02] sm:max-w-none"
                  priority
                />

                <span
                  className="
                    shrink-0 whitespace-nowrap
                    rounded-xl
                    border border-white/40
                    bg-white/20
                    px-7 py-4
                    text-xl font-bold text-white
                    shadow-lg
                    backdrop-blur-sm
                    transition-all duration-300
                    group-hover:bg-white/30
                    sm:px-8 sm:py-5 sm:text-2xl
                  "
                >
                  キャンプ場を検索 →
                </span>
              </a>
            </div>

            <h1 className="sr-only">
              北海道のキャンプ場を、条件から探す。
            </h1>

            <p className="sr-only">
              エリアやキャンプスタイル、ロケーション、設備などから、北海道のキャンプ場を探せます。
            </p>
          </div>
        </section>

        {/* 特徴 */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">

              {/* 条件から検索 */}
              <div className="flex items-center gap-5">
                <div className="w-1/3 shrink-0">
                  <Image
                    src="/images/campfire.png"
                    alt="キャンプファイヤーのイラスト"
                    width={500}
                    height={500}
                    className="h-auto w-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-[#800000]">
                    条件から検索
                  </h2>
                  <p className="mt-3 whitespace-nowrap text-[clamp(10px,2.5cqw,15px)] leading-7 text-gray-600">
                    エリアやスタイル、設備など複数の<br />
                    条件を組み合わせて検索できます。
                  </p>
                </div>
              </div>

              {/* 地図から確認 */}
              <div className="flex items-center gap-5">
                <div className="w-1/3 shrink-0">
                  <Image
                    src="/images/map.png"
                    alt="地図を見る人のイラスト"
                    width={500}
                    height={500}
                    className="h-auto w-full scale-[0.88] object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-[#2e8b57]">
                    地図から確認
                  </h2>
                  <p className="mt-3 whitespace-nowrap text-[clamp(10px,2.5cqw,15px)] leading-7 text-gray-600">
                    検索結果を地図上で確認し、気になる<br />
                    キャンプ場の位置を把握できます。
                  </p>
                </div>
              </div>

              {/* 詳細情報を確認 */}
              <div className="flex items-center gap-5">
                <div className="w-1/3 shrink-0">
                  <Image
                    src="/images/cottage.png"
                    alt="キャンプ場のコテージのイラスト"
                    width={500}
                    height={500}
                    className="h-auto w-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-[#808000]">
                    詳細情報を確認
                  </h2>
                  <p className="mt-3 whitespace-nowrap text-[clamp(10px,2.5cqw,15px)] leading-7 text-gray-600">
                    キャンプスタイルや設備、所在地などを<br />
                    キャンプ場ごとに確認できます。
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* キャンプ場一覧 */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-bold tracking-widest text-green-700">
                CAMPGROUNDS
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                キャンプ場を探す
              </h2>

              <p className="mt-3 text-gray-600">
                北海道のキャンプ場を条件から検索できます。
              </p>
            </div>

            <Link
              href="/search"
              className="hidden text-sm font-bold text-green-700 hover:underline sm:block"
            >
              すべて見る →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((camp) => {
              const locationTags = getLocationTags(camp);

              return (
                <Link
                  key={camp.id}
                  href={`/campground/${camp.id}`}
                  className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* 画像 */}
                  <div className="relative h-48 w-full overflow-hidden rounded-xl">
                    <Image
                      src={camp.image}
                      alt={`${camp.name}のデモ用イメージ`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-gray-500">
                      {camp.area} / {camp.city}
                    </p>

                    <h3 className="mt-2 text-lg font-bold group-hover:text-green-700">
                      {camp.name}
                    </h3>

                    {locationTags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {locationTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {camp.description}
                    </p>

                    <p className="mt-4 text-sm font-bold text-green-700">
                      詳細を見る →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/search"
              className="font-bold text-green-700"
            >
              すべてのキャンプ場を見る →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-100">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              行きたいキャンプ場を探してみませんか？
            </h2>

            <p className="mt-4 text-gray-600">
              エリアや設備など、希望の条件からキャンプ場を検索できます。
            </p>

            <Link
              href="/search"
              className="mt-7 inline-flex rounded-lg bg-green-700 px-7 py-4 font-bold text-white hover:bg-green-800"
            >
              キャンプ場を検索する
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-green-950 text-green-100">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <p className="font-bold">
              北海道のキャンプ場MAP
            </p>

            <p className="mt-2 text-xs text-green-300">
              北海道のキャンプ場を条件・地図から探せるデモサイト
            </p>

            <p className="mt-6 text-xs text-green-400">
              ※掲載情報はデモ用データです。実際の利用時には各施設の公式情報をご確認ください。
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}