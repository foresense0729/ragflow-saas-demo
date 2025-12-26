# RAGFlow SaaS Demo - 系統部署與操作手冊

本手冊包含兩大部分：
1.  **移轉部署**：如何將整包檔案搬到另一台新電腦並開始執行。
2.  **日常操作**：如何在電腦重開機後，重新啟動系統。

---

## Part 1. 移轉部署 (Deploy to New Machine)

當您將整個專案資料夾 (假設名為 `ai-agent-demo-react`) 複製到另一台新的 Windows 電腦後，請依照以下步驟進行設定。

### 1. 環境檢核 (Prerequisites)
新電腦必須安裝以下軟體：
*   **Node.js (LTS 版本)**: [下載連結](https://nodejs.org/) (安裝後請在終端機輸入 `node -v` 確認)。
*   **Vercel CLI**: 打開 PowerShell 執行 `npm install -g vercel` 安裝。

### 2. 資料夾定位
將專案資料夾放在您喜歡的位置 (例如桌面上)。
```powershell
# 範例：切換到資料夾 (請依實際位置修改)
cd "$HOME\Desktop\ai-agent-demo-react\ai-agent-demo-react"
```

### 3. 設定環境變數 (.env)
請檢查資料夾內是否有 **`.env`** 檔案。
*   這是隱藏檔，有時候複製檔案時會漏掉。
*   如果沒有，請手動建立一個 `.env`，內容如下 (請填入您正確的 Neon 資料庫連線字串)：
    ```env
    DATABASE_URL=postgres://.......(您的Neon連線字串，結尾記得加上 ?sslmode=require)
    JWT_SECRET=任意亂碼1
    JWT_REFRESH_SECRET=任意亂碼2
    ```

### 4. 安裝相依套件
在專案目錄下執行：
```powershell
npm install
```
(如果看到 `node_modules` 資料夾已經存在，建議先刪除它再重新 install，以確保乾淨。)

---

## Part 2. 日常啟動 (Daily Startup)

電腦關機重開後，只要執行以下兩個步驟即可恢復網站運作。

**請開啟兩個 PowerShell視窗 (或命令提示字元 cmd)，分別執行：**

###視窗 A (負責由後端資料庫與 API)
```powershell
# 1. 進入專案目錄
cd "$HOME\Desktop\ai-agent-demo-react\ai-agent-demo-react"

# 2. 啟動後端
vercel dev --listen 3000
```
> **成功訊號**：看到 `Ready! Available at http://localhost:3000` 且顯示 "Backend API Mode"。

###視窗 B (負責網頁畫面)
```powershell
# 1. 進入專案目錄
cd "$HOME\Desktop\ai-agent-demo-react\ai-agent-demo-react"

# 2. 啟動前端
npm run frontend
```
> **成功訊號**：看到綠色的 `VITE` 字樣與 `Local: http://localhost:5173/`。

---

## Part 3. 預設登入帳號 (Default Credentials)

系統預設的最高權限管理員帳號如下，請妥善保存：

*   **Email**: `admin@sass.com`
*   **Password**: `Admin123!`

(此帳號密碼存於雲端資料庫 Neon，因此即使更換電腦部署，只要連上同一個資料庫，無需重新註冊即可直接登入)

---


## 常見問題排除

**Q: 登入時顯示 `Network Error` 或沒反應？**
A: 請檢查 **視窗 A** 是否還開著？如果關掉了，前端就連不到後端。請重新執行 `vercel dev --listen 3000`。

**Q: 出現 `500 Internal Server Error`？**
A: 通常是資料庫連線問題。請檢查 `.env` 裡面的 `DATABASE_URL` 是否正確。

**Q: 換電腦後登入顯示「密碼錯誤」？**
A: 這是因為資料庫是雲端的 (Neon)，所以帳號密碼是共用的。請確認您輸入的是正確的 Admin 密碼 (預設為 `Admin123!`)。
