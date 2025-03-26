import {PodcastType} from "@/types";
import React, {FC} from "react";
import Image from "next/image";

type Props = {
    podcast: PodcastType;
    hideCta?: boolean
}

export const Podcast: FC<Props> = ({podcast, hideCta}) => {
    return (
        <div className="mb-10">
            <div className="flex gap-10">
                <Image
                    src={podcast.heroImage.node.sourceUrl}
                    alt={podcast.heroImage.node.altText}
                    width={podcast.heroImage.node.mediaDetails.width}
                    height={podcast.heroImage.node.mediaDetails.height}
                    className="w-1/3"
                />

                <div>
                    <h3 className="text-4xl mb-4">{podcast.title}</h3>
                    <div dangerouslySetInnerHTML={{__html: podcast.content}} />
                    {!hideCta && <a
                        className="base-btn md:px-7 bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark inline-block mt-10"
                        href={`/${podcast.slug}`}
                    >Listen now</a>}
                </div>
            </div>
        </div>
    )
}