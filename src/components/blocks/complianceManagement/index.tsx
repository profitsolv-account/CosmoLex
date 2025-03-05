import React, {useRef, useState} from "react";
import classNames from "classnames";
import bg from "@/assets/img/compliance/legal_billing_&_payments.webp";
import bg2 from "@/assets/img/compliance/firm_management.webp";
import bg4 from "@/assets/img/compliance/accounting_&_finance.webp";
import bg3 from "@/assets/img/compliance/client_engagement.webp";

import block2 from "@/assets/img/compliance/block-2.png";
import block1 from "@/assets/img/compliance/block-1.png";

// Import Swiper React components
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import LeftIcon from "@/assets/img/icons/left-arrow-icon.svg";
import RightIcon from "@/assets/img/icons/right-arrow-icon.svg";

import "./styles.css";


const dataSliders = [{
    title: "Client Engagement",
    description: "Grow your firm and elevate your client experience. Streamline intake, build a strong online presence, and securely manage documents.",
    image: bg3,
    link: "/",
    className: "bg-blue",
}, {
    title: "Firm Management",
    description: "Efficiently manage your practice. Track matters, pull reports, and keep your law firm productive. ",
    image: bg2,
    link: "/",
    className: "bg-yellow",
}, {
    title: "Billing & Payments",
    description: "Improve your firm’s cash flow. Use our custom invoices to get paid faster in just a few clicks.",
    image: bg,
    link: "/",
    className: "bg-salmon",
}, {
    title: "Accounting & Finance",
    description: "Connect your firm to your finances. Manage your firm’s finances, stay compliant with built-in trust accounting, and generate real-time reports.",
    image: bg4,
    link: "/",
    className: "bg-green",
}];


export const ComplianceManagement = () => {

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const swiperRef = useRef<any>(null);

    const handleTabClick = (index:number) => {
        setActiveIndex(index);
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index);
        }
    }

    return <div>
        <div className="container max-w-[1066px] mb-16 px-4">
            <div className="text-[14px] text-center text-primary-dark md:text-base font-normal font-['Inter'] uppercase mb-5 tracking-[1.26px]">
                Compliance management simplified
            </div>
            <h3 className="text-[36px] text-center text-primary-dark font-bold font-['Inter'] leading-[60px] md:px-24 mb-17 md:text-[46px]">
                Streamline your legal workflow with our comprehensive legal practice software.
            </h3>
            <Tabs activeIndex={activeIndex} onTabClick={handleTabClick} />
        </div>
        <Slider activeIndex={activeIndex} setActiveIndex={setActiveIndex} swiperRef={swiperRef} />
        <AccountingTools />

    </div>
}

type SliderProps = {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    swiperRef: any;
};
const Slider = ({activeIndex, setActiveIndex, swiperRef}: SliderProps) => {

    return <div className="relative pb-8 md:pb-32">

        <div className="px-2">
            <div className="max-w-[542px] flex mx-auto lg:max-w-[1512px] relative blocks-slider min-h-[550px]">

                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    slidesPerView={1}

                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    navigation={{
                        enabled: true,
                        nextEl: '.button-next-slide',
                        prevEl: '.button-prev-slide',
                    }}
                    /*autoplay={{
                        delay: 4500,
                    }}*/
                    className="max-lg:!pb-12"
                    centeredSlides={true}
                    spaceBetween={20}
                    autoHeight={false}
                    speed={1200}
                    breakpoints={{
                        1024: {
                            slidesPerView: "auto",
                            spaceBetween: 20,
                        }
                    }}
                >
                    {
                        dataSliders.map((t, index) => (
                            <SwiperSlide key={`${t.title}_${index}`} className={"w-full lg:!w-[1066px] !flex items-center h-full"}>
                                <div className="h-full flex flex-col-reverse mx-auto  relative z-10 lg:grid slide-content overflow-hidden  transition-all duration-1200 lg:h-[550px] lg:grid-cols-2 lg:max-w-[1066px]">

                                    <div className="max-h-[280px] rounded-br-[15px] rounded-bl-[15px] relative bg-cover bg-center overflow-hidden h-full lg:max-h-full lg:rounded-br-[0px] lg:rounded-tl-[30px] lg:rounded-bl-[30px] lg:flex lg:items-center lg:justify-center">
                                        <img src={t.image.src} alt="" className="object-cover w-full h-full  aspect-square"/>
                                    </div>
                                    <div className={classNames("rounded-tl-[15px] rounded-tr-[15px] relative flex items-center justify-center px-9 py-9 pb-16 lg:rounded-br-[30px] lg:rounded-tr-[30px] lg:rounded-tl-[0px] overflow-hidden", t.className)}>
                                        <div className="lg:w-[442px] flex-col justify-start items-start gap-5 inline-flex">
                                            <div className=" text-primary-dark text-[36px] font-bold leading-[45px] font-['Inter'] lg:leading-[55px] lg:text-[46px]">{t.title}</div>
                                            <div className="text-primary-dark text-base font-normal font-['Inter'] mb-2 leading-[30px] max-w-[350px] lg:mb-7">{t.description}</div>
                                            <a href={t.link}
                                               className="w-full block text-center lg:inline-block rounded-[100px] bg-primary-dark justify-center items-center text-white text-base font-normal font-['Inter'] px-[30px] py-[15px] lg:w-auto">
                                                Explore features
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                <div className="button-prev-slide absolute left-16 top-[50%] translate-y-[-60%] hidden cursor-pointer lg:block z-12">
                    <LeftIcon />
                </div>
                <div className="button-next-slide absolute z-5 right-16 top-[50%] translate-y-[-60%] hidden cursor-pointer lg:block ">
                    <RightIcon />
                </div>

            </div>
        </div>
        <div className="absolute w-full  bg-primary z-0 h-[70%] bottom-0 rounded-tr-[100px]" />
    </div>
}


type TabsProps = {
    activeIndex: number;
    onTabClick: (index: number) => void;
}
const Tabs = ({activeIndex, onTabClick}:TabsProps) => {

    const tabs = [
        {title: "Client Engagement", id: "client-engagement"},
        {title: "Firm Management", id: "firm-management"},
        {title: "Billing & Payments", id: "billing-payments"},
        {title: "Accounting & Finance", id: "accounting-finance"},
    ]

    return <div className="overflow-auto w-full pb-5">
        <div className="flex gap-2.5 justify-center min-w-[890px]">
            {tabs.map((tab, index) => (
                <div
                    className={classNames("h-10 px-[30px] pt-5 pb-[22px] rounded-[100px] justify-center items-center gap-2.5 inline-flex transition duration-300 group  hover:bg-primary-dark", {
                        "bg-primary-dark": activeIndex === index,
                        "bg-white ": activeIndex !== index,
                    })}
                    onClick={() => onTabClick(index)}
                    key={index} style={{cursor: 'pointer'}}
                >
                    <div className={classNames("text-center text-primary-dark text-base font-normal font-['Inter'] transition duration-300 group-hover:text-white", {
                        "text-white": activeIndex === index
                    })}>{tab.title}</div>
                </div>
            ))}
        </div>
    </div>
}

const AccountingTools = () => {

    return (<div className="flex justify-center items-center pb-20 md:py-20 relative">
       <div className="flex-none w-full px-2 flex flex-col max-w-[350px] md:flex-row md:max-w-[1138px] md:items-center relative z-20">

         <div className="md:grow md:w-[402px] md:flex-none md:pb-18">
             <div className="text-yellow text-[15px] tracking-[1.2px] font-normal font-['Inter'] uppercase mb-3 md:text-base md:tracking-[1.26px] md:mb-4">Compliance management simplified</div>
             <h3 className="text-white text-4xl font-bold font-['Inter'] leading-[50px] mb-5 md:text-[46px] md:leading-[55px] md:w-full md:mb-8">Keep your firm compliant with built-in accounting tools.</h3>
             <a
                 href="/"
                 className="flex items-center justify-center text-center h-[54px] px-[30px] bg-white rounded-[100px] border text-primary-dark text-base font-normal font-['Inter'] transition duration-300 hover:bg-primary-dark hover:text-white md:inline-flex">
                 Learn more
             </a>
         </div>

           <div className="grid grid-cols-2 gap-4 mt-10 md:pr-[50px] md:grow">
               <div>
                   <img src={block2.src} alt="" className="md:aspect-square md:w-full"/>
               </div>
               <div>
                   <div className="w-[135px] h-[135px] sm:w-[155px] sm:h-[155px] bg-[#b9dfc3] rounded-[15px] md:aspect-square md:rounded-[30px] md:w-full md:h-full">
                   </div>
               </div>
               <div>
                   <div className="w-[135px] h-[135px] sm:w-[155px] sm:h-[155px] bg-[#fdf1b7] rounded-[15px] md:aspect-square md:rounded-[30px] md:w-full md:object-cover md:h-full"></div>
               </div>
               <div>
                   <img src={block1.src} alt="" className="md:aspect-square md:w-full"/>
               </div>
           </div>
       </div>

        <div className="absolute w-full h-full left-0 bg-primary z-0 rounded-bl-[100px] top-[-20%]" />

    </div>
    )}
