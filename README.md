# 北海道のキャンプ場MAP

北海道のキャンプ場を、エリア・キャンプスタイル・ロケーション・設備などの条件から検索できるデモWebサイトです。

検索結果を一覧と地図で確認でき、各キャンプ場の詳細ページまで閲覧できる構成としています。

## Demo

https://hokkaido-camp-map.vercel.app/

## Repository

https://github.com/hst-tr/hokkaido-camp-map

---

## Overview

北海道のキャンプ場を条件から探せる検索サイトを想定したデモ作品です。

実際のWebサイト制作案件を想定し、

- 条件検索
- 地図表示
- 検索結果一覧
- 詳細ページ
- レスポンシブ対応
- SEO基本設定
- 構造化データ
- OGP
- sitemap.xml
- robots.txt
- 動画によるビジュアル演出

などを実装しています。

キャンプ場情報はCSVで管理しており、データを追加・変更しやすい構成としています。

---

## Features

### キャンプ場検索

以下のような条件からキャンプ場を絞り込めます。

- エリア
- キャンプスタイル
- ロケーション
- 設備・施設

検索結果は一覧形式で表示します。

### 地図表示

検索結果のキャンプ場を地図上に表示します。

一覧のキャンプ場を選択すると、対応する地点を地図上で確認できます。

### キャンプ場詳細ページ

各キャンプ場について、

- キャンプ場名
- 所在地
- エリア
- キャンプスタイル
- ロケーション
- 設備
- 説明
- 料金
- 公式サイト

などを確認できます。

### レスポンシブ対応

PC・タブレット・スマートフォンでの閲覧を想定しています。

特に検索ページでは、スマートフォンでは地図を先に表示し、その下に検索結果を表示する構成としています。

### トップページの動画演出

トップページでは `top.mp4` を背景動画として使用しています。

画面サイズに応じて `object-cover` で表示領域を調整し、PC・スマートフォンの双方で画面いっぱいに表示されるようにしています。

### オープニングアニメーション

サイト初回訪問時に `op.mp4` によるオープニング動画を表示します。

動画終了後にフェードアウトしてサイト本体を表示します。

同一タブ・セッション内では再表示しない仕様としています。

### SEO基本対応

Next.jsのMetadata APIを利用し、以下を設定しています。

- title
- description
- keywords
- canonical URL
- OGP
- Twitterカード
- robots設定
- sitemap.xml
- robots.txt

### 構造化データ

Schema.orgのJSON-LDを使用しています。

トップページでは `WebSite`、キャンプ場詳細ページでは `Campground` の構造化データを設定しています。

### Google Search Console対応

Google Search Consoleでのサイト登録を想定し、

- Google所有権確認
- sitemap.xml
- robots.txt
- インデックス登録

に対応しています。

---

## Technology

- Next.js
- React
- TypeScript
- Tailwind CSS
- Leaflet
- Papa Parse
- Vercel

---

## Project Structure

```text
.
├── app/
│   ├── campground/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── search/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── CampgroundMap.tsx
│   ├── OpeningAnimation.tsx
│   ├── HeroVideo.tsx
│   ├── SearchResults.tsx
│   └── SearchResultsMap.tsx
│
├── data/
│   └── campgrounds.csv
│
├── lib/
│   └── campground.ts
│
├── public/
│   ├── images/
│   │   ├── camp-01.jpg
│   │   ├── camp-02.jpg
│   │   ├── camp-03.jpg
│   │   ├── camp-04.jpg
│   │   ├── camp-05.jpg
│   │   └── camp-06.jpg
│   ├── google6a433f451522b7dc.html
│   ├── ogp.jpg
│   ├── op.mp4
│   └── top.mp4
│
├── package.json
└── README.md
```

---

## Data

キャンプ場データは、

```text
data/campgrounds.csv
```

で管理しています。

CSV形式とすることで、Webアプリケーションのコードを変更せずにキャンプ場情報を追加・更新できる構成としています。

主なデータ項目は以下のとおりです。

- ID
- キャンプ場名
- エリア
- 市町村
- サブエリア
- 住所
- 緯度
- 経度
- キャンプスタイル
- ロケーション
- 設備
- 説明
- 料金
- 公式サイト
- 画像

本デモでは、北海道の道央・道南エリアを中心としたサンプルデータを使用しています。

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/hst-tr/hokkaido-camp-map.git
cd hokkaido-camp-map
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

ブラウザで以下を開きます。

```text
http://localhost:3000
```

### 4. Build

本番用ビルドを確認する場合：

```bash
npm run build
```

---

## Deployment

Vercelへのデプロイを想定しています。

GitHubリポジトリとVercelを連携することで、GitHubへのpushをトリガーとして自動デプロイできます。

現在のデモサイトはVercel上で公開しています。

https://hokkaido-camp-map.vercel.app/

---

## Environment Variables

サイト公開状態を切り替えるため、以下の環境変数を使用しています。

```env
SITE_PUBLIC=true
```

`true` の場合は検索エンジンからのクロールを許可します。

公開停止時には、

```env
SITE_PUBLIC=false
```

とすることで、robots.txtでサイト全体へのクロールを制限できます。

※この設定は検索エンジンからのクロール・インデックスを制御するものであり、Webサイトそのものへのアクセス制限ではありません。

---

## SEO

以下のURLを自動生成しています。

```text
/robots.txt
/sitemap.xml
```

公開時の `robots.txt` ではサイトマップを指定しています。

```text
User-Agent: *
Allow: /

Sitemap: https://hokkaido-camp-map.vercel.app/sitemap.xml
```

また、各キャンプ場の詳細ページをsitemapに含めています。

---

## Structured Data

トップページ：

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite"
}
```

キャンプ場詳細ページ：

```json
{
  "@context": "https://schema.org",
  "@type": "Campground"
}
```

各詳細ページには、キャンプ場名・住所・位置情報などを構造化データとして設定しています。

---

## Design / Implementation Notes

このデモでは、単純な静的ページではなく、実際の検索サイト制作を想定した構成を採用しています。

特に、

- CSVによるデータ管理
- 条件検索
- 地図との連動
- 動的な詳細ページ生成
- レスポンシブUI
- SEO / OGP
- 構造化データ
- sitemap / robots.txt
- Vercelへのデプロイ

までを一通り実装しています。

また、Leafletなどブラウザ側でのみ動作するライブラリについては、Next.jsのServer Componentsとの互換性を考慮し、Client Component側で読み込む構成としています。

---

## Purpose

本サイトは、Webサイト制作・Webアプリケーション開発のデモ作品として制作したものです。

実際のサービス提供を目的としたものではなく、検索・地図・データ管理・SEOなど、Webサイト制作における主要な要素を確認できるサンプルとして構成しています。

---

## Notice

掲載しているキャンプ場情報・画像等はデモ用途のサンプルです。

実際の営業状況、料金、設備、利用条件等を保証するものではありません。

実際に利用する場合は、各キャンプ場の公式サイト等で最新情報をご確認ください。
