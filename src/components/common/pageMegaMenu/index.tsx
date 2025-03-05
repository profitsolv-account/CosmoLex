import {FeaturedPost} from "@/components/common/featuredPost";
import {FC} from "react";
import {MenuType} from "@/types";
import {X} from "lucide-react";

type Props = {
    content: MenuType;
    footer: MenuType;
    pageData: any;
    onClose?: () => void;
}

export const PageMegaMenu: FC<Props> = ({content, pageData, footer, onClose}) => {

    if (!content) return null;
    return <>
        <div className="bg-white pt-5 shadow-lg ">
            <div className="container px-4 py-4 flex gap-[50px] items-start">

                <div className="justify-start items-start gap-[50px] grid grid-cols-4">
                    {content.items.map((submenu) => (
                        <div key={submenu.title} className="">
                            <div className="block text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7 mb-3 transition duration-300">
                                {submenu.title}
                            </div>
                            {submenu.items.map((item) => (
                                <div key={item.title} className="mb-3">
                                    <a href={item.url} className="relative block text-[#0c193a] text-base font-medium font-['Inter'] leading-normal transition duration-300 group">
                                        <div className="relative z-2">
                                            {item.title}
                                            <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">
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

                  <div className="flex justify-end mt-10">
                      <X className="cursor-pointer" onClick={() => {
                          if (onClose) {
                              onClose()
                          }
                      }} />
                  </div>
              </div>

            </div>
        </div>

        <div className="w-full bg-[#b9dfc3] rounded-bl-[30px] rounded-br-[30px] pt-3.5 pb-2">
           <div className="container max-w-[1420px] px-4 py-1 flex gap-[50px] items-start">
               {footer.items.map((submenu) => (
                   <div key={submenu.title} className="">
                       <div className="block text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7 mb-1 transition duration-300 ">
                           {submenu.title}
                       </div>
                       <div className="flex">
                           <div className="justify-start items-start gap-[50px] grid grid-cols-4">
                               {submenu.items.map((item) => (
                                   <div key={item.title} className="mb-3">
                                       <a href={item.url} className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal transition duration-300 group relative block ">
                                           <div className="relative z-3">
                                               {item.title}
                                               <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">
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