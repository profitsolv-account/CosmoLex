import classNames from "classnames";
import {FC} from "react";

type Props = {
    title: string;
    description: string;
    className?: string;
}
export const Card: FC<Props> = ({title, className, description}) => {
    return <div className={classNames("max-w-[361px] min-h-[298px] relative rounded-[30px] overflow-hidden px-[51px] pt-[54px]", className)}>
        <div className="inline-flex flex-col justify-start items-center gap-3">
            <div className="self-stretch text-center justify-start text-primary-dark text-[32px] font-bold">{title}</div>
            <div className="self-stretch text-center justify-start text-primary-dark text-lg font-normal">{description}</div>
        </div>
    </div>
}