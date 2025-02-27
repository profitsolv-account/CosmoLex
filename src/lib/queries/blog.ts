import {gql} from "@apollo/client";
import client from "@/lib/apollo-client";
import {getAllMenus} from "@/lib/queries/menus";
import {getSiteSettings} from "@/lib/queries/settings";
import {getLatestPosts} from "@/lib/queries/wordpress";
import {PageDataType, ShortPostType} from "@/types";

const POSTS_PER_PAGE = 10;
const BASE_URL = 'https://cosmonew1.wpenginepowered.com/wp-json/wp/v2';

export const getBlogData = async (page: number): Promise<PageDataType> => {
    const res = await fetch(`${BASE_URL}/posts?page=${page}&per_page=${POSTS_PER_PAGE}&_embed=true`);
    const data = await res.json();

    if (!data) {
        throw new Error("Failed to fetch blog data");
    }

    const posts:ShortPostType[] = data.map((post: any) => ({
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt.rendered,
        featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "",
        altText: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || "",
    }));

    const latestPosts = await getLatestPosts(5);
    return {
        posts,
        featuredPost: latestPosts[0],
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        latestPosts,
        title: "Blog",
        content: "",
        id: "",
        date: ""
    };
};


export const getAllPostSlugs = async () => {
   /* const cachedPosts = getFromCache('posts');
    if (cachedPosts) {
        return cachedPosts;
    }*/

    const featuredPost = (await getLatestPosts(0))[0];
    const menus =  await getAllMenus();

    const fetchAllPosts = async (after: string | null = null, accumulatedPosts: any[] = []) => {
        const { data } = await client.query({
            query: gql`
                query GetAllPosts($after: String, $first: Int) {
                    posts(first: $first, after: $after) {
                        nodes {
                            slug
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
                        pageInfo {
                            hasNextPage
                            endCursor
                        }
                    }
                }
            `,
            variables: {
                after,
                first: 100,
            },
            fetchPolicy: 'no-cache',
        });

        const newPosts = data.posts.nodes.map((post: any) => ({
            ...post,
            slug: post.slug,
            featuredImage: post.featuredImage?.node?.sourceUrl || "",
            altText: post.featuredImage?.node?.altText || "",
            featuredPost,
            menus
        }));

        const allPosts = [...accumulatedPosts, ...newPosts];

        if (data.posts.pageInfo.hasNextPage) {
            return await fetchAllPosts(data.posts.pageInfo.endCursor, allPosts);
        }

        return allPosts;
    };

    const allPosts = await fetchAllPosts();
   // saveToCache('posts', allPosts);

    return allPosts;
};
