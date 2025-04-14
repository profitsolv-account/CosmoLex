import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import AboutCosmolexTemplate from "@/components/templates/AboutCosmolexTemplate";
import {getLeadersLogos} from "@/lib/queries/logos";
import {getBarsData} from "@/lib/queries/about";
import './style.css';

const pageSlug = "about-cosmolex";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(pageSlug);
}

export default async function AboutCosmolexPage() {
    try {
        const pageData = await getPageData(pageSlug);
        if (!pageData) {
            notFound();
        }
        const logos = await getLeadersLogos();
        const bar = await getBarsData(pageSlug);
        return <AboutCosmolexTemplate pageData={{
            ...pageData,
            footerExtendedBg: true,
            leaderLogos: logos,
            bar
        }}/>
    } catch (error) {
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";

