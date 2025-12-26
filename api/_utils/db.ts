import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, // Serverless 環境建議限制連線數
  idleTimeoutMillis: 30000, // 閒置連線 30 秒後關閉
  connectionTimeoutMillis: 10000, // 連線超時 10 秒
  ssl: true, // Neon 若需強制 SSL 可設為 true，或保留 { rejectUnauthorized: false }
});