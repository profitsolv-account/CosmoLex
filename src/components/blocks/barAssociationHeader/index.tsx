import {get} from "lodash";
import classNames from "classnames";
import {PageDataType} from "@/types";
import {ReactNode} from "react";
import Image from 'next/image';

type Props = {
    pageData: PageDataType;
    className?: string;
    rightSideContent: ReactNode
}

export const BarAssociationHeader = ({pageData, className, rightSideContent}:Props) => {

    const title = get(pageData, 'title', '');
    const content = get(pageData, 'content', '');
    const heroImage = get(pageData, 'heroImage', null);

    return <div className={classNames("pt-10 relative mb-25", className)}>
        <div className="px-5 mx-auto max-w-[76.125rem] justify-center items-center grid md:grid-cols-2 gap-2 lg:items-start relative z-2 lg:flex-row lg:gap-14">
            <div className="lg:pt-[2.5rem]">
                <div className="pt-6 mb-6">
                    <div className="flex justify-center md:pl-10 md:pt-13">
                        {heroImage && (
                            <Image
                                src={heroImage.node.sourceUrl}
                                alt={heroImage.node.altText}
                                width={200}
                                height={200}
                                className="mb-10"
                            />
                        )}
                    </div>

                    <h1 className="text-left home-title text-white text-[2.875rem] font-medium leading-[2.875rem] md:text-[3.25rem] md:leading-[3.25rem] md:font-normal lg:block"
                        dangerouslySetInnerHTML={{__html: title || ''}}
                    />
                    <div className="text-white p-4 sm:p-0 text-base md:text-lg lg:text-md mt-8"
                     dangerouslySetInnerHTML={{__html: pageData.content || ''}}
                    />
                </div>

            </div>
            <div className="flex justify-center md:pl-10 md:pt-13 relative top-10">
                {rightSideContent}
            </div>
        </div>

        <div className="bg-primary absolute z-0 w-full h-full left-0 rounded-bl-[6.25rem] bottom-[0rem]"/>
    </div>
}