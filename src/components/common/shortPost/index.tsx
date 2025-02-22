import {FC} from "react";
import {ShortPostType} from "@/types";

type Props = {
    post: ShortPostType
}
export const ShortPost: FC<Props> = ({post}) => {

    return <div className="mb-10">
        <h2 className="mb-5 text-primary-dark text-[46px] font-bold font-['Inter'] leading-[55px] transition duration-300 hover:text-primary-dark/70">
            <a href={`/blog/${post.slug}`}>{post.title} </a>
        </h2>

        <div className="flex">
            {!!post.featuredImage.length && <>
                <a
                    href={`/blog/${post.slug}`}
                    className="inline-block p-1 border border-primary"
                >
                    <img
                        src={post.featuredImage}
                        alt={post.altText}
                    />
                </a>
            </>}
        </div>

        <div dangerouslySetInnerHTML={{__html: post.excerpt || ''}} className="text-xl"/>
    </div>
}