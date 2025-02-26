import { FC } from "react";
import Link from "next/link";
import { MenuItem } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import classNames from "classnames";

type ChildMenuProps = {
    items: MenuItem[];
    expandedSubMenus: Record<string, boolean>;
    toggleSubMenu: (title: string) => void;
};

export const ChildMenu: FC<ChildMenuProps> = ({items, expandedSubMenus, toggleSubMenu}) => {
    return (
        <ul className="pl-4 mt-2">
            {items.map((item) => (
                <li key={item.title} className="py-2 ">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() =>
                            item.items && toggleSubMenu(item.title)
                        }
                    >
                        <Link
                            href={item.url}
                            className="hover:text-secondary transition duration-400 text-xl font-medium"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {item.title}
                        </Link>

                        {item.items && (
                            <div className="cursor-pointer">
                                {expandedSubMenus[item.title] ? (
                                    <ChevronUp className="w-6 h-6" />
                                ) : (
                                    <ChevronDown className="w-6 h-6" />
                                )}
                            </div>
                        )}
                    </div>

                    {item.items && (
                        <ul
                            className={classNames(
                                "overflow-hidden transition-all duration-400",
                                {
                                    "max-h-screen opacity-100":
                                        expandedSubMenus[item.title],
                                    "max-h-0 opacity-0":
                                        !expandedSubMenus[item.title],
                                }
                            )}
                        >
                            <ChildMenu
                                items={item.items}
                                expandedSubMenus={expandedSubMenus}
                                toggleSubMenu={toggleSubMenu}
                            />
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};
