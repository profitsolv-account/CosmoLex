// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React, {FC, useState} from "react";
import classNames from "classnames";

import PlayIcon from "@/assets/img/icons/play-con.svg";

import './styles.css';
import {TestimonialType} from "@/types/testimonials";
import VideoModal from "@/components/blocks/videoModal";
import LeftIcon from "@/assets/img/icons/left-arrow-icon.svg";
import RightIcon from "@/assets/img/icons/right-arrow-icon.svg";

type TestimonialsProps = {
    testimonials: TestimonialType[]
}

export const VideoTestimonials:FC<TestimonialsProps> = ({testimonials}) => {

    const [videoPlayer, setVideoPlayer] = useState({
        open: false,
        video: ""
    });

    if (!testimonials) return null;

    return <div className="relative video-slider container">
        <Swiper
            loop={true}
            watchSlidesProgress={true}
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={20}
            autoHeight={false}
            navigation={{
                enabled: true,
                nextEl: '.button-next',
                prevEl: '.button-prev',
            }}
            modules={[Autoplay, Navigation]}
            speed={800}
        >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
                <SwiperSlide key={index} className={"!w-[310px] md:!w-[1064px] !flex items-center min-h-[632px]"}>
                    <SingleSlide key={index} slide={testimonial} onPlay={() => {
                        setVideoPlayer({
                            open: true,
                            video: testimonial.videoUrl
                        });
                    }} />
                </SwiperSlide>
            ))}
        </Swiper>

        <div className="button-prev absolute left-16 top-[50%] translate-y-[-60%] hidden cursor-pointer lg:block z-12">
            <LeftIcon />
        </div>
        <div className="button-next absolute z-5 right-16 top-[50%] translate-y-[-60%] hidden cursor-pointer lg:block ">
            <RightIcon />
        </div>

        {videoPlayer.open &&
            <VideoModal isOpen={true} videoId="89riyfqgyc" onClose={() => {
                setVideoPlayer({
                    open: false,
                    video: ""
                });
            }} />
        }
    </div>
}

type Props = {
    slide: TestimonialType;
    onPlay: (videoId: string) => void;
}

const SingleSlide:FC<Props> = ({slide, onPlay}) => {

    return <div className={`flex-none w-[300px] px-[22px] pt-[89px] pb-[30px] min-h-[632px] origin-top-left rounded-[30px]  slide-content transition-all duration-200 mx-auto relative overflow-hidden md:max-w-[500px] md:w-full lg:max-w-[1064px] lg:pt-38 lg:px-15 `}>
            <div className="relative z-10 slide-content-inner">
                <div className="text-white text-base font-medium tracking-wider mb-4">{slide.position}</div>
                <div className=" text-white text-3xl font-medium mb-2 md:max-w-[460px] lg:text-[40px]">
                    {slide.content}
                </div>

                <div className="lg:flex lg:justify-between lg:mt-10 lg:items-center">
                    <a href="/" className="hidden lg:inline-flex base-btn bg-white border-none hover:bg-primary-dark hover:text-white">Learn more</a>
                    <div className="flex flex-col gap-4 items-start lg:flex-row-reverse ">
                        <div className="">
                            <PlayIcon className="cursor-pointer" onClick={() => {
                                onPlay(slide.videoUrl ?? "");
                            }} />
                        </div>

                        <div className="w-[308px] h-[100px] bg-white/10 rounded-[100px] backdrop-blur-[60px] flex gap-4 items-center p-1.5">
                            <img src={slide.clientPicture} alt={slide.client}/>
                            <div>
                                <div className="text-white text-xl font-medium leading-none mb-2">{slide.client}</div>
                                <div className="text-white text-base font-light leading-none mb-2">{slide.position}</div>
                                {slide.location && <div className="w-[87px] h-6 px-[37px] py-[11px] bg-[#eef8fd] rounded-[20px] justify-center items-center gap-2.5 inline-flex">
                                    <div className="text-center text-black text-sm font-medium font-['Inter']">{slide.location}</div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className={classNames("absolute z-0 top-0 left-0 w-full h-full bg-cover bg-center transform", {
                "scale-x-[-1]": slide.flipBackground
            })} style={{
                backgroundImage: "url("+slide.background+")"
            }} />
            <div className="absolute z-1 top-0 left-0 w-full h-full bg-linear-to-r from-black/80 to-black/0" />

           {/* <div className="left-overlay hidden absolute z-2 top-0 left-0 w-full h-full bg-linear-to-r from-white/80 to-white/0" />
            <div className="right-overlay hidden absolute z-2 top-0 left-0 w-full h-full bg-linear-to-r from-white/0 to-white/80" />*/}
        </div>
}