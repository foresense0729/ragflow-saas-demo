import { pool } from "../../_utils/db";
import { ok, error } from "../../_utils/response";
import { requireAdmin } from "../../_utils/auth";

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.success) return auth.response;

  try {
    const { id, room_code, ragflow_url } = await req.json();

    await pool.query(
      "UPDATE chatrooms SET room_code=$1, ragflow_url=$2 WHERE id=$3",
      [room_code, ragflow_url, id]
    );

    return ok("更新成功");
  } catch (err) {
    return error("更新失敗");
  }
}