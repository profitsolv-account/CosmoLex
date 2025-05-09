"use client"

import {FC} from "react";

type Props = {
    placeholder?: string;
}
export const SearchForm: FC<Props> = ({placeholder}) => {

    return <form className="relative z-10 flex gap-4">
        <input
            className="rounded-3xl w-full px-6 bg-[#f5f5ff]/50 border border-[#c8c8c8]/75 outline-none p-4"
            type="text"
            placeholder={placeholder || "Search Article Library"}
            name={"s"}
        />
        <button
            className="bg-primary border border-primary text-white rounded-full px-6 py-3.5 font-normal text-base w-[10rem] cursor-pointer transition duration-300 hover:bg-transparent hover:text-primary-dark"
        >Search</button>
    </form>
}