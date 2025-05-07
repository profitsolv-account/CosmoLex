import {gql} from "@apollo/client";
import client, {cacheOption} from "@/lib/apollo-client";
import {getAllMenus} from "@/lib/queries/menus";
import {getSiteSettings} from "@/lib/queries/settings";
import {getLatestPosts} from "@/lib/queries/wordpress";
import {PageDataType, PostsDataResponse, ShortPostType} from "@/types";
import {getLatestGuide} from "@/lib/queries/resources";

const POSTS_PER_PAGE = 10;
const API = process.env.WORDPRESS_API_URL || 'https://cosmonew1.wpenginepowered.com';
const BASE_URL = `${API}/wp-json/wp/v2`;

export const getBlogPageData = async (): Promise<PageDataType | null> => {

    const latestPosts = await getLatestPosts(5);
    return {
        featuredPost: await getLatestGuide(),
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        latestPosts,
        title: "Blog",
        content: "",
        id: "",
        date: "",
    };
};

export const getPosts = async (
    afterCursor: string | null = null,
    first: number = 15
): Promise<PostsDataResponse> => {
    try {
        const query = gql`
            query GetPosts($after: String, $first: Int) {
                posts(first: $first, after: $after) {
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                    edges {
                        node {
                            id
                            slug
                            title
                            excerpt(format: RENDERED)
                            featuredImage {
                                node {
                                    sourceUrl(size: MEDIUM)
                                }
                            }
                        }
                    }
                }
            }
        `;

        const { data } = await client.query({
            query,
            variables: {
                after: afterCursor,
                first,
            },
        });

       // if (!data?.posts) return null;

        return {
            posts: data.posts.edges.map((edge: any) => edge.node),
            pageInfo: {
                endCursor: data.posts.pageInfo.endCursor,
                hasNextPage: data.posts.pageInfo.endCursor
            },
        };
    } catch (e) {
        console.error("Error loading posts:", e);

        return {
            posts: [],
            pageInfo: {
                endCursor: '',
                hasNextPage: false
            }
        };
    }
};


export const getBlogData = async (page: number): Promise<PageDataType | null> => {
    const res = await fetch(`${BASE_URL}/posts?page=${page}&per_page=${POSTS_PER_PAGE}&_embed=true`,
        {
            next: {
                tags: ['blog']
            }
        });

    const data = await res.json();

    if (!data) {
        return null;
    }

    const totalPosts = +(res.headers.get('X-WP-Total') || 0);

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
        featuredPost: await getLatestGuide(),
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        latestPosts,
        title: "Blog",
        content: "",
        id: "",
        date: "",
        total: totalPosts
    };
};
