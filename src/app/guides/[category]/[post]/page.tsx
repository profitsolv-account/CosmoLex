import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";
import {getKBPostData, getPostData} from "@/lib/queries/wordpress";
import {Metadata} from "next";
import {getKbSEOData, getPostSEOData} from "@/lib/queries/seo";

import React from "react";
import {data} from "@/app/blog/[slug]/dataCTA";

type Params = {
    params: Promise<{post: string, category: string}>;
}
export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {post} = await params;
    return await getKbSEOData( `/blog/${post}/` || 'home-page');
}

export default async function SinglePost({ params }: any) {
   try {
       const { post } = await params;

       const data = await getKBPostData(`/blog/guides/${post}/`);

       return <PostTemplate pageData={{
           ...data,
       }} />;
       
   } catch(error) {
        notFound();
    }
}

const formatText = (text: string, replace: {[key: string]: string}): string => {
    const shortcodeRegex = /\[cs_gb name=&#8221;([^&#]+)&#8221;\]/g;
    return text.replace(shortcodeRegex, (match, name) => {
        return replace[name] ?? match;
    });
};


/*export async function generateStaticParams() {
    const urls = await getAllPostSlugs();
    // urls.length = 5;
    return urls;
}*/

export const revalidate = false;
export const dynamic = "force-static";
// export const fetchCache = "default-cache";
