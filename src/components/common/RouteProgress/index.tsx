'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import './styles.css';

export const RouteProgress = () => {
    const pathname = usePathname();

    useEffect(() => {
        //NProgress.start();

        const timeout = setTimeout(() => {
            NProgress.done();
        }, 300);
        return () => {
            clearTimeout(timeout);
            NProgress.done();
        };
    }, [pathname]);

    return null;
};
