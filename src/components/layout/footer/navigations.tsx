import {PageDataType, SettingsType} from "@/types";
import {FC} from "react";

type Props = {
    pageData: PageDataType
}

export const Navigations: FC<Props> = ({pageData}) => {

    const getMenu = (name: string) => {
        return pageData.menus[name] ?? {items: []};
    }

    const getPageSettings = (name: keyof SettingsType) => {
        if (!pageData.settings) return '';
        return pageData.settings[name] ?? '';
    }

    return (<div className="w-full p-10 py-20 pb-9 relative bg-primary rounded-tr-[100px]">

        <div className="container max-w-[1266px] flex flex-col justify-between mx-auto gap-10 lg:flex-row">

            <div className="flex flex-col gap-6 lg:w-1/2">
                <div className="left-0">
                    <img src={getPageSettings('logo')} alt={getPageSettings('logoAltText')} className="min-w-[164px]"/>
                </div>

                <div className="max-w-[409px] text-white text-base font-normal font-['Inter'] leading-snug" dangerouslySetInnerHTML={{__html: getPageSettings('companySummary')}} / >

                <div>
                    <a href={`tel:${getPageSettings('companyPhone')}`} className="text-white text-base font-bold font-['Inter'] leading-[25px] tracking-wide ls-07 mb-2">{getPageSettings('companyPhone')}</a>
                    <div className="text-white text-xs font-normal font-['Inter'] leading-[15px]">{getPageSettings('companyAddress')}</div>

                    <div className="relative flex gap-5 mt-5 items-center">
                        <a href="#" className="left-0 top-[1px] text-white text-base font-normal font-['Inter'] leading-snug">US</a>
                        <span className="block h-[27px] w-[1px] bg-white"></span>
                        <a href="#" className="left-[58px] top-[1px] text-white text-base font-normal font-['Inter'] leading-snug">CA</a>
                        <span className="block h-[27px] w-[1px] bg-white"></span>
                        <a href="#" className="left-[116px] top-[1px] text-white text-base font-normal font-['Inter'] leading-snug">UK</a>
                    </div>
                </div>
            </div>

           <div className="lg:w-1/2">
               <div className="flex flex-col gap-10 lg:flex-row w-full mb-25">
                   <div className="w-[175px] left-[645.53px] top-0 flex-col justify-start items-start gap-5 inline-flex">
                       <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">Company
                       </div>
                       {getMenu('company').items.map((item, index) => (
                           <a key={index} href={item.url} className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">{item.title}</a>
                       ))}

                   </div>
                   <div className="w-48 left-[1073.53px] top-0 flex-col justify-start items-start gap-5 inline-flex">
                       <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">
                           Support
                       </div>
                       {getMenu('support').items.map((item, index) => (
                           <a key={index} href={item.url} className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">{item.title}</a>
                       ))}

                   </div>
                   <div className="w-[195px] left-[861.53px] top-0 flex-col justify-start items-start gap-5 inline-flex">
                       <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">
                           Resources
                       </div>
                       {getMenu('resources').items.map((item, index) => (
                           <a key={index} href={item.url} className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">{item.title}</a>
                       ))}
                   </div>
               </div>

               <div className="hidden lg:block">
                   <div className="text-white text-xs font-normal font-['Inter'] leading-[15px]">
                       <p className="mb-3" dangerouslySetInnerHTML={{__html: getPageSettings('copyrightText').replace('©', '<br /><br />©')}} />
                   </div>

                   <div className="flex gap-3 mt-7 items-center">
                       <a href="#" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Legal</a>
                       <span className="block h-[17px] w-[1px] bg-white"></span>
                       <a href="#" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Privacy Policy</a>
                       <span className="block h-[17px] w-[1px] bg-white"></span>
                       <a href="#" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">GDPR</a>
                       <span className="block h-[17px] w-[1px] bg-white"></span>
                       <a href="#" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Subscription Agreement</a>
                   </div>
               </div>
           </div>

        </div>
    </div>)
}