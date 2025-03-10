import {PageDataType} from "@/types";
import {FC} from "react";
import classNames from "classnames";
import Bg from '@/assets/img/blocks/cosmolex-guide.webp';

type Props = {
    className?: string;
    pageData?: PageDataType;
}
export const GuideBlock: FC<Props> = ({className}) => {
    return <div className={classNames("px-2 pt-10", className)}>
        <div className="max-w-[1124px] relative mx-auto">
            <h4 className="relative text-center justify-start text-primary text-base font-normal uppercase tracking-[1.28px] mb-6">LEGAL PRACTICE MANAGEMENT RESOURCES</h4>
            <h3 className="relative text-center justify-start text-primary text-[46px] font-bold leading-[60px] md:max-w-[983px] mx-auto mb-15">Access CosmoLex&lsquo;s free materials on how to elevate your legal practice management.</h3>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="min-h-[200px] bg-primary rounded-tl-[15px] rounded-tr-[15px] md:rounded-tr-[0px] md:rounded-bl-[30px] md:rounded-tl-[30px] overflow-hidden flex flex-col justify-between">
                   <div className="scale-x-[-1] relative w-full aspect-3/2 overflow-hidden">
                       <img src={Bg.src} alt="cosmolex-guide" className="w-full h-full scale-150 object-cover absolute md:right-[-100px]"/>
                   </div>
                    <div className="py-[30px] px-[20px] md:py-[60px] md:px-[63px] grow flex flex-col justify-between">
                        <div>
                            <div className="relative justify-start text-white text-base font-normal uppercase tracking-wider mb-2">Free Guide</div>
                            <div className="relative justify-start text-white text-[28px] font-medium leading-10 mb-12">The Legal Firm’s Blueprint: Building a Strong Foundation for Success</div>
                        </div>

                        <a href="/blog" className="base-btn text-white border-white hover:bg-white hover:text-primary-dark">Read more</a>
                    </div>
                </div>
                <div className="min-h-[200px] bg-green rounded-bl-[15px] rounded-br-[15px] md:rounded-bl-[0px] md:rounded-br-[30px] md:rounded-tr-[30px] overflow-hidden">
                    <div className="py-[30px] px-5 md:py-[65px] md:pl-[63px] md:pr-[35px]">
                        <div className="relative justify-start text-primary-dark text-[28px] font-semibold font-['Inter'] leading-10 mb-10">Educational Blogs</div>
                        <ul className="md:pr-[85px] mb-10">
                            <li className="relative justify-start mb-10">
                                <a href="/blog/integrated-accounting-software/" className="text-primary-dark text-xl font-medium font-['Inter'] leading-[32px]">Integrated Accounting Software for Law Firms: Features, Benefits & More</a>
                            </li>
                            <li className="relative justify-start mb-10">
                                <a href="/blog/5-reasons-law-firms-are-switching-to-cosmolex/" className="text-primary-dark text-xl font-medium font-['Inter'] leading-[32px]">5 Reasons Law Firms are Switching to CosmoLex</a>
                            </li>
                            <li className="relative justify-start mb-10">
                                <a href="/blog/optimizing-law-firm-operations-strategies-for-modern-practices/" className="text-primary-dark text-xl font-medium font-['Inter'] leading-[32px]">Optimizing Law Firm Operations: 5 Strategies for Modern Practices</a>
                            </li>
                            <li className="relative justify-start mb-10">
                                <a href="/blog/roi-of-switching-to-cosmolexpay/" className="text-primary-dark text-xl font-medium font-['Inter'] leading-[32px]">The ROI of Switching to CosmoLexPay: Cost Savings and Efficiency Gains</a>
                            </li>
                            <li className="relative justify-start mb-10">
                                <a href="/blog/high-converting-law-firm-website/" className="text-primary-dark text-xl font-medium font-['Inter'] leading-[32px]">6 Best Practices for Creating a High-Converting Law Firm Website</a>
                            </li>
                        </ul>
                        <a href="/blog" className="base-btn text-white border-primary-dark bg-primary-dark hover:bg-white hover:text-primary-dark hover:border-white">Read all articles</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}