import {getBlogData} from "@/lib/queries/blog";
import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import BlogTemplate from "@/components/templates/BlogTemplate";
import {generalSettings} from "@/lib/queries/settings";
import {notFound} from "next/navigation";
import {getPageData} from "@/lib/queries/wordpress";
import {getDirectoriesData} from "@/lib/queries/directoryListings";
import DirectoriesTemplate from "@/components/templates/DirectoriesTemplate";

type Params = {
    params: Promise<{ page: string }>
};

const slug = 'certified-consultant';

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


/*
export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}
*/

export default async function CertifiedConsultantPage({ params }: Params) {
    try {
        const {page} = await params;
        const pageData = await getPageData(slug);
        const data = await getDirectoriesData(+page);
        return <DirectoriesTemplate pageData={{
            ...pageData,
            directories: data.posts,
            total: data.totalPosts,
        }} page={+page}
        />
    } catch (error) {
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";