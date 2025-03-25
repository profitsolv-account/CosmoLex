import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";
import {getPostData} from "@/lib/queries/wordpress";
import {Metadata} from "next";
import {getPostSEOData} from "@/lib/queries/seo";

import React from "react";

type Params = {
    params: Promise<{slug: string}>;
}
export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getPostSEOData(slug || 'home-page');
}

export default async function SinglePost({ params }: Params) {
   try {
       const { slug } = await params;
       const pageData = await getPostData(slug);
       if (!pageData) {
           notFound();
       }
       return <PostTemplate pageData={{
           ...pageData,
       }} />;
       
   } catch(error) {
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";
// export const fetchCache = "default-cache";
