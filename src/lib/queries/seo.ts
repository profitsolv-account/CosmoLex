import client from "@/lib/apollo-client";
import {gql} from "@apollo/client";

export const getSEOData = async (pageSlug: string) => {

    const { data } = await client.query({
        query: gql`
            query GetHomePageSEO {
                page(id: "${pageSlug}" , idType: URI) {
                    seo {
                        title
                        metaDesc
                        metaKeywords
                        opengraphImage {
                            sourceUrl
                        }
                    }
                }
            }
        `,
        //context: { fetchOptions: { next: { revalidate: 10 } } },
        fetchPolicy: "no-cache",
        variables: { pageSlug }
    })

    const seo = data.page.seo

    return {
        title: seo?.title || 'Home - Default Title',
        description: seo?.metaDesc || 'Home - Default Description',
        keywords: seo?.metaKeywords || 'Home, Keywords',
        openGraph: {
            images: seo?.opengraphImage?.sourceUrl ? [{ url: seo.opengraphImage.sourceUrl }] : [],
        },
    }
}