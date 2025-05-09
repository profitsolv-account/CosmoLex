import client, {cacheOption} from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {KnowledgeBaseCategory, Resource} from "@/types/resources";
import {FeaturedPostType, PagedItemsResponse} from "@/types";

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
        fetchPolicy: cacheOption,
        context: {
            fetchOptions: {
                next: {
                    tags: ['resources'],
                },
            },
        },
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

export const getResourcesUnionData = async (
    afterCursor: string | null = null,
    first: number = 15,
    searchQuery: string = ''
): Promise<PagedItemsResponse<Resource>> => {
    const query = gql`
        query GetResources($after: String, $first: Int, $search: String) {
            contentNodes(
                first: $first
                after: $after
                where: {
                    contentTypes: [GUIDE, INFOGRAPHIC]
                    orderby: { field: DATE, order: DESC }
                    search: $search
                }
            ) {
                pageInfo {
                    endCursor
                    hasNextPage
                }
                edges {
                    node {
                        __typename
                        ... on Guide {
                            id
                            date
                            title
                            uri
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
                        ... on Infographic {
                            id
                            date
                            title
                            uri
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
        }
    `;

    const { data } = await client.query({
        query,
        fetchPolicy: cacheOption,
        variables: {
            after: afterCursor,
            first,
            search: searchQuery || null,
        },
        context: {
            fetchOptions: {
                next: {
                    tags: ['resources'],
                },
            },
        },
    });

    const items = data.contentNodes.edges.map((r: any) => ({
        ...r,
        type: r.node.__typename,
        node: {
            ...r.node,
            fields:
                r.node.__typename === 'Guide'
                    ? r.node.guidesFields
                    : r.node.infographicsFields,
        },
    }));

    return {
        items,
        pageInfo: data.contentNodes.pageInfo,
    };

}

export const getWebinarsData = async (
    afterCursor: string | null = null,
    first: number = 15,
     searchQuery: string = ''
): Promise<PagedItemsResponse<Resource>> => {

    const query = gql`
                query GetResources(
                    $after: String
                    $first: Int
                    $search: String
                ) {
                    webinars( first: $first
                        after: $after
                        where: {
                            search: $search
                        }) {
                        pageInfo {
                            endCursor
                            hasNextPage
                        }
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
        `;

    const { data } = await client.query({
        query,
        fetchPolicy: cacheOption,
        context: {
            fetchOptions: {
                next: {
                    tags: ['resources'],
                },
            },
        },
            variables: {
                after: afterCursor,
                first,
                search: searchQuery || null,
            },
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

    return {
        items: formattedData.sort((a: Resource, b: Resource) => new Date(b.node.date).getTime() - new Date(a.node.date).getTime()),
        pageInfo: {
            endCursor: data.webinars.pageInfo.endCursor,
            hasNextPage: data.webinars.pageInfo.hasNextPage,
        },
    };

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
        fetchPolicy: cacheOption,
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
        fetchPolicy: cacheOption,
        variables: { pageSlug },
    })
    return get(data, 'knowledgeBaseCategories.edges', []);
}

export const getLatestGuide = async (): Promise<FeaturedPostType> => {
    const { data } = await client.query({
        query: gql`
            query GetLatestGuide {
                guides(first: 1000) {
                    edges {
                        node {
                            id
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
                                isFeatured
                                featuredImage {
                                    node {
                                        altText
                                        sourceUrl
                                        mediaDetails {
                                            width
                                            height
                                        }
                                    }
                                }
                            }
                            content
                        }
                    }
                }
            }
        `,
        fetchPolicy: cacheOption,
        context: {
            fetchOptions: {
                next: {
                   tags: ['resources'],
                },
            },
        },
    });
    const guides = get(data, 'guides.edges', []);

    const featuredPost = guides.find((guide: any) => guide.node.guidesFields.isFeatured);

   return {
       title: get(featuredPost, 'node.title', ''),
       slug: get(featuredPost, 'node.guidesFields.ctaLink', ''),
       ctaText: get(featuredPost, 'node.guidesFields.ctaText', null),
       featuredImage: {
           altText: get(featuredPost, 'node.guidesFields.featuredImage.node.altText', ''),
           sourceUrl: get(featuredPost, 'node.guidesFields.featuredImage.node.sourceUrl', ''),
           mediaDetails: {
               width: get(featuredPost, 'node.guidesFields.featuredImage.node.mediaDetails.width', 0),
               height: get(featuredPost, 'node.guidesFields.featuredImage.node.mediaDetails.height', 0),
           }
       }
   }
}