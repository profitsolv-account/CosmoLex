import {ImageType} from "@/types/index";

export type BarItemType = {
    image: ImageType;
    url: {
        url: string;
    }
}

export type BarType = {
    barDescription: string;
    barTitle: string;
    barItems: BarItemType[];
}