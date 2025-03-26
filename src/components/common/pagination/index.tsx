import React, {FC} from "react";
import classNames from "classnames";

type PaginationProps = {
    total: number;
    perPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ total, perPage, currentPage, setCurrentPage }) => {
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