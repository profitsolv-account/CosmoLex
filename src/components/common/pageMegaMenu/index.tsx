import {FeaturedPost} from "@/components/common/featuredPost";
import {FC} from "react";
import {MenuType, PageDataType} from "@/types";

type Props = {
    content: MenuType;
    footer: MenuType;
    pageData: PageDataType;
    onClose?: () => void;
}

export const PageMegaMenu: FC<Props> = ({content, pageData, footer, onClose}) => {

    if (!content) return null;
    return <>
        <div className="bg-white pt-5 shadow-lg px-5 max-h-[60vh] overflow-y-auto">
            <div className="container px-4 py-4 flex gap-[50px] items-start">

                <div className="justify-start items-start gap-[50px] grid grid-cols-4">
                    {content.items.map((submenu) => (
                        <div key={submenu.title} className="">
                            <a href={submenu.url} className="block text-primary-dark text-lg font-semibold leading-7 mb-3 transition duration-300">
                                {submenu.title}
                            </a>
                            {submenu.items.map((item) => (
                                <div key={item.title} className="mb-3">
                                    <a href={item.url} className="relative block text-primary-dark text-base font-medium leading-normal transition duration-300 group">
                                        <div className="relative z-2">
                                            {item.title}
                                            <div className="text-primary-dark text-base font-light leading-normal">
                                                {item.description}
                                            </div>
                                        </div>

                                        <div className="p-[14px] rounded-[10px] bg-[#eef8fd] absolute w-full h-full z-0 top-[-14px] left-[-14px] box-content transition-all duration-300 opacity-0 group-hover:opacity-100"/>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

              <div className="w-full max-w-[328px]">
                  <FeaturedPost pageData={pageData}/>
              </div>
            </div>
        </div>
        <div className="w-full bg-green rounded-bl-[30px] rounded-br-[30px] pt-3.5 pb-2">
           <div className="container max-w-[1420px] px-4 py-1 flex gap-[50px] items-start">
               {footer.items.map((submenu) => (
                   <div key={submenu.title} className="">
                       <a href={submenu.title} className="block text-primary-dark text-lg font-semibold leading-7 mb-1 transition duration-300 ">
                           {submenu.title}
                       </a>
                       <div className="flex">
                           <div className="justify-start items-start gap-[50px] grid grid-cols-4">
                               {submenu.items.map((item) => (
                                   <div key={item.title} className="mb-3">
                                       <a href={item.url} className="text-primary-dark text-base font-medium leading-normal transition duration-300 group relative block ">
                                           <div className="relative z-3">
                                               {item.title}
                                               <div className="text-primary-dark text-base font-light leading-normal">
                                                   {item.description}
                                               </div>
                                           </div>
                                           <div className="p-[14px] rounded-[10px] bg-[#eef8fd] absolute w-full h-full z-0 top-[-14px] left-[-14px] box-content transition-all opacity-0 duration-300 group-hover:opacity-50"/>
                                       </a>
                                   </div>
                               ))}
                           </div>
                           <div className="w-full max-w-[328px] rounded-[10px] overflow-hidden ">&nbsp;</div>
                       </div>
                   </div>
               ))}
           </div>
        </div>
        </>
}