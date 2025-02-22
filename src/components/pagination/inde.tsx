'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type PaginationProps = {
    pageCount: number;
    currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage }) => {
    const router = useRouter();

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= pageCount) {
            router.push(`/blog/page/${pageNumber}`);
        }
    };

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
                <button
                    key={index}
                    onClick={() => handlePageChange(Number(page))}
                    className={`mx-1 px-3 py-1 rounded-full ${
                        currentPage === page
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {page}
                </button>
            );
        });
    };
    return (
        <div className="flex items-center justify-center space-x-2 p-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                disabled={currentPage === 1}
            >
                ←
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                disabled={currentPage === pageCount}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
