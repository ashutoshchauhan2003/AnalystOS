import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUPABASE_SESSION_COOKIE } from "@/lib/supabase/auth";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtectedRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/lab" ||
    pathname.startsWith("/lab/") ||
    pathname === "/review" ||
    pathname.startsWith("/review/") ||
    pathname === "/submissions" ||
    pathname.startsWith("/submissions/") ||
    pathname === "/portfolio" ||
    pathname.startsWith("/portfolio/");

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasSupabaseSession = request.cookies.has(SUPABASE_SESSION_COOKIE);
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (hasSupabaseSession || !supabaseConfigured) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("callbackUrl", `${pathname}${search}`);

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
