import React, { FC, useState, useEffect } from 'react';
import Dropdown from "./dropdown";
import {LocationItem} from "@/types";

type Props = {
    categories: { id: string, name: string }[];
    locations: LocationItem[];
}

const SearchComponent: FC<Props> = ({ categories, locations }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');

    const updateQueryParams = () => {
        const queryParams: { [key: string]: string } = {};

        if (searchTerm) queryParams.s = searchTerm;
        if (category) queryParams.cats = category;
        if (location) queryParams.locs = location;

        const newUrl = `/partners/certified-consultant?${new URLSearchParams(queryParams).toString()}`;
        window.history.pushState({}, '', newUrl);
    };

    const handleApply = () => {
        updateQueryParams();
        window.location.reload();
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearchTerm(params.get('s') || '');
        setCategory(params.get('cats') || '');
        setLocation(params.get('locs') || '');
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-md px-6 py-5 flex items-center gap-4 mb-10">

            <div className="relative flex items-center gap-1">
                <Dropdown
                    items={categories as any}
                    onChange={(item) => {
                        setCategory(item);
                    }}
                    value={category}
                />

            </div>

            <div className="border-l h-6 border-gray-300" />

            <div className="relative flex items-center gap-1">
                <Dropdown
                    items={locations as any}
                    onChange={(item) => {
                        setLocation(item);
                    }}
                    value={location}
                />
            </div>

            <button
                onClick={handleApply}
                className="bg-primary text-white py-2 px-4 rounded cursor-pointer ml-auto"
            >
                Apply
            </button>
        </div>
    );
};

export default SearchComponent;
