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
            <div className="bg-primary absolute z-0 w-full h-[160px] left-0 rounded-bl-[100px] top-0"/>
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
    return <div className="max-w-[437px] relative bg-white rounded-[15px] shadow-[0px_21px_30px_0px_rgba(0,0,0,0.05)] overflow-hidden md:rounded-[30px]">
        <div className={classNames("bg-green rounded-[15px] p-[30px] pt-5 md:rounded-[30px]", {
            "bg-salmon": price.type === "elite",
            "bg-green ": price.type === "standard",
        })}>
            <div className="items-center gap-2.5 inline-flex w-full justify-between">
                <div className="text-primary-dark text-[26px] font-bold font-['Inter'] leading-loose">{priceName}</div>
                {price.type === "elite" &&
                    <div className="w-[140px] h-8 py-2.5 bg-white rounded-[100px] justify-center items-center gap-2.5 inline-flex text-center text-[#0c193a] text-base font-semibold font-['Inter'] leading-normal">Most Popular</div>
                }
            </div>
            <div className="justify-start items-end gap-[5px] inline-flex mb-6">
                <div className="text-primary-dark text-[38px] font-bold font-['Inter'] leading-[48px] mr-2">${price.price}</div>
                <div className="text-primary-dark text-xl font-normal font-['Inter'] leading-normal"> per user/month</div>
            </div>
            <a href="" className="block text-white text-center text-lg font-normal bg-primary-dark rounded-[100px] border border-primary-dark py-3.5 justify-center items-center gap-2.5 transition duration-300 hover:bg-transparent hover:text-primary-dark">
                Try for free
            </a>
        </div>

        <div className="bg-white rounded-[15px] p-[30px] pt-5 md:rounded-[30px]">
            <div className="text-primary-dark text-xl font-normal font-['Inter'] leading-normal mb-4">
                {desc[price.type]}
            </div>

            <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                {
                    price.features.map((feature) => (
                        <div className="self-stretch justify-start items-center gap-3 inline-flex" key={feature}>
                            <CheckIcon className="w-[30px] flex-none" />
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

