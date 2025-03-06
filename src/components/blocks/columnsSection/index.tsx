import {BlockColumn} from "@/components/ui/blockColumn";
import React, {FC, ReactNode} from "react";
import classNames from "classnames";

type ColumnItem = {
    title: string;
    description: ReactNode;
    media: ReactNode;
    position?: 'left' | 'right';
    className?: string;
}

type Props = {
    subheading?: string;
    heading?: string;
    description?: ReactNode;
    items: ColumnItem[];
}

export const ColumnsSection: FC<Props> = ({subheading, heading, description, items}) => {

    const hasSubheading = !!subheading || !!heading && !!description;

    return <div className="py-10 px-2">

       <div className={classNames("flex justify-center", {
           "mb-20": hasSubheading
       })}>
           <div className="max-w-[867px] inline-flex flex-col justify-start items-center gap-[27px] mx-auto">
               {subheading && <div className="relative text-center justify-start text-primary text-base font-normal uppercase tracking-wider">{subheading}</div>}
               {heading && <div className="relative text-center justify-start text-primary text-[46px] font-bold leading-[60px]">{heading}</div>}
               {description && <div className="relative text-center justify-start text-primary-dark text-base font-normal leading-[30px]">{description}</div>}
           </div>
       </div>

        {items.map((item) => (
            <BlockColumn
                position={item.position}
                key={item.title}
                className={item.className}
                content={<>
                    <div className="relative justify-start">
                        <div className="text-primary-dark text-[46px] font-bold leading-[55px] mb-2">{item.title}</div>
                        <div className="text-primary-dark text-base font-normal leading-[30px]">{item.description}</div>
                    </div>
                </>}
               media={item.media}
            />
        ))}
    </div>
}