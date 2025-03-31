import React, {FC} from "react";
import classNames from "classnames";
import {TestimonialType} from "@/types/testimonials";
import {Slider} from "@/components/ui/slider";
import ArrowRight from '@/assets/img/icons/arrow-right-long.svg';
import './styles.css';
import Image from "next/image";

type TestimonialsProps = {
    testimonials: TestimonialType[]
}

export const VideoTestimonials: FC<TestimonialsProps> = ({testimonials}) => {

    if (!testimonials) return null;

    const items = [...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
        <SingleSlide key={index} slide={testimonial}/>
    ));

    return <div className="relative video-slider px-2">
        <Slider items={items} height="39.5rem"/>
    </div>
}

type Props = {
    slide: TestimonialType;
}

const SingleSlide: FC<Props> = ({slide}) => {
    return <div
        className={`flex-none w-full h-full px-[1.375rem] py-12 pb-[1.875rem] origin-top-left rounded-[1.875rem] relative overflow-hidden lg:pt-20 lg:px-15 `}>
        <div className="relative z-10 slide-content-inner transition-all duration-300">
            <div className="text-white text-base font-medium tracking-wider mb-4">{slide.position}</div>
            <div className=" text-white text-3xl font-medium md:max-w-[28.75rem] lg:text-[2.5rem] mb-10">
                {slide.content}
            </div>
            <div className="mb-15">
                <a href={slide.link}
                   className="text-[#eef8fd] text-lg font-semibold underline leading-[1.5625rem] flex gap-2 items-center ">
                    {slide.title} <ArrowRight/>
                </a>
            </div>
            <div className="">
                <div
                    className="w-[19.25rem] h-[6.25rem] bg-white/10 rounded-[6.25rem] backdrop-blur-[3.75rem] flex gap-4 items-center p-1.5">
                    <Image
                        src={slide.clientPicture.sourceUrl}
                        alt={slide.clientPicture.altText}
                        className="w-[5.563rem] h-[5.563rem]"
                        width={slide.clientPicture.mediaDetails.width}
                        height={slide.clientPicture.mediaDetails.height}
                    />

                    <div>
                        <div className="text-white text-xl font-medium leading-none mb-2">{slide.client}</div>
                        <div className="text-white text-base font-light leading-none mb-2">{slide.position}</div>
                        {slide.location && <div
                            className="w-[5.4375rem] h-6 px-[2.3125rem] py-[0.6875rem] bg-[#eef8fd] rounded-[1.25rem] justify-center items-center gap-2.5 inline-flex">
                            <div
                                className="text-center text-black text-sm font-medium font-['Inter']">{slide.location}</div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className={classNames("absolute z-0 top-0 left-0 w-full h-full bg-cover bg-center transform", {
            "scale-x-[-1]": slide.flipBackground
        })} style={{
            backgroundImage: "url(" + slide.background + ")"
        }}/>
        <div className="absolute z-1 top-0 left-0 w-full h-full bg-linear-to-r from-black/80 to-black/0"/>
    </div>
}