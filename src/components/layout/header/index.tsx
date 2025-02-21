'use client'

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/logo.png";
import {Navigation} from "@/components/Navigation";
import {Hamburger} from "@/components/Hamburger";
import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";

export const Header = () => {

    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const element = document.querySelector('html') as HTMLElement;
        if (openMenu) {
            element.classList.add('overflow-hidden')
        } else {
            element.classList.remove('overflow-hidden')
        }
    }, [openMenu]);

    return <div className={classNames(
        "w-full sticky top-0 bg-primary p-3 pt-7 pb-4 z-30",
        {
            "bg-primary fixed top-0 left-0 w-full p-3 h-screen z-30": openMenu
        }
    )}>
        <div className="container max-w-[1420px]">
            <div className="flex gap-0 justify-between w-full items-center">
               <div className="w-75 pt-2">
                   <a href="/">
                       <Image src={logo} alt="logo"/>
                   </a>

               </div>
                <Navigation className="hidden lg:inline-flex gap-6"/>

                <div className="flex gap-3 items-center">
                    <div className="hidden lg:flex justify-center items-center gap-4 ax-w-[353px] lg:justify-start">
                        <Link href="#" className="w-12 text-right text-white text-base font-normal font-['Inter']">Login</Link>
                        <Button variant="secondary">Demo</Button>
                        <Button variant="primary">Try for free</Button>
                    </div>

                    <Hamburger onClick={() => {
                        setOpenMenu(!openMenu);
                    }}
                    />
                </div>
            </div>
        </div>

        {openMenu && <>
            <Navigation className="mt-20 flex flex-col gap-10 mb-10"/>
            <div className="flex justify-center items-center gap-8 ax-w-[353px] flex-col lg:justify-start">
                <Link href="#" className="w-12 text-right text-white text-base font-normal font-['Inter']">Login</Link>
                <Button variant="secondary">Demo</Button>
                <Button variant="primary">Try for free</Button>
            </div>
        </>}
    </div>
}