import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * On first visit (no "lang" cookie):
 *   - If geo.country === "IL" → lang=he
 *   - Else → lang=en
 * Persists cookie for 1 year.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Only act on HTML navigations
  const acceptsHTML = req.headers.get("accept")?.includes("text/html");
  if (!acceptsHTML) return res;

  const existing = req.cookies.get("lang")?.value;
  if (!existing) {
    const country = (req as any).geo?.country || "";
    const lang = country === "IL" ? "he" : "en";
    res.cookies.set("lang", lang, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365 // 1y
    });
  }

  return res;
}

export const config = {
  // run on all routes
  matcher: "/:path*"
};
