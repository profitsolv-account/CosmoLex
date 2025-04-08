import {PageDataType, ShortPostType} from "@/types";
import {getLatestPosts} from "@/lib/queries/wordpress";
import {getAllMenus} from "@/lib/queries/menus";
import {getSiteSettings} from "@/lib/queries/settings";
import {getLatestGuide} from "@/lib/queries/resources";

const POSTS_PER_PAGE = 10;
const API = process.env.WORDPRESS_API_URL || 'https://cosmonew1.wpenginepowered.com';
const BASE_URL = `${API}/wp-json/wp/v2`;

export const getKBCategoryData = async (slug: string, page: number): Promise<PageDataType> => {
    const taxonomy = 'epkb_post_type_1_category';

    const response = await fetch(`${BASE_URL}/${taxonomy}?slug=${slug}`);
    const data = await response.json();
    if (!data) {
        throw new Error("Failed to fetch blog data");
    }

    const termId = data[0].id;

    const postsResponse = await fetch(
        `${BASE_URL}/epkb_post_type_1?${taxonomy}=${termId}&page=${page}&per_page=${POSTS_PER_PAGE}&_embed=true`
    );
    const postsData = await postsResponse.json();
    const totalPosts = +(postsResponse.headers.get('X-WP-Total') || 0);

    const posts:ShortPostType[] = postsData.map((post: any) => ({
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
        title: data[0].name,
        content: "",
        id: "",
        date: "",
        total: totalPosts
    };
};