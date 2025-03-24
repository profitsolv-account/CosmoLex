"use client"
import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import Layout from "@/components/layout/layout";
import { PageDataType } from "@/types";
import { ResourceBlock } from "../blocks/resources/resourceBlock";
import classNames from "classnames";
import {CompareHeader} from "@/components/blocks/compare/compareHeader";
import {Resource} from "@/types/resources";
import {debounce} from 'lodash';
import SearchWithDropdown from "@/components/blocks/resources/dropdown";
import DropdownCheckbox from "@/components/blocks/resources/dropdown";

export default function ResourceHubTemplate({ pageData }: { pageData: PageDataType }) {

   const resources = pageData.resources || [];
    const [precessedResources, setProcessedResources] = useState(resources);

    return (
        <Layout pageData={pageData}>
            <CompareHeader
                pageData={pageData}
                className="mb-22"
                hideCta
                contentClassName="!max-w-[89rem]"
            />

            <div className="container py-10">
                <Search resources={resources} onAction={(resources) => {
                    setProcessedResources(resources);
                }} />
            </div>

            {precessedResources.length === 0 && <div className="text-center text-2xl py-10">
                No Items for the Selected Filter
            </div>}
            <PaginatedItems resources={precessedResources} />
        </Layout>
    );
}

type PaginationProps = {
    total: number;
    perPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

type Props = {
    resources: Resource[];
}

const PaginatedItems: FC<Props> = ({resources}) => {
    const perPage = 80;
    const [precessedResources, setProcessedResources] = useState(resources);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setProcessedResources(resources.slice(currentPage * perPage, (currentPage + 1) * perPage));
    }, [currentPage, resources]);
    useEffect(() => {
        setCurrentPage(0);
    }, [resources]);

    return  <div className="px-2 pb-10">
        <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {precessedResources.map((resource, index) => (
                <ResourceBlock resource={resource} key={index} />
            ))}
        </div>
        <Pagination
            total={resources.length}
            perPage={perPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
    </div>
}


const Pagination: FC<PaginationProps> = ({ total, perPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(total / perPage);
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

type SearchProps = {
    resources: Resource[];
    onAction: (data: Resource[]) => void;
}

const Search: FC<SearchProps> = ({resources, onAction}) => {
    const types = new Set(resources.map(resource => resource.type));
    const [selectedTypes, setSelectedTypes] = useState([...types].map(type => ({
        id: type, label: type, checked: false
    })));

    const [query, setQuery] = useState("");

    const onSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const debouncedAction = useCallback(debounce((query) => {
        const filteredResources = resources.filter(resource =>
            resource.node.title.toLowerCase().includes(query.toLowerCase())
        );
        onAction(filteredResources);
    }, 200), [resources, onAction]);


    useEffect(() => {
        debouncedAction(query);
    }, [query]);


    return <div className="flex gap-4">
        <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xl focus:outline-0"
            placeholder="Search..."
            value={query}
            onChange={onSearch}
        />
        <DropdownCheckbox
            options={selectedTypes}
            onChange={setSelectedTypes}
            label="Asset type"
        />

    </div>
}
