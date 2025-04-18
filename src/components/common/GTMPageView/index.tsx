"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const InnerPageView = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + searchParams.toString();
        // @ts-ignore
        window.dataLayer = window.dataLayer || [];
        // @ts-ignore
        window.dataLayer.push({
            event: "pageview",
            page: url,
        });
    }, [pathname, searchParams]);

    return null;
};

export const GTMPageView = () => {
    return (
        <Suspense fallback={null}>
            <InnerPageView />
        </Suspense>
    );
};
