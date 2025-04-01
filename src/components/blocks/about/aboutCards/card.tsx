import classNames from "classnames";
import {FC} from "react";

type Props = {
    title: string;
    description: string;
    className?: string;
}
export const Card: FC<Props> = ({title, className, description}) => {
    return <div className={classNames("max-w-[22.563rem] min-h-[21rem] relative rounded-[1.875rem] overflow-hidden px-[3.188rem] pt-[3.375rem] pb-4", className)}>
        <div className="inline-flex flex-col justify-start items-center gap-3">
            <div className="self-stretch text-center justify-start text-primary-dark text-[2rem] font-bold">{title}</div>
            <div className="self-stretch text-center justify-start text-primary-dark text-lg font-normal">{description}</div>
        </div>
    </div>
}