import client from "@/lib/apollo-client";
import { FeaturedPostType } from "@/types";
import {gql} from "@apollo/client";
import {get} from "lodash";

export const getHomePageData = async () => {

    const { data } = await client.query({
        query: gql`
            query GetHomePage {
                page(id: "home-page", idType: URI) {
                    id
                    title
                    date
                    content
                }
            }
        `,
        fetchPolicy: "no-cache",
    });
    return get(data, 'page', {});
}

export const getPageData = async (pageSlug: string) => {
    const { data } = await client.query({
        query: gql`
            query GetHPage {
                page(id: "${pageSlug}", idType: URI) {
                    id
                    title
                    date
                    content
                }
            }
        `,
        fetchPolicy: "no-cache",
        variables: { pageSlug }
    });
    return get(data, 'page', {});
}

export const getLatestPost = async (): Promise<FeaturedPostType> => {
    const { data } = await client.query({
        query: gql`
            query GetLatestPost {
                posts(first: 1) {
                    nodes {
                        title
                        slug
                        featuredImage {
                            node {
                                sourceUrl
                                altText
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: "no-cache"
    });
    
    const postData = get(data, 'posts.nodes[0]', {featuredImage: {node: {sourceUrl: '', altText: ''}}});
    return {
        title: postData.title,
        slug: postData.slug,
        featuredImage: postData.featuredImage.node.sourceUrl,
        altText: postData.featuredImage.node.altText
    }
}
