# RAGFlow SaaS Demo

一個基於 React + Vercel Serverless + Neon Postgres 的 SaaS 演示專案。

## 🚀 專案功能

- **使用者系統**：註冊、登入、JWT 驗證、試用期管理
- **Admin 後台**：
  - 使用者管理（列表、新增、角色權限）
  - 聊天室管理（設定 RAGFlow URL）
- **SaaS 訂閱模擬**：試用期過期檢查

## 🛠 技術棧

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Neon (Serverless Postgres)
- **Auth**: JWT + bcryptjs

## 💻 本地開發指南 (Local Development)

本專案採用 **Vercel API + Vite Frontend** 的雙伺服器開發模式，以解決 Serverless Function 本地模擬問題。

### 1. 前置準備

- 安裝 Node.js (v18+)
- 安裝 Vercel CLI: `npm install -g vercel`
- 準備 Neon 資料庫連線字串

### 2. 環境變數設定

**方式 A：使用 Vercel CLI (推薦)**
如果你已經在 Vercel 建立專案並設定好環境變數：
```bash
vercel login
vercel link
vercel env pull .env.local
```
這會自動將雲端的設定下載到 `.env.local`。

**方式 B：手動設定**
如果尚未部署到 Vercel，可以手動建立 `.env`：
```bash
cp .env.example .env
```
編輯 `.env` 填入：
```env
DATABASE_URL=你的Neon資料庫連線字串
JWT_SECRET=自定義隨機字串
JWT_REFRESH_SECRET=自定義隨機字串
```

### 3. 初始化資料庫

使用 Neon SQL Editor 執行 `sql/schema.sql` 內容以建立資料表和預設 Admin 帳號。

### 4. 啟動開發環境

你需要打開 **兩個終端機視窗** 同時運行：

**終端機 A (API 伺服器)**
```bash
vercel dev --listen 3000
```
> 用於模擬後端 API，運行在 port 3000

**終端機 B (前端伺服器)**
```bash
npm run dev
```
> 用於前端 HMR，運行在 port 5173，已設定 Proxy 自動將 `/api` 轉發到 port 3000

打開瀏覽器訪問 `http://localhost:5173` 即可開始開發。

## 🚢 部署 (Deployment)

本專案已設定好 Vercel 部署配置。

1. 推送程式碼到 GitHub
2. 在 Vercel Dashboard 匯入專案
3. 在 Vercel "Environment Variables" 設定上述的三個環境變數
4. 等待部署完成

> **注意**：由於 Vercel Hobby 方案限制每個專案最多 12 個 Serverless Functions，Admin 相關的 API 已合併處理 (e.g. `/api/admin/users` 透過 action 參數處理 CRUD)。

## 📝 預設帳號

- **Admin**: `admin@sass.com` / `Admin123!`