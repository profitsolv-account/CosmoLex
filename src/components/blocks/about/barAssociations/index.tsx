import {BarType} from "@/types/about";
import {FC} from "react";

type Props = {
    data?: BarType;
}

export const BarAssociations: FC<Props> = ({data}) => {

    if (!data) return null;

    return <div className="px-2">
       <div className="max-w-[70.9375rem] mx-auto">

           <h3 className="self-stretch text-center justify-start text-[#202b46] text-[2.875rem] font-bold leading-[3.4375rem] max-w-[43.5625rem] mx-auto mb-10">{data.barTitle}</h3>
           <p className="text-center justify-start text-[#0c193a] text-base font-normal leading-[1.875rem] max-w-[37.3125rem] mx-auto">{data.barDescription}</p>

           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pt-10 md:pl-10">
               {data.barItems.map((company) => (
                   <a
                       href={company.url.url}
                       key={company.url.url}
                       target="_blank"
                       rel="noreferrer"
                       className="flex items-center justify-center p-5 cursor-pointer mb-15">
                       <div style={{
                           width: company.image.node.mediaDetails.width,
                           height: company.image.node.mediaDetails.height,
                           background: `url(${company.image.node.sourceUrl}) #eef8fd 50% / contain no-repeat`,
                           backgroundBlendMode: 'multiply',
                       }}/>
                   </a>
               ))}
           </div>
       </div>
    </div>
}