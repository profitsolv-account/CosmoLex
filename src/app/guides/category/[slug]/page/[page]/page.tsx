import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {generalSettings} from "@/lib/queries/settings";
import {notFound} from "next/navigation";
import {getKBCategoryData} from "@/lib/queries/knowledgeBase";
import KBCategoryTemplate from "@/components/templates/KBCategoryTemplate";
import React from "react";

type Params = {
    params: Promise<{ page: string, slug: string }>
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const {page} = await params;
    const {title} = await generalSettings();
    return {
        title: `${title} Blog | ${title} - Page ${page}`,
        description: '',
        keywords: '',
    }
    return await getSEOData('page');
}


export default async function KBCategoryPage({ params }: Params) {

    try {
        const { slug } = await params;
        const {page} = await params;

        const pageData = await getKBCategoryData(slug, +page);
        if (!pageData) {
            notFound();
        }
        return <KBCategoryTemplate pageData={pageData} page={+page} slug={slug} />
    } catch(error) {
        notFound();
    }


}

/*
export async function generateStaticParams() {
    const TOTAL_PAGES = 5;
    return new Array(TOTAL_PAGES).fill('').map((_, index) => ({page: String(index+1)}));
}*/

export const revalidate = false;
export const dynamic = "force-static";