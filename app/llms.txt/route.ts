import { getCampgrounds } from "@/lib/campground";

export async function GET() {
  const campgrounds = getCampgrounds();

  const lines = [
    "# 北海道のキャンプ場MAP",
    "",
    "> 北海道のキャンプ場を、エリア・キャンプスタイル・ロケーション・設備などの条件から検索できるデモサイトです。",
    "",
    "## サイト概要",
    "",
    "- キャンプ場検索",
    "- エリア別検索",
    "- キャンプスタイル別検索",
    "- ロケーション別検索",
    "- 設備・条件別検索",
    "- 地図表示",
    "",
    "## 主要ページ",
    "",
    "- / : トップページ",
    "- /search : キャンプ場検索",
    "",
    "## キャンプ場データ",
    "",
    `現在 ${campgrounds.length} 件のキャンプ場データを掲載しています。`,
    "",
    "各キャンプ場の詳細ページ:",
    "",
    ...campgrounds.map(
      (campground) =>
        `- ${campground.name}: /campground/${campground.id}`
    ),
    "",
    "## データについて",
    "",
    "掲載データはデモ用です。",
    "実際の利用時には公式サイト等で最新情報を確認してください。",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}