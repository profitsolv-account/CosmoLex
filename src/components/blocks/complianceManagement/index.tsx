import React, {Fragment} from "react";
import classNames from "classnames";
import bg from "@/assets/img/compliance/legal_billing_&_payments.webp";
import bg2 from "@/assets/img/compliance/firm_management.webp";
import bg4 from "@/assets/img/compliance/accounting_&_finance.webp";
import bg3 from "@/assets/img/compliance/client_engagement.webp";
import bg5 from "@/assets/img/simple-practice/demo-screen.webp";

import BalanceImg from '@/assets/img/compliance/balances-img.webp';
import {TabbedSlider} from "@/components/ui/tabbedSlider";

const dataSliders = [{
    title: "Client Engagement",
    description: "Grow your firm and elevate your client experience. Streamline intake, build a strong online presence, and securely manage documents.",
    image: bg3,
    link: "/features/client-engagement/",
    className: "bg-blue",
}, {
    title: "Firm Management",
    description: "Efficiently manage your practice. Track matters, pull reports, and keep your law firm productive. ",
    image: bg2,
    link: "/features/law-practice-management/",
    className: "bg-yellow",
},
    {
        title: "Legal Automation",
        description: "CosmoLex is designed to automate many of the time-consuming tasks that law firms traditionally handle manually, allowing them to save time, reduce errors, and improve overall efficiency.",
        image: bg5,
        link: "/features/legal-workflow-automation-software/",
        className: "bg-yellow",
    },
    {
    title: "Billing & Payments",
    description: "Improve your firm’s cash flow. Use our custom invoices to get paid faster in just a few clicks.",
    image: bg,
    link: "/features/legal-billing-software/",
    className: "bg-salmon",
}, {
    title: "Accounting & Finance",
    description: "Connect your firm to your finances. Manage your firm’s finances, stay compliant with built-in trust accounting, and generate real-time reports.",
    image: bg4,
    link: "/features/accounting-finance/",
    className: "bg-green",
}];

export const ComplianceManagement = () => {

    const items = dataSliders.map((t, index) => (
        <Fragment key={index}>
            <div className="h-full w-full flex flex-col-reverse justify-center lg:grid lg:grid-cols-2 overflow-hidden">
                <div
                    className="bg-yellow grow max-h-[17.5rem] rounded-br-[0.9375rem] rounded-bl-[0.9375rem] relative bg-cover bg-center overflow-hidden h-full lg:max-h-full lg:rounded-br-[0rem] lg:rounded-tl-[1.875rem] lg:rounded-bl-[1.875rem] lg:flex lg:items-center lg:justify-center right-[-1px]">
                    <img
                        src={t.image.src}
                        alt={t.title}
                        className={classNames("relative z-4", {
                            "object-cover w-full h-full aspect-square": t.title !== 'Legal Automation',
                            "object-contain max-w-[80%]": t.title === 'Legal Automation',
                        })}
                        width="426"
                        height="440"
                    />
                    <div className="absolute z-0 top-0 left-0 w-full h-full bg-white/30"></div>
                </div>
                <div
                    className={classNames("grow rounded-tl-[0.9375rem] rounded-tr-[0.9375rem] relative flex items-center justify-center px-9 py-9 pb-16 lg:rounded-br-[1.875rem] lg:rounded-tr-[1.875rem] lg:rounded-tl-[0rem] overflow-hidden", t.className)}>
                    <div className="lg:w-[27.625rem] flex-col justify-start items-start gap-5 inline-flex">
                        <div className=" text-primary-dark text-[2.25rem] font-bold leading-[2.8125rem] font-['Inter'] lg:leading-[3.4375rem] lg:text-[2.875rem]">{t.title}</div>
                        <div className="text-primary-dark text-base font-normal font-['Inter'] mb-2 leading-[1.875rem] max-w-[21.875rem] lg:mb-7">{t.description}</div>
                        <a href={t.link}
                           className="w-full block text-center lg:inline-block rounded-[6.25rem] bg-primary-dark justify-center items-center text-white text-base font-normal font-['Inter'] px-[1.875rem] py-[0.9375rem] lg:w-auto">
                            {t.title === 'Legal Automation' ? 'Be productive' : 'Explore features'}
                        </a>
                    </div>
                </div>
            </div>
        </Fragment>
    ))

    const tabs = [
        {title: "Client Engagement", id: "client-engagement"},
        {title: "Firm Management", id: "firm-management"},
        {title: "Legal Automation", id: "billing-payments"},
        {title: "Billing & Payments", id: "billing-payments"},
        {title: "Accounting & Finance", id: "accounting-finance"},
    ]

    return <>
        <div className="relative">
            <TabbedSlider
                subheading="COMPREHENSIVE LEGAL PRACTICE SOFTWARE"
                heading="Streamline your legal workflow with our comprehensive legal practice software."
                tabs={tabs}
                items={items}
            />
            <div className="absolute w-full  bg-primary z-0 h-[25rem] bottom-0 rounded-tr-[3.125rem] md:rounded-tr-[6.25rem]" />
        </div>

        <AccountingTools />
    </>
}

const AccountingTools = () => {

    return (<div className="flex justify-center items-center pb-20 md:py-5 relative md:pb-[12.5rem]">
            <div className="flex-none w-full px-2 flex flex-col max-w-[21.875rem] md:flex-row md:max-w-[65.375rem] md:items-start relative z-20">

                <div className="md:w-1/2  md:flex-none md:pb-18 md:pr-20">
                    <div className="text-yellow text-[0.9375rem] tracking-[0.075rem] font-normal font-['Inter'] uppercase mb-3 md:text-base md:tracking-[0.0788rem] md:mb-4">Compliance management simplified</div>
                    <h3 className="text-white text-4xl font-bold font-['Inter'] leading-[3.125rem] mb-5 md:text-[2.875rem] md:leading-[3.4375rem] md:w-full md:mb-8">Keep your firm compliant with built-in accounting tools.</h3>
                    <a
                        href="/features/accounting-finance/"
                        className="flex items-center justify-center text-center h-[3.375rem] px-[1.875rem] bg-white rounded-[6.25rem] border text-primary-dark text-base font-normal font-['Inter'] transition duration-300 hover:bg-primary-dark hover:text-white md:inline-flex">
                        Learn more
                    </a>
                </div>

                <div className="md:w-1/2 relative md:top-[-1.25rem]">
                    <img
                        src={BalanceImg.src}
                        alt="balance image"
                        width="412"
                        height="320"
                    />
                </div>
            </div>

            <div className="absolute w-full h-full left-0 bg-primary z-0 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] top-[-20%]" />

        </div>
    )}
