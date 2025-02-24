import classNames from 'classnames';
import React, {useState, useRef, useEffect, ReactNode, useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';

interface MegaMenuProps {
    title: ReactNode;
    children: ReactNode;
    fullWidth?: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ title, children, fullWidth }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [menuPosition, setMenuPosition] = useState<{ left: number; }>({ left: 0 });


    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            triggerRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            !triggerRef.current.contains(event.target as Node)
        ) {
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

    useLayoutEffect(() => {
        if (menuRef.current && triggerRef.current && !fullWidth) {
            setMenuPosition({
                left: triggerRef.current.getBoundingClientRect().left - menuRef.current.getBoundingClientRect().width / 2 + triggerRef.current.getBoundingClientRect().width / 2
            })
        }
    }, [isOpen, fullWidth]);

    return (
        <div className="relative" >
            <div ref={triggerRef} className="cursor-pointer"
                 onMouseOver={() => {
                     setIsOpen(() => true);
                 }}
                 onMouseLeave={() => {
                    setIsOpen(() => false);
                }}
            >
                {title}
            </div>

            {isOpen && ReactDOM.createPortal(
                <div className="">
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsOpen(false)}
                        onMouseOver={() => { setIsOpen(() => false);}}
                    />
                    <div
                        ref={menuRef}
                        className={classNames("shadow-lg overflow-hidden animate-once animate-duration-300 absolute z-50", {
                            'animate-fade-down': isOpen,
                            'w-full': fullWidth
                        })}
                        style={{
                            left: `${menuPosition.left}px`
                        }}
                        onMouseOver={() => {
                            setIsOpen(() => true);
                        }}
                        onMouseLeave={() => {
                            setIsOpen(() => false);
                        }}
                    >
                        <div>
                            {children}
                        </div>
                    </div>
                </div>,
                document.getElementById('mega-id') as HTMLElement
            )}
        </div>
    );
};

export default MegaMenu;
