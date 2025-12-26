# RAGFlow SaaS Demo - 雲端部署指南 (Cloud Deployment Guide)

本文件說明如何將您的專案部署到網路上 (使用 Vercel)，讓外部使用者可以透過網址 (如 `https://your-project.vercel.app`) 訪問您的網站。

由於本專案包含後端 Serverless Function，因此**不能**使用 GitHub Pages (僅支援純靜態網頁)。我們必須使用 **Vercel** 進行託管，這是最簡單且完美支援本專案架構的服務。

---

## 步驟 1：準備 GitHub Repository

1.  註冊/登入 [GitHub](https://github.com/)。
2.  建立這一個新的 repository (例如命名為 `ragflow-saas-demo`)。
3.  將您電腦上的程式碼推送到 GitHub：
    *   (如果您的專案尚未連結到 git)
    ```powershell
    # 在專案資料夾執行
    git init
    git add .
    git commit -m "First commit"
    git branch -M main
    git remote add origin https://github.com/您的帳號/ragflow-saas-demo.git
    git push -u origin main
    ```

## 步驟 2：使用 Vercel 進行部署

1.  註冊/登入 [Vercel](https://vercel.com/) (建議直接使用 "Continue with GitHub" 登入)。
2.  在 Vercel 控制台點擊 **"Add New..."** -> **"Project"**。
3.  在 **"Import Git Repository"** 列表中，找到您剛剛上傳的 `ragflow-saas-demo`，點擊 **"Import"**。

## 步驟 3：設定部署參數 (關鍵！)

在 "Configure Project" 畫面中，請注意以下設定：

1.  **Framework Preset**: Vercel 通常會自動偵測為 **Vite** (若無請手動選擇)。
2.  **Root Directory**: 保持預設 (`./`) 即可。
3.  **Environment Variables (環境變數)**：(這是最重要的一步！)
    請展開此區塊，將您本地 `.env` 檔案中的內容一筆一筆新增進去：

    | Key (變數名稱) | Value (數值) |
    | :--- | :--- |
    | `DATABASE_URL` | `postgres://...(您的 Neon 連線字串)...?sslmode=require` |
    | `JWT_SECRET` | (任意隨機字串，例如 `CloudSecret123`) |
    | `JWT_REFRESH_SECRET` | (任意隨機字串，例如 `CloudRefresh456`) |

    > **注意**：`DATABASE_URL` 務必與您本地測試成功的那一串完全相同 (包含 `sslmode=require`)。

4.  點擊 **"Deploy"** 按鈕。

## 步驟 4：等待部署與測試

Vercel 會開始自動建置 (Build) 您的專案。
*   約等待 1~2 分鐘。
*   若成功，畫面會撒花並顯示您的網址 (Domains)，通常是 `https://ragflow-saas-demo-xxx.vercel.app`。
*   點擊該網址，這就是您的**正式對外網站**了！您可以將此連結傳給任何人。

## 步驟 5：後續維護

*   **更新程式**：只要您在本地修改程式碼並 `git push` 到 GitHub，Vercel 就會自動偵測並重新部署新版本 (CI/CD)。
*   **查看日誌**：若部署後網站報錯，可以到 Vercel Dashboard -> Project -> Logs 查看伺服器紀錄。
