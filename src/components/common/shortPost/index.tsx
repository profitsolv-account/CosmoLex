import {FC} from "react";
import {ShortPostType} from "@/types";

type Props = {
    post: ShortPostType
}
export const ShortPost: FC<Props> = ({post}) => {

    return <div className="mb-12">
        <h2 className="mb-5 text-primary-dark text-[34px] font-bold font-['Inter'] leading-[55px] md:text-[46px] transition duration-300 hover:text-primary">
            <a href={`/blog/${post.slug}`} dangerouslySetInnerHTML={{__html: post.title || ""}}/>
        </h2>

        {!!post.featuredImage.length && <>
            <div className="flex mb-5 text-justify">
                    <a
                        href={`/blog/${post.slug}`}
                        className="inline-block p-1 border border-primary"
                    >
                        <img
                            src={post.featuredImage}
                            alt={post.altText}
                           /* className="max-w-[600px]"*/
                        />
                    </a>
                </div>
        </>}
        <div dangerouslySetInnerHTML={{__html: post ? post.excerpt : ''}} className="text-xl"/>
    </div>
}