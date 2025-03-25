import { DirectoryType } from '@/types';

const POSTS_PER_PAGE = 10;
const API = process.env.BASE_URL || 'https://cosmonew1.wpenginepowered.com';
const BASE_URL = `${API}/wp-json/wp/v2`;

type TaxonomyTerm = {
    id: number;
    name: string;
    slug: string;
};

type DirectoryPostType = DirectoryType & {
    categories: TaxonomyTerm[];
    [taxonomy: string]: any;
};

type ResponseType = {
    posts: DirectoryPostType[];
    totalPosts: number;
};

const fetchTaxonomyTerms = async (taxonomy: string, ids: number[]): Promise<TaxonomyTerm[]> => {
    if (!ids.length) return [];
    const response = await fetch(`${BASE_URL}/${taxonomy}?include=${ids.join(',')}`);
    return response.json();
};

export const getDirectoriesData = async (page: number): Promise<ResponseType> => {
    const postsResponse = await fetch(
        `${BASE_URL}/directory?page=${page}&per_page=${POSTS_PER_PAGE}&_embed=true`
    );

    const postsData = await postsResponse.json();
    const totalPosts = +(postsResponse.headers.get('X-WP-Total') || 0);

    const posts: DirectoryPostType[] = await Promise.all(
        postsData.map(async (post: any) => {
            const categoryIds = post['listing-category'] || [];
            const locationIds = post.location || [];

            const categories = await fetchTaxonomyTerms('listing-category', categoryIds);
            const locations = await fetchTaxonomyTerms('location', locationIds);

            // You can add other taxonomies similarly if needed, e.g., 'tags' or custom taxonomies
            return {
                id: post.id,
                title: post.title.rendered,
                featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
                altText: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '',
                address: post.acf.address,
                email: post.acf.email,
                phone: post.acf.phone,
                website: post.acf.website,
                category: categories[0]?.name || '',
                locations
            };
        })
    );

    console.log(posts);
    return {
        posts,
        totalPosts,
    };
};
