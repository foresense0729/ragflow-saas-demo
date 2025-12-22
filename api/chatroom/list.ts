import { pool } from "../_utils/db";
import { ok } from "../_utils/response";

export async function GET() {
  const result = await pool.query(
    "SELECT id, room_code, ragflow_url FROM chatrooms ORDER BY id DESC"
  );
  return ok(result.rows);
}