import { notFound } from "next/navigation";
import {Metadata} from "next";
import {getPostSEOData} from "@/lib/queries/seo";
import React from "react";
import {getKBCategoryData} from "@/lib/queries/knowledgeBase";
import KBCategoryTemplate from "@/components/templates/KBCategoryTemplate";

type Params = {
    params: Promise<{slug: string}>;
}
export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getPostSEOData(slug || 'home-page');
}

export default async function SingleKBCategory({ params }: Params) {
   try {
       const { slug } = await params;
       const pageData = await getKBCategoryData(slug, 1);
       if (!pageData) {
           notFound();
       }
       return <KBCategoryTemplate pageData={pageData} page={1} slug={slug} />
   } catch(error) {
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";
