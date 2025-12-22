import { pool } from "../../_utils/db";
import { ok, error } from "../../_utils/response";
import { requireAdmin } from "../../_utils/auth";

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.success) return auth.response;

  try {
    const { id, role } = await req.json();

    await pool.query("UPDATE users SET role=$1 WHERE id=$2", [role, id]);

    return ok("角色更新成功");
  } catch (err) {
    return error("角色更新失敗");
  }
}