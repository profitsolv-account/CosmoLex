import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";
import {getPostData} from "@/lib/queries/wordpress";
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

export default async function SinglePost({ params }: Params) {
   try {
       const { slug } = await params;

       const replace = {
           'inline-asset-cta-six-essential-features-in-your-legal-crm-and-how-to-use-them': data.InfographicContent,
           'inline-asset-cta-9-tips-to-boost-law-practice-success-by-getting-back-to-basics': data.guideContent,
           'inline-asset-cta-trust-account-balance-sheets-understanding-liability-and-equity': data.eBookContent,
           'inline-asset-cta-how-much-should-our-law-firm-bill-for-paralegal-work': data.checklistContent,
       }

       const pageData = await getPostData(slug);
       if (!pageData) {
           notFound();
       }

       return <PostTemplate pageData={{
           ...pageData,
           content: removeSystemTags(formatText(pageData.content.replaceAll('\\n',''), replace)
               .replaceAll('[cs_element_global_block _id=&#8221;4&#8243; ]', data.InfographicContent)
               .replaceAll('[cs_element_global_block _id=&#8221;2&#8243; ]', data.InfographicContent)
           )
           ,
       }} />;
       
   } catch(error) {
        notFound();
    }
}

const formatText = (text: string, replace: { [key: string]: string }): string => {
    const shortcodeRegex = /\[cs_gb name=&#8221;([^&#]+)&#8221;\]/gi; // added 'i' flag
    return text.replace(shortcodeRegex, (match, name) => {
        const key = Object.keys(replace).find(k => k.toLowerCase() === name.toLowerCase());
        return key ? replace[key] : match;
    });
};

function removeSystemTags(inputString: string) {
    return inputString.replace(/\n/g,'').replace(/\[.*?\]/g, (match) => {
        if (match.includes("cs_content") || match.includes("cs_element")) {
            return "";
        } else {
            return match;
        }
    });
}


/*export async function generateStaticParams() {
    const urls = await getAllPostSlugs();
    // urls.length = 5;
    return urls;
}*/

export const revalidate = false;
export const dynamic = "force-static";
// export const fetchCache = "default-cache";
