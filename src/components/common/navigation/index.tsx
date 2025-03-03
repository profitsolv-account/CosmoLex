import {FC, ReactNode, useLayoutEffect, useRef, useState} from "react";
import classNames from "classnames";
import MegaMenu from "@/components/ui/mmenu";
import {PageMegaMenu} from "@/components/common/pageMegaMenu";

type Props = {
    className?: string;
    pageData: any;
}

export const Navigation:FC<Props> = ({className, pageData}) => {

    const timeClose = 300;
    const timer = useRef<any>(null);
    const {menus} = pageData;
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [left, setLeft] = useState(0);

    const [menuState, setMenuState] = useState({
        open: false,
        selectedMenu:""
    });

    const triggerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (triggerRef.current) {
            const offset = triggerRef.current.getBoundingClientRect().left + triggerRef.current.getBoundingClientRect().width / 2 - (195 / 2);
            setLeft(offset);
        }
    }, []);

    const menuContent: {[index: string]: ReactNode} = {
        "solutions": <PageMegaMenu
            content={menus['header-menu-solutions']}
            footer={menus['header-menu-solutions-bottom']}
            pageData={pageData}
        />,
        "resources": <PageMegaMenu
            content={menus['header-menu-resources']}
            footer={menus['header-menu-resources-bottom']}
            pageData={pageData}
        />,
        "about": <div className="w-[195px] bg-white rounded-bl-[30px] rounded-br-[30px] p-6 pr-0">
            <a href="/about-cosmolex" className="block text-primary-dark text-[16px] font-medium font-['Inter'] leading-9 mb-2">About CosmoLex</a>
            <a href="/" className="block text-primary-dark text-[16px] font-medium font-['Inter'] leading-9">Our Team</a>
        </div>
    }

    return <div>
        <ul className={classNames(className)}>
            <li className="cursor-pointer">
                <span
                    className="block text-white text-base font-normal font-['Inter'] md:text-[15px] py-7 transition-all duration-200 hover:font-bold w-[72px] text-center"
                    onMouseOver={() => {
                        setIsFullWidth(true);
                        clearTimeout(timer.current);
                        setMenuState({
                            open: true,
                            selectedMenu: "solutions"
                        });
                    }}
                    onMouseLeave={() => {
                        timer.current = setTimeout(() => {
                            setMenuState(st => ({
                                selectedMenu: "solutions",
                                open: false,
                            }));
                        }, timeClose)

                    }}
                >Solutions</span>
            </li>
            <li className="cursor-pointer">
                <a className="block  text-white text-base font-normal font-['Inter'] md:text-[15px] py-7 transition-all duration-200 hover:font-bold  w-[58px] text-center"
                   href="/pricing">Pricing</a>
            </li>
            <li className="cursor-pointer">
                <span
                    className="block text-white text-base font-normal font-['Inter'] md:text-[15px] py-7 transition-all duration-200 hover:font-bold  w-[85px] text-center"
                    onMouseOver={() => {
                        setIsFullWidth(true);
                        clearTimeout(timer.current);
                        setMenuState({
                            open: true,
                            selectedMenu: "resources"
                        });
                    }}
                    onMouseLeave={() => {
                        timer.current = setTimeout(() => {
                            setMenuState(st => ({
                                selectedMenu: "resources",
                                open: false,
                            }));
                        }, timeClose)
                    }}
                >Resources</span>
            </li>
            <li className="cursor-pointer">
                <span
                    ref={triggerRef}
                    className="block text-white text-base font-normal font-['Inter'] md:text-[15px] py-7 transition-all duration-200 hover:font-bold w-[50px] text-center"
                    onMouseOver={() => {
                        setIsFullWidth(false);
                        clearTimeout(timer.current);
                        setMenuState({
                            open: true,
                            selectedMenu: "about"
                        });
                    }}
                    onMouseLeave={() => {
                        timer.current = setTimeout(() => {
                            setMenuState(st => ({
                                ...st,
                                open: false,
                            }));
                        }, timeClose)
                    }}
                >About</span>
            </li>
        </ul>

        <MegaMenu
           isOpen={menuState.open}
           setIsOpen={() => {
               setMenuState(st => ({
                   ...st,
                   open: false,
               }));
           }}
           fullWidth={isFullWidth}
           left={!isFullWidth ? left : 0}
           onMouseOver={() => {
               clearTimeout(timer.current);
           }}
           onMouseLeave={() => {
               timer.current = setTimeout(() => {
                   setMenuState(st => ({
                       ...st,
                       open: false,
                   }));
               }, timeClose)
           }}
           duration={menuState.selectedMenu !== "about" ? 600 : 200}
        >
            {menuContent[menuState.selectedMenu]}
        </MegaMenu>
    </div>
}