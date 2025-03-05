'use client'
import {FC, useEffect, useRef, useState} from "react";

// Import Swiper React components
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import userPic from '@/assets/img/testimonials/userpic.png';

import Quote from '@/assets/img/quote.svg';
import {TestimonialType} from "@/types/testimonials";
import classNames from "classnames";

import IconRLeft from "@/assets/img/icons/left-rounded-icon.svg";

type Props = {
    testimonials: TestimonialType[];
    className?: string;
    bgOverlay?: boolean;
    showNavigation?: boolean;
}

export const Testimonials: FC<Props> = ({testimonials, className, showNavigation, bgOverlay = true}) => {

    const swiperRef = useRef<SwiperRef>(null);
    const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isDesktop = window.innerWidth >= 1024;
            setIsNavigationEnabled(isDesktop);
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update();
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className={classNames("testimonials-section bg-white px-7 pt-25 pb-[63px] md:pb-24 relative", className)}>
            {bgOverlay && <>
                <div className="absolute top-[-150px] left-0 w-full h-full bg-white z-0 rounded-tr-[100px]" />
                <div className="absolute bottom-[-150px] left-0 w-full h-full bg-white z-0 rounded-bl-[100px]" />
            </>}
          <div className="max-w-[1140px] mx-auto relative z-10">
              <div className="relative lg:px-1">

                  {showNavigation && <div className="hidden absolute z-11  right-[34px] top-[26px] gap-5 lg:flex">
                      <IconRLeft className="button-prev-t w-[47px] cursor-pointer" />
                      <IconRLeft className="button-next-t w-[47px] rotate-180 cursor-pointer" />
                  </div>}

                  <Swiper
                      ref={swiperRef}
                      slidesPerView={1}
                      spaceBetween={30}
                      loop={true}
                      modules={[Autoplay, Pagination, Navigation]}
                      autoplay={{
                          delay: 4500,
                      }}
                      pagination={{
                          clickable: !isNavigationEnabled,
                          enabled: true
                      }}
                      className="max-lg:!pb-16"
                      autoHeight={false}
                      speed={1000}
                      navigation={{
                          enabled: showNavigation,
                          nextEl: '.button-next-t',
                          prevEl: '.button-prev-t',
                  }}
                  >
                      {
                          testimonials.map((t, k) => (
                              <SwiperSlide key={`${t.client}_${k}`}>
                                  <div className="h-full min-h-[491.19px] flex flex-col text-left rounded-lg md:min-h-[407px] md:p-16 md:pt-15">

                                      <div className="w-[339px] italic text-[#151c2d] text-[31px] font-semibold font-['Inter'] leading-10 mb-10 md:w-full md:text-[46px] md:leading-[64px]">
                                          <Quote className="mb-6 md:w-[60px] md:h-[60px]" />
                                          {t.content}
                                      </div>
                                      <div className="flex gap-5 items-end md:items-center md:gap-10">
                                          <div>
                                              <img src={userPic.src} alt="user-pic" className="w-[94px] h-[94px] md:w-[112px] md:h-[112px]" />
                                          </div>
                                          <div>
                                              <div className="text-[#151c2d] text-xl font-semibold font-['Inter'] leading-[14px] mb-3">{t.client}</div>
                                              <div className="text-[#151c2d] text-base font-light font-['Inter'] leading-[14px] mb-3">{t.position}</div>
                                              <div
                                                  className={classNames("w-[87px] h-6 px-[37px] py-[11px] bg-[#eef8fd] rounded-[20px] justify-center items-center gap-2.5 inline-flex", {
                                                      "!bg-white" : !bgOverlay
                                                  })}>
                                                  <div
                                                      className="text-center text-black text-sm font-medium font-['Inter']">{t.location}</div>
                                              </div>

                                          </div>
                                      </div>
                                  </div>
                              </SwiperSlide>
                          ))
                      }
                  </Swiper>
              </div>
          </div>
        </section>
    )
}