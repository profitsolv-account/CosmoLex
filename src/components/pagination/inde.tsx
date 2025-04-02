'use client';

import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import {SearchParams} from "@/app/partners/certified-consultant/page";

type PaginationProps = {
    pageCount: number;
    currentPage: number;
    baseLink?: string;
    searchParams?: SearchParams;
};

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, baseLink, searchParams}) => {
    const base = baseLink || '/blog/page';

    let search = `?`;

    if (searchParams?.cats) {
        search += `&cats=${searchParams.cats}`;
    }

    if (searchParams?.locs) {
        search += `&locs=${searchParams.locs}`;
    }

    const renderPageNumbers = () => {
        const pages = [];

        if (pageCount <= 5) {
            for (let i = 1; i <= pageCount; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', pageCount);
            } else if (currentPage >= pageCount - 2) {
                pages.push(1, '...', pageCount - 2, pageCount - 1, pageCount);
            } else {
                pages.push(1, '...', currentPage, '...', pageCount);
            }
        }

        return pages.map((page, index) => {
            if (page === '...') {
                return (
                    <span key={index} className="px-3 py-1 text-gray-500">
                        {page}
                    </span>
                );
            }

            return (
                <Link
                    key={index}
                    href={`${base}${page}${search}`}
                    className={classNames("mx-1 px-4 py-2 border border-primary cursor-pointer", {
                        'bg-primary text-white': currentPage === page,
                        'text-primary hover:bg-primary hover:text-white': currentPage !== page,
                    })}
                >
                    {page}
                </Link>
            );
        });
    };

    return (
        <div className="flex items-center justify-center space-x-2 p-4">
            {currentPage > 1 ? (
                <Link
                    href={`${base}${currentPage - 1}${search}`}
                    className="px-4 py-2 border border-primary cursor-pointer hover:bg-primary hover:text-white"
                >
                    ←
                </Link>
            ) : (
                <span className="px-4 py-2 border border-gray-300 text-gray-400 cursor-not-allowed">
                    ←
                </span>
            )}

            {renderPageNumbers()}

            {currentPage < pageCount ? (
                <Link
                    href={`${base}${currentPage + 1}${search}`}
                    className="px-4 py-2 border border-primary cursor-pointer hover:bg-primary hover:text-white"
                >
                    →
                </Link>
            ) : (
                <span className="px-4 py-2 border border-gray-300 text-gray-400 cursor-not-allowed">
                    →
                </span>
            )}
        </div>
    );
};

export default Pagination;