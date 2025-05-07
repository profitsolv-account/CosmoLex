import {CSTestimonial, TestimonialType} from "@/types/testimonials";
import {LeaderLogos} from "@/types/logos";
import {PageBlocksType, ToolsType} from "@/types/tools";
import {CompareSectionType, CompareSelectorType} from "@/types/compare";
import {BarType} from "@/types/about";
import React from "react";
import {KnowledgeBaseCategory, Resource} from "@/types/resources";
import {AffinityBarLogos} from "@/types/affinity-bar-partners";

export type ImageType = {
    node: {
        altText: string;
        sourceUrl: string;
        mediaDetails: {
            width: number;
            height:number;
        }
    }
}

export type FeaturedPostType = {
    title: string;
    slug: string;
    ctaText?: string;
    featuredImage: {
        altText: string;
        sourceUrl: string;
        mediaDetails: {
            width: number;
            height: number;
        }
    }

}

export type ShortPostType = {
    altText: string;
    date: string;
    excerpt: string;
    featuredImage: string;
    id: string;
    slug: string;
    title: string;
}

export type MenuItem = {
    url: string;
    title: string;
    description: string;
    items: MenuItem[]
}

export type MenuType = {
    name: string;
    slug: string;
    items: MenuItem[]
}

export type MenusList = {
    [index: string]: MenuType
}

export type Feature = {
    title: string;
    description: string;
};

export type SettingsType = {
    companyAddress: string;
    companyPhone: string;
    companySummary: string;
    copyrightText: string;
    fieldGroupName: string;
    freeTrialLink: string;
    loginLink: string;
    logo: string;
    logoAltText: string;
    demoLink: string;
}

export type FaqType = {
    question: string;
    answer: string;
};

export type PricingFeature = {
    type: string;
    content: string;
}

export type PricingPlan = {
    groupName: string;
    content: string;
}

export type Member = {
    name: string;
    position: string;
    description: string;
    image: ImageType;
    linkedin: string;
}

export type VideoSection = {
    videoId: string;
    imagePlaceholder: {
        altText: string;
        sourceUrl: string;
        mediaDetails: {
            width: number;
            height: number;
        }
    }
}

export type DirectoryType = {
    id: number;
    title: string;
    featuredImage: string;
    altText: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    category: string;
}

export type PodcastType = {
    id: string;
    title: string;
    content: string;
    heroImage: ImageType;
    code: string;
    slug: string;
}

export type PageDataType = {
    title: string;
    subheading?: string;
    content: string;
    date: string;
    featuredPost: FeaturedPostType;
    id: string;
    menus: MenusList;
    settings?: SettingsType;
    testimonials?: TestimonialType[];
    footerExtendedBg?: boolean;
    latestPosts?: FeaturedPostType[];
    posts?: ShortPostType[];
    leaderLogos?: LeaderLogos[];
    features?: Feature[];
    faq?: FaqType[];
    pricingFeatures?: PricingFeature[];
    pricingPlans?: PricingPlan[];
    hero?: string;
    heroAlt?: string;
    tools?: ToolsType;
    showToolsSection?: boolean;
    pageBlocks?: PageBlocksType;
    heroImage?: ImageType;
    compareSelector?: CompareSelectorType;
    compareSection?: CompareSectionType;
    members?: Member[];
    bar?: BarType;
    renderedContent?: React.ReactNode;
    resources?: Resource[];
    knowledgeBaseCategories?: KnowledgeBaseCategory[];
    partnerLogos?: AffinityBarLogos[];
    total?: number;
    videoSection?: VideoSection;
    directories?: DirectoryType[];
    csTestimonials?: CSTestimonial[];
    code?: string;
    podcasts?: PodcastType[];
    hideRating?: boolean;
}

export type LocationItem = {
    id: string,
    name: string,
    children: LocationItem[]
};


export type PostsDataResponse = {
    posts: {
        id: string;
        slug: string;
        title: string;
        excerpt: string;
        featuredImage?: {
            node: {
                sourceUrl: string;
            }
        };
    }[];
    pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
    };
};