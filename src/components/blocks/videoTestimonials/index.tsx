import React, {FC} from "react";
import classNames from "classnames";
import {TestimonialType} from "@/types/testimonials";
import {Slider} from "@/components/ui/slider";
import ArrowRight from '@/assets/img/icons/arrow-right-long.svg';
import './styles.css';

type TestimonialsProps = {
    testimonials: TestimonialType[]
}

export const VideoTestimonials: FC<TestimonialsProps> = ({testimonials}) => {

    if (!testimonials) return null;

    const items = [...testimonials, ...testimonials].map((testimonial, index) => (
        <SingleSlide key={index} slide={testimonial}/>
    ));

    return <div className="relative video-slider px-2">
        <Slider items={items} height="770px"/>
    </div>
}

type Props = {
    slide: TestimonialType;
}

const SingleSlide: FC<Props> = ({slide}) => {
    return <div
        className={`flex-none w-full h-full px-[22px] py-12 pb-[30px] origin-top-left rounded-[30px] relative overflow-hidden lg:pt-20 lg:px-15 `}>
        <div className="relative z-10 slide-content-inner transition-all duration-300">
            <div className="text-white text-base font-medium tracking-wider mb-4">{slide.position}</div>
            <div className=" text-white text-3xl font-medium md:max-w-[460px] lg:text-[40px] mb-10">
                {slide.content}
            </div>
            <div className="mb-15">
                <a href={slide.link}
                   className="text-[#eef8fd] text-lg font-semibold underline leading-[25px] flex gap-2 items-center ">
                    {slide.title} <ArrowRight/>
                </a>
            </div>
            <div className="">
                <div
                    className="w-[308px] h-[100px] bg-white/10 rounded-[100px] backdrop-blur-[60px] flex gap-4 items-center p-1.5">
                    <img src={slide.clientPicture} alt={slide.client}/>
                    <div>
                        <div className="text-white text-xl font-medium leading-none mb-2">{slide.client}</div>
                        <div className="text-white text-base font-light leading-none mb-2">{slide.position}</div>
                        {slide.location && <div
                            className="w-[87px] h-6 px-[37px] py-[11px] bg-[#eef8fd] rounded-[20px] justify-center items-center gap-2.5 inline-flex">
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