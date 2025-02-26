import {useRef, useState} from "react";
import classNames from "classnames";
import bg from "@/assets/img/compliance/working-process.webp";
import block2 from "@/assets/img/compliance/block-2.png";
import block1 from "@/assets/img/compliance/block-1.png";
import IconRLeft from "@/assets/img/icons/left-rounded-icon.svg";

// Import Swiper React components
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const data = [{
    title: "Firm Management",
    description: "Manage your firm with ease. Our legal practice management software is designed to help you manage your firm’s day-to-day operations.",
    image: bg,
    link: "/"
}, {
    title: "Billing & Payments",
    description: "Improve your firm’s cash flow. Use our custom invoices to get paid faster in just a few clicks",
    image: bg,
    link: "/"
}, {
    title: "Accounting & Finance",
    description: "Keep your firm compliant with built-in accounting tools.",
    image: bg,
    link: "/"
}, {
    title: "Client Engagement",
    description: "Improve client communication. Our client portal allows you to securely share documents and communicate with clients.",
    image: bg,
    link: "/"
}];


export const ComplianceManagement = () => {

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const swiperRef = useRef<any>(null);

    // Function to handle tab click
    const handleTabClick = (index:number) => {
        setActiveIndex(index);
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
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

    return <div className="relative pb-32">

        <div className="px-2">
            <div className="max-w-[542px] flex mx-auto lg:max-w-[1066px] relative">

                <div className="hidden absolute z-11  right-[34px] top-[26px] gap-5 lg:flex">
                    <IconRLeft className="button-prev w-[47px] cursor-pointer" />
                    <IconRLeft className="button-next w-[47px] rotate-180 cursor-pointer" />
                </div>


                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    navigation={{
                        enabled: true,
                        nextEl: '.button-next',
                        prevEl: '.button-prev',
                    }}
                    autoplay={{
                        delay: 4500,
                    }}
                    className="max-lg:!pb-12"
                    autoHeight={false}
                    speed={1200}
                >
                    {
                        data.map((t) => (
                            <SwiperSlide key={t.title}>
                                <div className=" flex flex-col-reverse mx-auto lg:max-w-[1066px] relative z-10 lg:grid lg:grid-cols-2">
                                    <div className="rounded-br-[15px] rounded-bl-[15px] relative min-h-[550px] bg-cover bg-center lg:rounded-br-[0px] lg:rounded-tl-[30px] lg:rounded-bl-[30px] lg:flex lg:items-center lg:justify-center" style={{
                                        backgroundImage: 'url(' + t.image.src + ')',
                                    }}>

                                        <div className="bg-[#d9d9d9] rounded-[10px] absolute z-20 right-5 bottom-5 w-[300px] h-[180px] lg:static lg:bottom-[-60px] lg:left-[-60px] lg:w-[222px] lg:h-[124px]" />
                                    </div>

                                    <div className="rounded-tl-[15px] rounded-tr-[15px] bg-salmon relative flex items-center justify-center px-9 py-9 pb-16 lg:rounded-br-[30px] lg:rounded-tr-[30px] lg:rounded-tl-[0px]">
                                        <div className="w-[442px] flex-col justify-start items-start gap-5 inline-flex">
                                            <div className=" text-primary-dark text-[36px] font-bold leading-[45px] font-['Inter']  max-w-[300px] lg:leading-[55px] lg:text-[46px]">{t.title}</div>
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
        {title: "Firm Management", id: "firm-management"},
        {title: "Billing & Payments", id: "billing-payments"},
        {title: "Accounting & Finance", id: "accounting-finance"},
        {title: "Client Engagement", id: "client-engagement"}
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

    return (<div className="flex justify-center items-center py-20 relative">
       <div className="flex-none w-full px-2 flex flex-col max-w-[350px] md:flex-row md:max-w-[1138px] md:items-center relative z-20">

         <div className="md:grow md:w-[402px] md:flex-none md:pb-18">
             <div className="text-yellow text-[15px] tracking-[1.2px] font-normal font-['Inter'] uppercase mb-3 md:text-base md:tracking-[1.26px] md:mb-4">Compliance management simplified</div>
             <h3 className="w-[332px] text-white text-4xl font-bold font-['Inter'] leading-[50px] mb-5 md:text-[46px] md:leading-[55px] md:w-full md:mb-8">Keep your firm compliant with built-in accounting tools.</h3>
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
                   <div className="w-[167px] h-[167px] bg-[#b9dfc3] rounded-[15px] md:aspect-square md:rounded-[30px] md:w-full md:h-full">
                   </div>
               </div>
               <div>
                   <div className="w-[167px] h-[167px] bg-[#fdf1b7] rounded-[15px] md:aspect-square md:rounded-[30px] md:w-full md:object-cover md:h-full"></div>
               </div>
               <div>
                   <img src={block1.src} alt="" className="md:aspect-square md:w-full"/>
               </div>
           </div>
       </div>

        <div className="absolute w-full h-full left-0 bg-primary z-0 rounded-bl-[100px] top-[-20%]" />

    </div>
    )}
