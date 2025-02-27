import {FeaturedPostType} from "@/types";
import {FC} from "react";

type Props = {
    posts: FeaturedPostType[]
}

export const LatestPosts:FC<Props> = ({posts}) => {
    return <>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Latest Posts</h2>
            <div className="">
                {posts.map((post, index) => (
                    <a href={`/blog/${post.slug}`} key={index} className="overflow-hidden flex gap-4 mb-4">
                        <div className="w-[80px] h-[80px] rounded-[10px] overflow-hidden bg-gray-100 flex-none items-start">
                            {post.featuredImage && <img src={post.featuredImage} alt={post.altText} className="h-full object-cover object-center"/>}
                        </div>
                        <h2 className="text-base font-semibold text-gray-800">{post.title}</h2>
                    </a>
                ))}
            </div>
        </>
}