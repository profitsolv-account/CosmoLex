import { NextRequest, NextResponse } from "next/server";
import {gql} from "@apollo/client";
import client from "@/lib/apollo-client";

const redirectionCache: {
    data: any[];
    lastUpdated: number;
    ttl: number;
} = {
    data: [],
    lastUpdated: 0,
    ttl: 600 * 1000 * 1000,
};

const getRedirections = async () => {
    const now = Date.now();

    if (redirectionCache.data && now - redirectionCache.lastUpdated < redirectionCache.ttl) {
        return redirectionCache.data;
    }

    const { data } = await client.query({
        query: gql`
            query GetRedirections {
                redirections {
                    source
                    target
                    status
                    type
                }
            }
        `,
        fetchPolicy: "cache-first",
        variables: {},
    });

    redirectionCache.data = data?.redirections || [];
    redirectionCache.lastUpdated = now;

    return redirectionCache.data;
};

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const userAgent = req.headers.get('user-agent') || '';
    const isBot = /bot|crawl|spider|slurp|linkedin|facebook|pingdom/i.test(userAgent);
    const headers = new Headers(req.headers);

    if (isBot) {
        headers.set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }

    if (pathname.includes('/login-banner')) {
        return NextResponse.next({
            request: {
                headers,
            },
        });
    }

    if (pathname.includes('/login')) {
        return NextResponse.redirect('https://law.cosmolex.com/login/');
    }

    if (pathname.endsWith('.xml') && !pathname.startsWith('/sitemaps/')) {
        const newUrl = req.nextUrl.clone();
        newUrl.pathname = `/sitemaps${pathname}`;
        return NextResponse.rewrite(newUrl);
    }

    if (pathname.includes('_next') || pathname.includes('favicon.ico')) {
        return NextResponse.next({
            request: {
                headers,
            },
        });
    }

    try {
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

    } catch(e) {
        return NextResponse.next({
            request: {
                headers,
            },
        });
    }

    return NextResponse.next({
        request: {
            headers,
        },
    });
}

export const config = {
    matcher: ["/((?!api|_next|favicon.ico).*)"],
};
