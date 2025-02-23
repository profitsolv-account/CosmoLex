import {gql} from "@apollo/client";
import client from "@/lib/apollo-client";
import {getLatestPost} from "@/lib/queries/wordpress";
import fs from 'fs';
import path from 'path';

const POSTS_PER_PAGE = 10;
const BASE_URL = 'https://cosmonew1.wpenginepowered.com/wp-json/wp/v2';

export const getBlogData = async (page: number) => {
    try {
        const res = await fetch(`${BASE_URL}/posts?page=${page}&per_page=${POSTS_PER_PAGE}&_embed=true`);
        const data = await res.json();

        const posts = data.map((post: any) => ({
            id: post.id,
            title: post.title.rendered,
            slug: post.slug,
            date: post.date,
            excerpt: post.excerpt.rendered,
            featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "",
            altText: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || "",
        }));

        const featuredPost = await getLatestPost();

        return {
            posts,
            featuredPost,
        };
    } catch (error) {
        console.error("Failed to fetch blog data:", error);
        return {
            posts: [],
            featuredPost: null,
            hasNextPage: false,
        };
    }
};

/**
 * Get the total number of posts
 */
export const getTotalPostsCount = async () => {
    const { data } = await client.query({
        query: gql`
            query GetTotalPostsCount {
                posts(first: 100000) {
                    nodes {
                        id
                    }
                }
            }
        `,
        fetchPolicy: "no-cache",
    });

    const totalPosts = data.posts.nodes.length;
    return totalPosts;
};


/**
 * Get the total number of pages
 */
export const getTotalPages = async () => {
    const totalPosts = await getTotalPostsCount();
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    return {
        pages: totalPages
    };
};


export const getAllPostSlugs = async () => {

    const featuredPost = await getLatestPost();

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
                first: 100, // Fetch 100 posts at a time
            },
            fetchPolicy: 'cache-first',
        });

        const newPosts = data.posts.nodes.map((post: any) => ({
            ...post,
            slug: post.slug,
            featuredImage: post.featuredImage?.node?.sourceUrl || "",
            altText: post.featuredImage?.node?.altText || "",
            featuredPost
        }));

        // Combine new posts with previously accumulated posts
        const allPosts = [...accumulatedPosts, ...newPosts];

        // If there's another page, fetch more recursively
        if (data.posts.pageInfo.hasNextPage) {
            return await fetchAllPosts(data.posts.pageInfo.endCursor, allPosts);
        }

        // Return all accumulated posts when no more pages
        return allPosts;
    };

    const allPosts = await fetchAllPosts();

    const filePath = path.join(process.cwd(), 'cache', 'posts.json');
    // Створюємо директорію, якщо її не існує
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Зберігаємо дані у JSON-файл
    fs.writeFileSync(filePath, JSON.stringify(allPosts));

    return allPosts;
};


export interface PostSlug {
    slug: string;
}

let cachedSlugs: any = [];
export const __getAllPostSlugs = async (): Promise<PostSlug[]> => {

    if (cachedSlugs.length > 0) return cachedSlugs;
    let allSlugs: PostSlug[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        try {
            const response = await fetch(
                `https://cosmonew1.wpenginepowered.com/wp-json/wp/v2/posts?per_page=100&page=${page}&_fields=slug`
            );

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data: Array<{ slug: string }> = await response.json();

            // Check if the data is an array and contains slugs
            if (Array.isArray(data) && data.length > 0) {
                allSlugs = [...allSlugs, ...data.map(post => ({ slug: post.slug }))];
                page++;
            } else {
                hasMore = false;
            }
        } catch (error) {
            console.error('Error fetching post slugs:', error);
            hasMore = false;
        }
    }

    cachedSlugs = allSlugs;
    return allSlugs;
};


