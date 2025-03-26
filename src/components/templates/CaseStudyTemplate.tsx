"use client"
import React, {useState} from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {PageHeader} from "@/components/blocks/pageHeader";
import {Features} from "@/components/blocks/features";
import Image from "next/image";
import VideoModal from "@/components/blocks/videoModal";

export default function CaseStudyTemplate({ pageData }: { pageData: PageDataType }) {

    const videoSection = pageData.videoSection;
    const [openVideo, setOpenVideo] = useState(false);

    return (
        <Layout pageData={pageData}>

            <PageHeader
                pageData={pageData} className="mb-0"
                showCta
                hideContent
            />

            <div className="relative w-full mb-22 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] h-[5rem] bg-primary">

            </div>

            {videoSection && videoSection.imagePlaceholder && <div className="my-25 flex justify-center">
                <Image
                    src={videoSection.imagePlaceholder.sourceUrl}
                    alt={videoSection.imagePlaceholder.altText}
                    width={videoSection.imagePlaceholder.mediaDetails.width}
                    height={videoSection.imagePlaceholder.mediaDetails.height}
                    onClick={() => {
                        setOpenVideo(true);
                    }}
                    className="max-w-[55rem] cursor-pointer"
                />
                <VideoModal isOpen={openVideo} videoId={videoSection.videoId} onClose={() => setOpenVideo(false)} />
            </div>}

           <div className="px-4">
               <div className="container-blog page-content flex-row">
                   <div dangerouslySetInnerHTML={{__html: pageData.content || ''}}/>
               </div>
           </div>

            {pageData.settings && <div className="relative bg-primary py-40 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem]">
                <Features pageData={pageData} className="!pt-2" />
             {/*   <div className="absolute top-0 w-full h-[9.375rem] rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] bg-primary"/>*/}
            </div>}

            <div className="relative">
                <SimplifyPractice pageData={pageData} className=""/>
                <div
                    className="absolute bottom-0 w-full h-[9.375rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-primary"/>
            </div>

        </Layout>
    )
}