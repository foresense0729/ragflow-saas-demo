import jwt from "jsonwebtoken";

const ACCESS_EXPIRE = "15m";
const REFRESH_EXPIRE = "7d";

export function signAccessToken(user: any) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: ACCESS_EXPIRE }
  );
}

export function signRefreshToken(user: any) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: REFRESH_EXPIRE }
  );
}

export function verifyAccess(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}

export function verifyRefresh(token: string) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
}