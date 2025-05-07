import classNames from "classnames";
import React, {FC, ReactNode} from "react";
import {CustomLink} from "@/components/ui/customLink";

type HeaderLonk = {
    link: string;
    title: string;
    className?: string;
    active?: boolean;
}

type Props = {
    className?: string;
    type?: string;
    title: ReactNode;
    actions?: HeaderLonk[];
    content?: ReactNode;
}

export const ResourcesHeader: FC<Props> = ({className, title, type, actions, content}) => {

    const hasContent = !!content;

    return <div className={classNames("relative mb-25 pb-5", className)}>
        <div className={classNames("pt-22 relative px-5", className, {
            "bg-primary": hasContent
        })}>

            <div className={classNames("text-center mx-auto max-w-[62rem] justify-start items-center gap-2 lg:items-start relative z-2 lg:flex-row lg:gap-14", {
                "pb-15": !hasContent,
            })}>

                <div className="justify-start text-green text-base font-normal uppercase tracking-wider mb-5">
                    {type}
                </div>
                <h1 className="home-title text-white text-[2.875rem] font-medium leading-[2.875rem] tracking-[2.2px] mb-10 md:leading-[100%] md:text-[3.75rem] md:font-normal lg:block"
                    style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                >
                    {title}
                </h1>

                {actions &&
                    <div className="flex flex-col justify-center relative gap-2.5 items-center md:flex-row">
                        {
                            actions.map((action, index) => (
                                <CustomLink
                                    key={index}
                                    href={action.link}
                                    className={classNames("rounded-full  bg-white text-primary-dark text-base font-medium px-7 py-2 border-1 border-white transition duration-300 hover:bg-transparent hover:text-white", {
                                        '!bg-transparent text-white': action.active,
                                    }, action.className)}
                                >
                                    {action.title}
                                </CustomLink>
                            ))
                        }
                    </div>
                }

            </div>

            {!hasContent && <div className="bg-primary absolute z-0 w-full h-full left-0 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] bottom-0"/>}
        </div>

        {content && <div className="pt-12 relative">
            <div className="relative z-5">
                {content}
            </div>
            <div className="bg-primary absolute z-0 w-full h-[80%] left-0 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] top-0"/>
        </div>}

    </div>

}