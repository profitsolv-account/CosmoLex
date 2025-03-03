import {FC} from "react";
import {Rating} from "@/components/common/rating";
import classNames from "classnames";


type Props = {
    className?: string;
}

export const RatingBlock:FC<Props> = ({className}) => {
    return (
        <div className={classNames(className)}>
            <div className="container flex flex-col justify-center items-center gap-4">
                <Rating className="text-center hidden md:block" />
            </div>
        </div>
    )
}