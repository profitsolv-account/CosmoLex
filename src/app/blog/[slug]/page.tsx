import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";
import {getPostData} from "@/lib/queries/wordpress";
import {Metadata} from "next";
import {getPostSEOData} from "@/lib/queries/seo";
import fs from "fs";
import path from "path";

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

       const eBookContent = fs.readFileSync(path.join(process.cwd(), "public", "/inlineCTA/eBook.html"), "utf8");
       const checklistContent = fs.readFileSync(path.join(process.cwd(), "public", "/inlineCTA/Checklist.html"), "utf8");
       const guideContent = fs.readFileSync(path.join(process.cwd(), "public", "/inlineCTA/Guide.html"), "utf8");
       const InfographicContent = fs.readFileSync(path.join(process.cwd(), "public", "/inlineCTA/Infographic.html"), "utf8");

       const replace = {
           'inline-asset-cta-six-essential-features-in-your-legal-crm-and-how-to-use-them': InfographicContent,
           'inline-asset-cta-9-tips-to-boost-law-practice-success-by-getting-back-to-basics': guideContent,
           'inline-asset-cta-trust-account-balance-sheets-understanding-liability-and-equity': eBookContent,
           'inline-asset-cta-how-much-should-our-law-firm-bill-for-paralegal-work': checklistContent,
       }

       const pageData = await getPostData(slug);
       if (!pageData) {
           notFound();
       }
       return <PostTemplate pageData={{
           ...pageData,
           content: formatText(pageData.content, replace),
       }} />;
       
   } catch(error) {
        notFound();
    }
}

const formatText = (text: string, replace: {[key: string]: string}): string => {
    const shortcodeRegex = /\[cs_gb name=&#8221;([^&#]+)&#8221;\]/g;

    return text.replace(shortcodeRegex, (match, name) => {
        return replace[name] ?? match; // Replace if found, otherwise keep the original shortcode
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
