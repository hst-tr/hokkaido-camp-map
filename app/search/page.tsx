import { getCampgrounds, searchCampgrounds } from "@/lib/campground";
import SearchResults from "@/components/SearchResults";

type SearchParams = {
  keyword?: string;
  area?: string;
  styles?: string | string[];
  locations?: string | string[];
  facilities?: string | string[];
};

type SearchPageProps = {
  searchParams: Promise<SearchParams>;
};

function toArray(
  value: string | string[] | undefined
): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const campgrounds = getCampgrounds();

  const selectedStyles = toArray(params.styles);
  const selectedLocations = toArray(params.locations);
  const selectedFacilities = toArray(params.facilities);

  const results = searchCampgrounds(campgrounds, {
    keyword: params.keyword,
    area: params.area,
    styles: selectedStyles,
    locations: selectedLocations,
    facilities: selectedFacilities,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <a
            href="/"
            className="text-sm text-green-700 hover:underline"
          >
            ← 北海道のキャンプ場MAP
          </a>

          <h1 className="mt-3 text-3xl font-bold">
            キャンプ場を探す
          </h1>

          <p className="mt-2 text-gray-600">
            エリアやキャンプスタイル、設備などの条件から探せます。
          </p>
        </div>

        {/* 検索フォーム */}
        <form
          action="/search"
          method="GET"
          className="mb-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          {/* キーワード：常に表示 */}
          <div>
            <label
              htmlFor="keyword"
              className="block text-sm font-bold"
            >
              キーワード
            </label>

            <input
              id="keyword"
              name="keyword"
              type="text"
              defaultValue={params.keyword ?? ""}
              placeholder="キャンプ場名・市町村・地域など"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* 詳細条件 */}
          <details className="group mt-6 overflow-hidden rounded-xl border border-gray-200">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 select-none">
              <span className="font-bold text-gray-900">
                詳細な検索条件
              </span>

              {/* ＋ / − */}
              <span
                className="relative h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                {/* 横棒 */}
                <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500" />

                {/* 縦棒：開いたときに消える */}
                <span className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500 transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>

            <div className="border-t border-gray-100 px-4 pb-5">
              {/* エリア */}
              <div className="mt-5">
                <p className="text-sm font-bold">
                  エリア
                </p>

                <div className="mt-3 flex flex-wrap gap-4">
                  {[
                    ["道央", "道央"],
                    ["道南", "道南"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="area"
                        value={value}
                        defaultChecked={params.area === value}
                      />

                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* キャンプスタイル */}
              <div className="mt-6">
                <p className="text-sm font-bold">
                  キャンプスタイル
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["auto", "オートサイト"],
                    ["free", "フリーサイト"],
                    ["cottage", "コテージ・バンガロー"],
                    ["glamping", "グランピング"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        name="styles"
                        value={value}
                        defaultChecked={selectedStyles.includes(value)}
                      />

                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ロケーション */}
              <div className="mt-6">
                <p className="text-sm font-bold">
                  ロケーション
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    ["sea", "海"],
                    ["lake", "湖"],
                    ["river", "川"],
                    ["forest", "林間"],
                    ["highland", "高原"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        name="locations"
                        value={value}
                        defaultChecked={selectedLocations.includes(value)}
                      />

                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 設備・条件 */}
              <div className="mt-6">
                <p className="text-sm font-bold">
                  設備・条件
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["onsen", "温泉・入浴施設"],
                    ["shower", "シャワー"],
                    ["power", "AC電源"],
                    ["toilet", "水洗トイレ"],
                    ["garbage", "ゴミ捨て場"],
                    ["pet", "ペットOK"],
                    ["wifi", "Wi-Fi"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        name="facilities"
                        value={value}
                        defaultChecked={selectedFacilities.includes(value)}
                      />

                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </details>

          {/* ボタン */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800"
            >
              この条件で検索
            </button>

            <a
              href="/search"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 hover:bg-gray-50"
            >
              条件をリセット
            </a>
          </div>
        </form>

        <SearchResults results={results} />
      </div>
    </main>
  );
}