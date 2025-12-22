import { pool } from "../../_utils/db";
import { ok, error } from "../../_utils/response";
import { requireAdmin } from "../../_utils/auth";

/**
 * Chatroom 管理 API（合併所有操作以減少 Serverless Function 數量）
 * 
 * GET: 取得所有聊天室
 * POST: 根據 action 執行不同操作
 *   - action: "create" - 建立聊天室
 *   - action: "update" - 更新聊天室
 *   - action: "delete" - 刪除聊天室
 */

export async function GET(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.success) return auth.response;

  const result = await pool.query(
    "SELECT * FROM chatrooms ORDER BY id DESC"
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
        const { room_code, ragflow_url } = body;
        await pool.query(
          "INSERT INTO chatrooms (room_code, ragflow_url) VALUES ($1,$2)",
          [room_code, ragflow_url]
        );
        return ok("建立成功");
      }
      case "update": {
        const { id, room_code, ragflow_url } = body;
        await pool.query(
          "UPDATE chatrooms SET room_code=$1, ragflow_url=$2 WHERE id=$3",
          [room_code, ragflow_url, id]
        );
        return ok("更新成功");
      }
      case "delete": {
        const { id } = body;
        await pool.query("DELETE FROM chatrooms WHERE id=$1", [id]);
        return ok("刪除成功");
      }
      default:
        return error("未知的操作");
    }
  } catch (err) {
    return error("操作失敗");
  }
}