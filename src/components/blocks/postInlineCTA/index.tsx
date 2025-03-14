import NineTips from '@/assets/img/inlineCTA/9-Tips-to-Boost-Law-Practice-Success-by-Getting-Back-to-Basics.webp';
import YearAndAccounting from '@/assets/img/inlineCTA/2021-Year-end-Accounting-Checklist-for-Law-Firms.webp';
import SixEssential from '@/assets/img/inlineCTA/Six-Essential-Features-in-Your-Legal-CRM.webp';
import FiveObstacles from '@/assets/img/inlineCTA/The-Five-Obstacles-of-Legal-Accounting.webp';
import React from "react";
import {StaticImageData} from "next/image";

type InlineCTaSata = {
    type: string;
    title: string;
    content: React.ReactNode;
    image: StaticImageData;
    ctaText: string;
    ctaLink: string;
}
type InlineData = {[key: string]: InlineCTaSata}

const data: InlineData = {
    eBook: {
        type: "eBook",
        title: "The Five Obstacles of Legal Accounting",
        content: <>
            <p>Download this eBook to learn the five most common legal accounting challenges and how to avoid making costly mistakes. Topics covered in this resource, include:</p>
            <ul>
                <li>Client Trust Accounting</li>
                <li>Proper Accounting of Case Costs</li>
                <li>Differentiating Income and Revenue</li>
                <li>Data Entry Errors Between Billing and Accounting Systems</li>
                <li>Understanding Where the Money Came From</li>
            </ul>
        </>,
        image: FiveObstacles,
        ctaText: "Get Free eBook Now",
        ctaLink: "https://go.cosmolex.com/the-five-obstacles-legal-accounting?channel_type1=eBook&campaign1=blog-syndication-the-five-obstacles-legal-accounting&content_topic=Law-Accounting%20Office%20Management&_gl=1*o4w24c*_gcl_au*NDM5OTQ3NDI3LjE3Mzk0MzU2MDY.*_ga*MTkzMDA2OTg3Mi4xNzM5NDM1NjA2*_ga_M0TQCHJ07M*MTc0MTkzODQ0NS41MS4xLjE3NDE5Mzk3MDQuMTUuMC4w"
    },
    Infographic: {
        type: "Infographic",
        title: "Six Essential Features in Your Legal CRM (and How to Use Them)",
        content:<>
            <p>
                While your legal practice management software keeps the daily work of a law firm moving, legal CRM
                software makes it easier to bring in new clients, engage current clients, and increase your profits.
                But not all legal CRMs are created equal. Look for these six features when choosing a legal CRM—and
                put them to work for your law firm.
            </p>
        </>,
        image: SixEssential,
        ctaText: "Download the Infographic Now",
        ctaLink: "https://go.cosmolex.com/six-essential-features-in-your-legal-crm-and-how-to-use-them?channel_type1=Infographic&campaign1=six-essential-features-in-your-legal-crm-and-how-to-use-them&content_topic=Legal%20CRM&cross_sell_routing=CL%20CRM&_gl=1*s0ospa*_gcl_au*NDM5OTQ3NDI3LjE3Mzk0MzU2MDY.*_ga*MTkzMDA2OTg3Mi4xNzM5NDM1NjA2*_ga_M0TQCHJ07M*MTc0MTkzODQ0NS41MS4xLjE3NDE5Mzk3MDQuMTUuMC4w",
    },
    Guide: {
        type: "Guide",
        title: "9 Tips to Boost Law Practice Success by Getting Back to Basics",
        content:<>
            <p>
                When was the last time you thought about how your law firm conducts its daily operations? Or examined all the little “must-do” tasks to see what could be done more efficiently?
            </p>
        </>,
        image: NineTips,
        ctaText: "Download Free Guide Now",
        ctaLink: "https://go.cosmolex.com/9-tips-to-boost-law-practice-success?channel_type1=Guide&campaign1=blog-syndication-9-tips-to-boost-law-practice-success&content_topic=Law-Accounting%20Office%20Management&_gl=1*axinjf*_gcl_au*NDM5OTQ3NDI3LjE3Mzk0MzU2MDY.*_ga*MTkzMDA2OTg3Mi4xNzM5NDM1NjA2*_ga_M0TQCHJ07M*MTc0MTkzODQ0NS41MS4xLjE3NDE5NDAxMDYuMzcuMC4w",
    },
    Checklist: {
        type: "Checklist",
        title: "Year-end Accounting Checklist for Law Firms",
        content:<>
            <p>
                It’s important to regularly review and have a deep understanding of your financial health to ensure
                that errors will be caught and performance can be analyzed. Always knowing the status of your business
                allows for adequate planning and, if necessary, a change of course before it is too late!
            </p>
        </>,
        image: YearAndAccounting,
        ctaText: "Download the Checklist Now",
        ctaLink: "https://go.cosmolex.com/year-end-accounting-checklist?channel_type1=Guide&campaign1=blog-syndication-year-end-accounting-checklist&content_topic=Law-Accounting%20Office%20Management&_gl=1*1waqhw5*_gcl_au*NDM5OTQ3NDI3LjE3Mzk0MzU2MDY.*_ga*MTkzMDA2OTg3Mi4xNzM5NDM1NjA2*_ga_M0TQCHJ07M*MTc0MTkzODQ0NS41MS4xLjE3NDE5NDAyMTEuMjMuMC4w",
    },
}

type Props = {
    shortcode: string;
}

export const PostInlineCTA = async ({shortcode}: Props) => {

    const types: {[index: string]: string} = {
        'inline-asset-cta-six-essential-features-in-your-legal-crm-and-how-to-use-them': 'Infographic',
        'inline-asset-cta-9-tips-to-boost-law-practice-success-by-getting-back-to-basics': 'Guide',
        'inline-asset-cta-trust-account-balance-sheets-understanding-liability-and-equity': 'eBook',
        'inline-asset-cta-how-much-should-our-law-firm-bill-for-paralegal-work': 'Checklist',
    }

    const type = types[shortcode];
    if (!type) return null;

    const ctaData = data[type];

    return <div className="bg-[#f3f3f3] p-4">
        <div className="container flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/3 p-2">
                <img src={ctaData.image.src} alt={ctaData.title} className="w-full h-auto"/>
            </div>
            <div className="w-full md:w-2/3 p-2">
                <div className=" text-[#91dea4] font-semibold mb-4">{ctaData.type}</div>
                <h2 className="text-primary-dark text-[24px] font-bold leading-[35px] md:text-[30px]">{ctaData.title}</h2>
                <div className="py-4 text-[16px]">
                    {ctaData.content}
                </div>
                <a
                    href={ctaData.ctaLink}
                    target="_blank"
                    className="no-underline inline-block h-11 px-5 pt-2.5 pb-3 bg-primary-dark border border-primary-dark rounded-[100px] text-center text-white text-base font-normal transition duration-300 hover:bg-transparent hover:text-primary-dark">
                    {ctaData.ctaText}
                </a>
            </div>
        </div>
    </div>
}

