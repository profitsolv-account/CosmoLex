import classNames from 'classnames';
import {FC, MouseEventHandler, ReactNode} from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'link';
    href?: string;
}
export const Button: FC<Props> = ({
   children,
   className,
   onClick,
    href,
   variant = 'primary',
}) => {

    return <a href={href || "#"}
        className={
        classNames(
            "h-[2.75rem] px-5 pt-[0.625rem] pb-3 rounded-[6.25rem] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group",
            {
                "bg-white text-white hover:bg-primary": variant === 'primary',
                "bg-primary text-primary hover:bg-white": variant === 'secondary',
            },
            className
        )}
                onClick={(e) => {
                    if (onClick) {
                        e.preventDefault();
                        onClick();
                    }
                }}
    >
        <div className={classNames(
            "text-center text-base font-normal font-['Inter'] transition-all duration-300",
            {
                "text-primary group-hover:text-white": variant === 'primary',
                "text-white group-hover:text-primary": variant === 'secondary',
            }
        )}>
            {children}
        </div>
    </a>
}