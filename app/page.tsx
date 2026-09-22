import Link from "next/link";
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
        {/* ヒーロー */}
        <section className="bg-green-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
            <div className="max-w-3xl">
              <p className="text-sm font-bold tracking-widest text-green-300">
                HOKKAIDO CAMPGROUND MAP
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
                北海道のキャンプ場を、
                <br />
                条件から探す。
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-green-100 sm:text-lg">
                北海道のキャンプ場を、エリア・キャンプスタイル・
                ロケーション・設備などの条件から検索できます。
              </p>

              <div className="mt-8">
                <Link
                  href="/search"
                  className="inline-flex rounded-lg bg-white px-7 py-4 font-bold text-green-950 transition hover:bg-green-100"
                >
                  キャンプ場を探す →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 特徴 */}
        <section className="border-b bg-gray-50">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
            <div>
              <p className="text-2xl">🔎</p>

              <h2 className="mt-3 font-bold">
                条件から検索
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                エリアやスタイル、設備など複数の条件を組み合わせて検索できます。
              </p>
            </div>

            <div>
              <p className="text-2xl">🗺️</p>

              <h2 className="mt-3 font-bold">
                地図から確認
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                検索結果を地図上で確認し、気になるキャンプ場の位置を把握できます。
              </p>
            </div>

            <div>
              <p className="text-2xl">⛺</p>

              <h2 className="mt-3 font-bold">
                詳細情報を確認
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                キャンプスタイルや設備、所在地などをキャンプ場ごとに確認できます。
              </p>
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
                  {/* 画像の代わりのビジュアル領域 */}
                  <div className="flex h-40 items-center justify-center bg-green-100">
                    <span className="text-5xl transition group-hover:scale-110">
                      ⛺
                    </span>
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