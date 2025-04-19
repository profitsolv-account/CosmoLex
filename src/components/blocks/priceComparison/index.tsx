import {Heading} from "@/components/ui/heading";
import {CollapsedSection} from "@/components/ui/collapsedSection";
import "./styles.css";
import {PricingPlan, SettingsType} from "@/types";
import {FC} from "react";
import {CustomLink} from "@/components/ui/customLink";

type Props = {
    settings?: SettingsType;
    plans: PricingPlan[];
    title?: string;
}

export const PriceComparison: FC<Props> = ({settings, plans, title}) => {

    return <div className="price-comparison pt-20 px-2 relative pb-10">
        <div className="max-w-[70.25rem] mx-auto relative z-10">
            <Heading>{title}</Heading>

            <div
                className="bg-green py-5 px-5 rounded-[0.9375rem] shadow-[0rem_1.3125rem_1.875rem_0rem_rgba(0,0,0,0.05)] md:rounded-[1.875rem] md:py-[1.875rem] md:px-[1.8125rem]">

                <div className="justify-start items-center gap-2.5 inline-flex w-full">

                    <div
                        className="w-[40%] text-primary-dark text-[1.125rem] font-bold flex-none md:text-[1.75rem] md:w-[60%]">Plans
                        & pricing
                    </div>

                    <div className="justify-start items-center gap-1 flex grow">

                        <div className="flex-col justify-start items-center inline-flex w-1/2">
                            <div
                                className="self-stretch text-center text-primary-dark text-[1.125rem] font-bold md:text-2xl">Standard
                            </div>
                            <div className="text-primary-dark text-[1.4375rem] font-bold leading-[3.75rem] md:text-[2.9375rem]">$99 <span className="text-[0.7rem] md:text-[1.3rem]">USD</span>
                            </div>
                            <div className="self-stretch text-center text-primary-dark text-base font-normal">/ per month
                            </div>
                        </div>

                        <div className="flex-col justify-start items-center inline-flex w-1/2">
                            <div
                                className="self-stretch text-center text-primary-dark text-[1.125rem] font-bold md:text-2xl">Elite
                            </div>
                            <div
                                className="text-primary-dark text-[1.4375rem] font-bold leading-[3.75rem] md:text-[2.9375rem]">$129 <span className="text-[0.7rem] md:text-[1.3rem]">USD</span>
                            </div>
                            <div className="self-stretch text-center text-primary-dark text-base font-normal">/ per month
                            </div>
                        </div>

                    </div>
                </div>

                <div className="pt-10">
                    {plans.map(({groupName, content}, index) => (
                        <CollapsedSection
                            key={groupName}
                            title={
                                <div key={index} className="text-primary-dark text-[1.375rem] font-bold py-4 md:text-2xl">
                                    {groupName}
                                </div>
                            }
                            className="px-[1.875rem] py-[0.5625rem] bg-[#EDF9F0] rounded-[0.625rem] mb-8"
                            open={index === 0}
                        >
                            <div className="w-full" dangerouslySetInnerHTML={{__html: content || ""}}/>
                        </CollapsedSection>

                    ))}
                </div>

                <div className="pt-5">
                    <div className="text-center text-primary-dark text-[1.75rem] font-bold">Ready to dive deeper?</div>
                </div>
                <div className="flex gap-5  items-center flex-col sm:flex-row md:justify-center pt-10 mb-2">
                    <CustomLink href={settings?.demoLink || ''}
                       className="base-btn w-full md:px-7 hover:bg-primary-dark hover:text-white md:w-auto">Request
                        demo</CustomLink>
                    <CustomLink href={settings?.freeTrialLink || ''}
                       className="base-btn w-full md:px-7 bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark md:w-auto">Try
                        for free</CustomLink>
                </div>

            </div>
            <span className="md:!w-10 md:!h-10"></span>
            <span className="text-[#323d42] text-[0.875rem] font-normal pl-2 md:text-xl text-[#323d42] text-sm font-normal block"/>
        </div>
    </div>
}