import { pool } from "../../_utils/db";
import { ok, error } from "../../_utils/response";
import { requireAdmin } from "../../_utils/auth";
import bcrypt from "bcryptjs";

/**
 * User 管理 API（合併所有操作以減少 Serverless Function 數量）
 * 
 * GET: 取得所有使用者
 * POST: 根據 action 執行不同操作
 *   - action: "create" - 建立使用者
 *   - action: "reset-password" - 重設密碼
 *   - action: "update-role" - 更新角色
 */

export async function GET(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.success) return auth.response;

  const result = await pool.query(
    "SELECT id, email, role, trial_started_at, created_at FROM users ORDER BY id DESC"
  );
  return ok(result.rows);
}

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.success) return auth.response;

  try {
    const body = await req.json();
    const { action } = body;

    switch (action) {
      case "create": {
        const { email, password, role } = body;
        const hash = await bcrypt.hash(password, 10);
        await pool.query(
          "INSERT INTO users (email, password_hash, role) VALUES ($1,$2,$3)",
          [email, hash, role]
        );
        return ok("建立成功");
      }
      case "reset-password": {
        const { id, newPassword } = body;
        const hash = await bcrypt.hash(newPassword, 10);
        await pool.query(
          "UPDATE users SET password_hash=$1 WHERE id=$2",
          [hash, id]
        );
        return ok("密碼已重設");
      }
      case "update-role": {
        const { id, role } = body;
        await pool.query("UPDATE users SET role=$1 WHERE id=$2", [role, id]);
        return ok("角色更新成功");
      }
      default:
        return error("未知的操作");
    }
  } catch (err) {
    return error("操作失敗");
  }
}