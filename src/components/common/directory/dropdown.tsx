import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDownIcon, XCircleIcon, ChevronUpIcon } from 'lucide-react';

interface DropdownItem {
    name: string;
    id: string;
    children?: DropdownItem[];
}

interface DropdownProps {
    items: DropdownItem[];
    onChange: (id: string) => void;
    value?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onChange, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const findItemById = (id: string | undefined, itemList: DropdownItem[]): DropdownItem | undefined => {
        if (!id) return undefined;
        for (const item of itemList) {
            if (item.id === id) {
                return item;
            }
            if (item.children) {
                const foundInChildren = findItemById(id, item.children);
                if (foundInChildren) return foundInChildren;
            }
        }
        return undefined;
    };

    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(() => findItemById(value, items) || null);

    useEffect(() => {
        setSelectedItem(findItemById(value, items) || null);
    }, [value, items]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

    const handleSelectItem = (item: DropdownItem) => {
        setSelectedItem(item);
        setIsOpen(false);
        onChange(item.id);
    };

    const filterItems = (itemsToFilter: DropdownItem[]): DropdownItem[] => {
        return itemsToFilter.reduce<DropdownItem[]>((acc, item) => {
            const children = item.children ? filterItems(item.children) : [];

            if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || children.length) {
                acc.push({ ...item, children });
            }

            return acc;
        }, []);
    };

    const renderItems = (itemsToRender: DropdownItem[], level = 0) => {
        return itemsToRender.map(item => (
            <div
                key={item.id}
                className={`px-4 py-2 cursor-pointer ${level > 0 ? 'ml-4' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    handleSelectItem(item);
                }}
            >
                {item.name}
                {item.children && item.children.length > 0 && (
                    <div className="ml-4">
                        {renderItems(item.children, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    const filteredItems = useMemo(() => filterItems(items), [items, searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const displayValue = useMemo(() => selectedItem?.name || 'Select an option', [selectedItem]);

    return (
        <div className="relative w-64" ref={dropdownRef}>
            <button
                type="button"
                className="relative block w-full appearance-none bg-white py-2 px-3 rounded-md text-left focus:outline-none sm:text-sm"
                onClick={toggleDropdown}
            >
                <div className="flex justify-between items-center">
                    <div>{displayValue}</div>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        {isOpen ? <ChevronUpIcon className="w-4 h-4 text-gray-600" /> : <ChevronDownIcon className="w-4 h-4 text-gray-600" />}
                    </span>
                </div>
            </button>

            {selectedItem && (
                <XCircleIcon
                    className="w-5 h-5 text-gray-400 cursor-pointer absolute top-2 right-6"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(null);
                        onChange('');
                    }}
                />
            )}

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200">
                    <div className="py-1">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-3 py-2 w-full border-b border-gray-200 focus:outline-none sm:text-sm"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <div className="max-h-48 overflow-y-auto">
                            {filteredItems.length > 0 ? renderItems(filteredItems) : (
                                <div className="px-4 py-2 text-gray-500">No results found.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;