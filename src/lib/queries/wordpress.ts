import client, {cacheOption} from "@/lib/apollo-client";
import {Feature, FeaturedPostType, PageDataType, PricingPlan, VideoSection} from "@/types";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {getAllMenus} from "@/lib/queries/menus";
import {getSiteSettings} from "@/lib/queries/settings";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {PAGE_BLOCKS_FRAGMENT, PAGE_SETTINGS_FRAGMENT, TOOLS_FRAGMENT} from "@/lib/queries/fragments/page";
import {PostDataType} from "@/types/post";
import {getLatestGuide} from "@/lib/queries/resources";

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
                        subheading
                        title
                        heroImage {
                            node {
                                altText
                                sourceUrl(size: LARGE)
                                mediumImage:sourceUrl(size: MEDIUM)
                                mediaDetails {
                                    width
                                    height
                                }
                            }
                        }
                    }
                    faq {
                        faq {
                            answer
                            fieldGroupName
                            question
                        }
                    }
                }
            }
        `,
        fetchPolicy: cacheOption,
        context: {
            fetchOptions: {
                next: {
                    tags: ['home'],
                },
            },
        },
    });
    const faq = get(data, 'page.faq.faq', []);
     return {
        ...get(data, 'page', {}),
         title: get(data, 'page.pageSettings.title', ''),
         subheading: get(data, 'page.pageSettings.subheading', ''),
         description: get(data, 'page.content', ''),
         hero: get(data, 'page.pageSettings.heroImage.node.sourceUrl', ''),
         mediumHero: get(data, 'page.pageSettings.heroImage.node.mediumImage', ''),
         heroAlt: get(data, 'page.pageSettings.heroImage.node.altText', ''),
         featuredPost: await getLatestGuide(),
         menus: await getAllMenus(),
         settings: await getSiteSettings(),
         testimonials: await getTestimonialsList(),
         faq
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
                                altText
                                sourceUrl(size: MEDIUM)
                                mediaDetails {
                                    width
                                    height
                                }
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: cacheOption,
        context: {
            fetchOptions: {
                next: {
                    tags: ['blog'],
                },
            },
        },
    });

    return get(data, 'posts.nodes', []).map((postData: any) => ({
        title: postData.title,
        slug: postData.slug,
        featuredImage: postData.featuredImage.node,
    }))
}


export const getPageData = async (
    pageSlug: string,
    options: { fetchTools?: boolean; fetchBlocks?: boolean } = {}
): Promise<PageDataType | null> => {
    try {
        const query = gql`
            query GetPage($id: ID!) {
                page(id: $id, idType: URI) {
                    id
                    title
                    date
                    content
                    pageSettings {
                        ...PageSettingsFragment
                    }
                    tools {
                        ...ToolsFragment
                    }
                    pageBlocks {
                        ...PageBlocksFragment
                    }
                    faq {
                        faq {
                            answer
                            fieldGroupName
                            question
                        }
                    }
                    pricingSection {
                        pricingOption
                        pricingFeatures {
                            type
                            content
                        }
                    }
                    featuresSection {
                        features {
                            title
                            description
                        }
                    }
                }
            }
            ${PAGE_SETTINGS_FRAGMENT}
            ${TOOLS_FRAGMENT}
            ${PAGE_BLOCKS_FRAGMENT}
        `;

        const { data } = await client.query({
            query,
            variables: { id: pageSlug },
            fetchPolicy: cacheOption,
            context: {
                fetchOptions: {
                    next: {
                        tags: [pageSlug],
                    },
                },
            },
        });

        if (!data.page) {
            return null;
        }

        const pageData = get(data, 'page', {});
        const title = get(data, 'page.pageSettings.title', null) || get(data, 'page.title', '');
        const subheading = get(data, 'page.pageSettings.subheading', '');
        const features = get(data, 'page.featuresSection.features', []);
        const faq = get(data, 'page.faq.faq', []);
        const pricingFeatures = (get(data, 'page.pricingSection.pricingFeatures', []) || []).map((feature: {
            type: string[],
            content: string
        }) => ({
            type: feature.type[0],
            content: feature.content
        }));
        const tools = data.page.tools;
        const pageBlocks = data.page.pageBlocks;

        return {
            ...pageData,
            featuredPost: await getLatestGuide(),
            menus: await getAllMenus(),
            settings: await getSiteSettings(),
            title,
            description: get(data, 'page.content', ''),
            hero: get(data, 'page.pageSettings.heroImage.node.sourceUrl', ''),
            heroImage: get(data, 'page.pageSettings.heroImage', null),
            features,
            faq,
            pricingFeatures,
            subheading,
            tools,
            pageBlocks,
            code: get(data, 'page.pageSettings.code', ''),
            testimonials: await getTestimonialsList(),
        };
    } catch(error: any) {
        if (
            error?.networkError?.result === undefined &&
            error?.message?.includes("Unexpected token '<'")
        ) {
            console.error(`Invalid JSON (likely HTML) from GraphQL for slug: ${pageSlug}`);
        } else {
            console.error(`GraphQL error for slug: ${pageSlug}`, error);
        }
        return null;
    }
};


export const getPricingPlans = async (pageSlug: string): Promise<PricingPlan[]> => {
    const query = gql`
        query GetPage($id: ID!) {
            page(id: $id, idType: URI) {
                pricingSection {
                    pricingOption
                    pricingFeatures {
                        type
                        content
                    }
                    pricingPlans {
                        groupName
                        content
                    }
                }
                
            }
        }
    `;

    const { data } = await client.query({
        query,
        variables: { id: pageSlug },
        fetchPolicy: cacheOption,
        context: {
            fetchOptions: {
                next: {
                    tags: [pageSlug],
                },
            },
        },
    });

    return get(data, 'page.pricingSection.pricingPlans', []);

}

export const getPostData = async (ps: string): Promise<PostDataType | null> => {

    const pageSlug = `/blog/${ps}`;

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
                            mediaDetails {
                                width
                                height
                            }
                        }
                    }
                    tags {
                        nodes {
                            name
                        }
                    }
                    categories {
                        nodes {
                            name
                        }
                    }
                }
            }
        `,
        fetchPolicy: cacheOption,
        variables: { pageSlug },
        context: {
            fetchOptions: {
                next: {
                    tags: [pageSlug],
                },
            },
        },
    });

    if (!data.post) {
        return null;
    }

    const post = get(data, 'post', {});

    const latestPosts = await getLatestPosts(5);
    return {
        ...post,
        featuredPost: await getLatestGuide(),
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        latestPosts,
        tags: get(post, 'tags.nodes', []).map(({name}: any) => name),
        categories: get(post, 'categories.nodes', []).map(({name}: any) => name),
    };
}

export const getKBPostData = async (pageSlug: string): Promise<PostDataType> => {

   /* const posts = getFromCache("posts")
    const pageData = posts.find((post: any) => post.slug === pageSlug);
    if (pageData) return pageData;*/

    const { data } = await client.query({
        query: gql`
            query GetPage {
                knowledgeBaseArticle(id: "${pageSlug}", idType: URI) {
                    id
                    title
                    date
                    content
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                            mediaDetails {
                                width
                                height
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: cacheOption,
        variables: { pageSlug },
        context: {
            fetchOptions: {
                next: {
                    tags: [pageSlug],
                },
            },
        },
    });

    if (!data.knowledgeBaseArticle) {
        throw new Error("Post not found");
    }

    const post = get(data, 'knowledgeBaseArticle', {});

    const latestPosts = await getLatestPosts(5);
    return {
        ...post,
        featuredPost: latestPosts[0],
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        latestPosts
    };
}

export const getVideoSection = async (
    pageSlug: string,
): Promise<VideoSection> => {
    const query = gql`
        query GetPage($id: ID!) {
            page(id: $id, idType: URI) {
                videoSection {
                    videoId
                    imagePlaceholder {
                        node {
                            mediaDetails {
                                width
                                height
                            }
                            sourceUrl
                            altText
                        }
                    }
                }
            }
        }
    `;

    const { data } = await client.query({
        query,
        variables: { id: pageSlug },
        fetchPolicy: cacheOption,
        context: {
            fetchOptions: {
                next: {
                    tags: [pageSlug],
                },
            },
        },
    });

    if (!data.page) {
        throw new Error("Page not found");
    }

    return {
        'videoId': get(data, 'page.videoSection.videoId', ''),
        'imagePlaceholder': get(data, 'page.videoSection.imagePlaceholder.node', null),
    };
};


export const getPageFeaturesData = async (
    pageSlug: string,
): Promise<Feature[]> => {
    const query = gql`
        query GetPage($id: ID!) {
            page(id: $id, idType: URI) {
                featuresSection {
                    features {
                        title
                        description
                    }
                }
            }
        }
    `;

    const { data } = await client.query({
        query,
        variables: { id: pageSlug },
        fetchPolicy: cacheOption,
        context: {
            fetchOptions: {
                next: {
                    tags: [pageSlug],
                },
            },
        },
    });

    if (!data.page) {
        throw new Error("Page not found");
    }

    return get(data, 'page.featuresSection.features', []);
};