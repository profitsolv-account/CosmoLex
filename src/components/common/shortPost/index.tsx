import {FC} from "react";
import {ShortPostType} from "@/types";
import Image from 'next/image';
import {CustomLink} from "@/components/ui/customLink";

type Props = {
    post: ShortPostType;
    url?: string;
}
export const ShortPost: FC<Props> = ({post, url}) => {
    const pageUrl = url ? url : `/blog/${post.slug}`;

    return <div className="mb-12">
        <h2 className="mb-5 text-primary-dark text-[2.125rem] font-bold font-['Inter'] leading-[3.4375rem] md:text-[2.875rem] transition duration-300 hover:text-primary">
            <CustomLink href={pageUrl} dangerouslySetInnerHTML={{__html: post.title || ""}}/>
        </h2>

        {!!post.featuredImage.length && <>
            <div className="flex mb-5 text-justify">
                    <CustomLink
                        href={pageUrl}
                        className="inline-block p-1 border border-primary"
                    >
                        <Image
                            src={post.featuredImage}
                            alt={post.altText}
                            width={800}
                            height={400}
                           /* className="max-w-[37.5rem]"*/
                        />
                    </CustomLink>
                </div>
        </>}
        <div dangerouslySetInnerHTML={{__html: post ? post.excerpt : ''}} className="text-xl"/>
    </div>
}