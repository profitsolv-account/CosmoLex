import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import { notFound } from "next/navigation";
import { getCategories, getDirectoriesData } from "@/lib/queries/directoryListings";
import DirectoriesTemplate from "@/components/templates/DirectoriesTemplate";

const slug = 'certified-consultant';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export type SearchParams = {
    s?: string;
    cats?: string;
    locs?: string;
};

interface Props {
    searchParams: Promise<SearchParams>;
}

export default async function CertifiedConsultantPage({ searchParams }: Props) {
    try {
        const { s, cats, locs } = await searchParams;

        const pageData = await getPageData(slug);
        const data = await getDirectoriesData(1, { s, cats, locs });
        const dataCats = await getCategories();

        return (
            <DirectoriesTemplate
                pageData={{
                    ...pageData,
                    directories: data.posts,
                    total: data.totalPosts,
                }}
                page={1}
                locations={dataCats.locations}
                categories={dataCats.categories}
                searchParams={{ s, cats, locs }}
            />
        );
    } catch (error) {
        notFound();
    }
}

export const revalidate = false;
