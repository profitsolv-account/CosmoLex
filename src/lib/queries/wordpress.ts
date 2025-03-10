import client from "@/lib/apollo-client";
import {FeaturedPostType, PageDataType} from "@/types";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {getAllMenus} from "@/lib/queries/menus";
import {getSiteSettings} from "@/lib/queries/settings";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {PAGE_BLOCKS_FRAGMENT, PAGE_SETTINGS_FRAGMENT, TOOLS_FRAGMENT} from "@/lib/queries/fragments/page";

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
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: "no-cache",
    });
     return {
        ...get(data, 'page', {}),
         title: get(data, 'page.pageSettings.title', ''),
         subheading: get(data, 'page.pageSettings.subheading', ''),
         description: get(data, 'page.content', ''),
         hero: get(data, 'page.pageSettings.heroImage.node.sourceUrl', ''),
         heroAlt: get(data, 'page.pageSettings.heroImage.node.altText', ''),
         featuredPost: (await getLatestPosts(1))[0],
         menus: await getAllMenus(),
         settings: await getSiteSettings(),
         testimonials: await getTestimonialsList(),
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

    return get(data, 'posts.nodes', []).map((postData: any) => ({
        title: postData.title,
        slug: postData.slug,
        featuredImage: postData.featuredImage.node.sourceUrl,
        altText: postData.featuredImage.node.altText
    }))
}



export const _getPageData = async (pageSlug: string): Promise<PageDataType> => {
    const { data } = await client.query({
        query: gql`
            query GetPage {
                page(id: "${pageSlug}", idType: URI) {
                    id
                    title
                    date
                    content,
                    pageSettings {
                        subheading
                        title
                        heroImage {
                            node {
                                altText
                                sourceUrl
                            }
                        }
                        features {
                            description
                            title
                        }
                        faq {
                            question
                            answer
                        }
                        pricingFeatures {
                            type
                            content
                        }
                        pricingPlans {
                            groupName
                            content
                        }
                    }
                    tools {
                        toolsTitle
                        toolsDescription
                        subtitle
                        items {
                            classname
                            description
                            mediaClassname
                            title
                            image {
                                node {
                                    altText
                                    sourceUrl
                                }
                            }
                            icon {
                                node {
                                    altText
                                    sourceUrl
                                }
                            }
                        }
                    }
                    pageBlocks {
                        showBlocksSection
                        pageBlocksTitle
                        pageBlocksDescription
                        pageBlocksSubtitle
                        pageBlocksItems {
                            title
                            description
                            reverse
                            image {
                                node {
                                    altText
                                    sourceUrl
                                }
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: "no-cache",
        variables: { pageSlug },
    });

    if (!data.page) {
        throw new Error("Page not found");
    }

    const pageData = get(data, 'page', {});
    const title = get(data, 'page.pageSettings.title', null) || get(data, 'page.title', '');
    const subheading = get(data, 'page.pageSettings.subheading', '');
    const features = get(data, 'page.pageSettings.features', []);
    const faq = get(data, 'page.pageSettings.faq', []);
    const pricingFeatures = (get(data, 'page.pageSettings.pricingFeatures', []) || []).map((feature: {type: string[], content: string}) => ({
        type: feature.type[0],
        content: feature.content
    }));
    const pricingPlans = get(data, 'page.pageSettings.pricingPlans', []);
    const tools = data.page.tools;
    const pageBlocks = data.page.pageBlocks;

    return {
        ...pageData,
        featuredPost: (await getLatestPosts(1))[0],
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        title,
        description: get(data, 'page.content', ''),
        hero: get(data, 'page.pageSettings.heroImage.node.sourceUrl', ''),
        heroAlt: get(data, 'page.pageSettings.heroImage.node.altText', ''),
        features,
        faq,
        pricingFeatures,
        pricingPlans,
        subheading,
        tools,
        pageBlocks
    };
}

export const getPageData = async (
    pageSlug: string,
    options: { fetchTools?: boolean; fetchBlocks?: boolean } = {}
): Promise<PageDataType> => {
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
            }
        }
        ${PAGE_SETTINGS_FRAGMENT}
        ${TOOLS_FRAGMENT}
        ${PAGE_BLOCKS_FRAGMENT}
    `;

    const { data } = await client.query({
        query,
        variables: { id: pageSlug },
        fetchPolicy: "no-cache",
    });

    if (!data.page) {
        throw new Error("Page not found");
    }

    const pageData = get(data, 'page', {});
    const title = get(data, 'page.pageSettings.title', null) || get(data, 'page.title', '');
    const subheading = get(data, 'page.pageSettings.subheading', '');
    const features = get(data, 'page.pageSettings.features', []);
    const faq = get(data, 'page.pageSettings.faq', []);
    const pricingFeatures = (get(data, 'page.pageSettings.pricingFeatures', []) || []).map((feature: {type: string[], content: string}) => ({
        type: feature.type[0],
        content: feature.content
    }));
    const pricingPlans = get(data, 'page.pageSettings.pricingPlans', []);
    const tools = data.page.tools;
    const pageBlocks = data.page.pageBlocks;

    return {
        ...pageData,
        featuredPost: (await getLatestPosts(1))[0],
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        title,
        description: get(data, 'page.content', ''),
        hero: get(data, 'page.pageSettings.heroImage.node.sourceUrl', ''),
        heroAlt: get(data, 'page.pageSettings.heroImage.node.altText', ''),
        features,
        faq,
        pricingFeatures,
        pricingPlans,
        subheading,
        tools,
        pageBlocks
    };
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

    if (!data.post) {
        throw new Error("Post not found");
    }

    const post = get(data, 'post', {});

    const latestPosts = await getLatestPosts(5);
    return {
        ...post,
        featuredPost: latestPosts[0],
        featuredImage: post.featuredImage?.node?.sourceUrl || "",
        altText: post.featuredImage?.node?.altText || "",
        menus: await getAllMenus(),
        settings: await getSiteSettings(),
        latestPosts
    };
}

