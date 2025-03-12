import {FC} from "react";
import classNames from "classnames";

type Props = {
    title: string;
    details: string;
    label: string;
    type: 'info' | 'warning';
    className?: string;
}

export const InfoBlock:FC<Props> = ({title, details, label, type, className}) => {

    return <div className={classNames("px-[28px]", className)}>

        <div className="flex justify-center mb-5">
            <div className={classNames("px-5 py-0.5 rounded-[10px] inline-flex justify-center items-center", {
                'bg-green': type === 'info',
                'bg-salmon': type === 'warning'
            })}>
            <span className="text-center justify-start text-primary-dark text-sm font-medium leading-relaxed">
                {label}
            </span>
            </div>
        </div>

        <div className="text-center justify-start">
            <div className="text-[#151c2d] text-[22px] font-semibold leading-[26px] mb-1">{title}</div>
            <div className="text-[#151c2d] text-base font-normal leading-relaxed">{details}</div>
        </div>
    </div>
}