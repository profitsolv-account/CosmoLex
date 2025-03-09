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
    link: {
        nodes: {
            link: string;
        }[]
    }
}

export type ToolsType = {
    toolsTitle: string;
    toolsDescription: string;
    subtitle: string;
    items: ToolItemType[];
}