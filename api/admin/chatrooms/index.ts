import { pool } from "../../_utils/db";
import { ok } from "../../_utils/response";
import { requireAdmin } from "../../_utils/auth";

export async function GET(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.success) return auth.response;

  const result = await pool.query(
    "SELECT * FROM chatrooms ORDER BY id DESC"
  );
  return ok(result.rows);
}