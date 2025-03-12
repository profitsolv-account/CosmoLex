import Linkedin from '@/assets/img/icons/linkedin-icon.svg';
import {Member} from "@/types";
import classNames from "classnames";
import {FC} from "react";
import Image from "next/image";

type Props = {
    member: Member;
    className?: string;
}

export const PersonCard:FC<Props> = ({member, className}) => {

    return <div className="px-2">
        <div className="max-w-[1124px] mx-auto flex items-center justify-center w-full">
            <div className={classNames("self-stretch inline-flex flex-col justify-start items-center gap-[50px] lg:flex-row", className)}>
                <Image
                    className="rounded-[30px]"
                    src={member.image.node.sourceUrl}
                    width={member.image.node.mediaDetails.width}
                    height={member.image.node.mediaDetails.height}
                    alt={member.image.node.altText}
                />
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
                    <div className="self-stretch justify-start text-[#151c2d] text-base font-normal uppercase tracking-wider">{member.position}</div>
                    <div className="self-stretch justify-start text-[#151c2d] text-[46px] font-bold leading-[55px]">{member.name}</div>
                    <div className="self-stretch justify-start text-primary-dark text-base font-normal leading-[30px]" dangerouslySetInnerHTML={{__html: member.description || ''}}/>
                    <a href={member.linkedin} className="" target="_blank">
                        <Linkedin />
                    </a>
                </div>
            </div>

        </div>
    </div>
}