import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";
import {getKBPostData, getPostData} from "@/lib/queries/wordpress";
import {Metadata} from "next";
import {getPostSEOData} from "@/lib/queries/seo";

import React from "react";
import {data} from "@/app/blog/[slug]/dataCTA";

type Params = {
    params: Promise<{slug: string}>;
}
export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getPostSEOData(slug || 'home-page');
}

export default async function SinglePost({ params }: any) {
   try {
       const { slug, category, post } = await params;

       console.log({ slug, category, post });
       const data = await getKBPostData(post);
       console.log(data);

       return <PostTemplate pageData={{
           ...data,
          /* content: formatText(pageData.content, replace),*/
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
