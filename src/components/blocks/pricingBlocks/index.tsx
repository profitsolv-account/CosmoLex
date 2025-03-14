import {Checkbox} from "@/components/ui/checkbox";
import CheckIcon from "@/assets/img/icons/price-check.svg";
import {FC} from "react";
import classNames from "classnames";

type PriceType = {
    type: 'standard' | 'elite';
    price: number;
    pricePer: string;
    features: string[];
}

const prices: PriceType[] = [{
    type: "standard",
    price: 99,
    pricePer: "per user/month",
    features: [
        "Full Practice Management Tools",
        "Custom Dashboards and Reports",
        "Client Portal",
        "Time & Billing",
        "Secure Document Sharing/eSignatures",
        "Legal Accounting",
        "Integration with Outlook, Office 365, Google Calendar & More"
    ]
}, {
    type: "elite",
    price: 129,
    pricePer: "per user/month",
    features: [
        "Everything in Standard",
        "Kanban Project Management",
        "Matter Workflows and Automation",
        "Matter Template Tasks, Events, Custom Fields",
        "Matter Budgets"
    ]
}];

export const PricingBlocks = () => {
    return <div>
        <div className="bg-primary flex justify-center gap-4">
            <div className="text-center text-white text-2xl font-medium font-['Inter']">Annual</div>
            <Checkbox />
            <div className="text-white text-2xl font-medium font-['Inter']">Monthly</div>
        </div>

        <div className="relative pt-10">
            <div className="flex flex-col items-center justify-center gap-5 relative z-10 md:flex-row md:items-stretch">
                {prices.map((p) => (<Price key={p.type} price={p} />))}
            </div>
            <div className="bg-primary absolute z-0 w-full h-[10rem] left-0 rounded-bl-[6.25rem] top-0"/>
        </div>

    </div>
}

type PriceProps = {
    price: PriceType;
}
const Price: FC<PriceProps> = ({price}) => {

    const priceName = price.type === "standard" ? "Standard" : "Elite";

    const desc = {
        "standard": <> Our <span className="font-bold">Standard</span> End-to-End Solution:</>,
        "elite": <>With <span className="font-bold">Elite</span> you get everything in Standard, plus:</>
    }
    return <div className="max-w-[27.3125rem] relative bg-white rounded-[0.9375rem] shadow-[0rem_1.3125rem_1.875rem_0rem_rgba(0,0,0,0.05)] overflow-hidden md:rounded-[1.875rem]">
        <div className={classNames("bg-green rounded-[0.9375rem] p-[1.875rem] pt-5 md:rounded-[1.875rem]", {
            "bg-salmon": price.type === "elite",
            "bg-green ": price.type === "standard",
        })}>
            <div className="items-center gap-2.5 inline-flex w-full justify-between">
                <div className="text-primary-dark text-[1.625rem] font-bold font-['Inter'] leading-loose">{priceName}</div>
                {price.type === "elite" &&
                    <div className="w-[8.75rem] h-8 py-2.5 bg-white rounded-[6.25rem] justify-center items-center gap-2.5 inline-flex text-center text-[#0c193a] text-base font-semibold font-['Inter'] leading-normal">Most Popular</div>
                }
            </div>
            <div className="justify-start items-end gap-[0.3125rem] inline-flex mb-6">
                <div className="text-primary-dark text-[2.375rem] font-bold font-['Inter'] leading-[3rem] mr-2">${price.price}</div>
                <div className="text-primary-dark text-xl font-normal font-['Inter'] leading-normal"> per user/month</div>
            </div>
            <a href="" className="block text-white text-center text-lg font-normal bg-primary-dark rounded-[6.25rem] border border-primary-dark py-3.5 justify-center items-center gap-2.5 transition duration-300 hover:bg-transparent hover:text-primary-dark">
                Try for free
            </a>
        </div>

        <div className="bg-white rounded-[0.9375rem] p-[1.875rem] pt-5 md:rounded-[1.875rem]">
            <div className="text-primary-dark text-xl font-normal font-['Inter'] leading-normal mb-4">
                {desc[price.type]}
            </div>

            <div className="flex-col justify-start items-start gap-[1.125rem] inline-flex">
                {
                    price.features.map((feature) => (
                        <div className="self-stretch justify-start items-center gap-3 inline-flex" key={feature}>
                            <CheckIcon className="w-[1.875rem] flex-none" />
                            <div className="text-primary-dark text-base font-normal font-['Inter'] leading-normal">
                                {feature}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    </div>
}

