import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const authSecret =
  process.env.NEXTAUTH_SECRET ?? "analystos-local-development-secret";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/lab");

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: authSecret,
  });

  if (token) {
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
