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

     return {
        ...get(data, 'page', {}),
         featuredPost: await getLatestPost()
    };
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
        //fetchPolicy: "no-cache"
        context: { fetchOptions: { next: { revalidate: 10 } } },
    });

    const postData = get(data, 'posts.nodes[0]', {featuredImage: {node: {sourceUrl: '', altText: ''}}});
    return {
        title: postData.title,
        slug: postData.slug,
        featuredImage: postData.featuredImage.node.sourceUrl,
        altText: postData.featuredImage.node.altText
    }
}

export const getPageData = async (pageSlug: string) => {
    const { data } = await client.query({
        query: gql`
            query GetPage {
                page(id: "${pageSlug}", idType: URI) {
                    id
                    title
                    date
                    content
                }
            }
        `,
        //fetchPolicy: "no-cache",
        variables: { pageSlug }
    });
    return {
        ...get(data, 'page', {}),
        featuredPost: await getLatestPost()
    };
}

export const _getPostData = async (pageSlug: string) => {
    const { data } = await client.query({
        query: gql`
            query GetPage {
                post(id: "${pageSlug}", idType: URI) {
                    id
                    title
                    date
                    content
                }
            }
        `,
        //fetchPolicy: "no-cache",
        variables: { pageSlug }
    });
    return {
        ...get(data, 'post', {}),
        featuredPost: await getLatestPost()
    };
}

export async function getPostData(pageSlug: string) {
    const response = await fetch(`https://cosmonew1.wpenginepowered.com/wp-json/wp/v2/posts?slug=${pageSlug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store' // Ensure fresh data on each request
    });

    // Return null if the request fails
    if (!response.ok) {
        console.error(`Failed to fetch post data for slug: ${pageSlug}`);
        return null;
    }

    const data = await response.json();
    // Return null if no post is found
    if (!data || data.length === 0) {
        return null;
    }

    const post = data[0];

    return {
        id: post.id,
        title: post.title.rendered,
        date: post.date,
        content: post.content.rendered,
        featuredPost: await getLatestPost()
    };
}


