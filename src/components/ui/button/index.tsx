import classNames from 'classnames';
import {FC, ReactNode} from 'react';
import {CustomLink} from "@/components/ui/customLink";

type Props = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'link';
    href?: string;
    target?: string
}
export const Button: FC<Props> = ({
   children,
   className,
   onClick,
    href,
    target,
   variant = 'primary',
}) => {

    return <CustomLink
        href={href || "#"}
        target={target || ""}
        className={classNames(
            "h-[2.75rem] px-5 pt-[0.625rem] pb-3 rounded-[6.25rem] border border-white flex justify-center items-center gap-2.5 cursor-pointer transition-all duration-300 group",
            variant === 'primary'
                ? "bg-white text-primary hover:bg-primary hover:text-white"
                : "bg-primary text-white hover:bg-white hover:text-primary",
            className
        )}
        onClick={(e) => {
            if (onClick) {
                e.preventDefault();
                onClick();
            }
        }}
    >
        {children}
    </CustomLink>
}