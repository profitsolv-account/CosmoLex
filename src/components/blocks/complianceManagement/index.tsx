import {useState} from "react";
import classNames from "classnames";
import bg from "@/assets/img/compliance/man-working.webp";
import man from "@/assets/img/compliance/man-cutout.png";
import block2 from "@/assets/img/compliance/block-2.png";
import block1 from "@/assets/img/compliance/block-1.png";

export const ComplianceManagement = () => {

    return <div>
        <div className="container max-w-[1066px] mb-16">
            <div className="text-center text-primary-dark text-base font-normal font-['Inter'] uppercase tracking-wider mb-5"
                 style={{
                     letterSpacing: '1.26px'
                 }}>
                Compliance management simplified
            </div>
            <h3 className="text-[36px] text-center text-primary-dark font-bold font-['Inter'] leading-[60px] md:px-24 mb-17 md:text-[46px]">
                Streamline your legal workflow with our comprehensive legal practice software.
            </h3>
            <Tabs />
        </div>

        <Slider />

        <AccountingTools />

    </div>
}


const Slider = () => {

    return <div className="relative pb-32">

        <div className="px-2">
            <div className="max-w-[542px] flex flex-col-reverse mx-auto lg:max-w-[1066px] relative z-10 lg:grid lg:grid-cols-2">

                <div className="rounded-br-[15px] rounded-bl-[15px] lg:rounded-bl-[30px] relative min-h-[550px]" style={{
                    background: 'url(' + bg.src + ') no-repeat left center',
                }}>
                    <div className="absolute w-full h-full top-[-57px] left-0 z-10" style={{
                        background: 'url('+man.src+') no-repeat left center',
                    }}/>

                    <div className="bg-[#d9d9d9] rounded-[10px] absolute z-20 right-5 bottom-5 w-[300px] h-[180px] lg:bottom-[-60px] lg:left-[-60px] lg:w-[417px] lg:h-[232px]" />
                </div>

                <div className="rounded-tl-[15px] rounded-tr-[15px] bg-salmon relative flex items-center justify-center px-9 py-9 pb-16 lg:rounded-br-[30px] lg:rounded-tl-[0px]">
                    <div className="w-[442px] flex-col justify-start items-start gap-5 inline-flex">
                        <div className=" text-primary-dark text-[36px] font-bold leading-[45px] font-['Inter']  max-w-[300px] lg:leading-[55px] lg:text-[46px]">Legal Billing & Payments.</div>
                        <div className="text-primary-dark text-base font-normal font-['Inter'] mb-2 leading-[30px] max-w-[350px] lg:mb-7">Improve your firm’s cash flow. Use our custom invoices to get paid faster in just a few clicks </div>
                        <a href="/"
                           className="w-full block text-center lg:inline-block rounded-[100px] bg-primary-dark justify-center items-center text-white text-base font-normal font-['Inter'] px-[30px] py-[15px]">
                            Explore features
                        </a>
                    </div>
                </div>

            </div>
        </div>

        <div className="absolute w-full  bg-primary z-0 h-[70%] bottom-0 rounded-tr-[100px]" />
    </div>
}


const Tabs = () => {
    const [activeTab, setActiveTab] = useState("billing-payments");
    const tabs = [
        {
            title: "Firm Management",
            id: "firm-management"
        },
        {
            title: "Billing & Payments",
            id: "billing-payments"
        },
        {
            title: "Accounting & Finance",
            id: "accounting-finance"
        },
        {
            title: "Client Engagement",
            id: "client-engagement"
        }
    ]

    return <div className="overflow-auto w-full pb-5">
        <div className="flex gap-2.5 justify-center min-w-[890px]">

            {tabs.map((tab) => {
                return <div
                    className={classNames("h-10 px-[30px] pt-5 pb-[22px] rounded-[100px] justify-center items-center gap-2.5 inline-flex transition duration-300 group  hover:bg-primary-dark", {
                        "bg-primary-dark": activeTab === tab.id,
                        "bg-white ": activeTab !== tab.id,
                    })}
                    onClick={() => setActiveTab(tab.id)}
                    key={tab.id} style={{cursor: 'pointer'}}
                >
                    <div className={classNames("text-center text-primary-dark text-base font-normal font-['Inter'] transition duration-300 group-hover:text-white", {
                        "text-white": activeTab === tab.id
                    })}>{tab.title}</div>
                </div>
            })}
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
