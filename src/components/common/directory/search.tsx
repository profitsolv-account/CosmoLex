import React, { FC, useState, useEffect } from 'react';
import { ChevronDownIcon, XCircleIcon } from 'lucide-react';

type Props = {
    categories: { id: number, name: string }[];
    locations: { id: number, name: string }[];
}

const SearchComponent: FC<Props> = ({ categories, locations }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');

    // Function to update query parameters in the URL
    const updateQueryParams = () => {
        const queryParams: { [key: string]: string } = {};

        if (searchTerm) queryParams.s = searchTerm;
        if (category) queryParams.ctas = category;
        if (location) queryParams.locs = location;

        const newUrl = `${window.location.pathname}?${new URLSearchParams(queryParams).toString()}`;
        window.history.pushState({}, '', newUrl);
    };

    const handleApply = () => {
        updateQueryParams();
        // Reload the page after applying changes
        window.location.reload();
    };

    useEffect(() => {
        // Check if there are query parameters in the URL on page load
        const params = new URLSearchParams(window.location.search);
        setSearchTerm(params.get('s') || '');  // Set search term from URL query parameter if exists
        setCategory(params.get('ctas') || ''); // Set category from URL query parameter if exists
        setLocation(params.get('locs') || ''); // Set location from URL query parameter if exists
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-md px-6 py-5 flex items-center gap-4 mb-10">


            <div className="relative flex items-center gap-1">
                <select
                    className="appearance-none bg-transparent py-2 px-2 outline-none text-gray-800"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                {category && (
                    <XCircleIcon
                        className="w-5 h-5 text-gray-400 cursor-pointer"
                        onClick={() => setCategory('')}
                    />
                )}
                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
            </div>

            <div className="border-l h-6 border-gray-300" />

            <div className="relative flex items-center gap-1">
                <select
                    className="appearance-none bg-transparent py-2 px-2 outline-none text-gray-800"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value="">Select a location</option>
                    {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                </select>
                {location && (
                    <XCircleIcon
                        className="w-5 h-5 text-gray-400 cursor-pointer"
                        onClick={() => setLocation('')}
                    />
                )}
                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
            </div>

            {/* Apply button */}
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
