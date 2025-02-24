import { useAppContext } from "@/context";

export const FeaturedPost = ({pageData}: {pageData: any}) => {

    const  {featuredPost: post} = pageData;
    if (!post) return null;

    return <div className="w-full max-w-[328px] rounded-[10px] overflow-hidden bg-secondary">
        <div className="bg-[#d9d9d9] flex items-center justify-center">
            <img src={post.featuredImage} alt={post.altText} className="object-cover aspect-3/2" />
        </div>
        <div className="px-5 py-7">
            <div className="relative">
                <div className="pr-[13px] py-[9px] rounded-[50px] justify-start items-center inline-flex mb-3">
                    <div className="text-black text-xs font-normal font-['Inter'] tracking-wide" style={{'letterSpacing': '0.96px'}}>FREE GUIDE</div>
                </div>
                <div className="text-black text-base font-medium font-['Inter'] leading-[23px] mb-7">
                    {post.title}
                </div>
                <a href={`/blog/${post.slug}`} className="block h-11 px-5 pt-2.5 pb-3 bg-primary-dark border border-primary-dark rounded-[100px] text-center text-white text-base font-normal font-['Inter'] transition duration-300 hover:bg-secondary hover:text-primary-dark">
                    Get Guide
                </a>
            </div>
        </div>
    </div>
}
