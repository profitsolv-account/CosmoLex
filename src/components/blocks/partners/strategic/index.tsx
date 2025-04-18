import {AffinityBarLogos} from "@/types/affinity-bar-partners";
import {FC} from "react";
import classNames from "classnames";
import {CustomLink} from "@/components/ui/customLink";

type Props = {
    logos?: AffinityBarLogos[];
    className?: string;
}

export const PartnersStrategic:FC<Props> = ({logos, className}) => {
    if (!logos) return null;

    return(  
        <>
            <div className="container-s relative pt-20 overflow-hidden mb-[7.5625rem] px-4">
                <div className="w-full overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-8">
                        {logos.map((lr, index) => (
                            <CustomLink
                                key={index}
                                href={lr.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-[0.625rem] flex justify-center items-center overflow-hidden w-full h-[12rem]" // Increase height
                            >
                                <img className="object-contain w-full h-full" src={lr.src} alt={lr.alt} />
                            </CustomLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}