import React, { useState } from "react";
import { KnowledgeBaseCategory } from "@/types/resources";
import {CustomLink} from "@/components/ui/customLink";


type GuidesTemplateProps = {
    data: KnowledgeBaseCategory;
    icon?: React.ReactNode;
};

export const GuideBlock: React.FC<GuidesTemplateProps> = ({ data, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const articles = data.node.knowledgeBaseArticles.nodes;
    const visibleArticles = isOpen ? articles : articles.slice(0, 8);

    return (
        <div className=" p-4 text-primary-dark">
            <CustomLink href={`/guides/category/${data.node.slug}`} className="text-2xl font-semibold mb-4 border-b border-gray-300 border-b-2.5 pb-2 block">
                {icon && icon } {data.node.name}
            </CustomLink>
            <div className="space-y-2">
                {visibleArticles.map((article) => (
                    <div key={article.id} className="hover:underline text-primary-dark mb-4 relative pl-8">
                       <span className="eckb-article-title__icon ep_font_icon_document absolute left-0 top-2"></span> <a href={`/guides/${data.node.slug}/${article.slug}`}>{article.title}</a>
                    </div>
                ))}
            </div>
            <div className="mt-2 flex flex-col gap-2 justify-center">
                {!isOpen && articles.length > 8 && (
                    <button
                        className="mt-4 text-primary-dark cursor-pointer text-center mx-auto"
                        onClick={() => setIsOpen(true)}
                    >
                        Show all ({articles.length})
                    </button>
                )}

                {isOpen && articles.length > 8 && (
                    <button
                        className="mt-4 text-primary-dark cursor-pointer text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        Hide
                    </button>
                )}
            </div>
        </div>
    );
};