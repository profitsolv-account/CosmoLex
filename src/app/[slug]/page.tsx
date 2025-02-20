import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import Page from "@/components/templates/Page";
import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export async function generateMetadata({params}: any): Promise<Metadata> {
    const {slug} = await params;
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage({params}: any) {
    const {slug} = await params;
    const pageData = await getPageData(slug);
    return <Page pageData={pageData} />
}


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
}

