import {Autoplay} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {LeaderLogos} from "@/types/logos";
import "./styles.css";
import {FC} from "react";

type Props = {
    logos: LeaderLogos[];
}

export const Leaders:FC<Props> = ({logos}) => {
    return <div className="my-10 mb-14">
        <div className="max-w-[1066px] mx-auto">

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
                    <SwiperSlide key={index} style={{ width: '203px' }}>
                        <a href={lr.link} className="flex justify-center items-center overflow-hidden">
                            <img className="object-contain" src={lr.src} alt={lr.alt} />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    </div>
}