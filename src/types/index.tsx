import {TestimonialType} from "@/types/testimonials";
import {LeaderLogos} from "@/types/logos";

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

export type PageDataType = {
    title: string;
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
}