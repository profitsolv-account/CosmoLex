import client from "@/lib/apollo-client";
import {FeaturedPostType, MenusList} from "@/types";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {getAllMenus} from "@/lib/queries/menus";
import {getSiteSettings} from "@/lib/queries/settings";

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
         featuredPost: await getLatestPost(),
         menus: await getAllMenus(),
         settings: await getSiteSettings()
    };
}

export const getLatestPost = async (): Promise<FeaturedPostType> => {
   /* const posts = getFromCache("posts");
   if (posts) {
       const post = posts[posts.length - 1];
       return post.featuredPost
   }*/

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
        fetchPolicy: "no-cache",
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
        fetchPolicy: "no-cache",
        variables: { pageSlug },
    });
    return {
        ...get(data, 'page', {}),
        featuredPost: await getLatestPost(),
        menus: await getAllMenus(),
        settings: await getSiteSettings()
    };
}

export const getPostData = async (pageSlug: string) => {

   /* const posts = getFromCache("posts")
    const pageData = posts.find((post: any) => post.slug === pageSlug);
    if (pageData) return pageData;*/

    const { data } = await client.query({
        query: gql`
            query GetPage {
                post(id: "${pageSlug}", idType: URI) {
                    id
                    title
                    date
                    content
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                }
            }
        `,
        fetchPolicy: "no-cache",
        variables: { pageSlug },
    });

    const post = get(data, 'post', {});

    return {
        ...post,
        featuredPost: await getLatestPost(),
        featuredImage: post.featuredImage?.node?.sourceUrl || "",
        altText: post.featuredImage?.node?.altText || "",
        menus: await getAllMenus(),
        settings: await getSiteSettings()
    };
}

