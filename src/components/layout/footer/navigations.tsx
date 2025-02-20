import Image from "next/image";
import logo from "@/assets/img/logo.svg";

export const Navigations = () => {
    return (<div className="w-full p-10 py-20 relative bg-primary rounded-tr-[100px]">

        <div className="flex flex-col justify-between max-w-[1440px] mx-auto gap-10 lg:flex-row">

            <div className="flex flex-col gap-10">
                <div className="left-0 top-[6.28px]">
                    <Image src={logo} alt="logo"/>
                </div>

                <div
                    className="max-w-[409.29px] h-[132px] left-0 top-[77.28px] text-white text-base font-normal font-['Inter'] leading-snug">CosmoLex
                    is cloud-based law practice management software that integrates trust & business accounting, time
                    tracking,
                    billing, email & document management, and tasks & calendaring, in a single application.
                </div>

                <div
                    className="w-[213px] left-0 top-[198.28px] text-white text-base font-bold font-['Inter'] leading-[25px] tracking-wide">+1
                    866-878-6798
                </div>
            </div>

            <div className="flex flex-col gap-10 w-1/2 lg:flex-row">
                <div
                    className="w-[175px] left-[645.53px] top-0 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">Company
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">About
                        Us
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Our
                        Services
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Bar
                        Affinity
                        Partners
                    </div>
                    <div
                        className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Pricing
                    </div>
                    <div
                        className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Enterprise-Grade
                        Security
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">CosmoLex
                        Careers
                    </div>
                </div>
                <div
                    className="w-48 left-[1073.53px] top-0 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">Support
                    </div>
                    <div
                        className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Knowledge
                        Base
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Training
                        Classes
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Share
                        Your
                        Experience
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Find a
                        Consultant
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">New
                        Feature
                        Request
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Partner
                        Portal
                    </div>
                </div>
                <div
                    className="w-[195px] left-[861.53px] top-0 flex-col justify-start items-start gap-5 inline-flex">
                    <div
                        className="self-stretch text-white text-2xl font-bold font-['Inter'] tracking-tight">Resources
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Legal
                        Resource
                        Library
                    </div>
                    <div className="w-[184px] text-white text-base font-normal font-['Inter'] leading-tight">Educational
                        Resource Center
                    </div>
                    <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-tight">Blog
                    </div>
                </div>
            </div>

        </div>


    </div>)
}