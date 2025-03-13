import React, {Fragment} from "react";
import classNames from "classnames";
import bg from "@/assets/img/compliance/legal_billing_&_payments.webp";
import bg2 from "@/assets/img/compliance/firm_management.webp";
import bg4 from "@/assets/img/compliance/accounting_&_finance.webp";
import bg3 from "@/assets/img/compliance/client_engagement.webp";

import BalanceImg from '@/assets/img/compliance/balances-img.webp';
import {TabbedSlider} from "@/components/ui/tabbedSlider";

const dataSliders = [{
    title: "Client Engagement",
    description: "Grow your firm and elevate your client experience. Streamline intake, build a strong online presence, and securely manage documents.",
    image: bg3,
    link: "/",
    className: "bg-blue",
}, {
    title: "Firm Management",
    description: "Efficiently manage your practice. Track matters, pull reports, and keep your law firm productive. ",
    image: bg2,
    link: "/",
    className: "bg-yellow",
}, {
    title: "Billing & Payments",
    description: "Improve your firm’s cash flow. Use our custom invoices to get paid faster in just a few clicks.",
    image: bg,
    link: "/",
    className: "bg-salmon",
}, {
    title: "Accounting & Finance",
    description: "Connect your firm to your finances. Manage your firm’s finances, stay compliant with built-in trust accounting, and generate real-time reports.",
    image: bg4,
    link: "/",
    className: "bg-green",
}];

export const ComplianceManagement = () => {

    const items = [...dataSliders, ...dataSliders].map((t, index) => (
        <Fragment key={index}>
            <div className="h-full w-full flex flex-col-reverse justify-center lg:grid lg:grid-cols-2 overflow-hidden">
                <div className="grow max-h-[280px] rounded-br-[15px] rounded-bl-[15px] relative bg-cover bg-center overflow-hidden h-full lg:max-h-full lg:rounded-br-[0px] lg:rounded-tl-[30px] lg:rounded-bl-[30px] lg:flex lg:items-center lg:justify-center">
                    <img
                        src={t.image.src}
                        alt={t.title}
                        className="object-cover w-full h-full aspect-square"
                    />
                </div>
                <div className={classNames("grow rounded-tl-[15px] rounded-tr-[15px] relative flex items-center justify-center px-9 py-9 pb-16 lg:rounded-br-[30px] lg:rounded-tr-[30px] lg:rounded-tl-[0px] overflow-hidden", t.className)}>
                    <div className="lg:w-[442px] flex-col justify-start items-start gap-5 inline-flex">
                        <div className=" text-primary-dark text-[36px] font-bold leading-[45px] font-['Inter'] lg:leading-[55px] lg:text-[46px]">{t.title}</div>
                        <div className="text-primary-dark text-base font-normal font-['Inter'] mb-2 leading-[30px] max-w-[350px] lg:mb-7">{t.description}</div>
                        <a href={t.link}
                           className="w-full block text-center lg:inline-block rounded-[100px] bg-primary-dark justify-center items-center text-white text-base font-normal font-['Inter'] px-[30px] py-[15px] lg:w-auto">
                            Explore features
                        </a>
                    </div>
                </div>
            </div>
        </Fragment>
    ))

    const tabs = [
        {title: "Client Engagement", id: "client-engagement"},
        {title: "Firm Management", id: "firm-management"},
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
            <div className="absolute w-full  bg-primary z-0 h-[400px] bottom-0 rounded-tr-[50px] md:rounded-tr-[100px]" />
        </div>

        <AccountingTools />
    </>
}

const AccountingTools = () => {

    return (<div className="flex justify-center items-center pb-20 md:py-5 relative md:pb-[200px]">
            <div className="flex-none w-full px-2 flex flex-col max-w-[350px] md:flex-row md:max-w-[1046px] md:items-start relative z-20">

                <div className="md:w-1/2  md:flex-none md:pb-18 md:pr-20">
                    <div className="text-yellow text-[15px] tracking-[1.2px] font-normal font-['Inter'] uppercase mb-3 md:text-base md:tracking-[1.26px] md:mb-4">Compliance management simplified</div>
                    <h3 className="text-white text-4xl font-bold font-['Inter'] leading-[50px] mb-5 md:text-[46px] md:leading-[55px] md:w-full md:mb-8">Keep your firm compliant with built-in accounting tools.</h3>
                    <a
                        href="/"
                        className="flex items-center justify-center text-center h-[54px] px-[30px] bg-white rounded-[100px] border text-primary-dark text-base font-normal font-['Inter'] transition duration-300 hover:bg-primary-dark hover:text-white md:inline-flex">
                        Learn more
                    </a>
                </div>

                <div className="md:w-1/2 relative md:top-[-20px]">
                    <img src={BalanceImg.src} alt="balance image"/>
                </div>
            </div>

            <div className="absolute w-full h-full left-0 bg-primary z-0 rounded-bl-[50px] md:rounded-bl-[100px] top-[-20%]" />

        </div>
    )}
