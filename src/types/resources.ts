import {ImageType} from "@/types/index";

export type Resource = {
   node: {
       date: string;
       title: string;
       uri: string;
       status: string
       featuredImage: ImageType,
       webinarFields: {
           ctaLink: string;
           tags: string;
       },
       content: string;
       type: string;
   }
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
    }
}
