import client from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";

export const getSEOData = async (pageSlug: string) => {

    const { data } = await client.query({
        query: gql`
            query GetHomePageSEO {
                page(id: "${pageSlug}" , idType: URI) {
                    title
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
        fetchPolicy: "cache-first",
        variables: { pageSlug },
    })

    const seo = get(data, 'page.seo', {});

    return {
        title: seo?.title || '',
        description: seo?.metaDesc || '',
        keywords: seo?.metaKeywords || '',
        openGraph: {
            images: seo?.opengraphImage?.sourceUrl ? [{ url: seo.opengraphImage.sourceUrl }] : [],
        },
    }
}

export const getPostSEOData = async (pageSlug: string) => {

    const { data } = await client.query({
        query: gql`
            query GetHomePageSEO {
                post(id: "${pageSlug}" , idType: URI) {
                    title
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
        fetchPolicy: "cache-first",
        variables: { pageSlug },
    })

    const seo = get(data, 'post.seo', {});
    const title = get(data, 'post.title', '');

    return {
        title: seo?.title || title,
        description: seo?.metaDesc || '',
        keywords: seo?.metaKeywords || '',
        openGraph: {
            images: seo?.opengraphImage?.sourceUrl ? [{ url: seo.opengraphImage.sourceUrl }] : [],
        },
    }
}