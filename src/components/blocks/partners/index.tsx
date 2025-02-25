// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import aba from '@/assets/img/partners/sliders/ABA.webp';
import atl from '@/assets/img/partners/sliders/ATL.webp';
import ls from '@/assets/img/partners/sliders/LawSites.webp';
import ly from '@/assets/img/partners/sliders/Lawyerist.webp';
import ltt from '@/assets/img/partners/sliders/LTT.webp';
import canadian from '@/assets/img/partners/sliders/The-canadian-bar-association-optimized-768x432 1.webp';

export const Partners = () => {
    const items = [
        aba.src,
        atl.src,
        ltt.src,
        canadian.src,
        ly.src,
        ls.src,
    ];

    // Duplicate items multiple times for a smooth infinite loop
    const slides = [...items, ...items];

    return (
        <>
            <div className="container-s relative pt-20 overflow-hidden mb-[121px]">
                <div className="text-[#0c193a] text-[32px] font-semibold font-['Inter'] leading-loose mb-5">
                    Strategic & affinity partners.
                </div>
                <div className="w-full overflow-hidden">
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={20}
                        loop={true}
                        speed={4000}
                        allowTouchMove={true}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                    >
                        {slides.map((src, index) => (
                            <SwiperSlide key={index} style={{ width: '203px' }}>
                                <div className="bg-white rounded-[10px] flex justify-center items-center overflow-hidden w-[203px] h-[121px]">
                                    <img className="object-contain" src={src} alt={`Slide ${index}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};
