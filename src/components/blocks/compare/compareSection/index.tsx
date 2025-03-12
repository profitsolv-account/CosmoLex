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
        <div className="max-w-[968px] mx-auto">
            <div className="mb-17">
                <h4 className="text-center justify-start text-primary-dark text-base font-normal uppercase tracking-wider mb-4">{compareSection.compareSubtitle}</h4>
                <h3 className="self-stretch text-center justify-start text-primary-dark text-[46px] font-bold leading-[60px] mx-auto">{compareSection.compareTitle}</h3>
            </div>
            <div className="grid gap-10 md:gap-0 md:grid-cols-2">

                <div className=" py-[47px] px-[30px] bg-white rounded-[30px] shadow-[0px_21px_30px_0px_rgba(0,0,0,0.05)]">
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
                            {index < leftItems.length - 1 && <div className="w-full h-[1px] bg-black/10 my-[40px]" />}
                        </Fragment>
                    ))}

                </div>

                <div className=" py-[47px] px-[30px]">
                    <div className="flex justify-center mb-11 h-[47px]">
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
                            {index < leftItems.length - 1 && <div className="w-full h-[1px] bg-black/10 my-[40px]" />}
                        </Fragment>
                    ))}

                </div>


            </div>
        </div>
    </div>
}