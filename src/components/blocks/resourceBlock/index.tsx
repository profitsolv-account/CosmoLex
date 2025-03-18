import {Resource} from "@/types/resources";
import {FC} from "react";
import Image from "next/image";

type Props = {
    resource: Resource;
}
export const ResourceBlock: FC<Props> = ({resource}) => {

    const renderTags = (tags: string) => {
        return tags.split(',').map((tag, index) => {
            return <div key={index} className="text-xs text-white bg-primary rounded-[0.25rem] px-1">{tag}</div>
        })
    }
    return <div className="w-full relative p-1 rounded-[0.25rem] border border-[#c7c7cc] group">
            <div className="relative w-full h-full">
                <Image
                    src={resource.node.featuredImage.node.sourceUrl}
                    alt={resource.node.featuredImage.node.altText || resource.node.title}
                    width={resource.node.featuredImage.node.mediaDetails.width}
                    height={resource.node.featuredImage.node.mediaDetails.height}
                    className="w-full relative z-2"
                />
                <div className="w-full h-full hidden bg-primary  group-hover:block absolute top-0 left-0 opacity-100 z-10">
                    <div>{renderTags(resource.node.webinarFields.tags)}</div>
                    <div>{resource.node.title}</div>
                    <div dangerouslySetInnerHTML={{__html: resource.node.content}}/>
                </div>
            </div>

    </div>
}