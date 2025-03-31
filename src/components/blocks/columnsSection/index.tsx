import {BlockColumn} from "@/components/ui/blockColumn";
import React, {FC, Fragment, ReactNode} from "react";
import classNames from "classnames";

type ColumnItem = {
    title: string;
    description: ReactNode;
    media: ReactNode;
    position?: string;
    className?: string;
}

type Props = {
    subheading?: string;
    heading?: string;
    description?: ReactNode;
    items?: ColumnItem[];
    rows?: {
        leftContent: ReactNode;
        rightContent: ReactNode;
        position?: string;
        className?: string;
    }[]
}

export const ColumnsSection: FC<Props> = ({subheading, heading, description, items, rows}) => {

    const hasSubheading = !!subheading || !!heading && !!description;

    return <div className="py-10 px-2 dynamic-html-content">

       <div className={classNames("flex justify-center", {
           "mb-20": hasSubheading
       })}>
           <div className="max-w-[52.1875rem] inline-flex flex-col justify-start items-center gap-[1.6875rem] mx-auto">
               {subheading && <div className="relative text-center justify-start text-primary text-base font-normal uppercase tracking-wider" dangerouslySetInnerHTML={{__html:subheading}} />}
               {heading && <div className="relative text-center justify-start text-primary text-[2.875rem] font-bold leading-[3.75rem]" dangerouslySetInnerHTML={{__html: heading}} />}
               {description && <div className="relative text-center justify-start text-primary-dark text-base font-normal leading-[1.875rem]" dangerouslySetInnerHTML={{ __html: description || '' }} />}
           </div>
       </div>

        {items && items.map((item) => (
            <BlockColumn
                position={item.position}
                key={item.title}
                className={item.className}
                content={<>
                    <div className="relative justify-start">
                        <div className="text-primary-dark text-[2.3rem] font-bold leading-[3.4375rem] mb-2" dangerouslySetInnerHTML={{__html: item.title}} />
                        <div className="text-primary-dark text-base font-normal leading-[1.875rem]" dangerouslySetInnerHTML={{ __html: item.description || '' }} />
                    </div>
                </>}
               media={item.media}
            />
        ))}

        {rows && rows.length > 0 && (rows.map((row, index) => (<Fragment key={index}>
            <BlockColumn
                position={row.position}
                className={row.className}
                content={row.leftContent}
                media={row.rightContent}
                contentCLassName="!pt-0"
            />
        </Fragment>)))}
    </div>
}