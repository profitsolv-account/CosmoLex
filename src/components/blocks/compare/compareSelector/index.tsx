import classNames from "classnames";
import {CompareBlock} from "@/components/blocks/compare/compareSelector/compareBlock";
import {FC} from "react";
import {CompareSelectorType} from "@/types/compare";

type Props = {
   className?: string;
   compareSelector: CompareSelectorType;
}

export const CompareSelector:FC<Props> = ({className, compareSelector}) => {

    const leftItems = compareSelector.compareItems.filter((item) => item.firstColumn);
    const rightItems = compareSelector.compareItems.filter((item) => !item.firstColumn);

    return <div className={classNames("container flex justify-center px-2 pb-10 md:pb-0", className)}>
        <div className="max-w-[750px]">
            <div className="">
                <h4 className="text-center justify-start text-primary-dark text-base font-normal uppercase tracking-wider mb-4">{compareSelector.compareSubtitle}</h4>
                <h3 className="self-stretch text-center justify-start text-primary-dark text-[46px] font-bold leading-[60px] max-w-[500px] mx-auto">{compareSelector.compareTitle}</h3>
            </div>
            <div className="mt-8">
                <div className="grid gap-5 md:grid-cols-2">
                    <div className="flex items-center flex-col gap-5 md:pt-25">
                        {leftItems.map((item) => (
                            <CompareBlock key={item.title} compareWith={item.title} link={item.link.url} />
                        ))}

                    </div>
                    <div className="flex items-center flex-col gap-5">
                        {rightItems.map((item) => (
                            <CompareBlock key={item.title} compareWith={item.title} link={item.link.url} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
}