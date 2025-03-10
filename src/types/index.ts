import {TestimonialType} from "@/types/testimonials";
import {LeaderLogos} from "@/types/logos";
import {PageBlocksType, ToolsType} from "@/types/tools";

export type FeaturedPostType = {
    title: string;
    slug: string;
    featuredImage: string;
    altText: string;
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
}