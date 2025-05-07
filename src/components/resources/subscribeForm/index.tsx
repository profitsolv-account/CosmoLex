"use client"

import { useEffect } from 'react';
import Script from 'next/script';

const FormContent = () => {
    useEffect(() => {
        const loadHubSpotForm = () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region: "na1",
                    portalId: "20899921",
                    formId: "1cc08546-67bc-4b38-93e0-d776b7348dc3",
                    target: '#hubspotFormContainer',
                });
            }
        };

        if (typeof window !== 'undefined' && window.hbspt) {
            loadHubSpotForm();
        }
    }, []);

    return <div id="hubspotFormContainer"></div>;
};

export const SubscribeForm = () => {
    return <div className="px-4 mb-0 relative pt-20">
        <Script
            src="//js.hsforms.net/forms/v2.js"
            strategy="beforeInteractive"
        />
        <div className="container-blog pb-5 max-w-[74rem] relative z-10">
            <div className="px-[3rem] min-h-[34rem] bg-[#b9dfc3] rounded-[1.875rem] mb:px-[7rem] py-[3.625rem] subscribe_form">
                <h3 className="text-center justify-start text-primary-dark text-[2rem] font-bold font-['Inter'] leading-[3.125rem] mb-8 tracking-[-1px]">
                    Sign up for weekly tips and news from CosmoLex.
                </h3>
                <div className="mx-auto max-w-[43.438rem]">
                    <FormContent />
                </div>
            </div>
        </div>
        <div className="absolute w-full left-0 h-1/3 top-0 bg-white rounded-bl-[3.125rem] md:rounded-bl-[6.25rem]"></div>

    </div>
}