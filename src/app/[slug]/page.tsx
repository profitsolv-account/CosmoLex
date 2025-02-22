import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PageTemplate from "@/components/templates/PageTemplate";


type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage({params}: Params) {
    const {slug} = await params;
    const pageData = await getPageData(slug);
    return <PageTemplate pageData={pageData} />
}

/*
export async function generateStaticParams() {
    const { data } = await client.query({
        query: gql`
            query GetAllPages {
                pages {
                    nodes {
                        uri
                    }
                }
            }
        `,
        fetchPolicy: "no-cache"
    });

    const slugs = data.pages.nodes
        .map((node: {uri: string}) => node.uri)
        .map((uri: string) => uri.replace(/^\/|\/$/g, ''))
        .filter((slug: string) => slug.length > 0);

    return slugs.map((slug: string) => ({
        slug
    }));
}*/


export const revalidate = false;
export const dynamic = "force-static";    // Keep it static
export const dynamicParams = true;        // Allow dynamic params
export const fetchCache = "default-cache"; // Enable default caching
