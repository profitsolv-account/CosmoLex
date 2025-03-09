import {CollapsedSection} from "@/components/ui/collapsedSection";
import {FaqType} from "@/types";
import {FC} from "react";
import classNames from "classnames";

type Props = {
    className?: string;
    faqs: FaqType[];
}

export const Faq: FC<Props> = ({className, faqs}) => {
    return (
        <div className={classNames("bg-white px-2 relative pt-[115px] rounded-tr-[50px] md:rounded-tr-[100px]", className)}>
            <div className="max-w-[1165px] mx-auto relative z-10 flex flex-col gap-5 px-2 md:flex-row md:gap-[72px]">
                <div className="text-primary-dark text-[46px] font-bold leading-[60px] md:flex-none md:w-[308px] ">Frequently asked questions.</div>
                <div className="grow">
                    <div className="flex flex-col gap-5">
                        {faqs.map((faq, index) => (
                            <CollapsedSection
                                key={index}
                                title={
                                    <div className="text-primary-dark text-2xl font-medium leading-10 pr-20">{faq.question}</div>
                                }
                                className="py-[9px] mb-8 border-b border-b-[#202b46]/20 pb-8"
                                open={index === 0}
                            >
                                <div className="opacity-80 text-primary-dark text-base font-normal leading-7 pt-5" dangerouslySetInnerHTML={{__html: faq.answer || ''}}/>
                            </CollapsedSection>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}