import { pool } from "../../_utils/db";
import { ok, error } from "../../_utils/response";
import { requireAdmin } from "../../_utils/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.success) return auth.response;

  try {
    const { email, password, role } = await req.json();

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password_hash, role) VALUES ($1,$2,$3)",
      [email, hash, role]
    );

    return ok("建立成功");
  } catch (err) {
    return error("建立失敗");
  }
}