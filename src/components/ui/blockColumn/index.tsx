import {FC, ReactNode} from "react";
import classNames from "classnames";

type Props = {
    className?: string;
    position?: 'left' | 'right';
    content: ReactNode;
    media: ReactNode;
    contentCLassName?: string;
}

export const BlockColumn: FC<Props> = ({ className, content, media, contentCLassName, position = 'left' }) => {
    return <div className={classNames("max-w-[1061px] mb-5 mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[85px] md:mb-25", className)}>
        <div className={classNames({
            "md:order-last": position === 'right'
        })}>
            {media}
        </div>
        <div className={classNames("pt-10", contentCLassName)}>
            {content}
        </div>
    </div>
}