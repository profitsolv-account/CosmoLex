import client from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {KnowledgeBaseCategory, Resource} from "@/types/resources";

export const getResourcesData = async (): Promise<Resource[]> => {

    const { data } = await client.query({
        query: gql`
            query GetResources {
                guides(first: 1000) {
                    edges {
                        node {
                            id,
                            date
                            title
                            uri
                            status
                            featuredImage {
                                node {
                                    sourceUrl(size: LARGE)
                                    mediaDetails {
                                        width
                                        height
                                    }
                                }
                            }
                            guidesFields {
                                ctaLink
                                tags
                            }
                            content
                        }
                    }
                }
                infographics(first: 1000) {
                    edges {
                        node {
                            id,
                            date,
                            title
                            uri
                            status
                            featuredImage {
                                node {
                                    sourceUrl(size: LARGE)
                                    mediaDetails {
                                        width
                                        height
                                    }
                                }
                            }
                            infographicsFields {
                                ctaLink
                                tags
                                isItAnInfographicOrChecklist
                            }
                            content
                        }
                    }
                }
                
            }
        `,
        fetchPolicy: "cache-first"
    });

    const formattedData = [
        ...get(data, 'guides.edges', []).map((r: any) => ({
            ...r,
            type: 'Guide',
            node: {
                ...r.node,
                fields: r.node.guidesFields
            }
        })),

        ...get(data, 'infographics.edges', []).map((r: any) => ({
            ...r,
            type: r.node.infographicsFields.isItAnInfographicOrChecklist,
            node: {
                ...r.node,
                fields: r.node.infographicsFields
            }
        })),
    ]

    return formattedData.sort((a: Resource, b: Resource) => new Date(b.node.date).getTime() - new Date(a.node.date).getTime());

}

export const getWebinarsData = async (): Promise<Resource[]> => {

    const { data } = await client.query({
        query: gql`
            query GetResources {
                webinars(first: 1000) {
                    edges {
                        node {
                            id,
                            date,
                            title
                            uri
                            status
                            featuredImage {
                                node {
                                    sourceUrl(size: LARGE)
                                    mediaDetails {
                                        width
                                        height
                                    }
                                }
                            }
                            webinarFields {
                                ctaLink
                                tags
                                ctaText
                            }
                            content
                        }
                    }
                }

            }
        `,
        fetchPolicy: "cache-first"
    });

    const formattedData = [
        ...get(data, 'webinars.edges', []).map((r: any) => ({
            ...r,
            type: 'Webinar',
            node: {
                ...r.node,
                fields: r.node.webinarFields
            }
        })),
    ]

    return formattedData.sort((a: Resource, b: Resource) => new Date(b.node.date).getTime() - new Date(a.node.date).getTime());

}

export const getKBData = async (): Promise<KnowledgeBaseCategory[]> => {
    const { data } = await client.query({
        query: gql`
            query GetKBData {
                knowledgeBaseCategories(first: 10000) {
                    edges {
                        node {
                            name
                            slug
                            uri
                            knowledgeBaseArticles(first: 10000) {
                                nodes {
                                    id
                                    date
                                    slug
                                    title
                                }
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: "cache-first",
        variables: {},
    })
    return get(data, 'knowledgeBaseCategories.edges', []);
}


export const getKBCategoryData = async (pageSlug: string): Promise<KnowledgeBaseCategory[]> => {
    const { data } = await client.query({
        query: gql`
            query GetKBData {
                knowledgeBaseCategory(id: "${pageSlug}", idType: SLUG) {
                    edges {
                        node {
                            name
                            slug
                            uri
                            knowledgeBaseArticles(first: 10000) {
                                nodes {
                                    id
                                    date
                                    slug
                                    title
                                }
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: "cache-first",
        variables: { pageSlug },
    })
    return get(data, 'knowledgeBaseCategories.edges', []);
}