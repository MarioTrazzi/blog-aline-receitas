import { NextRequest } from "next/server";

export function isAdminAuthorized(request: NextRequest): boolean {
  const password = request.headers.get("authorization")?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  return Boolean(password && adminPassword && password === adminPassword);
}
