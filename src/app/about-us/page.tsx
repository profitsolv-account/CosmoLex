import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import AboutUsTemplate from "@/components/templates/AboutUsTemplate";
import {getMembersData} from "@/lib/queries/about";

const pageSlug = "about-us";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(pageSlug);
}

export default async function AboutUsPage() {
    try {
        const pageData = await getPageData(pageSlug);
        const members = await getMembersData('about-us')
        return <AboutUsTemplate pageData={{
            ...pageData,
            footerExtendedBg: true,
            members
        }}/>
    } catch (error) {
        notFound();
    }
}

