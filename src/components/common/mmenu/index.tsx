import React, { useState, useRef, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface MegaMenuProps {
    title: ReactNode;
    children: ReactNode;
    fullWidth?: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ title, children, fullWidth = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

    const menuClasses = `
    absolute left-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300
    ${fullWidth ? 'w-screen' : 'w-64'}
    ${isOpen ? 'opacity-100 fade-in' : 'opacity-0 pointer-events-none fade-out'}
  `;

    return (
        <div className="relative" ref={menuRef}>
            <div onClick={toggleMenu}>
                {title}
            </div>

            {isOpen && ReactDOM.createPortal(
                <div>


                    {/* Menu */}
                    <div
                        className={`${menuClasses} z-50`}
                    >
                        <div className="p-4">
                            {children}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default MegaMenu;
