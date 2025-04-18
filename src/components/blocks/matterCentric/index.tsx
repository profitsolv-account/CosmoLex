import {SettingsType} from "@/types";
import {FC} from "react";
import Img from '@/assets/img/matter-centric.webp';
import {CustomLink} from "@/components/ui/customLink";

type Props = {
    setting: SettingsType
}

export const MatterCentric: FC<Props> = ({setting}) => {

    const options = [{
            title: 'Cloud & Browser-Based',
            value: '100',
            type: '%'
        },
        {
            title: 'Time Saved with Workflows' ,
            value: '50',
            type: '%'
        },
        {
            title: 'Reporting Options',
            value: '100',
            type: '+'
        }
    ];

    return <div className="px-4">
        <div className="max-w-[21.9375rem] mx-auto bg-green rounded-[1.875rem] pt-[2.6875rem] md:max-w-[66.5rem] md:pt-[4.6875rem] relative z-10">
            <div className="px-10 mb-4 md:max-w-[42.5rem] md:mx-auto md:mb-10">
                <h3 className="text-center text-primary-dark text-4xl font-bold font-['Inter'] leading-[3rem] mb-4 md:text-[2.875rem] md:leading-[3.5rem]">
                    Matter-centric by design.
                </h3>
                <p className="text-center text-primary-dark text-base font-normal font-['Inter'] leading-[1.875rem]">
                    The only fully built-in matter management and firm accounting solution for small and mid-sized law firms.
                </p>
            </div>
            <div className="px-5 mb-10 md:mb-15">
               <div className="flex gap-5  items-center flex-col sm:flex-row md:justify-center">
                   <CustomLink href={setting["demoLink"] || ''} className="base-btn hover:bg-primary-dark hover:text-white">Request demo</CustomLink>
                   <CustomLink href={setting["freeTrialLink"] || ''} className="base-btn bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark">Try for free</CustomLink>
               </div>
           </div>
            <div className="md:max-w-[43.125rem] md:mx-auto flex flex-col gap-8 md:flex-row md:gap-8 md:justify-center">
                {options.map((option, index) => {
                    return <div className="flex flex-col items-center gap-4 md:gap-2" key={index}>
                        <div className="w-[11.1056rem] h-[11.1056rem] bg-white/30 rounded-[6.25rem] shadow-[0rem_1.0625rem_3.75rem_-1.25rem_rgba(0,0,0,0.25)] flex items-center justify-center md:w-[7.5rem] md:h-[7.5rem]">
                            <div className="text-center text-primary-dark text-[4rem] font-bold font-['Inter'] leading-[0.625rem] flex items-center justify-center gap-0.5 md:text-[2.125rem] md:leading-[0.625rem]">
                                <span>{option.value}</span>
                                <span className="text-primary text-3xl font-medium font-['Inter'] md:text-[1.0625rem]">{option.type}</span>
                            </div>
                        </div>
                        <p>{option.title}</p>
                    </div>})
                }
            </div>
            <div className="pl-7 pt-12 md:px-19 md:pt-12">
                <div className="w-full h-[24.625rem] rounded-tl-[0.625rem] rounded-tr-[0.625rem] overflow-hidden flex items-end">
                    <img src={Img.src} alt="matter centric" className="w-full h-full object-cover md:object-contain relative top-0.5"/>
                </div>
            </div>
        </div>
    </div>
}