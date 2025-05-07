import {CustomLink} from "@/components/ui/customLink";
import {FC} from "react";
import Image from "next/image";

type Props = {
    className?: string;
    type?: string;
    link: string;
    linkAll?: string;
    title: string;
    description: string;
    image: string;
}

function truncateWords(htmlString: string, wordLimit: number): string {
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    const text = div.textContent || div.innerText || "";
    const words = text.trim().split(/\s+/);
    const truncated = words.slice(0, wordLimit).join(" ");
    return truncated + (words.length > wordLimit ? "..." : "");
}

export const SingleBlock:FC<Props> = ({
    className,
    type,
    link,
    title,
    description,
    image,
    linkAll
}) => {

    return <div className="inline-flex justify-start items-start gap-4 flex-wrap content-start flex-col">
        {type && <div className="flex-1 flex justify-between items-center w-full">
            <div data-type="Article" className="h-3 relative">
                <div className="left-0 top-0 justify-start text-primary-dark text-base font-normal uppercase tracking-wider relative">{type}</div>
            </div>
            {linkAll && <CustomLink
                href={linkAll}
                className="text-right justify-start text-primary-dark text-base font-normal relative top-1"
            >
                View All
            </CustomLink>}
        </div>}

        {!!image && <CustomLink href={link} >
            <div className="w-full">
                <Image
                    className="rounded-[1.25rem] w-full"
                    src={image}
                    width={400}
                    height={400}
                    alt={title}
                />
        </div>
        </CustomLink>}
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
            <CustomLink href={link} className="self-stretch justify-start text-primary-dark text-xl font-bold leading-[2rem]">{title}</CustomLink>
            <div className="self-stretch justify-start text-primary-dark text-base font-normal leading-[1.875rem]" dangerouslySetInnerHTML={{__html: truncateWords(description, 21)}} />
            <div className="inline-flex justify-start items-center gap-[0.438rem]">
                <CustomLink href={link} className="justify-start text-primary-dark text-base font-normal leading-[1.875rem] underline">Read more</CustomLink>
            </div>
        </div>
    </div>
}