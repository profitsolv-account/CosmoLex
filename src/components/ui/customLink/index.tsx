"use client";
import {FC, ReactNode} from "react";
import Link from "next/link";
import NProgress from "nprogress";

type Props = {
    href: string;
    children?: ReactNode;
    className?: string;
    onClick?: (e: any) => void;
    target?: string;
    dangerouslySetInnerHTML?: {__html: string};
    rel?: string;
    useDefault?: boolean
}

export const CustomLink: FC<Props> = ({href, children, className, onClick, target, dangerouslySetInnerHTML, rel, useDefault}) => {
    /* if (useDefault) {
         return <a
             href={href}
             className={className}
             onClick={onClick}
             target={target}
             rel={rel}
         >{children}</a>
     }*/

    const onClickHandler = (e: any) => {
        if (onClick) {
            e.preventDefault();
            onClick(e);
        }
        NProgress.start();

        const currentPath = window.location.pathname.replace(/\/$/, "");
        if (currentPath === href) {
            e.preventDefault();
            NProgress.done();
        }
        setTimeout(() => {
            NProgress.done();
        }, 3000)
    }
    if (dangerouslySetInnerHTML?.__html) {
        return <Link
            href={href}
            className={className}
            onClick={onClickHandler}
            target={target}
            dangerouslySetInnerHTML={{__html: dangerouslySetInnerHTML?.__html || ""}}
            rel={rel}
        />
    }

    return <Link
        href={href}
        className={className}
        onClick={onClickHandler}
        target={target}
        rel={rel}
    >{children}</Link>
}