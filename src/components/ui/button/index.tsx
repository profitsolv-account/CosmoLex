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
            "h-[44px] px-5 pt-[10px] pb-3 rounded-[100px] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group",
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