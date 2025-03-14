import classNames from "classnames";
import {FC} from "react";

type Props = {
    className?: string;
    compareWith: string;
    link: string;
}

export const CompareBlock:FC<Props> = ({className, compareWith, link}) => {

    return <div className={classNames("w-full max-w-[22.5625rem] min-h-72 bg-white rounded-[1.875rem] shadow-[0rem_1.3125rem_1.875rem_0rem_rgba(0,0,0,0.05)] py-8 px-8 md:w-[22.5625rem]", className)}>
        <div className="w-[4.375rem] h-[4.375rem] bg-[#eef8fd] rounded-full flex justify-center items-center uppercase text-[1.375rem] text-primary-dark mx-auto mb-2">
            VS
        </div>
        <div className="self-stretch text-center justify-start">
            <span className="text-primary-dark text-[2.375rem] font-normal">Cosmo</span>
            <span className="text-primary-dark text-[2.375rem] font-bold ">Lex</span>
        </div>
        <div className="text-center justify-start text-primary-dark text-2xl font-medium mb-5">{compareWith}</div>
        <div className="text-center">
            <a
                href={link}
                className={classNames(
                    "text-center justify-start text-primary-dark text-lg font-medium",
                    "border-b border-primary-dark"
                )}
            >
                Compare now
            </a>
        </div>
    </div>
}