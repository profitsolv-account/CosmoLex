import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import {PageDataType} from "@/types";
import Layout from "@/components/layout/layout";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {Testimonials} from "@/components/blocks/testimonials";

import {PageHeader} from "@/components/blocks/pageHeader";
import {FreeTrialFormWidget} from "@/components/widgets/freeTrialFormWidget";

export default function CBAMembersTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    return (
        <Layout pageData={pageData}>

            <PageHeader
                pageData={pageData}
                className="mb-0 pb-20 bg-primary relative z-10 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] md:pb-40"
                containerClassName="!max-w-[46.5625rem]"
                hideContent
                showFeatureImage
                heroClass="max-w-[46.5625rem] w-full"
            />

            <div className="px-4 py-10">
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="pt-20 single-entity ">
                        <div dangerouslySetInnerHTML={{__html: pageData.content || ''}}></div>
                    </div>
                    <div>
                        <div className="relative">
                            <div className="max-w-[47.3125rem] mx-auto relative z-1 bg-white rounded-[1.875rem] p-[3.125rem]">
                                <FreeTrialFormWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative  pt-10">
                <Testimonials
                    testimonials={testimonials}
                    className="!bg-transparent !pt-0 relative z-10"
                    bgOverlay={false}
                    showNavigation

                />
            </div>
            <div className="relative">
                <SimplifyPractice pageData={pageData} className=""/>
                <div className="absolute bottom-0 w-full h-[9.375rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-primary"/>
            </div>

        </Layout>
    )
}


const ContactInfo = () => {
    return (
        <div className="">
            <div className="flex items-start mb-4">
                <MapPin className="text-primary mr-3 h-10 w-10" />
                <div>
                    <h3 className="font-semibold text-3xl">Mailing Address:</h3>
                    <p className="text-primary text-xl">1100 Cornwall Road, Suite 215 Monmouth Junction, NJ 08852</p>
                </div>
            </div>
            <div className="flex items-start">
                <Phone className="text-primary mr-3 h-10 w-10" />
                <div>
                    <h3 className="font-semibold text-3xl">Phone:</h3>
                    <a href="tel:+1 866-878-6798" className="text-primary text-xl">+1 866-878-6798</a>
                </div>
            </div>
        </div>
    );
};