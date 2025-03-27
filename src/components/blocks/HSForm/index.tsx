"use client"

import {FC, useEffect, useState} from 'react';
import Script from 'next/script';
import classNames from "classnames";

declare global {
    interface Window {
        hbspt: any;
        ChiliPiper: any;
        ppcUrlCookiePart2: (key: string) => string | null;
    }
}

type OptionsType = {
    portalId: string;
    formId: string;
};

type FormContentProps = {
    options: OptionsType
}

const FormContent: FC<FormContentProps> = ({options}) => {
    useEffect(() => {
        const loadHubSpotForm = () => {
            console.log(window.hbspt);
            if (window.hbspt) {
                window.hbspt.forms.create({
                    portalId: options.portalId,
                    formId: options.formId,
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
    options: OptionsType;
    title?: string;
    subtitle?: string;
    titleClass?: string;
}

export const HSForm = ({className, options, title, subtitle, titleClass}: Props) => {
    const [chiliPiperLoaded, setChiliPiperLoaded] = useState(false);

    useEffect(() => {

    }, [chiliPiperLoaded]);

    return (
        <div>
            <Script
                src="//js.hsforms.net/forms/embed/v2.js"
                strategy="beforeInteractive"
            />

            <div className="relative">
                <div className={classNames("max-w-[40rem] min-h-[31.25rem] mx-auto relative z-1 bg-white rounded-[1.875rem] p-[3.125rem]", className)}>
                    {title && <h3 className={classNames("text-center text-3xl mb-10", titleClass)}>{title}</h3>}
                    {subtitle && <h4 className={classNames("text-center text-xl mb-10", titleClass)}>{subtitle}</h4>}
                    <FormContent options={options} />
                </div>
            </div>
        </div>
    );
};

