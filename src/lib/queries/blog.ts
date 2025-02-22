import {gql} from "@apollo/client";
import client from "@/lib/apollo-client";
import {getLatestPost} from "@/lib/queries/wordpress";

const POSTS_PER_PAGE = 10;

export const getBlogData = async (page: number) => {
    const getCursor = async (page: number) => {
        if (page <= 1) return null;

        const skipPosts = (page - 1) * POSTS_PER_PAGE;

        const { data } = await client.query({
            query: gql`
                query GetPreviousCursor($first: Int) {
                    posts(first: $first) {
                        pageInfo {
                            endCursor
                        }
                    }
                }
            `,
            variables: {
                first: skipPosts,
            },
            fetchPolicy: "no-cache",
        });

        return data.posts.pageInfo.endCursor || null;
    };

    const afterCursor = await getCursor(page);

    const { data } = await client.query({
        query: gql`
            query GetBlogPosts($after: String, $first: Int) {
                posts(first: $first, after: $after) {
                    nodes {
                        id
                        title
                        slug
                        date
                        excerpt
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
            after: afterCursor,
            first: POSTS_PER_PAGE,
        },
        fetchPolicy: "no-cache"
    });

    const featuredPost = await getLatestPost();

    const posts = data.posts.nodes.map((post: any) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt,
        featuredImage: post.featuredImage?.node?.sourceUrl || "",
        altText: post.featuredImage?.node?.altText || "",
    }));

    return {
        posts,
        featuredPost,
        hasNextPage: data.posts.pageInfo.hasNextPage,
    };
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


export const getAllPosts = async () => {
    const fetchAllPosts = async (after: string | null = null, accumulatedPosts: any[] = []) => {
        const { data } = await client.query({
            query: gql`
                query GetAllPosts($after: String, $first: Int) {
                    posts(first: $first, after: $after) {
                        nodes {
                            slug
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
            fetchPolicy: "no-cache",
        });

        const newPosts = data.posts.nodes.map((post: any) => ({
            slug: post.slug,
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
    return allPosts;
};


export interface PostSlug {
    slug: string;
}

let cachedSlugs: any = [];
export const getAllPostSlugs = async (): Promise<PostSlug[]> => {

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


