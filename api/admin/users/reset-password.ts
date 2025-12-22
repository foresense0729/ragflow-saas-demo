import { pool } from "../../_utils/db";
import { ok, error } from "../../_utils/response";
import { requireAdmin } from "../../_utils/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.success) return auth.response;

  try {
    const { id, newPassword } = await req.json();

    const hash = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password_hash=$1 WHERE id=$2",
      [hash, id]
    );

    return ok("密碼已重設");
  } catch (err) {
    return error("密碼重設失敗");
  }
}