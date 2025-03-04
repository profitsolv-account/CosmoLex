import { NextRequest, NextResponse } from "next/server";
import {getRedirections} from "@/lib/queries/settings";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const redirections = await getRedirections();
    const redirectRule = redirections.find((r: any) => r.source === pathname);

    if (redirectRule && pathname !== '/') {
        return NextResponse.redirect(new URL(redirectRule.target, req.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: "/:path*", // This ensures middleware runs on all routes
};
