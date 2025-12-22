import { pool } from "../_utils/db";
import { ok, error } from "../_utils/response";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "../_utils/jwt";
import { checkTrialStatus } from "../_utils/checkTrial";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rowCount === 0) return error("帳號不存在");

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return error("密碼錯誤");

    // 首次登入：設定試用期開始時間
    if (!user.trial_started_at && user.role !== "admin") {
      await pool.query(
        "UPDATE users SET trial_started_at = NOW() WHERE id = $1",
        [user.id]
      );
      user.trial_started_at = new Date().toISOString();
    }

    // 檢查試用期是否過期
    const trialStatus = checkTrialStatus(user);
    if (!trialStatus.valid) {
      return error("試用期已過期，請聯繫管理員", 403);
    }

    return ok({
      accessToken: signAccessToken(user),
      refreshToken: signRefreshToken(user),
      role: user.role,
      daysRemaining: trialStatus.daysRemaining,
    });
  } catch (err) {
    return error("登入失敗");
  }
}