import React, { useState } from "react";
import { KnowledgeBaseCategory } from "@/types/resources";


type GuidesTemplateProps = {
    data: KnowledgeBaseCategory;
};

export const GuideBlock: React.FC<GuidesTemplateProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const articles = data.node.knowledgeBaseArticles.nodes;
    const visibleArticles = isOpen ? articles : articles.slice(0, 8);

    return (
        <div className=" p-4 text-primary-dark">
            <a href={`/guides/category/${data.node.slug}`} className="text-2xl font-semibold mb-4 border-b border-gray-300 border-b-2.5 pb-2 block">
                {data.node.name}
            </a>
            <div className="space-y-2">
                {visibleArticles.map((article) => (
                    <div key={article.id} className="hover:underline text-primary-dark">
                        <a href={`/guides/${data.node.slug}/${article.slug}`}>{article.title}</a>
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