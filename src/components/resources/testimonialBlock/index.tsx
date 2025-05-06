import Rating from "../rating";
import {CustomLink} from "@/components/ui/customLink";
import TestimonialIcon from './testimonial.svg';

export const TestimonialBlock = () => {
    return <div>
        <div className="min-h-[34.313rem] bg-[#eef8fd] rounded-tl-[1.875rem] rounded-br-[1.875rem] md:rounded-tl-[3.125rem] md:rounded-br-[3.125rem] px-[3.75rem] py-[5rem] md:flex gap-[2.188rem]">
            <div className="grow">
                <TestimonialIcon className="w-[3.75rem] h-[3.125]" />
                <div className="justify-start text-primary-dark text-2xl font-semibold font-['Inter'] leading-10 pt-2 italic md:pl-9">
                    The intuitive design and robust features of CosmoLex have been a game-changer for my firm. I recommend it to any solo practitioner looking to reclaim their time.
                </div>

                <div className="sm:flex gap-6 items-center mt-7 md:pl-9">
                    <div className="mb-4">
                        <img className="w-28 h-28 rounded-full border-2 border-primary-dark" src="https://placehold.co/112x112" />
                    </div>
                    <div>
                        <div className="justify-start">
                            <div className="text-primary-dark text-[1.375rem] font-semibold font-['Inter'] leading-[0.875rem] mb-3">Jonathan Roth</div>
                            <div className="text-primary-dark text-lg font-light font-['Inter'] leading-[0.875rem] mb-4">Founder, Roth Advocacy</div>
                            <div className="h-6 px-[1rem] py-[0.75rem] rounded-[1.25rem] outline-primary-dark inline-flex justify-center items-center gap-2.5 text-center text-sm font-medium text-primary-dark border-1 border-primary-dark">
                                Canada
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="md:w-[22rem] flex-none pt-15">
                <div className="self-stretch justify-start text-primary-dark text-3xl font-bold leading-10 mb-5">
                    Customer Centric Messaging
                </div>
                <div className="self-stretch justify-start text-primary-dark text-base font-normal leading-[1.875rem] mb-5">
                    Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.
                </div>
                <div className="mb-8">
                    <Rating rating={5} />
                </div>
                <div>
                    <CustomLink
                        href="/"
                        className="bg-[#A4E1FF] text-primary-dark rounded-full px-6 py-3.5 font-normal text-base w-[10rem] cursor-pointer transition duration-300 hover:bg-primary-dark hover:text-white"
                    >
                        Try For Free
                    </CustomLink>
                </div>
            </div>
        </div>
    </div>
}