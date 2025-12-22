import { verifyAccess } from "../_utils/jwt";
import { ok, error } from "../_utils/response";
import { pool } from "../_utils/db";
import { checkTrialStatus } from "../_utils/checkTrial";

export async function GET(req: Request) {
  try {
    const token = req.headers
      .get("authorization")
      ?.replace("Bearer ", "");

    if (!token) return error("未授權", 401);

    const decoded: any = verifyAccess(token);

    // 取得完整使用者資料以檢查試用期
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [
      decoded.id,
    ]);

    if (result.rowCount === 0) return error("使用者不存在", 404);

    const user = result.rows[0];
    const trialStatus = checkTrialStatus(user);

    if (!trialStatus.valid) {
      return error("試用期已過期，請聯繫管理員", 403);
    }

    return ok({
      id: user.id,
      email: user.email,
      role: user.role,
      daysRemaining: trialStatus.daysRemaining,
    });
  } catch (err) {
    return error("token 無效", 401);
  }
}