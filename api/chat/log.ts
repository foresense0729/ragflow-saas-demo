import { pool } from "../_utils/db";
import { ok, error } from "../_utils/response";

export async function POST(req: Request) {
  try {
    const { user_id, message } = await req.json();

    await pool.query(
      "INSERT INTO chat_logs (user_id, message) VALUES ($1,$2)",
      [user_id, message]
    );

    return ok("已記錄");
  } catch (err) {
    return error("記錄失敗");
  }
}