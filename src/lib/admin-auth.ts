import { NextRequest } from "next/server";

export function isAdminAuthorized(request: NextRequest): boolean {
  const password = request.headers.get("authorization");
  return password === process.env.ADMIN_PASSWORD;
}
