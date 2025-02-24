import {FC} from "react";
import classNames from "classnames";
import MegaMenu from "@/components/ui/mmenu";
import {PageMegaMenu} from "@/components/common/pageMegaMenu";

type Props = {
    className?: string;
    pageData: any;
}

export const Navigation:FC<Props> = ({className, pageData}) => {
    const {menus} = pageData;

    return <div>
        <ul className={classNames(className)}>
            <li>
                <PageMegaMenu
                    trigger={ <span className="block text-right text-white text-base font-normal font-['Inter'] md:text-[15px] py-7">Solutions</span>}
                    content={menus['header-menu-solutions']}
                    footer={menus['header-menu-solutions-bottom']}
                    pageData={pageData}
                />

            </li>
            <li>
                <a className="block text-right text-white text-base font-normal font-['Inter'] md:text-[15px] py-7"
                   href="/">Pricing</a>
            </li>
            <li>
                <PageMegaMenu
                    trigger={<span className="block text-right text-white text-base font-normal font-['Inter'] md:text-[15px] py-7">Resources</span>}
                    content={menus['header-menu-resources']}
                    footer={menus['header-menu-resources-bottom']}
                    pageData={pageData}
                />

            </li>
            <li>
                <MegaMenu title={
                    <span className="block text-right text-white text-base font-normal font-['Inter'] md:text-[15px] py-7">About</span>
                }>
                    <div className="w-[195px] bg-white rounded-bl-[30px] rounded-br-[30px] p-6 pr-0">
                        <a href="/" className="block text-primary-dark text-[16px] font-medium font-['Inter'] leading-9 mb-2">About CosmoLex</a>
                        <a href="/" className="block text-primary-dark text-[16px] font-medium font-['Inter'] leading-9">Our Team</a>
                    </div>
                </MegaMenu>
            </li>
        </ul>
    </div>
}