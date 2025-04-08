"use client"
import {MenusList, PageDataType, SettingsType} from "@/types";
import {FC, useEffect, useMemo, useState} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hamburger } from "./hamburger";
import { ChevronDown, ChevronUp } from "lucide-react";
import classNames from "classnames";
import {ChildMenu} from "@/components/common/mobileMenu/childMenu";
import Image from "next/image";
import logo from "@/assets/img/logo.png";
import {usePathname} from "next/navigation";

type Props = {
    menus: MenusList;
    pageData: PageDataType;
};

export const MobileMenu: FC<Props> = ({ menus, pageData }) => {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
        {}
    );
    const [expandedSubMenus, setExpandedSubMenus] = useState<
        Record<string, boolean>
    >({});

    useEffect(() => {
        const element = document.querySelector("html") as HTMLElement;
        if (openMenu) {
            element.classList.add("overflow-hidden");
        } else {
            element.classList.remove("overflow-hidden");
        }
    }, [openMenu]);

    const toggleMenu = (slug: string) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [slug]: !prev[slug],
        }));
    };

    const toggleSubMenu = (title: string) => {
        setExpandedSubMenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const handleMenuToggle = () => {
        if (openMenu) {
            setOpenMenu(false);
            setTimeout(() => setMenuVisible(false), 300);
        } else {
            setMenuVisible(true);
            setTimeout(() => setOpenMenu(true), 10);
        }
    };

    const memoizedCombinedMenus = useMemo(() => {
        try {
            return {
                solutions: {
                    ...menus["header-menu-solutions"],
                    items: [
                        ...menus["header-menu-solutions"].items,
                        ...menus["header-menu-solutions-bottom"].items,
                    ],
                    name: "Solutions",
                },
                pricing: {
                    name: "Pricing",
                    url: "/pricing",
                },
                resources: {
                    ...menus["header-menu-resources"],
                    items: [
                        ...menus["header-menu-resources"].items,
                        ...menus["header-menu-resources-bottom"].items,
                    ],
                    name: "Resources",
                },
                about: {
                    name: "About",
                    url: "/about",
                    items: [
                        {
                            url: "/about-cosmolex",
                            title: "About CosmoLex",
                        },
                        {
                            url: "/about-us",
                            title: "Our Team",
                        },
                    ],
                },
            };
        } catch (e) {
            console.log(e);
            return {};
        }
    }, [menus]);

    const getSetting = (name: keyof SettingsType) => {
        if (!pageData.settings) return "";
        return pageData.settings[name] ?? "";
    }

    useEffect(() => {
        if (!menuVisible) return;

        let parentMenu = '';

        const currentMenus = memoizedCombinedMenus;

        for (const key in currentMenus) {
            // @ts-ignore
            const menu = currentMenus[key];
            parentMenu = menu.name;
            if (menu.items) {

                const isMatch = menu.items.some(
                    (item: any) => item.url === pathname || item.url === pathname.slice(0, -1)
                );
                if (isMatch) {
                    setExpandedMenus((prev) => ({ ...prev, [key]: true }));
                    break;
                } else {
                    menu.items.forEach((item: any) => {
                        if (item.items) {
                            const isMatch = item.items.some(
                                (item: any) => item.url === pathname || item.url === pathname.slice(0, -1)
                        );
                            if (isMatch) {
                                setExpandedMenus((prev) => ({ ...prev, [key]: true }));
                                setExpandedSubMenus((prev) => ({ ...prev, [item.title]: true }));
                                parentMenu = item.title;
                            }
                        }
                    })
                }
            }
        }
    }, [pathname, menuVisible, memoizedCombinedMenus]);

    return (
        <div className="bg-primary lg:hidden relative z-50 pb-4">
            <div className="px-4 py-8 pb-4 flex justify-between">
                <div>
                    <Link href="/">
                        <Image src={logo} alt="logo"/>
                    </Link>
                </div>
                <Hamburger onClick={handleMenuToggle} />
            </div>

            {menuVisible && (
                <div
                    className={classNames(
                        "absolute bg-primary text-white overflow-y-auto transition-all duration-300 ease-in-out w-full h-[100dvh] pb-10",
                        {
                            "opacity-0 translate-x-full": !openMenu,
                            "opacity-100 translate-x-0": openMenu,
                        }
                    )}
                >
                    <nav className="flex flex-col gap-4 w-full px-6 py-4">
                        <div className="flex justify-start gap-4 mb-4">
                            <Button variant="secondary" href={getSetting('demoLink')}>Request demo</Button>
                            <Button variant="primary" href={getSetting('freeTrialLink')}>Try for free</Button>
                        </div>

                        <Link href={getSetting('loginLink')} className="w-12 text-right text-white text-[1.375rem] font-normal">Login</Link>

                        <ul className="w-full mt-4">
                            {Object.entries(memoizedCombinedMenus).map(
                                ([key, menu]: any) => (
                                    <li
                                        key={key}
                                        className="border-b border-gray-700 mb-3 pb-2"
                                    >
                                        <div
                                            className="flex justify-between items-center cursor-pointer"
                                            onClick={() =>
                                                menu.items &&
                                                toggleMenu(key)
                                            }
                                        >
                                            <Link
                                                href={menu.url || "#"}
                                                className="transition duration-300 ease-in-out text-2xl font-semibold hover:text-green"
                                                onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (menu.name === 'About') {
                                                            e.preventDefault();
                                                        }
                                                    }
                                                }
                                            >
                                                {menu.name}
                                            </Link>
                                            {menu.items && (
                                                <div className="cursor-pointer">
                                                    {expandedMenus[key] ? (
                                                        <ChevronUp className="w-7 h-7" />
                                                    ) : (
                                                        <ChevronDown className="w-7 h-7" />
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {menu.items && (
                                            <ul
                                                className={classNames(
                                                    "overflow-hidden transition-all duration-400",
                                                    {
                                                        "max-h-screen opacity-100":
                                                            expandedMenus[key],
                                                        "max-h-0 opacity-0":
                                                            !expandedMenus[key],
                                                    }
                                                )}
                                            >
                                                <ChildMenu
                                                    items={menu.items}
                                                    expandedSubMenus={
                                                        expandedSubMenus
                                                    }
                                                    toggleSubMenu={
                                                        toggleSubMenu
                                                    }
                                                />
                                            </ul>
                                        )}
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};
