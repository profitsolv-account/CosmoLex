import client, {cacheOption} from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {PodcastType} from "@/types";


export const getPodcastsData = async (id: string): Promise<PodcastType[]> => {

    const query = gql`
        query GetPage($id: ID!) {
            pages(where: {parent: $id}) {
                edges {
                    node {
                        id
                        title
                        content
                        slug
                        pageSettings {
                            title
                            heroImage {
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
                    }
                }
            }
        }
    `;

    const { data } = await client.query({
        query,
        variables: { id },
        fetchPolicy: cacheOption
    });

    const pages = get(data, "pages.edges", []);

    return pages.map((p: any) => ({
        id: p.node.id,
        title: p.node.title,
        content: p.node.content,
        heroImage: p.node.pageSettings.heroImage,
        slug: p.node.slug
    }))
}

export const getPodcastData = async (
    pageSlug: string,
): Promise<PodcastType> => {
    const query = gql`
        query GetPage($id: ID!) {
            page(id: $id, idType: URI) {
                id
                title
                content
                pageSettings {
                    code
                    heroImage {
                        node {
                            altText
                            sourceUrl
                            mediaDetails {
                                width
                                height
                            }
                        }
                    }
                    title
                    subheading
                }
            }
        }
    `;

    const { data } = await client.query({
        query,
        variables: { id: pageSlug },
        fetchPolicy: cacheOption
    });

    if (!data.page) {
        throw new Error("Page not found");
    }

    const page = get(data, "page", {});

    return {
        id: page.id,
        title: page.title,
        content: page.content,
        heroImage: page.pageSettings.heroImage,
        slug: page.slug,
        code: page.pageSettings.code
    };
};
