# 北海道のキャンプ場MAP

北海道のキャンプ場を、エリア・キャンプスタイル・ロケーション・設備などの条件から検索できるWebサイトのデモです。

施設データをCSVで管理し、検索結果・詳細ページ・地図表示・サイトマップなどをデータから動的に生成する構成としています。

> ※本プロジェクトはWebサイト制作における技術・設計のデモを目的としたものです。掲載データはデモ用であり、実際の利用時には各施設の公式情報をご確認ください。

## Demo

公開URL：

https://hokkaido-camp-map.vercel.app

※公開後、実際のVercel URLに変更します。

## Features

### キャンプ場検索

以下の条件からキャンプ場を検索できます。

* キーワード
* エリア
* キャンプスタイル
* ロケーション
* 設備・条件

複数条件を組み合わせた検索に対応しています。

同一カテゴリ内はOR条件、異なるカテゴリ間はAND条件として処理しています。

### 地図連動

検索結果と地図を連動させています。

* 検索結果から施設を選択
* 地図上のマーカーを選択
* 選択した施設へ地図を移動
* 地図から施設詳細ページへ遷移

地図表示にはLeaflet / OpenStreetMapを使用しています。

### 動的な詳細ページ

キャンプ場ごとの詳細ページを個別に作成するのではなく、CSVのIDを利用して共通テンプレートから生成しています。

```text
/campground/D001
/campground/D002
/campground/N001
...
```

施設データを追加することで、新しい詳細ページを生成できる構成です。

### 構造化データ

検索サイトとしての情報構造を明確にするため、Schema.orgのJSON-LDを実装しています。

トップページ：

```text
WebSite
```

キャンプ場詳細ページ：

```text
Campground
```

詳細ページでは施設名、住所、位置情報、公式URLなどを構造化データとして出力しています。

### SEO / AIO向けファイル

以下をNext.jsの機能を利用して生成しています。

```text
/robots.txt
/sitemap.xml
/llms.txt
```

`sitemap.xml` はCSVから取得したキャンプ場データをもとに詳細ページを自動生成する構成です。

### CSVによる施設データ管理

施設情報はCSVで管理しています。

主な項目：

```text
id
name
area
city
subarea
address
latitude
longitude
style_auto
style_free
style_cottage
style_glamping
location_sea
location_lake
location_river
location_forest
location_highland
facility_onsen
facility_shower
facility_power
facility_toilet
facility_garbage
facility_pet
facility_wifi
description
price_from
official_url
```

実案件では、施設情報の更新・追加をCSV等のデータソースから行い、Webサイト側で利用する構成を想定しています。

## Technology

* Next.js
* TypeScript
* React
* Tailwind CSS
* Leaflet
* React Leaflet
* Papa Parse
* OpenStreetMap
* Vercel

## Architecture

```text
                 ┌──────────────────┐
                 │  campgrounds.csv │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ campground.ts   │
                 │ データ読み込み・検索 │
                 └────────┬─────────┘
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
       ┌──────────┐ ┌──────────┐ ┌──────────┐
       │ 検索ページ │ │ 詳細ページ │ │ sitemap │
       └─────┬────┘ └─────┬────┘ └──────────┘
             │             │
             ▼             ▼
       ┌──────────┐   ┌──────────┐
       │ 地図表示  │   │ JSON-LD  │
       └──────────┘   └──────────┘
```

## Directory Structure

```text
hokkaido-camp-map/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ robots.ts
│  ├─ sitemap.ts
│  ├─ search/
│  │  └─ page.tsx
│  ├─ campground/
│  │  └─ [id]/
│  │     └─ page.tsx
│  └─ llms.txt/
│     └─ route.ts
│
├─ components/
│  ├─ SearchResults.tsx
│  ├─ CampgroundMap.tsx
│  └─ CampgroundDetailMap.tsx
│
├─ data/
│  └─ campgrounds.csv
│
├─ lib/
│  └─ campground.ts
│
├─ public/
│
├─ package.json
└─ README.md
```

## Local Development

### 1. Install

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Open

```text
http://localhost:3000
```

## Data

本デモでは北海道のキャンプ場データをCSV形式で管理しています。

座標や設備情報にはデモ用の情報が含まれるため、実運用時には一次情報をもとにしたデータ整備・確認が必要です。

## Future Improvements

実案件への展開を想定した場合、以下の機能追加が考えられます。

* 施設データ管理画面
* CMS / WordPressとの連携
* 施設画像管理
* 詳細な料金・営業期間情報
* 地図上でのクラスタリング
* ページネーション
* お気に入り機能
* 高度なSEO設計
* Google Search Console等を利用した検索パフォーマンス分析
* 施設データ更新フローの自動化

## Purpose

このプロジェクトは、施設データを中心とした検索型Webサイトについて、

* データ設計
* 検索ロジック
* 地図連携
* 動的ページ生成
* 構造化データ
* SEO / AIO対応
* サイトマップ生成

までを一通り実装する技術デモとして制作しています。
# hokkaido-camp-map
