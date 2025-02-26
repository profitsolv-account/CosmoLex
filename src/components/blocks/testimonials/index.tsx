'use client'
import {useEffect, useRef, useState} from "react";
import Link from "next/link";

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


const testimonials = [
    {
        name: 'Roth Advocacy 1',
        position: 'Jonathan Roth Founder',
        location: "Canada",
        text: 'The intuitive design and robust features of CosmoLex have been a game-changer for my firm. I recommend it to any solo practitioner looking to reclaim their time.'
    },
    {
        name: 'Roth Advocacy 2',
        position: 'Jonathan Roth Founder',
        location: "Canada",
        text: 'The intuitive design and robust features of CosmoLex have been a game-changer for my firm. I recommend it to any solo practitioner looking to reclaim their time.'
    },
    {
        name: 'Roth Advocacy 3',
        position: 'Jonathan Roth Founder',
        location: "Canada",
        text: 'The intuitive design and robust features of CosmoLex have been a game-changer for my firm. I recommend it to any solo practitioner looking to reclaim their time.'
    },

]

export const Testimonials = () => {

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
        <section className="testimonials-section bg-white px-7 pt-25 pb-[63px] md:pb-24 relative">
          <div className="absolute top-[-150px] left-0 w-full h-full bg-white z-0 rounded-tr-[100px]" />
            <div className="absolute bottom-[-150px] left-0 w-full h-full bg-white z-0 rounded-bl-[100px]" />
          <div className="max-w-[1140px] mx-auto relative z-10">
              <div className="relative lg:px-1">
                  <Swiper
                      ref={swiperRef}
                      slidesPerView={1}
                      spaceBetween={30}
                      loop={true}
                      modules={[Autoplay, Pagination, Navigation]}
                     /* autoplay={{
                          delay: 4500,
                      }}*/
                      pagination={{
                          clickable: !isNavigationEnabled,
                          enabled: true
                      }}
                      className="max-lg:!pb-16"
                      autoHeight={false}
                  >
                      {
                          testimonials.map((t) => (
                              <SwiperSlide key={t.name}>
                                  <div className="h-full min-h-[491.19px] flex flex-col bg-white text-left rounded-lg md:min-h-[407px] md:p-16 md:pt-15">

                                      <div className="w-[339px] italic text-[#151c2d] text-[31px] font-semibold font-['Inter'] leading-10 mb-10 md:w-full md:text-[46px] md:leading-[64px]">
                                          <Quote className="mb-6 md:w-[60px] md:h-[60px]" />
                                          {t.text}
                                      </div>
                                      <div className="flex gap-5 items-end md:items-center md:gap-10">
                                          <div>
                                              <img src={userPic.src} alt="user-pic" className="w-[94px] h-[94px] md:w-[112px] md:h-[112px]" />
                                          </div>
                                          <div>
                                              <div className="text-[#151c2d] text-xl font-semibold font-['Inter'] leading-[14px] mb-3">{t.name}</div>
                                              <div className="text-[#151c2d] text-base font-light font-['Inter'] leading-[14px] mb-3">{t.position}</div>
                                              <div
                                                  className="w-[87px] h-6 px-[37px] py-[11px] bg-[#eef8fd] rounded-[20px] justify-center items-center gap-2.5 inline-flex">
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