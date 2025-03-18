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
                            webinarFields {
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
                            webinarFields {
                                ctaLink
                                tags
                            }
                            content
                        }
                    }
                }
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
                            }
                            content
                        }
                    }
                }
                
            }
        `,
        fetchPolicy: "cache-first"
    });

    return [
        ...get(data, 'guides.edges', []).map((r: Resource) => ({...r, type: 'guide'})),
        ...get(data, 'infographics.edges', []).map((r: Resource) => ({...r, type: 'infographic'})),
        ...get(data, 'webinars.edges', []).map((r: Resource) => ({...r, type: 'webinar'})),

    ].sort((a: Resource, b: Resource) => new Date(b.node.date).getTime() - new Date(a.node.date).getTime());

}

export const getKBData = async (): Promise<KnowledgeBaseCategory[]> => {
    const { data } = await client.query({
        query: gql`
            query GetKBData {
                knowledgeBaseCategories {
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