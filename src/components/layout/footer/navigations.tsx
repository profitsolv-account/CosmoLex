import Image from "next/image";
import logo from "@/assets/img/logo.svg?url";

export const Navigations = () => {
    return (<div className="w-full p-10 py-20 pb-9 relative bg-primary rounded-tr-[100px]">

        <div className="container max-w-[1266px] flex flex-col justify-between mx-auto gap-10 lg:flex-row">

            <div className="flex flex-col gap-6 lg:w-1/2">
                <div className="left-0">
                    <Image src={logo} alt="logo"/>
                </div>

                <div className="max-w-[409px] text-white text-base font-normal font-['Inter'] leading-snug">
                    CosmoLex is cloud-based law practice management software that integrates trust & business accounting, time tracking, billing, email & document management, and tasks & calendaring, in a single application.
                </div>

                <div>
                    <div className="text-white text-base font-bold font-['Inter'] leading-[25px] tracking-wide ls-07 mb-2">+1 866-878-6798</div>
                    <div className="text-white text-xs font-normal font-['Inter'] leading-[15px]">1100 Cornwall Road, Suite 215 Monmouth Junction, NJ</div>

                    <div className="relative flex gap-5 mt-5 items-center">
                        <a href="#" className="left-0 top-[1px] text-white text-base font-normal font-['Inter'] leading-snug">US</a>
                        <span className="block h-[27px] w-[1px] bg-white"></span>
                        <a href="#" className="left-[58px] top-[1px] text-white text-base font-normal font-['Inter'] leading-snug">CA</a>
                        <span className="block h-[27px] w-[1px] bg-white"></span>
                        <a href="#" className="left-[116px] top-[1px] text-white text-base font-normal font-['Inter'] leading-snug">UK</a>
                    </div>
                </div>
            </div>

           <div className="lg:w-1/2">
               <div className="flex flex-col gap-10 lg:flex-row w-full mb-25">
                   <div className="w-[175px] left-[645.53px] top-0 flex-col justify-start items-start gap-5 inline-flex">
                       <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">Company
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">About Us
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Our Services
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Bar Affinity Partners
                       </div>
                       <div
                           className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Pricing
                       </div>
                       <div
                           className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Enterprise-Grade Security
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">CosmoLex Careers
                       </div>
                   </div>
                   <div className="w-48 left-[1073.53px] top-0 flex-col justify-start items-start gap-5 inline-flex">
                       <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">
                           Support
                       </div>
                       <div
                           className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Knowledge Base
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Training Classes
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Share Your Experience
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Find a Consultant
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">New Feature Request
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">
                           Partner Portal
                       </div>
                   </div>
                   <div className="w-[195px] left-[861.53px] top-0 flex-col justify-start items-start gap-5 inline-flex">
                       <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">
                           Resources
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">
                           Legal Resource Library
                       </div>
                       <div className="w-[184px] text-white text-base font-normal font-['Inter'] leading-tight">
                           Educational Resource Center
                       </div>
                       <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">
                           Blog
                       </div>
                   </div>
               </div>

               <div className="hidden lg:block">
                   <div className="text-white text-xs font-normal font-['Inter'] leading-[15px]">
                       <p className="mb-3">CosmoLex is part of ProfitSolv, a collection of best-in-class software solutions for professional services firms, allowing the freedom for growth and innovation. Using a product-centric and customer-first approach, ProfitSolv collaborates with firms to offer better client services.</p>
                       <p>© 2025 ProfitSolv, LLC, All rights reserved. ProfitSolv, CosmoLex, and respective logos are trademarks or registered trademarks of ProfitSolv, LLC and its affiliates. All product names and trademarks are the property of their respective owners.</p>
                   </div>

                   <div className="flex gap-3 mt-7 items-center">
                       <a href="#" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Legal</a>
                       <span className="block h-[17px] w-[1px] bg-white"></span>
                       <a href="#" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Privacy Policy</a>
                       <span className="block h-[17px] w-[1px] bg-white"></span>
                       <a href="#" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">GDPR</a>
                       <span className="block h-[17px] w-[1px] bg-white"></span>
                       <a href="#" className="text-center text-white text-xs font-normal font-['Inter'] leading-snug">Subscription Agreement</a>
                   </div>
               </div>
           </div>

        </div>


    </div>)
}