import {FeaturedPostType, MenusList, SettingsType} from "@/types/index";
import React from "react";

export type PostDataType = {
    title: string;
    content: string;
    date: string;
    id: string;
    featuredPost: FeaturedPostType;
    latestPosts?: FeaturedPostType[];
    menus: MenusList;
    settings?: SettingsType;
    featuredImage?: {
        node: {
            sourceUrl: string;
            altText: string;
            mediaDetails: {
                width: number;
                height: number;
            }
        }
    },
    renderedContent?: React.ReactNode;
    tags?: {name: string, slug: string}[];
    categories?: {name: string, slug: string}[];
}