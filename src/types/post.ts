import {FeaturedPostType, MenusList, SettingsType} from "@/types/index";

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
    }
}