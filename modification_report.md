# 專案修改與部署報告 (Modification Report)

本報告彙整了為了在您的公司 Windows 電腦上成功部署並運行此專案，我們對原始程式碼所做的所有修改與修正。

## 1. 程式碼修正 (Code Fixes)

這些修改是為了解決本地開發環境 (Local Development) 與 Windows 系統的相容性問題。

### A. 資料庫連線設定 (`api/_utils/db.ts`)
*   **原始狀態**：僅在 `NODE_ENV=production` 時才開啟 SSL 加密。
*   **修改後**：強制開啟 SSL (`ssl: true`)。
*   **原因**：Neon (Serverless Postgres) 資料庫強制要求 SSL 連線，若本地開發未開啟 SSL 會導致 `500 Internal Server Error` (連線被拒)。

### B. 登入錯誤處理 (`api/auth/login.ts`)
*   **原始狀態**：將所有錯誤捕捉後直接回傳「登入失敗」，未輸出錯誤日誌。
*   **修改後**：在 `catch` 區塊增加 `console.error("Login Error:", err)`。
*   **原因**：原始寫法會「吞掉」錯誤，導致開發者無法在終端機看到具體的錯誤原因 (如資料庫連線失敗)，增加除錯難度。

### C. 啟動腳本設定 (`package.json`)
*   **原始狀態**：
    *   `"dev": "vite"` (這會與 Vercel 的 Proxy 衝突，或被 Vercel 覆蓋)。
*   **修改後**：
    *   新增 `"frontend": "vite"` (獨立的前端啟動指令)。
    *   修改 `"dev": "echo 'Backend API Mode'"` (防止 Vercel CLI 遞迴呼叫)。
*   **原因**：在 Windows 上直接使用 `vercel dev` 同時啟動前端與後端容易發生埠口衝突或遞迴錯誤 (`recursive invocation`)。將兩者拆開執行 (一個視窗跑後端，一個跑前端) 是最穩定且乾淨的解法。

---

## 2. 資料庫修正 (Data Fixes)

這些修正不涉及程式碼，而是直接修改資料庫內容。

### D. 管理員密碼雜湊 (`schema.sql` / Neon Database)
*   **原始狀態**：`schema.sql` 內預設的 `password_hash` 與文件宣稱的密碼 `Admin123!` 不匹配。
*   **修改後**：手動更新資料庫中的 Admin 密碼雜湊值。
*   **原因**：原始附帶的雜湊值無效，導致即使輸入正確密碼也會被系統判定為 `400 Bad Request` (密碼錯誤)。我們重新生成了正確的 bcrypt 雜湊值來修復此問題。

---

## 3. 部署方式改變 (Deployment Workflow)

相較於原作者可能假設的單一指令啟動，我們調整為：

1.  **雙終端機模式**：
    *   Terminal A: `vercel dev --listen 3000` (專責後端 API)
    *   Terminal B: `npm run frontend` (專責前端畫面)
2.  **明確的環境變數**：
    *   手動建立 `.env` 並填寫 `DATABASE_URL` 與 JWT Secret，確保不依賴雲端拉取的設定。

總結來說，這些改動主要集中在**環境適配**與**錯誤修復**，並未更動核心業務邏輯或 UI 設計。專案現在應該能在您的環境中穩定運行。
