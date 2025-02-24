import client from "@/lib/apollo-client";
import {FeaturedPostType, MenusList} from "@/types";
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
         featuredPost: await getLatestPost(),
         menus: await getAllMenus()
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
        menus: await getAllMenus()
    };
}

const WORDPRESS_API_URL = 'https://cosmonew1.wpenginepowered.com';

export const getAllMenus = async () => {

   /* const menu = getFromCache('menu');
    if (menu) {
        console.log('load menu from cache');
        return menu;
    }*/

    const menusList: MenusList = {};
    try {
        const time = new Date().getTime();
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp-api-menus/v2/menus?cache=${time}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
           return [];
        }
        const menus = await response.json();
        await Promise.all(
            menus.map(async (menu: any) => {
                const itemsResponse = await fetch(`${WORDPRESS_API_URL}/wp-json/wp-api-menus/v2/menus/${menu.ID}?cache=${time}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!itemsResponse.ok) {
                    console.error(`Failed to fetch items for menu ${menu.ID}`);
                    return {
                        ...menu,
                        items: [],
                    };
                }
                const itemsResponseData = await itemsResponse.json();
                menusList[menu.slug] = {
                    name: menu.name,
                    slug: menu.slug,
                    items: itemsResponseData.items.map((item: any) => ({
                        url: item.url,
                        title: item.title,
                        description: item.description,
                        items: item.children.map((item: any) => ({
                            url: item.url,
                            title: item.title,
                            description: item.description,
                        }))
                    }))
                }
            })
        );

       /* saveToCache('menu', menusList);
*/
        return menusList;
    } catch (error) {
        console.error(error);
        return [];
    }
};

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
        menus: await getAllMenus()
    };
}

