# Ragflow SaaS Demo（Vercel + Neon PostgreSQL）

這是一套可商用的 SaaS 架構範例，包含：

- 使用者登入 / 聊天室選擇 / iframe 嵌入聊天
- Admin 後台：使用者管理、聊天室管理
- JWT + Refresh Token
- 全 serverless API
- Neon PostgreSQL

---

## 🚀 啟動專案
npm install
npm run dev

---

## 🗄️ 建立資料庫（Neon）

將 `sql/schema.sql` 貼到 Neon Query Editor 執行。

預設 Admin 帳號：
email: admin@sass.com
password: Admin123!

---

## 🔐 設定環境變數（根目錄建立 .env）
DATABASE_URL=你的Neon連線字串
JWT_SECRET=任意強密鑰
JWT_REFRESH_SECRET=任意強密鑰

---

## 🌐 部署到 Vercel
vercel deploy

---

## 🎉 完成！

已擁有一套完整可運作的 SaaS Demo，
可提供客戶試用、也能作為後續開發擴充基底。