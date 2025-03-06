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
    className?: string;
    duration?: number;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ children, fullWidth, isOpen, setIsOpen, left, onMouseLeave, onMouseOver, className, duration = 600 }) => {
    const timer = useRef<any>(null);

    const menuRef = useRef<HTMLDivElement>(null);
    const enableTransparent = true;

    const [showMenu, setShowMenu] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {

        if (isOpen) {
            clearTimeout(timer.current);
            setVisible(true);
            setShowMenu(true);
        } else {
            setVisible(false);
            timer.current = setTimeout(() => {
                setShowMenu(false);
            }, duration);
        }

    }, [isOpen]);


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
        <div className={classNames(className)}>
            {showMenu && ReactDOM.createPortal(
                <div className="bg-red-300">
                    <div
                        className={classNames(`fixed inset-0 bg-black z-40 opacity-10 transition-all duration-${duration}`, {
                            "opacity-50": visible,
                            "opacity-0": !visible,
                        })}
                        onClick={() => setIsOpen(false)}
                       /* onMouseLeave={onMouseLeave}*/
                    />
                    <div
                        ref={menuRef}
                        className={classNames(`overflow-hidden absolute z-50 container !duration-${duration}`, {
                           /* 'slideDown': visible && duration !== 200,
                            'slideUp': !visible && duration !== 200,
                            'slideDownFast': visible && duration === 200,
                            'slideUpFast': !visible && duration === 200,*/
                            'w-full translate-x-[-50%]': fullWidth,
                            'w-[200px]': !fullWidth,
                        })}
                        style={{left: fullWidth ? `50%` : `${left}px`}}
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
