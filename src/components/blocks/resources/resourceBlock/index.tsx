import {Resource} from "@/types/resources";
import {FC} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

type Props = {
    resource: Resource;
}
export const ResourceBlock: FC<Props> = ({resource}) => {

    const fields = resource.node.fields;
    const renderTags = (tags: string) => {
        return tags.split(',').map((tag, index) => {
            return <div key={index} className="text-xs rounded-[0.25rem] px-1 bg-white text-primary text-[1rem] font-semibold">{tag}</div>
        })
    };

    return <div className="w-full relative p-1 rounded-[0.25rem] border border-[#c7c7cc] group">
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={resource.node.featuredImage.node.sourceUrl}
                    alt={resource.node.featuredImage.node.altText || resource.node.title}
                    width={resource.node.featuredImage.node.mediaDetails.width}
                    height={resource.node.featuredImage.node.mediaDetails.height}
                    className="w-full relative z-2"
                />
                <div className="w-full h-full hidden bg-primary  group-hover:flex absolute top-0 left-0 opacity-100 z-10  justify-center items-center animate-fade-up animate-duration-[200ms]">
                    <div className="px-10 text-center">
                        <div className="flex justify-center mb-5 gap-5">{renderTags(fields.tags)}</div>
                        <div className="text-white uppercase text-2xl font-semibold mb-5">{resource.node.title}</div>
                        <div  className="text-white uppercase text-[1rem] leading-[1.5rem]" dangerouslySetInnerHTML={{__html: resource.node.content}}/>
                    </div>

                    <Button variant="secondary" href={fields.ctaLink} target="_blank" className="absolute bottom-10 ">{fields.ctaText ?? 'Download Now'}</Button>
                </div>
            </div>
    </div>
}