export type ToolItemType = {
    classname: string;
    description: string;
    mediaClassname: string;
    title: string
    image: {
        node: {
            altText: string;
            sourceUrl: string;
        }
    };
    icon: {
        node: {
            altText: string;
            sourceUrl: string;
        }
    };
    link?: {
        url: string;
    },
    tabName: string;
}

export type ToolsType = {
    toolsTitle: string;
    toolsDescription: string;
    subtitle: string;
    items: ToolItemType[];
    showTools: boolean;
}

export type PageBlockItemType = {
    title: string;
    description: string;
    reverse: boolean;
    image: {
        node: {
            altText: string;
            sourceUrl: string;
        }
    }
}

export type PageBlocksType = {
    pageBlocksTitle?: string;
    pageBlocksDescription?: string;
    pageBlocksSubtitle?: string;
    pageBlocksItems: PageBlockItemType[];
    showBlocksSection?: boolean;
}