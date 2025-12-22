import { verifyRefresh, signAccessToken } from "../_utils/jwt";
import { ok, error } from "../_utils/response";
import { pool } from "../_utils/db";
import { checkTrialStatus } from "../_utils/checkTrial";

export async function POST(req: Request) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) return error("缺少 refresh token");

    const decoded: any = verifyRefresh(refreshToken);

    const result = await pool.query("SELECT * FROM users WHERE id=$1", [
      decoded.id,
    ]);

    if (result.rowCount === 0) return error("使用者不存在", 404);

    const user = result.rows[0];

    // 檢查試用期是否過期
    const trialStatus = checkTrialStatus(user);
    if (!trialStatus.valid) {
      return error("試用期已過期，請聯繫管理員", 403);
    }

    return ok({
      accessToken: signAccessToken(user),
      daysRemaining: trialStatus.daysRemaining,
    });
  } catch (err) {
    return error("refresh token 無效", 401);
  }
}