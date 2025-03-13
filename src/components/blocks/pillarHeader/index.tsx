import {get} from "lodash";
import classNames from "classnames";
import {PageDataType} from "@/types";
import {ReactNode} from "react";

type Props = {
    pageData: PageDataType;
    className?: string;
    rightSideContent: ReactNode
}

export const PillarHeader = ({pageData, className, rightSideContent}:Props) => {

    const title = get(pageData, 'title', '');
    const description  = get(pageData, 'description', '');
    const subheading = get(pageData, 'subheading', '');

    return <div className={classNames("pt-10 relative mb-25", className)}>
        <div className="px-5 mx-auto max-w-[1218px] justify-center items-center grid md:grid-cols-2 gap-2 relative z-2 lg:flex-row lg:gap-14">
            <div className="">

                {subheading &&
                    <div className="relative text-left justify-start text-green text-base font-normal uppercase tracking-wider">{subheading}</div>
                }
                <div className="pt-6 mb-6">
                    <h1 className="text-left home-title text-white text-[46px] font-medium leading-[46px] md:text-[52px] md:leading-[52px] md:font-normal lg:block"
                        dangerouslySetInnerHTML={{__html: title}}
                    />
                </div>

            </div>
            <div className="flex justify-center md:pl-10 md:pt-13 relative top-10">
                {rightSideContent}
            </div>
        </div>

        <div className="bg-primary absolute z-0 w-full h-full left-0 rounded-bl-[100px] bottom-[0px]"/>
    </div>
}