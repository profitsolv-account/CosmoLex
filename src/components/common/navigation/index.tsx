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
                    trigger={ <span className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]">Solutions</span>}
                    content={menus['header-menu-solutions']}
                    footer={menus['header-menu-solutions-bottom']}
                    pageData={pageData}
                />

            </li>
            <li>
                <a className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]"
                   href="">Pricing</a>
            </li>
            <li>
                <PageMegaMenu
                    trigger={<span className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]">Resources</span>}
                    content={menus['header-menu-resources']}
                    footer={menus['header-menu-resources-bottom']}
                    pageData={pageData}
                />

            </li>
            <li>
                <MegaMenu title={
                    <span className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]">About</span>
                }>
                   <div className="bg-white p-10 px-30">test</div>
                </MegaMenu>
            </li>
        </ul>
    </div>
}