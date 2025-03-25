import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import {getDirectoriesData} from "@/lib/queries/directoryListings";
import DirectoriesTemplate from "@/components/templates/DirectoriesTemplate";

const slug = 'certified-consultant';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function CertifiedConsultantPage() {
    try {
        const pageData = await getPageData(slug);
        const data = await getDirectoriesData(1);
        return <DirectoriesTemplate pageData={{
                ...pageData,
                directories: data.posts,
               total: data.totalPosts,
            }}
            page={1}
        />
    } catch (error) {
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";