import MegaMenu from "@/components/ui/mmenu";
import {FeaturedPost} from "@/components/common/featuredPost";
import {FC, ReactNode} from "react";
import {MenuType} from "@/types";

type Props = {
    trigger: ReactNode;
    content: MenuType;
    footer: MenuType;
    pageData: any;
}

export const PageMegaMenu: FC<Props> = ({trigger, content, pageData, footer}) => {

    if (!content) return null;
    return <MegaMenu
        title={trigger}
        fullWidth
    >
        <div className="bg-white pt-5">
            <div className="container max-w-[1420px] px-4 py-4 flex gap-[50px] items-start">

                <div className="justify-start items-start gap-[50px] grid grid-cols-4">
                    {content.items.map((submenu) => (
                        <div key={submenu.title} className="">
                            <a href={submenu.url} className="block text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7 mb-3">
                                {submenu.title}
                            </a>
                            {submenu.items.map((item) => (
                                <div key={item.title} className="mb-3">
                                    <a href={item.url} className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">
                                        {item.title}
                                    </a>
                                    <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">
                                        {item.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <FeaturedPost pageData={pageData}/>

            </div>
        </div>

        <div className="w-full h-[174px] bg-[#b9dfc3] rounded-bl-[30px] rounded-br-[30px]">
           <div className="container max-w-[1420px] px-4 py-4 flex gap-[50px] items-start">


               {footer.items.map((submenu) => (
                   <div key={submenu.title} className="">
                       <a href={submenu.url} className="block text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7 mb-3">
                           {submenu.title}
                       </a>

                       <div className="flex">
                           <div className="justify-start items-start gap-[50px] grid grid-cols-4">
                               {submenu.items.map((item) => (
                                   <div key={item.title} className="mb-3">
                                       <a href={item.url} className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">
                                           {item.title}
                                       </a>
                                       <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">
                                           {item.description}
                                       </div>
                                   </div>
                               ))}
                           </div>
                           <div className="w-full max-w-[328px] rounded-[10px] overflow-hidden ">&nbsp;</div>
                       </div>
                   </div>
               ))}

           </div>
        </div>
    </MegaMenu>
}