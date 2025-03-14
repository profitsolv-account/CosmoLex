import Logo from '@/assets/img/logo-black.svg';
import {InfoBlock} from "@/components/blocks/compare/compareSection/infoBlock";
import {CompareSectionType} from "@/types/compare";
import {FC, Fragment} from "react";

type Props = {
    compareSection?: CompareSectionType;
}
export const CompareSection: FC<Props> = ({compareSection}) => {

    if (!compareSection) return null;

    const leftItems = compareSection.compareItems.filter((item) => !item.toCompare);
    const rightItems = compareSection.compareItems.filter((item) => item.toCompare);

    return <div className="px-2">
        <div className="max-w-[60.5rem] mx-auto">
            <div className="mb-17">
                <h4 className="text-center justify-start text-primary-dark text-base font-normal uppercase tracking-wider mb-4">{compareSection.compareSubtitle}</h4>
                <h3 className="self-stretch text-center justify-start text-primary-dark text-[2.875rem] font-bold leading-[3.75rem] mx-auto">{compareSection.compareTitle}</h3>
            </div>
            <div className="grid gap-10 md:gap-0 md:grid-cols-2">

                <div className=" py-[2.9375rem] px-[1.875rem] bg-white rounded-[1.875rem] shadow-[0rem_1.3125rem_1.875rem_0rem_rgba(0,0,0,0.05)]">
                    <div className="flex justify-center mb-11">
                        <Logo />
                    </div>

                    {leftItems.map((item, index) => (
                        <Fragment key={index}>
                            <InfoBlock
                                title={item.title}
                                details={item.description}
                                label={item.name}
                                type={item.toCompare ? 'warning' : 'info'}
                                className={item.classname}
                            />
                            {index < leftItems.length - 1 && <div className="w-full h-[0.0625rem] bg-black/10 my-[2.5rem]" />}
                        </Fragment>
                    ))}

                </div>

                <div className=" py-[2.9375rem] px-[1.875rem]">
                    <div className="flex justify-center mb-11 h-[2.9375rem]">
                        <div className="text-center justify-start text-[#0c193a] text-3xl font-bold">{compareSection.companyName}</div>
                    </div>

                    {rightItems.map((item, index) => (
                        <Fragment key={index}>
                            <InfoBlock
                                title={item.title}
                                details={item.description}
                                label={item.name}
                                type={item.toCompare ? 'warning' : 'info'}
                                className={item.classname}
                            />
                            {index < leftItems.length - 1 && <div className="w-full h-[0.0625rem] bg-black/10 my-[2.5rem]" />}
                        </Fragment>
                    ))}

                </div>


            </div>
        </div>
    </div>
}