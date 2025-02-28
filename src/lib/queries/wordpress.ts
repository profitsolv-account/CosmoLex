import client from "@/lib/apollo-client";
import {FeaturedPostType, MenusList, PageDataType} from "@/types";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {getAllMenus} from "@/lib/queries/menus";
import {getSiteSettings} from "@/lib/queries/settings";
import {getTestimonialsList} from "@/lib/queries/testimonials";

export const getHomePageData = async () => {
    const { data } = await client.query({
        query: gql`
            query GetHomePage {
                page(id: "home-page", idType: URI) {
                    id
                    title
                    date
                    content
                    pageSettings {
                        description
                        title
                        heroImage {
                            node {
                                altText
                                sourceUrl(size: LARGE)
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: "no-cache",
    });

     return {
        ...get(data, 'page', {}),
         title: get(data, 'page.pageSettings.title', ''),
         description: get(data, 'page.pageSettings.description', ''),
         hero: get(data, 'page.pageSettings.heroImage.node.sourceUrl', ''),
         heroAlt: get(data, 'page.pageSettings.heroImage.node.altText', ''),
         featuredPost: (await getLatestPosts(1))[0],
         menus: await getAllMenus(),
         settings: await getSiteSettings(),
         testimonials: await getTestimonialsList(),
    };
}

export const getLatestPosts = async (postsCount = 1): Promise<FeaturedPostType[]> => {
   /* const posts = getFromCache("posts");
   if (posts) {
       const post = posts[posts.length - 1];
       return post.featuredPost
   }*/

    const { data } = await client.query({
        query: gql`
            query GetLatestPost {
                posts(first: ${postsCount}) {
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

    return get(data, 'posts.nodes', []).map((postData: any) => ({
        title: postData.title,
        slug: postData.slug,
        featuredImage: postData.featuredImage.node.sourceUrl,
        altText: postData.featuredImage.node.altText
    }))
}

export const getPageData = async (pageSlug: string): Promise<PageDataType> => {
    const { data } = await client.query({
        query: gql`
            query GetPage {
                page(id: "${pageSlug}", idType: URI) {
                    id
                    title
                    date
                    content,
                    pageSettings {
                        description
                        title
                        heroImage {
                            node {
                                altText
                                sourceUrl
                            }
                        }
                        features {
                            description
                            title
                        }
                    }
                }
            }
        `,
        fetchPolicy: "no-cache",
        variables: { pageSlug },
    });

    if (!data.page) {
        throw new Error("Page not found");
    }

    const pageData = get(data, 'page', {});
    const title = get(data, 'page.pageSettings.title', null) || get(data, 'page.title', '');
    const features = get(data, 'page.pageSettings.features', []);

    return {
        ...pageData,
        featuredPost: (await getLatestPosts(1))[0],
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        title,
        description: get(data, 'page.pageSettings.description', ''),
        hero: get(data, 'page.pageSettings.heroImage.node.sourceUrl', ''),
        heroAlt: get(data, 'page.pageSettings.heroImage.node.altText', ''),
        features
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

    if (!data.post) {
        throw new Error("Post not found");
    }

    const post = get(data, 'post', {});

    const latestPosts = await getLatestPosts(5);
    return {
        ...post,
        featuredPost: latestPosts[0],
        featuredImage: post.featuredImage?.node?.sourceUrl || "",
        altText: post.featuredImage?.node?.altText || "",
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        latestPosts
    };
}

