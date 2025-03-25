import {getBlogData} from "@/lib/queries/blog";
import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import BlogTemplate from "@/components/templates/BlogTemplate";
import {generalSettings} from "@/lib/queries/settings";
import {notFound} from "next/navigation";
import {getPageData} from "@/lib/queries/wordpress";
import {getCategories, getDirectoriesData} from "@/lib/queries/directoryListings";
import DirectoriesTemplate from "@/components/templates/DirectoriesTemplate";

type Params = {
    params: Promise<{ page: string }>
    searchParams: { s: string, ctas: string, locs: string }
};

const slug = 'certified-consultant';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}
export default async function CertifiedConsultantPage({ params, searchParams }: any) {
    try {
        const { s, ctas, locs } = await searchParams || {};

        const {page} = await params;
        const pageData = await getPageData(slug);
        const data = await getDirectoriesData(+page, { s, ctas, locs });
        const dataCats = await getCategories();
        return <DirectoriesTemplate pageData={{
            ...pageData,
            directories: data.posts,
            total: data.totalPosts,
        }} page={+page}
            locations={dataCats.locations}
            categories={dataCats.categories}
        />
    } catch (error) {
        notFound();
    }
}

export const revalidate = false;
//export const dynamic = "force-static";