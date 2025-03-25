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

export const fetchTaxonomyTerms = async (taxonomy: string, ids: number[]): Promise<TaxonomyTerm[]> => {
    if (!ids.length) {
        const response = await fetch(`${BASE_URL}/${taxonomy}?per_page=100`);
        return response.json();
    }
    const response = await fetch(`${BASE_URL}/${taxonomy}?include=${ids.join(',')}`);
    return response.json();
};

export const getDirectoriesData = async (page: number, options: {
    s?: string; // Search term for title
    ctas?: string; // Single category ID
    locs?: string; // Single location ID
}): Promise<ResponseType> => {
    // Start constructing the URL
    let url = `${BASE_URL}/directory?page=${page}&per_page=${POSTS_PER_PAGE}&_embed=true`;

    // Add search query (s)
    if (options.s) {
        console.log(`Adding search term to URL: s=${options.s}`); // Debugging line
        url += `&s=${encodeURIComponent(options.s)}`;
    }

    // Add category filter (ctas) if it's provided
    if (options.ctas) {
        url += `&listing-category=${options.ctas}`;
    }

    // Add location filter (locs) if it's provided
    if (options.locs) {
        url += `&location=${options.locs}`;
    }

    console.log(`Final URL: ${url}`); // Debugging line to check the final URL

    // Fetch data from the API
    const postsResponse = await fetch(url);
    const postsData = await postsResponse.json();
    const totalPosts = +(postsResponse.headers.get('X-WP-Total') || 0);

    // Process the post data
    const posts: DirectoryPostType[] = await Promise.all(
        postsData.map(async (post: any) => {
            const categoryIds = post['listing-category'] || [];
            const locationIds = post.location || [];

            const categories = await fetchTaxonomyTerms('listing-category', categoryIds);
            const locations = await fetchTaxonomyTerms('location', locationIds);

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

    return {
        posts,
        totalPosts,
    };
};


export const getCategories = async (): Promise<any> => {
    const categories = await fetchTaxonomyTerms('listing-category', []);
    const locations = await fetchTaxonomyTerms('location', []);
    return {
        categories: categories.map((l) => ({id: l.id, name: l.name})),
        locations: locations.map((l) => ({id: l.id, name: l.name})),
    }
}