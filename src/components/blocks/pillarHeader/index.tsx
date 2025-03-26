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
    const subheading = get(pageData, 'subheading', '');
    const description  = get(pageData, 'description', '');

    return <div className={classNames("pt-10 relative mb-25", className)}>
        <div className="px-5 mx-auto max-w-[76.125rem] justify-center items-center grid md:grid-cols-2 gap-2 lg:items-start relative z-2 lg:flex-row lg:gap-14">
            <div className="lg:pt-[12.5rem]">

                {subheading &&
                    <div className="relative text-left justify-start text-green text-base font-normal uppercase tracking-wider">{subheading}</div>
                }
                <div className="pt-6 mb-6">
                    <h1 className="text-left home-title text-white text-[2.875rem] font-medium leading-[2.875rem] md:text-[3.25rem] md:leading-[3.25rem] md:font-normal lg:block"
                        dangerouslySetInnerHTML={{__html: title}}
                    />
                </div>
                {description &&
                    <div className="min-h-[3.8125rem] text-left text-white text-xl font-normal leading-loose lg:w-full mb-8" dangerouslySetInnerHTML={{__html: description}}
                     />
                }
    

            </div>
            <div className="flex justify-center md:pl-10 md:pt-13 relative top-10">
                {rightSideContent}
            </div>
        </div>

        <div className="bg-primary absolute z-0 w-full h-full left-0 rounded-bl-[6.25rem] bottom-[0rem]"/>
    </div>
}