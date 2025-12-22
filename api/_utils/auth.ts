import { verifyAccess } from "./jwt";
import { error } from "./response";

interface DecodedToken {
    id: number;
    email: string;
    role: string;
}

interface AuthResult {
    success: true;
    user: DecodedToken;
}

interface AuthError {
    success: false;
    response: Response;
}

type AuthCheckResult = AuthResult | AuthError;

/**
 * 驗證請求是否來自已登入的使用者
 */
export function requireAuth(req: Request): AuthCheckResult {
    try {
        const token = req.headers.get("authorization")?.replace("Bearer ", "");

        if (!token) {
            return { success: false, response: error("未授權", 401) };
        }

        const decoded = verifyAccess(token) as DecodedToken;
        return { success: true, user: decoded };
    } catch (err) {
        return { success: false, response: error("Token 無效", 401) };
    }
}

/**
 * 驗證請求是否來自 Admin
 */
export function requireAdmin(req: Request): AuthCheckResult {
    const authResult = requireAuth(req);

    if (!authResult.success) {
        return authResult;
    }

    if (authResult.user.role !== "admin") {
        return { success: false, response: error("權限不足", 403) };
    }

    return authResult;
}
