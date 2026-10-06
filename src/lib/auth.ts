import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "dashboard_auth";
const SALT = "louis-dashboard-v1";

function getCode(): string {
  return process.env.DASHBOARD_CODE ?? "";
}

function expectedToken(): string {
  return crypto.createHash("sha256").update(SALT + getCode()).digest("hex");
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token || !getCode()) return false;
  return token === expectedToken();
}

export async function setAuthCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  });
}

export async function clearAuthCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function checkCode(input: string): boolean {
  const code = getCode();
  return code.length > 0 && input === code;
}
