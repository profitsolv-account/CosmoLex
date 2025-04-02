"use client"
import Layout from "@/components/layout/layout";
import React, {useEffect, useState} from "react";
import {PageDataType} from "@/types";
import {PageHeader} from "../blocks/headers/pageHeader";
import {LinkBlock} from "../linkBlock";
import Img1 from '@/assets/img/cs_study/CSTUDY_landing_roth-1.webp';
import Img2 from '@/assets/img/cs_study/Kraemer LLP.webp';
import {CSTestimonial} from "@/types/testimonials";
import {Pagination} from "@/components/common/pagination";
import Image from 'next/image';

export const HappyCustomersTemplate = ({pageData}: { pageData: PageDataType }) => {
    const testimonials = pageData.csTestimonials || [];

    return (
        <Layout pageData={pageData}>
            <PageHeader
                pageData={pageData} className="mb-0"
                hideContent
            />

            <div className="relative w-full mb-22 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] h-[5rem] bg-primary" />

            <div className="px-4">
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 my-20">
                    <LinkBlock
                        link="/case-study/jonathan-roth/"
                        title="Jonathan Roth"
                        description="Discover how Canadian lawyer Jonathan Roth eliminated the need for multiple software solutions, improved efficiency, and freed up time to focus on high-value client and business tasks with CosmoLex."
                        image={Img1.src}
                    />
                    <LinkBlock
                        link="/case-study/kraemer-llp/"
                        title="Kraemer LLP"
                        description="Discover how Patrick Kraemer's law firm streamlined invoicing, increased client transparency, and improved project management with CosmoLex."
                        image={Img2.src}
                    />
                </div>
            </div>
            <Testimonials testimonials={testimonials} />
        </Layout>
    )
}


type Props = {
    testimonials: CSTestimonial[]
}

export const Testimonials  = ({testimonials}: Props) => {
    const perPage = 20;
    const [currentPage, setCurrentPage] = useState(0);
    const [precessedTestimonials, setPrecessedTestimonials] = useState(testimonials);

    useEffect(() => {
        setPrecessedTestimonials(testimonials.slice(currentPage * perPage, (currentPage + 1) * perPage));
    }, [currentPage, testimonials]);
    useEffect(() => {
        setCurrentPage(0);
    }, [testimonials]);

    return (
        <div className="container page-content mb-40">
            <h3 className="font-semibold text-5xl text-center mb-10">What Our Clients Are Saying</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                {precessedTestimonials.map((testimonial, index) => {
                    return (
                        <Testimonial testimonial={testimonial} key={index} />
                    )
                })}
            </div>

            <Pagination
                total={testimonials.length}
                perPage={perPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

        </div>
    )
}

const Testimonial = ({testimonial}: {testimonial: CSTestimonial}) => {
    return (
        <div className="bg-[#D7EFFA] p-10 rounded-lg">
            <div className="flex gap-10 bg-white p-5 rounded-lg mb-4">
                <Image
                    src={testimonial.image.sourceUrl}
                    alt={testimonial.image.altText}
                    className="w-20 h-20 rounded-full"
                    width={80}
                    height={80}
                />
                <div className="text-primary text-lg" dangerouslySetInnerHTML={{__html: testimonial.content}} />
            </div>
            <Rating rating={testimonial.rating} />
            <div className="flex flex-col gap-0 mt-4 items-end">
                <div className="text-primary text-xl font-semibold">{testimonial.title}</div>
                <div className="text-primary text-xl font-semibold">{testimonial.location}</div>
            </div>
        </div>
    )
}

import { Star } from 'lucide-react';

interface RatingProps {
    rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
    const maxRating = 5;
    return (
        <div className="flex items-center space-x-1">
            {[...Array(maxRating)].map((_, index) => (
                <Star
                    key={index}
                    className={`h-5 w-5 ${
                        index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }`}
                />
            ))}
        </div>
    );
};

export default Rating;