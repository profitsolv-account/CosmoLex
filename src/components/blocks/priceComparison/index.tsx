import {Heading} from "@/components/ui/heading";
import {CollapsedSection} from "@/components/ui/collapsedSection";
import "./styles.css";
import {PricingPlan, SettingsType} from "@/types";
import {FC} from "react";

type Props = {
    settings: SettingsType;
    plans: PricingPlan[];
}

export const PriceComparison: FC<Props> = ({settings, plans}) => {

    return <div className="pt-20 px-2 relative pb-10">
        <div className="max-w-[1124px] mx-auto relative z-10">
            <Heading>Get the right plan for your firm’s needs.</Heading>

            <div className="bg-green py-5 px-5 rounded-[15px] shadow-[0px_21px_30px_0px_rgba(0,0,0,0.05)] md:rounded-[30px] md:py-[30px] md:px-[29px]">

                <div className="justify-start items-center gap-2.5 inline-flex w-full">

                    <div className="w-[40%] text-primary-dark text-[18px] font-bold flex-none md:text-[28px] md:w-[60%]">Plans & pricing</div>

                    <div className="justify-start items-center gap-1 flex grow">

                        <div className="flex-col justify-start items-center inline-flex w-1/2">
                            <div className="self-stretch text-center text-primary-dark text-[18px] font-bold md:text-2xl">Standard</div>
                            <div className="text-primary-dark text-[23px] font-bold leading-[60px] md:text-[47px]">$99</div>
                            <div className="self-stretch text-center text-primary-dark text-base font-normal">/ Paid annualy</div>
                        </div>

                        <div className="flex-col justify-start items-center inline-flex w-1/2">
                            <div className="self-stretch text-center text-primary-dark text-[18px] font-bold md:text-2xl">Elite</div>
                            <div className="text-primary-dark text-[23px] font-bold leading-[60px] md:text-[47px]">$129</div>
                            <div className="self-stretch text-center text-primary-dark text-base font-normal">/ Paid annualy</div>
                        </div>

                    </div>
                </div>

                <div className="pt-10">
                    {plans.map(({groupName, content}) => (
                        <CollapsedSection
                            key={groupName}
                            title={
                                <div className="text-primary-dark text-[22px] font-bold py-4 md:text-2xl">
                                    {groupName}
                                </div>
                            }
                            className="px-[30px] py-[9px] bg-[#EDF9F0] rounded-[10px] mb-8"
                            open
                        >
                            <div className="w-full" dangerouslySetInnerHTML={{__html: content || ""}}/>
                        </CollapsedSection>

                    ))}

                   {/* <CollapsedSection title={
                        <div className="text-primary-dark text-2xl font-bold py-4">
                            Time & Billing
                        </div>
                    } className="px-[30px] py-[9px] bg-[#EDF9F0] rounded-[10px]">

                        <table className="w-full border-collapse">
                            <tbody>
                            <tr className="rounded-b-2xl highlighted-row">
                                <td className="p-1 w-[40%] md:w-[60%] md:p-4">
                                    <div className="text-[#323d42] text-[14px] font-normal pl-2 md:text-xl">Conflict Check</div>
                                </td>
                                <td className="p-4 text-center ">
                                    <div className="available-option md:!w-10 md:!h-10"></div>
                                </td>
                                <td className="p-4 text-center ">
                                    <div className="available-option md:!w-10 md:!h-10"></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </CollapsedSection>*/}
                </div>

                <div className="pt-5">
                    <div className="text-center text-primary-dark text-[28px] font-bold">Ready to dive deeper? Talk to our sales team</div>
                </div>
                <div className="flex gap-5  items-center flex-col sm:flex-row md:justify-center pt-10 mb-2">
                    <a href={settings["demoLink"] || ''} className="base-btn w-full md:px-7 hover:bg-primary-dark hover:text-white md:w-auto">Request demo</a>
                    <a href={settings["freeTrialLink"] || ''} className="base-btn w-full md:px-7 bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark md:w-auto">Try for free</a>
                </div>

            </div>

        </div>
        <div className="bg-primary absolute w-full h-[50%] left-0 bottom-0 rounded-tr-[50px] md:rounded-tr-[100px]" />
    </div>
}