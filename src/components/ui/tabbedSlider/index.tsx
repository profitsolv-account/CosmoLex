import React, {FC, ReactNode, useRef, useState} from "react";
import classNames from "classnames";
import {Slider} from "@/components/ui/slider";

export type TabType = {
    title: string;
    id: string;
}

type Props = {
    items: ReactNode[];
    tabs: TabType[];
    subheading?: string;
    heading?: string;
    description?: ReactNode;
}

export const TabbedSlider: FC<Props> = ({items, tabs, subheading, heading, description}) => {

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const swiperRef = useRef<any>(null);

    const handleTabClick = (index:number) => {
        setActiveIndex(index);
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index);
        }
    }

    return <div>
        <div className="container max-w-[1066px] mb-16 px-4">
            {subheading && <div className="text-[14px] text-center text-primary-dark md:text-base font-normal uppercase mb-5 tracking-[1.26px]">
                {subheading}
            </div>
            }
            {heading && <h3 className="text-[36px] text-center text-primary-dark font-bold leading-[60px] md:px-24 mb-17 md:text-[46px]">
                {heading}
            </h3>
            }
            {description && <div className="text-[14px] text-center text-primary-dark md:text-base font-normal uppercase mb-5 tracking-[1.26px] md:mb-20">{description}</div>}
            <Tabs tabs={tabs} activeIndex={activeIndex} onTabClick={handleTabClick} />
        </div>

        <div className="relative pb-8 md:pb-32">
            <div className="px-2">
                <Slider items={items} ref={swiperRef} setActiveIndex={setActiveIndex} />
            </div>
        </div>

    </div>
}

type TabsProps = {
    activeIndex: number;
    onTabClick: (index: number) => void;
    tabs: TabType[];
}

const Tabs = ({tabs, activeIndex, onTabClick}:TabsProps) => {

    const totalItems = tabs.length;
    const aIndex = activeIndex > (totalItems - 1) ? activeIndex - totalItems : activeIndex;

    return <div className="overflow-auto w-full pb-5">
        <div className="flex gap-2.5 justify-center min-w-[890px]">
            {tabs.map((tab, index) => (
                <div
                    className={classNames("h-10 px-[30px] pt-5 pb-[22px] rounded-[100px] justify-center items-center gap-2.5 inline-flex transition duration-300 group  hover:bg-primary-dark", {
                        "bg-primary-dark": aIndex === index,
                        "bg-white ": aIndex !== index,
                    })}
                    onClick={() => onTabClick(index)}
                    key={index} style={{cursor: 'pointer'}}
                >
                    <div className={classNames("text-center text-primary-dark text-base font-normal font-['Inter'] transition duration-300 group-hover:text-white", {
                        "text-white": aIndex === index
                    })}>{tab.title}</div>
                </div>
            ))}
        </div>
    </div>
}