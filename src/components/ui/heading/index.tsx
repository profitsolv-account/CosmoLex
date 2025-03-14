import {FC, ReactNode} from "react";
import classNames from "classnames";

type Props = {
    children: ReactNode;
    className?: string;
}
export const Heading:FC<Props> = ({children, className}) => {
    return <h3 className={classNames("text-center text-primary-dark text-4xl font-bold leading-[3rem] px-10 mb-9 md:max-w-[37.5rem] md:mx-auto md:text-[2.875rem] md:mb-16 md:leading-[3.75rem]", className)}>
        {children}
    </h3>
}