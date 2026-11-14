import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LANG_HEADER } from "@/i18n/config";

/** Tells the root layout which language a page is in, so <html lang> is correct on /uz and /ru. */
export function proxy(request: NextRequest) {
  const first = request.nextUrl.pathname.split("/")[1];
  const lang = first === "uz" || first === "ru" ? first : "en";
  const headers = new Headers(request.headers);
  headers.set(LANG_HEADER, lang);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Pages only: skip the API, Next's own files and anything with a file extension.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
