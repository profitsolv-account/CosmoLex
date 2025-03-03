import {FC, ReactNode} from "react";
import classNames from "classnames";

type Props = {
    children: ReactNode;
    className?: string;
}
export const Heading:FC<Props> = ({children, className}) => {
    return <h3 className={classNames("text-center text-primary-dark text-4xl font-bold leading-[48px] px-10 mb-9 md:max-w-[600px] md:mx-auto md:text-[46px] md:mb-16 md:leading-[60px]", className)}>
        {children}
    </h3>
}