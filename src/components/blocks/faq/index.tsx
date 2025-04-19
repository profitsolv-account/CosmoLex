import {CollapsedSection} from "@/components/ui/collapsedSection";
import {FaqType} from "@/types";
import {FC} from "react";
import classNames from "classnames";
import './styles.css';

type Props = {
    className?: string;
    faqs: FaqType[];
}

export const Faq: FC<Props> = ({className, faqs}) => {
    return (
        <div className={classNames("FAQ-section bg-white px-2 relative pt-[7.1875rem] ", className)}>
            <div className="max-w-[72.8125rem] mx-auto relative z-10 flex flex-col gap-5 px-2 md:flex-row md:gap-[4.5rem]">
                <div className="text-primary-dark text-[2.875rem] font-bold leading-[3.75rem] md:flex-none md:w-[19.25rem] ">Frequently asked questions.</div>
                <div className="grow">
                    <div className="flex flex-col gap-5">
                        {faqs.map((faq, index) => (
                            <CollapsedSection
                                key={index}
                                title={
                                    <div key={index} className="text-primary-dark text-2xl font-medium leading-10 pr-20">{faq.question}</div>
                                }
                                className="py-[0.5625rem] mb-8 border-b border-b-[#202b46]/20 pb-8"
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