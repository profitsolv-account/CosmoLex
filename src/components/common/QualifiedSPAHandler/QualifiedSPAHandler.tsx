'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const QualifiedSPAHandler = () => {
    const pathname = usePathname();
    const previousPathname = useRef<string | null>(null);

    useEffect(() => {
        if (previousPathname.current !== pathname) {
            previousPathname.current = pathname;

            // @ts-ignore
            if (typeof window !== 'undefined' && window.Qualified) {
                // @ts-ignore
                window.Qualified('spa', true);
            }
        }
    }, [pathname]);

    return null;
};
