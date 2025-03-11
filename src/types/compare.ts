type CompareItemType = {
    title: string;
    firstColumn: boolean;
    link: {
        url: string
    }
}

export type CompareSelectorType = {
    compareSubtitle: string;
    compareTitle: string;
    compareItems: CompareItemType[];
}