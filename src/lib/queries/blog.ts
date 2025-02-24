import {gql} from "@apollo/client";
import client from "@/lib/apollo-client";
import {getAllMenus, getLatestPost} from "@/lib/queries/wordpress";
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
            menus: await getAllMenus()
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
                first: 100,
            },
            fetchPolicy: 'no-cache',
        });

        const newPosts = data.posts.nodes.map((post: any) => ({
            ...post,
            slug: post.slug,
            featuredImage: post.featuredImage?.node?.sourceUrl || "",
            altText: post.featuredImage?.node?.altText || "",
            featuredPost
        }));

        const allPosts = [...accumulatedPosts, ...newPosts];

        if (data.posts.pageInfo.hasNextPage) {
            return await fetchAllPosts(data.posts.pageInfo.endCursor, allPosts);
        }

        return allPosts;
    };

    const allPosts = await fetchAllPosts();

    const filePath = path.join(process.cwd(), 'cache', 'posts.json');
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(allPosts));

    return allPosts;
};
