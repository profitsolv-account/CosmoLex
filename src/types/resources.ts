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
}