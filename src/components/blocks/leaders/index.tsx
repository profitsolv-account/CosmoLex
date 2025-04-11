"use client";
import {Autoplay} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {LeaderLogos} from "@/types/logos";
import {FC} from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./styles.css";
import classNames from "classnames";

type Props = {
    logos: LeaderLogos[];
    className?: string;
}

export const Leaders:FC<Props> = ({logos, className}) => {
    return <div className="my-10 mb-14">
        <div className={classNames('max-w-[66.625rem] mx-auto', className)}>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={10}
                loop={true}
                speed={3000}
                allowTouchMove={true}
                modules={[Autoplay]}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
            >
                {logos.map((lr, index) => (
                    <SwiperSlide key={index} style={{ width: '12.6875rem' }}>
                        <a href={lr.link} className="flex justify-center items-center overflow-hidden">
                            <img className="object-contain h-[7.875rem]" src={lr.src} alt={lr.alt} />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    </div>
}