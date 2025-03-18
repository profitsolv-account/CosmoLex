"use client"
import React, { FC, useState } from 'react';
import Layout from "@/components/layout/layout";
import { PageDataType } from "@/types";
import { ResourceBlock } from "../blocks/resources/resourceBlock";
import classNames from "classnames";
import {CompareHeader} from "@/components/blocks/compare/compareHeader";

export default function ResourceHubTemplate({ pageData }: { pageData: PageDataType }) {
    const perPage = 80;
    const [currentPage, setCurrentPage] = useState(0);
    const resources = pageData.resources || [];

    const totalPages = Math.ceil(resources.length / perPage);
    const paginatedResources = resources.slice(currentPage * perPage, (currentPage + 1) * perPage);

    return (
        <Layout pageData={pageData}>
            <CompareHeader
                pageData={pageData}
                className="mb-22"
                hideCta
                contentClassName="!max-w-[89rem]"
            />

            <div className="px-2 pb-10">
                <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {paginatedResources.map((resource, index) => (
                        <ResourceBlock resource={resource} key={index} />
                    ))}
                </div>
                <Pagination
                    total={resources.length}
                    perPage={perPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
        </Layout>
    );
}

type PaginationProps = {
    total: number;
    perPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
};

const Pagination: FC<PaginationProps> = ({ total, perPage, currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    className={classNames("px-4 py-2 border border-primary cursor-pointer", {
                        'bg-primary text-white': currentPage === index
                    })}
                    onClick={() => setCurrentPage(index)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};
