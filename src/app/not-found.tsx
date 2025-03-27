import NotFoundTemplate from "@/components/templates/NotFoundTemplate";
import {getHomePageData} from "@/lib/queries/wordpress";
import {Metadata} from "next";
import {generalSettings} from "@/lib/queries/settings";

export async function generateMetadata(): Promise<Metadata> {
    const {title} = await generalSettings();
    return {
        title: `${title} | 404`,
        description: '',
        keywords: '',
    }
}

export default async function NotFound() {
    const pageData = await getHomePageData();
    return <NotFoundTemplate pageData={pageData} />
}