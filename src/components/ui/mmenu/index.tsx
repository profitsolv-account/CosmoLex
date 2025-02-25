import classNames from 'classnames';
import React, {useRef, useEffect, ReactNode} from 'react';
import ReactDOM from 'react-dom';

interface MegaMenuProps {
    children: ReactNode;
    fullWidth?: boolean;
    isOpen: boolean;
    setIsOpen: (d: boolean) => void;
    left?: number;
    onMouseOver?: () => void;
    onMouseLeave?: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ children, fullWidth, isOpen, setIsOpen, left, onMouseLeave, onMouseOver }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const enableTransparent = true;
    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        if (enableTransparent) {
            document.addEventListener('mousedown', handleClickOutside);
        }
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


    return (
        <div className="relative">
            {isOpen && ReactDOM.createPortal(
                <div className="">
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        ref={menuRef}
                        className={classNames("shadow-lg overflow-hidden animate-once animate-duration-700 absolute z-50", {
                            'animate-fade-down': isOpen,
                            'w-full': fullWidth
                        })}
                        style={{left: `${left}px`}}
                        onMouseOver={() => {
                            if (onMouseOver) {
                                onMouseOver();
                            }
                        }}
                        onMouseLeave={() => {
                            if (onMouseLeave) {
                                onMouseLeave();
                            }
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
