"use client"

import { useEffect, useState } from 'react';
import Script from 'next/script';
import classNames from "classnames";

const FormContent = () => {
    useEffect(() => {
        const loadHubSpotForm = () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region: "na1",
                    portalId: "20899921",
                    formId: "99ee83a1-b7b4-45ed-b814-650d43155e5c",
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

type Props = {
    className?: string;
}

const ReferralHSForm = ({className}: Props) => {
    
    return (
        <div>
            <Script
                src="//js.hsforms.net/forms/v2.js"
                strategy="beforeInteractive"
            />
            <div className="relative">
                <div className={classNames("max-w-[80rem] min-h-[31.25rem] mx-auto relative z-1 bg-white rounded-[1.875rem] p-[3.125rem]", className)}>
                    <FormContent />
                </div>
            </div>
        </div>
    );
};

export default ReferralHSForm;
