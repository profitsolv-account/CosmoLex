import {get} from "lodash";
import {PageDataType} from "@/types";
import {FC} from "react";

type Props = {
    pageData: PageDataType;
}

export const PageHeader:FC<Props> = ({pageData}) => {

    const title = get(pageData, 'title', 'eee');
    const description  = get(pageData, 'description', 'nee');

    return (
        <div className="p-4 bg-primary md:pt-14">
            <div className="container flex flex-col justify-center items-center gap-4">
                <div className="text-center max-w-[700px]">
                    <div className="pt-6 mb-3">
                        <h1 className="home-title text-white text-[46px] font-medium font-['Inter'] leading-[54px] lg:text-[54px] xl:text-[60px] xl:leading-[60px] xl:font-normal lg:block" dangerouslySetInnerHTML={{__html: title}} />
                    </div>
                    <div className="min-h-[61px] text-center text-white text-xl font-normal font-['Inter'] leading-loose lg:w-full" dangerouslySetInnerHTML={{__html: description}} />
                </div>
            </div>
        </div>
    )
}