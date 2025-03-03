import {CollapsedSection} from "@/components/ui/collapsedSection";

type FaqType = {
    question: string;
    answer: string;
}

const faqs: FaqType[] = [{
    question: 'What is law firm accounting?',
    answer: 'Law firm accounting refers to the specialized accounting processes used to manage the financial activities of a law firm. It involves tracking and organizing the firm’s finances, ensuring compliance with legal and regulatory requirements, and providing accurate financial reporting to partners, managers, and stakeholders.'
}, {
    question: 'What is the difference between law firm accounting and trust accounting?',
    answer: 'Lorem ipsum dollar sit amet'
}];

export const Faq = () => {
    return (
        <div className="bg-white px-2 relative pt-[115px] rounded-tr-[50px] md:rounded-tr-[100px]">
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
                                <div className="opacity-80 text-primary-dark text-base font-normal leading-7 pt-5">
                                    {faq.answer}
                                </div>
                            </CollapsedSection>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}