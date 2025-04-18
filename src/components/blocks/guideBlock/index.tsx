import {PageDataType} from "@/types";
import {FC} from "react";
import classNames from "classnames";
import Image from "next/image";
import {CustomLink} from "@/components/ui/customLink";

type Props = {
    className?: string;
    pageData: PageDataType;
}
export const GuideBlock: FC<Props> = ({className, pageData}) => {
    const featuredPost = pageData.featuredPost;

    if (!featuredPost) return null;

    return <div className={classNames("px-2 pt-10", className)}>
        <div className="max-w-[70.25rem] relative mx-auto">
            <h4 className="relative text-center justify-start text-primary text-base font-normal uppercase tracking-[0.08rem] mb-6">LEGAL PRACTICE MANAGEMENT RESOURCES</h4>
            <h3 className="relative text-center justify-start text-primary text-[2.875rem] font-bold leading-[3.75rem] md:max-w-[61.4375rem] mx-auto mb-15">Access CosmoLex&lsquo;s free materials on how to elevate your legal practice management.</h3>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="min-h-[12.5rem] bg-primary rounded-tl-[0.9375rem] rounded-tr-[0.9375rem] md:rounded-tr-[0rem] md:rounded-bl-[1.875rem] md:rounded-tl-[1.875rem] overflow-hidden flex flex-col justify-between">
                   <div className="relative w-full aspect-3/2 overflow-hidden">
                       <Image
                           src={featuredPost.featuredImage.sourceUrl}
                           alt={featuredPost.featuredImage.altText}
                           width={featuredPost.featuredImage.mediaDetails.width}
                           height={featuredPost.featuredImage.mediaDetails.height}
                           className="w-full"
                       />
                   </div>
                    <div className="py-[1.875rem] px-[1.25rem] md:py-[3.75rem] md:px-[3.9375rem] grow flex flex-col justify-between">
                        <div>
                            <div className="relative justify-start text-white text-base font-normal uppercase tracking-wider mb-2">Free Guide</div>
                            <div className="relative justify-start text-white text-[1.75rem] font-medium leading-10 mb-12">{featuredPost.title}</div>
                        </div>

                        <CustomLink href={featuredPost.slug} className="base-btn text-white border-white hover:bg-white hover:text-primary-dark" target="_blank">{featuredPost.ctaText ?? 'Get Guide'}</CustomLink>
                    </div>
                </div>
                <div className="min-h-[12.5rem] bg-green rounded-bl-[0.9375rem] rounded-br-[0.9375rem] md:rounded-bl-[0rem] md:rounded-br-[1.875rem] md:rounded-tr-[1.875rem] overflow-hidden">
                    <div className="py-[1.875rem] px-5 md:py-[4.0625rem] md:pl-[3.9375rem] md:pr-[2.1875rem]">
                        <div className="relative justify-start text-primary-dark text-[1.75rem] font-semibold font-['Inter'] leading-10 mb-10">Educational Blogs</div>
                        <ul className="md:pr-[5.3125rem] mb-10">
                            <li className="relative justify-start mb-10">
                                <CustomLink href="/blog/integrated-accounting-software/" className="text-primary-dark text-[18px] font-medium font-['Inter'] leading-[2rem]">Integrated Accounting Software for Law Firms: Features, Benefits & More</CustomLink>
                            </li>
                            <li className="relative justify-start mb-10">
                                <CustomLink href="/blog/5-reasons-law-firms-are-switching-to-cosmolex/" className="text-primary-dark text-[18px] font-medium font-['Inter'] leading-[2rem]">5 Reasons Law Firms are Switching to CosmoLex</CustomLink>
                            </li>
                            <li className="relative justify-start mb-10">
                                <CustomLink href="/blog/optimizing-law-firm-operations-strategies-for-modern-practices/" className="text-primary-dark text-[18px] font-medium font-['Inter'] leading-[2rem]">Optimizing Law Firm Operations: 5 Strategies for Modern Practices</CustomLink>
                            </li>
                            <li className="relative justify-start mb-10">
                                <CustomLink href="/blog/roi-of-switching-to-cosmolexpay/" className="text-primary-dark text-[18px] font-medium font-['Inter'] leading-[2rem]">The ROI of Switching to CosmoLexPay: Cost Savings and Efficiency Gains</CustomLink>
                            </li>
                            <li className="relative justify-start mb-10">
                                <CustomLink href="/blog/high-converting-law-firm-website/" className="text-primary-dark text-[18px] font-medium font-['Inter'] leading-[2rem]">6 Best Practices for Creating a High-Converting Law Firm Website</CustomLink>
                            </li>
                        </ul>
                        <CustomLink href="/blog" className="base-btn text-white border-primary-dark bg-primary-dark hover:bg-white hover:text-primary-dark hover:border-white">Read all articles</CustomLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
}