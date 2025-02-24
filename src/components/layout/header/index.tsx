'use client'
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/logo.png";
import {Navigation} from "../../common/navigation";
import { Button } from "@/components/ui/button";
import {MobileMenu} from "@/components/common/mobileMenu";

export const Header = ({pageData}: {pageData: any}) => {

    return <div
        id="mega-id"
        className={classNames(
        "w-full sticky top-0 z-30",
       /* {
            "fixed top-0 left-0 w-full h-screen z-30": openMenu
        }*/
    )}>
       <div className="relative z-60 bg-primary hidden lg:block">
           <div className="container max-w-[1420px] p-3 py-0">
               <div className="flex gap-0 justify-between w-full items-center">
                   <div className="w-75 pt-2">
                       <Link href="/">
                           <Image src={logo} alt="logo"/>
                       </Link>
                   </div>
                   <Navigation className="gap-6 inline-flex" pageData={pageData}/>
                   <div className="flex gap-3 items-center">
                       <div className="hidden lg:flex justify-center items-center gap-4 ax-w-[353px] lg:justify-start">
                           <Link href="#" className="w-12 text-right text-white text-base font-normal font-['Inter']">Login</Link>
                           <Button variant="secondary">Demo</Button>
                           <Button variant="primary">Try for free</Button>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <MobileMenu menus={pageData.menus} />
    </div>
}