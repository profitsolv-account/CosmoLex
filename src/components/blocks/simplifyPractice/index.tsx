import workInTeam from '@/assets/img/simple-practice/work-in-team.webp';
import goodExperience from '@/assets/img/simple-practice/good-experience.webp';
import workRemotely from '@/assets/img/simple-practice/work-remotely.webp';
import DemoScreen from '@/assets/img/simple-practice/demo-screen.webp';

import {PageDataType} from "@/types";
import {FC} from "react";
import {Heading} from "@/components/ui/heading";
import classNames from "classnames";
import {CustomLink} from "@/components/ui/customLink";

type Props = {
    pageData: PageDataType;
    className?: string;
}

export const SimplifyPractice:FC<Props> = ({pageData, className}) => {
    return (
        <div className={classNames("pt-20 md:pt-30" ,className)}>
            <div className="container">
                <div className="w-full max-w-[20rem] mx-auto relative z-10 md:max-w-[73.1875rem]">
                    <Heading>
                        Simplify your practice with one tool.
                    </Heading>
                    <div className="flex flex-col gap-5 md:flex-row md:gap-[2.3125rem]">
                        <div className="flex flex-col justify-between w-full bg-[#badfc3] rounded-[0.9375rem] pt-10 overflow-hidden md:w-1/2 md:rounded-[1.875rem] md:pt-18">

                            <div className="px-9 mb-10">

                                <h4 className="text-center text-primary-dark text-3xl font-bold leading-[3.125rem] tracking-[-0.0625rem] mb-3 md:text-[2.5rem] md:mb-7">Book a demo.</h4>
                                <p className="text-center text-primary-dark text-base font-medium leading-[1.5625rem] mb-6 md:max-w-[23.75rem] md:mx-auto md:text-lg md:mb-8">
                                    Book your personalized demo with a CosmoLex specialist.
                                </p>
                                <div className="flex justify-center">
                                    <CustomLink href={pageData.settings?.demoLink || ""} className="base-btn w-auto mx-auto bg-primary-dark text-white inline-flex px-8 hover:bg-transparent hover:text-primary-dark">Schedule now</CustomLink>
                                </div>
                            </div>

                            <div className="w-full h-[12.9375rem] relative flex justify-between gap-2.5">

                                <div className="h-[12.9375rem] left-0 top-0 relative rounded-tr-[0.3125rem] rounded-bl-[0.9375rem]  bg-cover bg-[-10rem_center] bg-no-repeat w-[30%]" style={{
                                    backgroundImage: "url("+workInTeam.src+")",
                                }} />
                                <div className="h-[11.125rem] top-[1.8125rem] relative rounded-tl-[0.3125rem] rounded-tr-[0.3125rem] bg-cover bg-[-3.75rem_center] bg-no-repeat w-[40%]" style={{
                                    backgroundImage: "url("+goodExperience.src+")",
                                }}/>
                                <div className="h-[12.9375rem] top-0 relative rounded-tl-[0.3125rem] rounded-br-[0.9375rem] bg-cover bg-[-7.5rem_center] bg-no-repea w-[30%]" style={{
                                    backgroundImage: "url("+workRemotely.src+")",
                                }}/>
                            </div>
                        </div>

                        <div className="w-[20rem] bg-[#fd937a] rounded-[0.9375rem] px-5 pt-10 overflow-hidden md:w-1/2 md:rounded-[1.875rem] md:pt-18">
                            <div className="px-4 mb-10">
                                <h4 className="text-center text-primary-dark text-3xl font-bold leading-[3.125rem] tracking-[-0.0625rem] mb-3 md:text-[2.5rem] md:mb-7">Try for free.</h4>
                                <p className="text-center text-primary-dark text-base font-medium leading-[1.5625rem] mb-6 md:max-w-[23.75rem] md:mx-auto md:text-lg md:mb-8">
                                    No wait. No credit card. Just click to try CosmoLex for 10 days.
                                </p>
                                <div className="flex justify-center">
                                    <CustomLink href={pageData.settings?.freeTrialLink || ""} className="base-btn w-auto mx-auto bg-primary-dark text-white inline-flex px-8 hover:bg-transparent hover:text-primary-dark">Get started</CustomLink>
                                </div>
                            </div>

                            <div className="h-[10.125rem] rounded-tl-[0.625rem] rounded-tr-[0.625rem] md:h-[15.3125rem] flex items-end justify-center">
                                <img
                                    src={DemoScreen.src}
                                    alt="demo-screen"
                                    className="max-h-full relative top-0.5"
                                    width={371}
                                    height={196}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}