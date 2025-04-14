import { NextRequest, NextResponse } from "next/server";
import {isProduction} from "@/helpers";
import {notFound} from "next/navigation";

const getRedirections = async () => {
  try {
      let baseUrl = isProduction() ? 'https://www.cosmolex.com' : 'https://cosmolex-staging.vercel.app';
      if (process.env.ENVIRONMENT === 'local') {
          baseUrl = 'http://localhost:3000';
      }

      const resp = await fetch(`${baseUrl}/api/redirects?secret=rev-token-122`);
      const json = await resp.json();
      if (!json?.redirections) {
          return [];
      }
      return json.redirections;
  } catch(e: any) {
      return []
  }
};

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    if (pathname.endsWith('.xml') && !pathname.startsWith('/sitemaps/')) {
        const newUrl = req.nextUrl.clone();
        newUrl.pathname = `/sitemaps${pathname}`;
        return NextResponse.rewrite(newUrl);
    }

    if (pathname.includes('_next') || pathname.includes('favicon.ico')) {
        return NextResponse.next();
    }

    const redirections = await getRedirections();

    for (const redirectRule of redirections) {
        if (redirectRule.status !== 'enabled' || pathname === '/') continue;

        if (redirectRule.source.startsWith('^')) {
            const regex = new RegExp(redirectRule.source);
            const match = pathname.match(regex);

            if (match) {
                let target = redirectRule.target;

                if (match.length > 1) {
                    match.slice(1).forEach((group, idx) => {
                        target = target.replace(`$${idx + 1}`, group);
                    });
                }

                if (redirectRule.type === 'pass') {
                   return NextResponse.rewrite(new URL(target, req.url));
                }

                return NextResponse.redirect(new URL(target, req.url));
            }
        } else if (redirectRule.source === pathname) {
            if (redirectRule.type === 'pass') {
                return NextResponse.rewrite(new URL(redirectRule.target, req.url));
            }
            return NextResponse.redirect(new URL(redirectRule.target, req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|favicon.ico).*)"],
};
