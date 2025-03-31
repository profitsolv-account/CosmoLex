import {FeaturedPost} from "@/components/common/featuredPost";
import {FC} from "react";
import {MenuType, PageDataType} from "@/types";

type Props = {
    content: MenuType;
    footer: MenuType;
    pageData: PageDataType;
    onClose?: () => void;
    noFooterLinks?: boolean;
}

export const PageMegaMenu: FC<Props> = ({content, pageData, footer, noFooterLinks, onClose}) => {

    if (!content) return null;
    return <>
        <div className="bg-white pt-5 shadow-lg px-5 max-h-[60vh] overflow-y-auto">
            <div className="container px-4 py-4 flex gap-[3.125rem] items-start">

                <div className="justify-start items-start gap-[3.125rem] grid grid-cols-4">
                    {content?.items.map((submenu) => (
                        <div key={submenu.title} className="">
                            <a href={submenu.url} className="block text-primary-dark text-lg font-semibold leading-7 mb-3 transition duration-300">
                                {submenu.title}
                            </a>
                            {submenu?.items.map((item) => (
                                <div key={item.title} className="mb-3">
                                    <a href={item.url} className="relative block text-primary-dark text-base font-medium leading-normal transition duration-300 group">
                                        <div className="relative z-2">
                                            {item.title}
                                            <div className="text-primary-dark text-base font-light leading-normal">
                                                {item.description}
                                            </div>
                                        </div>

                                        <div className="p-[0.875rem] rounded-[0.625rem] bg-[#eef8fd] absolute w-full h-full z-0 top-[-0.875rem] left-[-0.875rem] box-content transition-all duration-300 opacity-0 group-hover:opacity-100"/>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

              <div className="w-full max-w-[20.5rem]">
                  <FeaturedPost pageData={pageData}/>
              </div>
            </div>
        </div>


        <div className="w-full bg-green rounded-bl-[1.875rem] rounded-br-[1.875rem] pt-3.5 pb-2">
            {!noFooterLinks &&  <div className="container px-4 py-1 flex gap-[3.125rem] items-start">
                {footer.items.map((submenu) => (
                    <div key={submenu.title} className="">
                        <a href={submenu.title} className="block text-primary-dark text-lg font-semibold leading-7 mb-2.5 transition duration-300 ">
                            {submenu.title}
                        </a>
                        <div className="flex gap-[3.125rem]">
                            <div className="justify-start items-start gap-[3.125rem] grid grid-cols-4">
                                {submenu?.items.map((item) => (
                                    <div key={item.title} className="mb-3">
                                        <a href={item.url} className="text-primary-dark text-base font-medium leading-normal transition duration-300 group relative block ">
                                            <div className="relative z-3">
                                                {item.title}
                                                <div className="text-primary-dark text-base font-light leading-normal">
                                                    {item.description}
                                                </div>
                                            </div>
                                            <div className="p-[0.875rem] rounded-[0.625rem] bg-[#eef8fd] absolute w-full h-full z-0 top-[-0.875rem] left-[-0.875rem] box-content transition-all opacity-0 duration-300 group-hover:opacity-50"/>
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full max-w-[20.5rem] rounded-[0.625rem] overflow-hidden ">&nbsp;</div>
                        </div>
                    </div>
                ))}
            </div>}

           {/* {noFooterLinks && <div className="container px-4 py-1 flex gap-[3.125rem] items-start">
                {footer?.items.map((submenu) => (
                    <div key={submenu.title} className="">
                        <div className="block text-primary-dark text-lg font-semibold leading-7 mb-2.5 transition duration-300 ">
                            {submenu.title}
                        </div>
                        <div className="flex gap-[3.125rem]">
                            <div className="justify-start items-start gap-[3.125rem] grid grid-cols-4">
                                {submenu?.items.map((item) => (
                                    <div key={item.title} className="mb-3">
                                        <div className="text-primary-dark text-base font-medium leading-normal transition duration-300 group relative block ">
                                            <div className="relative z-3">
                                                {item.title}
                                                <div className="text-primary-dark text-base font-light leading-normal">
                                                    {item.description}
                                                </div>
                                            </div>
                                            <div className="p-[0.875rem] rounded-[0.625rem] bg-[#eef8fd] absolute w-full h-full z-0 top-[-0.875rem] left-[-0.875rem] box-content transition-all opacity-0 duration-300 group-hover:opacity-50"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full max-w-[21.5rem] rounded-[0.625rem] overflow-hidden ">&nbsp;</div>
                        </div>
                    </div>
                ))}
            </div>}*/}
        </div>
        </>
}