import {FC, ReactNode} from "react";
import Link from "next/link";

type Props = {
    href: string;
    children?: ReactNode;
    className?: string;
    onClick?: (e: any) => void;
    target?: string;
    dangerouslySetInnerHTML?: {__html: string};
    rel?: string;
}

export const CustomLink: FC<Props> = ({href, children, className, onClick, target, dangerouslySetInnerHTML, rel}) => {
    if (dangerouslySetInnerHTML?.__html) {
        return <Link
            href={href}
            className={className}
            onClick={onClick}
            target={target}
            dangerouslySetInnerHTML={{__html: dangerouslySetInnerHTML?.__html || ""}}
            rel={rel}
        />
    }

    return <Link
        href={href}
        className={className}
        onClick={onClick}
        target={target}
        rel={rel}
    >{children}</Link>
}