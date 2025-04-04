import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/apollo-client";
import {gql} from "@apollo/client";

const getRedirections = async () => {
    const {data} = await client.query({
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
    return data?.redirections || [];
}

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
    matcher: "/:path*",
};
