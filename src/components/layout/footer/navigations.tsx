import {PageDataType, SettingsType} from "@/types";
import Image from "next/image";
import {FC} from "react";
import {CustomLink} from "@/components/ui/customLink";

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

    const currentYear = String(new Date().getFullYear());
    return (<>
        <div className="w-full p-10 py-20 pb-9 relative bg-primary rounded-tr-[6.25rem]">

            <div className="container max-w-[79.125rem] flex flex-col justify-between mx-auto gap-10 lg:flex-row">

                <div className="flex flex-col gap-6 lg:w-1/2">
                    <div className="left-0">
                        <Image
                            src={getPageSettings('logo')}
                            alt={getPageSettings('logoAltText')}
                            unoptimized
                            width={163}
                            height={40}
                        />
                    </div>

                    <div className="max-w-[25.5625rem] text-white text-base font-normal font-['Inter'] leading-snug" dangerouslySetInnerHTML={{__html: getPageSettings('companySummary')}} />

                        <div>
                            <CustomLink href={`tel:${getPageSettings('companyPhone')}`} className="text-white text-base font-bold font-['Inter'] leading-[1.5625rem] tracking-wide ls-07 mb-2">{getPageSettings('companyPhone')}</CustomLink>
                            <div className="text-white text-xs font-normal font-['Inter'] leading-[0.9375rem]">{getPageSettings('companyAddress')}</div>

                            <div className="relative flex gap-5 mt-5 items-center">
                                <CustomLink href="https://www.cosmolex.com/" className="left-0 top-[0.0625rem] text-white text-base font-normal font-['Inter'] leading-snug">US</CustomLink>
                                <span className="block h-[1.6875rem] w-[0.0625rem] bg-white"></span>
                                <CustomLink href="https://www.cosmolex.ca/" className="left-[3.625rem] top-[0.0625rem] text-white text-base font-normal font-['Inter'] leading-snug">CA</CustomLink>
                                <span className="block h-[1.6875rem] w-[0.0625rem] bg-white"></span>
                                <CustomLink href="https://www.cosmolex.co.uk/" className="left-[7.25rem] top-[0.0625rem] text-white text-base font-normal font-['Inter'] leading-snug">UK</CustomLink>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="flex flex-col gap-10 lg:flex-row w-full mb-25">
                            <div className="w-[10.9375rem] left-[40.3456rem] top-0 flex-col justify-start items-start gap-5 inline-flex">
                                <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">Company
                                </div>
                                {getMenu('company').items.map((item, index) => (
                                    <CustomLink key={index} href={item.url} className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">{item.title}</CustomLink>
                                ))}

                            </div>
                            <div className="w-48 left-[67.0956rem] top-0 flex-col justify-start items-start gap-5 inline-flex">
                                <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">
                                    Support
                                </div>
                                {getMenu('support').items.map((item, index) => (
                                    <CustomLink key={index} href={item.url} className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">{item.title}</CustomLink>
                                ))}

                            </div>
                            <div className="w-[12.1875rem] left-[53.8456rem] top-0 flex-col justify-start items-start gap-5 inline-flex">
                                <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">
                                    Resources
                                </div>
                                {getMenu('resources').items.map((item, index) => (
                                    <CustomLink key={index} href={item.url} className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">{item.title}</CustomLink>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container max-w-[79.125rem] flex flex-col justify-between mx-auto gap-10 lg:flex-row">
                    <div className="block">
                        <div className="text-white text-xs font-normal font-['Inter'] leading-[0.9375rem]">
                            <p className="mb-3" dangerouslySetInnerHTML={{__html: getPageSettings('copyrightText').replace('©', '<br /><br />©').replace('{{year}}', currentYear)}} />
                        </div>

                        <div className="flex gap-3 mt-7 items-center">
                            <CustomLink href="/legal" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Legal</CustomLink>
                            <span className="block h-[1.0625rem] w-[0.0625rem] bg-white"></span>
                            <CustomLink href="/privacy-policy" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Privacy Policy</CustomLink>
                            <span className="block h-[1.0625rem] w-[0.0625rem] bg-white"></span>
                            <CustomLink href="/gdpr" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">GDPR</CustomLink>
                            <span className="block h-[1.0625rem] w-[0.0625rem] bg-white"></span>
                            <CustomLink href="/subscription-agreement" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Subscription Agreement</CustomLink>
                            <span className="block h-[1.0625rem] w-[0.0625rem] bg-white"></span>
                            <CustomLink href="https://profitsolv-billingplatform.azurewebsites.net/ForgetMeHub/index.html?businessUnit=CosmoLex" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Data Request</CustomLink>
                        </div>
                    </div>
                </div>

            </div>
        </>)
        }