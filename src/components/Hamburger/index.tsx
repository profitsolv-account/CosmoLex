'use client'
import {FC, useState} from "react";
import classNames from "classnames";

type Props = {
    onClick: () => void;
}

export const Hamburger:FC<Props> = ({onClick}) => {
    const [isOpen, setIsOpen] = useState(false);

    return <>
        <div
            className={classNames('hamburger p-1 lg:hidden', {open: isOpen})}
            onClick={() => {
                setIsOpen(!isOpen);
                onClick();
            }}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    </>
}
