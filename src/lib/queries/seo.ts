import client, {cacheOption} from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {PostDataType} from "@/types/post";
import {getAllMenus} from "@/lib/queries/menus";
import {getSiteSettings} from "@/lib/queries/settings";
import {getLatestPosts} from "@/lib/queries/wordpress";

export const getSEOData = async (pageSlug: string) => {

    const { data } = await client.query({
        query: gql`
            query GetHomePageSEO {
                page(id: "${pageSlug}" , idType: URI) {
                    id
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
        fetchPolicy: cacheOption,
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
                    id
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
        fetchPolicy: cacheOption,
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

export const getKbSEOData = async (pageSlug: string) => {

    const { data } = await client.query({
        query: gql`
            query GetHomePageSEO {
                knowledgeBaseArticle(id: "${pageSlug}" , idType: URI) {
                    id
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
        fetchPolicy: cacheOption,
        variables: { pageSlug },
    })

    const seo = get(data, 'knowledgeBaseArticle.seo', {});
    const title = get(data, 'knowledgeBaseArticle.title', '');

    return {
        title: seo?.title || title,
        description: seo?.metaDesc || '',
        keywords: seo?.metaKeywords || '',
        openGraph: {
            images: seo?.opengraphImage?.sourceUrl ? [{ url: seo.opengraphImage.sourceUrl }] : [],
        },
    }
}

