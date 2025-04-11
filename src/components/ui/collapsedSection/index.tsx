"use client"
import React, {FC, useState, useRef, useEffect, ReactNode} from "react";
import classNames from "classnames";
import OpenSectionIcon from "@/assets/img/icons/open-section.svg";

type Props = {
    children: ReactNode;
    title: ReactNode;
    className?: string;
    open?: boolean;
};

export const CollapsedSection: FC<Props> = ({ children, title, className, open = false }) => {
    const [isOpen, setIsOpen] = useState(open);
    const [maxHeight, setMaxHeight] = useState(open ? "auto" : "0rem");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && contentRef.current) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, []);

    const toggleOpen = () => {
        if (!isOpen && contentRef.current) {
            setMaxHeight(`${contentRef.current.scrollHeight + 20}px`);
        } else {
            setMaxHeight("0rem");
        }
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={classNames("flex w-full flex-col gap-2 mb-2", className)}>
            <div className="w-full">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={toggleOpen}
                >
                   {title}
                    <OpenSectionIcon
                        className={classNames("w-[1.25rem] h-[0.875rem] flex-none transition-transform duration-300", {
                            "rotate-180": isOpen,
                        })}
                    />
                </div>

                <div
                    ref={contentRef}
                    className={classNames("transition-all duration-300 ease-in-out overflow-hidden", {
                        "pb-4": isOpen
                    })}
                    style={{
                        maxHeight,
                        opacity: isOpen ? 1 : 0,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
