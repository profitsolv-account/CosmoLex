import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import DemoPageTemplate from "@/components/templates/DemoPageTemplate";

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData('demo');
}

export default async function SinglePage() {
    const pageData = await getPageData("demo");
    return <DemoPageTemplate pageData={pageData} />
}

export const revalidate = false;
export const dynamic = "force-static";