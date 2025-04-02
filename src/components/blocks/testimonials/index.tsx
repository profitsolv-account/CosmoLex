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
import Image from 'next/image';


import Quote from '@/assets/img/quote.svg';
import {TestimonialType} from "@/types/testimonials";
import classNames from "classnames";

import IconRLeft from "@/assets/img/icons/left-rounded-icon.svg";

type Props = {
    testimonials: TestimonialType[];
    className?: string;
    bgOverlay?: boolean;
    showNavigation?: boolean;
    theme?: 'light' | 'dark';
}

export const Testimonials: FC<Props> = ({testimonials, className, showNavigation, theme = 'dark', bgOverlay = true}) => {

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
        <section className={classNames("testimonials-section bg-white px-7 pt-25 pb-[3.9375rem] md:pb-24 relative", className, {
            "theme-light": theme === 'light',
        })}>
            {bgOverlay && <>
                <div className="absolute top-[-9.375rem] left-0 w-full h-full bg-white z-0 rounded-tr-[6.25rem]" />
                <div className="absolute bottom-[-9.375rem] left-0 w-full h-full bg-white z-0 rounded-bl-[6.25rem]" />
            </>}
          <div className="max-w-[71.25rem] mx-auto relative z-10">
              <div className="relative lg:px-1">

                  {showNavigation && <div className="hidden absolute z-11  right-[2.125rem] top-[1.625rem] gap-5 lg:flex">
                      <IconRLeft
                          className={classNames("button-prev-t w-[2.9375rem] cursor-pointer", {
                              'stroke-white': theme === 'light'
                          })}
                      />
                      <IconRLeft
                          className={classNames("button-next-t w-[2.9375rem] rotate-180 cursor-pointer", {
                              'stroke-white': theme === 'light'
                          })}
                      />
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
                                  <div className="h-full min-h-[30.6994rem] flex flex-col text-left rounded-lg md:min-h-[25.4375rem] md:p-16 md:pt-15">

                                      <div className={classNames("w-full italic text-[1.9375rem] font-semibold font-['Inter'] leading-10 mb-10 md:w-full md:text-[2.875rem] md:leading-[4rem]", {
                                            "text-white": theme === 'light',
                                            "text-primary-dark": theme === 'dark'
                                      })}>
                                          <Quote className="mb-6 w-[3.75rem] h-[3.75rem]  md:w-[3.75rem] md:h-[3.75rem]" />
                                          {t.content}
                                      </div>
                                      <div className="flex gap-5 items-end md:items-center md:gap-10">
                                          {t.clientPicture && t.clientPicture.mediaDetails && <div>
                                              <Image
                                                  src={t.clientPicture.sourceUrl}
                                                  alt={t.clientPicture.altText}
                                                  className="w-[5.875rem] h-[5.875rem] md:w-[7rem] md:h-[7rem]"
                                                  width={t.clientPicture.mediaDetails.width}
                                                  height={t.clientPicture.mediaDetails.height}
                                              />
                                          </div>}
                                         {/* {t.clientPicture && !t.clientPicture.mediaDetails && <div className="w-25 h-25 rounded-[100rem] bg-gray-100" />}*/}
                                         <div>
                                              <div className={classNames("text-primary-dark text-xl font-semibold font-['Inter'] leading-[0.875rem] mb-3", {
                                                  "text-white": theme === 'light',
                                                  "text-primary-dark": theme === 'dark'
                                              })}>{t.client}</div>
                                              <div className={classNames("text-primary-dark text-base font-light font-['Inter'] leading-[0.875rem] mb-3", {
                                                  "text-white": theme === 'light',
                                                  "text-primary-dark": theme === 'dark'
                                              })}>{t.position}</div>
                                             {t.location && <div
                                                  className={classNames("w-[5.4375rem] h-6 px-[2.3125rem] py-[0.6875rem] bg-[#eef8fd] rounded-[1.25rem] justify-center items-center gap-2.5 inline-flex", {
                                                      "!bg-white" : !bgOverlay
                                                  })}>
                                                  <div
                                                      className="text-center text-black text-sm font-medium font-['Inter']">{t.location}</div>
                                              </div>}

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