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
    const redirections = await getRedirections();
    const redirectRule = redirections.find((r: any) => r.source === pathname);

    if (redirectRule && redirectRule.status === 'enabled' && pathname !== '/') {
        return NextResponse.redirect(new URL(redirectRule.target, req.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: "/:path*", // This ensures middleware runs on all routes
};
