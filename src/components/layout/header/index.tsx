'use client'
import classNames from "classnames";
import Link from "next/link";
import {Navigation} from "../../common/navigation";
import { Button } from "@/components/ui/button";
import {MobileMenu} from "@/components/common/mobileMenu";
import {PageDataType, SettingsType} from "@/types";

export const Header = ({pageData}: {pageData: PageDataType}) => {

    const getSetting = (name: keyof SettingsType) => {
        if (!pageData.settings) return "";
        return pageData.settings[name] ?? "";
    }
    return <div
        id="mega-id"
        className={classNames(
        "w-full sticky top-0 z-30",
    )}>
       <div className="relative z-60 bg-primary hidden lg:block">
           <div className="container max-w-[1420px] p-3 py-0">
               <div className="flex gap-0 justify-between w-full items-center">
                   <div className="w-75 pt-2">
                       <Link href="/">
                           <img src={getSetting('logo')} alt={getSetting('logoAltText')}/>
                       </Link>
                   </div>
                   <Navigation className="gap-6 inline-flex" pageData={pageData}/>
                   <div className="flex gap-3 items-center">
                       <div className="hidden lg:flex justify-center items-center gap-4 ax-w-[353px] lg:justify-start">
                           <Link href={getSetting('loginLink')} className="w-12 text-right text-white text-base font-normal font-['Inter']">Login</Link>
                           <Button variant="secondary" onClick={() => {
                                 window.location.href = getSetting('demoLink');
                           }}>Request demo</Button>
                           <Button variant="primary" onClick={() => {
                                    window.location.href = getSetting('freeTrialLink');
                           }}>Try for free</Button>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <MobileMenu menus={pageData.menus} pageData={pageData} />
    </div>
}