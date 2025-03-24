import {ImageType} from "@/types/index";

export type Resource = {
   node: {
       date: string;
       title: string;
       uri: string;
       status: string
       featuredImage: ImageType,
       fields: {
           ctaLink: string;
           tags: string;
           ctaText: string;
       },
       content: string;
       type: string;
   },
    type: string;
};

export interface KnowledgeBaseArticle {
    id: string;
    date: string;
    slug: string;
    title: string;
}

export interface KnowledgeBaseCategory {
    node: {
        name: string;
        slug: string;
        uri: string;
        knowledgeBaseArticles: {
            nodes: KnowledgeBaseArticle[];
        };
    },
}
