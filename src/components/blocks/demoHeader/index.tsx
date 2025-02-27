import {get} from "lodash";
import {PageDataType} from "@/types";
import {FC} from "react";
import {Rating} from "@/components/common/rating";

type Props = {
    pageData: PageDataType;
}

export const DemoHeader:FC<Props> = ({pageData}) => {

    const title = get(pageData, 'title', 'eee');
    const description  = get(pageData, 'description', 'nee');

    return (
        <div className="p-4 bg-primary min-h-[400px] mb-[200px]">
            <div className="container flex flex-col justify-center items-center">
                <div className="text-center max-w-[800px]">
                    <div className="pt-6">
                        <div className="home-title text-white text-[46px] font-medium font-['Inter'] leading-[54px] lg:text-[54px] xl:text-[74px] xl:leading-[80px] xl:font-normal lg:block" dangerouslySetInnerHTML={{__html: title}} />
                    </div>
                    <div className="w-[324px] min-h-[61px] text-white text-lg font-normal font-['Inter'] leading-loose lg:w-full" dangerouslySetInnerHTML={{__html: description}} />
                </div>
                <Rating />
            </div>
        </div>
    )
}