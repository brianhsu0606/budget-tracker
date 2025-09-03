# 記帳小幫手系統

一個基於 Vue 3 + TypeScript + Tailwind CSS 的前後端整合記帳系統，提供會員管理、商品管理、訂單管理與營收統計等功能，後端使用 Node.js + Express + MongoDB 做資料存儲。

## 專案連結

budget-tracker-sigma-liart.vercel.app

## 測試帳號

帳號: test
密碼: 12345

## 功能特色

會員系統：註冊、登入、個人資料查看與編輯
資料視覺化：使用 ECharts.js 呈現統計圖表
前端技術：Vue 3、TypeScript、Tailwind CSS、Element Plus
後端技術：Node.js + Express + MongoDB

## 專案結構

frontend/ # Vue 3 前端專案
backend/ # Express 後端專案
├─ routes/ # API 路由
├─ middleware/ # JWT 驗證
└─ models/ # MongoDB 資料模型

## 技術棧

前端：Vue 3 + TypeScript + Tailwind CSS + Element Plus + ECharts.js
後端：Node.js + Express + MongoDB
開發工具：VSCode + Volar

## 安裝與運行

前端
cd frontend
pnpm install
pnpm dev

後端
cd backend
pnpm install
pnpm dev

打包與部署
pnpm build # 前端打包

Lint
pnpm lint

# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
