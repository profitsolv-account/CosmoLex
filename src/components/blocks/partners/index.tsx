// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {FC} from "react";
import classNames from "classnames";

import aaw from '@/assets/img/partners/sliders/aaw_logo.webp';
import aba from '@/assets/img/partners/sliders/ABA.webp';
import atl from '@/assets/img/partners/sliders/ATL.webp';
import alabama from '@/assets/img/partners/sliders/alabama_state_bar.webp';
import box from '@/assets/img/partners/sliders/box.webp';
import canadian from '@/assets/img/partners/sliders/canadian_bar_assoc.webp';
import chicago from '@/assets/img/partners/sliders/chicago_bar_assoc.webp';
import connecticut from '@/assets/img/partners/sliders/connecticut_bar_assoc.webp';
import copilot from '@/assets/img/partners/sliders/copilot.webp';
import dropbox from '@/assets/img/partners/sliders/dropbox.webp';
import florida from '@/assets/img/partners/sliders/florida_bar.webp';
import googleWorkspace from '@/assets/img/partners/sliders/google_workspace.webp';
import illinois from '@/assets/img/partners/sliders/illinois_state_bar_assoc.webp';
import indiana from '@/assets/img/partners/sliders/indiana_state_bar_assoc.webp';
import kansas from '@/assets/img/partners/sliders/kansas_bar_assoc.webp';
import lawTechToday from '@/assets/img/partners/sliders/law_technology_today.webp';
import lawsites from '@/assets/img/partners/sliders/lawsites.webp';
import lawyerist from '@/assets/img/partners/sliders/lawyerist.webp';
import lexsign from '@/assets/img/partners/sliders/lexsign_io.webp';
import ltt from '@/assets/img/partners/sliders/LTT.webp';
import missouri from '@/assets/img/partners/sliders/missouri_bar_member.webp';
import msba from '@/assets/img/partners/sliders/msba.webp';
import nacba from '@/assets/img/partners/sliders/national_assoc_consumer_bankruptcy.webp';
import netdocuments from '@/assets/img/partners/sliders/netdocuments.webp';
import newJersey from '@/assets/img/partners/sliders/new_jersey_state_bar_assoc.webp';
import oklahoma from '@/assets/img/partners/sliders/oklahoma_bar_assoc.webp';
import outlook from '@/assets/img/partners/sliders/outlook.webp';
import philadelphia from '@/assets/img/partners/sliders/philadelphia_bar_assoc.webp';
import plf from '@/assets/img/partners/sliders/professional_liability_fund.webp';
import rhodeIsland from '@/assets/img/partners/sliders/rhode_island_bar_assoc.webp';
import southCarolina from '@/assets/img/partners/sliders/south_carolina_bar.webp';
import stateGeorgia from '@/assets/img/partners/sliders/state_bar_georgia.webp';
import stateArizona from '@/assets/img/partners/sliders/state_bar_of_arizona.webp';
import stateTexas from '@/assets/img/partners/sliders/state_bar_texas.webp';
import washington from '@/assets/img/partners/sliders/washington_state_bar_assoc.webp';


type Props = {
    className?: string;
}

export const Partners: FC<Props> = ({className}) => {
    const items = [
        aaw.src,
        aba.src,
        atl.src,
        alabama.src,
        box.src,
        canadian.src,
        chicago.src,
        connecticut.src,
        copilot.src,
        dropbox.src,
        florida.src,
        googleWorkspace.src,
        illinois.src,
        indiana.src,
        kansas.src,
        lawTechToday.src,
        lawsites.src,
        lawyerist.src,
        lexsign.src,
        ltt.src,
        missouri.src,
        msba.src,
        nacba.src,
        netdocuments.src,
        newJersey.src,
        oklahoma.src,
        outlook.src,
        philadelphia.src,
        plf.src,
        rhodeIsland.src,
        southCarolina.src,
        stateGeorgia.src,
        stateArizona.src,
        stateTexas.src,
        washington.src,
    ];


    // Duplicate items multiple times for a smooth infinite loop
    const slides = [...items, ...items];

    return (
        <>
            <div className={classNames("container-s relative pt-20 overflow-hidden mb-[7.5625rem] px-4", className)}>
                <div className="text-primary-dark  text-[1.375rem] font-semibold font-['Inter'] leading-loose mb-5 md:text-[2rem]">
                    Trusted Industry Partners
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
                            delay: 0,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                    >
                        {slides.map((src, index) => (
                            <SwiperSlide key={index} style={{ width: '12.6875rem' }}>
                                <div className={classNames("bg-white rounded-[0.625rem] flex justify-center items-center overflow-hidden w-[12.6875rem] h-[7.5625rem] p-3", {
                                    '!p-0': src === connecticut.src,
                                    '!p-8': src === box.src,
                                })}>
                                    <img
                                        className="object-contain max-h-full"
                                        src={src}
                                        alt={`Slide ${index}`}
                                        width="91"
                                        height="78"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};
