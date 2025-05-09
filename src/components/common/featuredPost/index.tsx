import Image from "next/image"
import {FeaturedPostType} from "@/types";
import {CustomLink} from "@/components/ui/customLink";

export const FeaturedPost = ({pageData}: {pageData: any}) => {

    const post: FeaturedPostType = pageData.featuredPost;
    if (!post) return null;

    return <div className="w-full max-w-[20.5rem] rounded-[0.625rem] overflow-hidden bg-secondary">
        <div className="bg-[#d9d9d9] flex items-center justify-center">
            <Image
                src={post.featuredImage.sourceUrl}
                alt={post.featuredImage.altText}
                className="object-cover aspect-3/2"
                width={400}
                height={400}
            />
        </div>
        <div className="px-5 py-7">
            <div className="relative">
                <div className="pr-[0.8125rem] py-[0.5625rem] rounded-[3.125rem] justify-start items-center inline-flex mb-3">
                    <div className="text-black text-xs font-normal font-['Inter'] tracking-wide" style={{'letterSpacing': '0.06rem'}}>FREE GUIDE</div>
                </div>
                <div className="text-black text-base font-medium font-['Inter'] leading-[1.4375rem] mb-7">
                    {post.title}
                </div>
                <CustomLink href={`${post.slug}`} className="block h-11 px-5 pt-2.5 pb-3 bg-primary-dark border border-primary-dark rounded-[6.25rem] text-center text-white text-base font-normal font-['Inter'] transition duration-300 hover:bg-secondary hover:text-primary-dark" target="_blank">
                    Get Guide
                </CustomLink>
            </div>
        </div>
    </div>
}
