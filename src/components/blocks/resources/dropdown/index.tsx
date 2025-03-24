import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CheckboxOption {
    id: string;
    label: string;
    checked: boolean;
}

interface DropdownCheckboxProps {
    options: CheckboxOption[];
    onChange: (options: CheckboxOption[]) => void;
    label: string;
}

const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({ options, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleCheckbox = (id: string) => {
        const updatedOptions = options.map(option =>
            option.id === id ? { ...option, checked: !option.checked } : option
        );
        onChange(updatedOptions);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark inline-flex items-center cursor-pointer"
            >
                {label}
                {isOpen ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
            </button>

            {isOpen && (
                <div className="absolute mt-2 py-2 bg-white border border-gray-200 shadow-lg rounded z-10 w-56">
                    {options.map(option => (
                        <label
                            key={option.id}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={option.checked}
                                onChange={() => toggleCheckbox(option.id)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownCheckbox;