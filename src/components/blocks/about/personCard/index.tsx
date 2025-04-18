import Linkedin from '@/assets/img/icons/linkedin-icon.svg';
import {Member} from "@/types";
import classNames from "classnames";
import {FC} from "react";
import Image from "next/image";
import {CustomLink} from "@/components/ui/customLink";

type Props = {
    member: Member;
    className?: string;
}

export const PersonCard:FC<Props> = ({member, className}) => {

    return <div className="px-2">
        <div className="max-w-[70.25rem] mx-auto flex items-center justify-center w-full">
            <div className={classNames("self-stretch inline-flex flex-col justify-start items-center gap-[3.125rem] lg:flex-row", className)}>
                <Image
                    className="rounded-[1.875rem]"
                    src={member.image.node.sourceUrl}
                    width={member.image.node.mediaDetails.width}
                    height={member.image.node.mediaDetails.height}
                    alt={member.image.node.altText}
                />
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
                    <div className="self-stretch justify-start text-[#151c2d] text-base font-normal uppercase tracking-wider">{member.position}</div>
                    <div className="self-stretch justify-start text-[#151c2d] text-[2.875rem] font-bold leading-[3.4375rem]">{member.name}</div>
                    <div className="self-stretch justify-start text-primary-dark text-base font-normal leading-[1.875rem]" dangerouslySetInnerHTML={{__html: member.description || ''}}/>
                    <CustomLink href={member.linkedin} className="" target="_blank">
                        <Linkedin />
                    </CustomLink>
                </div>
            </div>

        </div>
    </div>
}