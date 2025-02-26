// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {FC} from "react";
import classNames from "classnames";

import slide1 from "@/assets/img/video-slider/slide-1.webp";
import slide2 from "@/assets/img/video-slider/slide-2.webp";
import slide3 from "@/assets/img/video-slider/slide-3.webp";
import userPic from "@/assets/img/video-slider/user-pic.png";
import PlayIcon from "@/assets/img/icons/play-con.svg";

import './styles.css';


type SlideType = {
    src: string
    title: string
    text: string
    user: {
        name: string
        company: string
    },
    flip?: boolean
}
const slides: SlideType[] = [{
    src: slide1.src,
    title: "Invoicing was cut from days to minutes, solved billing issues in real-time, and boosted clients trust.",
    text: "Invoicing was cut from days to minutes, solved billing issues in real-time, and boosted clients trust.",
    user: {
        name: "Patrick Kraemer",
        company: "Kraemer LLP"
    },
    flip: false
},{
    src: slide2.src,
    title: "Invoicing was cut from days to minutes, solved billing issues in real-time, and boosted clients trust.",
    text: "Invoicing was cut from days to minutes, solved billing issues in real-time, and boosted clients trust.",
    user: {
        name: "Patrick Kraemer",
        company: "Kraemer LLP"
    },
    flip: true
},{
    src: slide3.src,
    title: "Invoicing was cut from days to minutes, solved billing issues in real-time, and boosted clients trust.",
    text: "Invoicing was cut from days to minutes, solved billing issues in real-time, and boosted clients trust.",
    user: {
        name: "Patrick Kraemer",
        company: "Kraemer LLP"
    },
    flip: false
}];

const slidesList = [...slides, ...slides]

export const VideoSlider = () => {

    return <div className="relative video-slider container">

        <Swiper
            loop={true}
            watchSlidesProgress={true}
            slidesPerView={'auto'}
            centeredSlides={true}
            className="mySwiper"
            spaceBetween={20}
            autoHeight={false}
        >
            {slidesList.map((slide, index) => (
                <SwiperSlide key={index} className={"!w-[353px] md:!w-[1064px] !flex items-center min-h-[632px]"}>
                    <SingleSlide key={index} slide={slide} />
                </SwiperSlide>
            ))}
        </Swiper>


    </div>
}

type Props = {
    slide: SlideType
}
const SingleSlide:FC<Props> = ({slide}) => {

    return <div className={`flex-none w-[353px] px-[22px] pt-[89px] pb-[30px] min-h-[632px] origin-top-left rounded-[30px] mx-auto relative overflow-hidden md:max-w-[1064px] md:w-full slide-content transition-all duration-200`}>
            <div className="relative z-10">
                <div className="text-white text-base font-medium tracking-wider mb-4">{slide.user.company}</div>
                <div className=" text-white text-3xl font-medium mb-2 md:max-w-[460px]">
                    {slide.text}
                </div>
                <div className="mb-4">
                    <PlayIcon className="cursor-pointer" />
                </div>

                <div className="w-[308px] h-[100px] bg-white/10 rounded-[100px] backdrop-blur-[60px] flex gap-4 items-center p-1.5">
                    <img src={userPic.src} alt="user-pic"/>
                    <div>
                        <div className="text-white text-xl font-medium leading-none mb-2">{slide.user.name}</div>
                        <div className="text-white text-base font-light leading-none">{slide.user.company}</div>
                    </div>
                </div>
            </div>
            <div className={classNames("absolute z-0 top-0 left-0 w-full h-full bg-cover bg-center transform", {
                "scale-x-[-1]": slide.flip
            })} style={{
                backgroundImage: "url("+slide.src+")"
            }} />
            <div className="absolute z-1 top-0 left-0 w-full h-full bg-linear-to-r from-black/80 to-black/0" />
        </div>
}