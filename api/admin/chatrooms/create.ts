import { pool } from "../../_utils/db";
import { ok, error } from "../../_utils/response";
import { requireAdmin } from "../../_utils/auth";

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.success) return auth.response;

  try {
    const { room_code, ragflow_url } = await req.json();

    await pool.query(
      "INSERT INTO chatrooms (room_code, ragflow_url) VALUES ($1,$2)",
      [room_code, ragflow_url]
    );

    return ok("建立成功");
  } catch (err) {
    return error("建立失敗");
  }
}