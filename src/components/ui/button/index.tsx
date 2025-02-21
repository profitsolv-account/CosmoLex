import classNames from 'classnames';
import {FC, ReactNode} from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
}
export const Button: FC<Props> = ({
   children,
   className,
   onClick,
   variant = 'primary',
}) => {

    const onClickHandler = () => {
        if (onClick) {
            onClick();
        }
    }

    return <div className={
        classNames(
            "h-[44px] px-5 pt-[10px] pb-3 rounded-[100px] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group",
            {
                "bg-white text-white hover:bg-primary": variant === 'primary',
                "bg-primary text-primary hover:bg-white": variant === 'secondary',
            },
            className
        )}
                onClick={onClickHandler}
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
    </div>
}