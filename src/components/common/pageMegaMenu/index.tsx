import MegaMenu from "@/components/ui/mmenu";
import {FeaturedPost} from "@/components/common/featuredPost";
import {FC, ReactNode} from "react";
import {MenuType} from "@/types";

type Props = {
    trigger: ReactNode;
    content: MenuType;
    footer: MenuType;
}

export const PageMegaMenu: FC<Props> = ({trigger, content}) => {

    if (!content) return null;
    return <MegaMenu
        title={trigger}
        fullWidth
    >
        <div className="bg-white pt-5">
            <div className="container max-w-[1420px] px-4 py-4 flex gap-[50px]">
                <div className="justify-start items-start gap-[50px] grid grid-cols-4">
                    {content.items.map((submenu) => (
                        <div key={submenu.title} className="">
                            <a href={submenu.url} className="text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7 mb-3">
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

                <FeaturedPost/>

            </div>
        </div>

        <div className="w-full h-[174px] bg-[#b9dfc3] rounded-bl-[30px] rounded-br-[30px]"/>
    </MegaMenu>
}