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


type CompareSectionItemType = {
    classname: string;
    description: string;
    name: string;
    title: string;
    toCompare: boolean;
}

export type CompareSectionType = {
    companyName: string;
    compareSubtitle: string;
    compareTitle: string;
    compareItems: CompareSectionItemType[]
}