"use client"

import { useEffect, useState } from 'react';
import Script from 'next/script';
import classNames from "classnames";

declare global {
    interface Window {
        hbspt: any;
        ChiliPiper: any;
        ppcUrlCookiePart2: (key: string) => string | null;
    }
}

const getCrossSellRouting = () => {
    let crossSellRouting = typeof window !== 'undefined' && window.ppcUrlCookiePart2
        ? window.ppcUrlCookiePart2('cross_sell_routing')
        : null;

    if (crossSellRouting && crossSellRouting !== "undefined") {
        console.log(crossSellRouting);
    } else {
        crossSellRouting = null;
    }

    return crossSellRouting;
};

const FormContent = () => {
    useEffect(() => {
        const loadHubSpotForm = () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region: "na1",
                    portalId: "20899921",
                    formId: "92f180f1-c843-43a1-8ab2-48ffd8302e8f",
                    inlineMessage: 'Thanks for scheduling a demo!',
                    target: '#hubspotFormContainer',
                    translations: {
                        en: {
                            submitText: "Request a Demo",
                        }
                    },
                    onFormReady: (formElement: HTMLElement) => {
                        const crossSellRouting = getCrossSellRouting();
                        const inputField = formElement.querySelector('input[name="cross_sell_routing"]') as HTMLInputElement;
                        if (inputField) {
                            inputField.value = crossSellRouting || '';
                        }
                    },
                    onFormSubmit: (formElement: HTMLElement) => {
                        const formData = {
                            firstname: encodeURIComponent((formElement.querySelector('input[name="firstname"]') as HTMLInputElement)?.value || ''),
                            lastname: encodeURIComponent((formElement.querySelector('input[name="lastname"]') as HTMLInputElement)?.value || ''),
                            company: encodeURIComponent((formElement.querySelector('input[name="company"]') as HTMLInputElement)?.value || ''),
                            email: encodeURIComponent((formElement.querySelector('input[name="email"]') as HTMLInputElement)?.value || ''),
                            phone: encodeURIComponent((formElement.querySelector('input[name="phone"]') as HTMLInputElement)?.value || ''),
                            selectedCountry: encodeURIComponent((formElement.querySelector('select[name="country_list"]') as HTMLSelectElement)?.value || ''),
                            totalFirmSize: encodeURIComponent((formElement.querySelector('select[name="total_firm_size"]') as HTMLSelectElement)?.value || ''),
                        };
                        setTimeout(() => {
                            window.location.href = `/demo/?email=${formData.email}&firstname=${formData.firstname}&lastname=${formData.lastname}&company=${formData.company}&phone=${formData.phone}&selectedCountry=${formData.selectedCountry}&total_firm_size=${formData.totalFirmSize}`;
                        }, 250);
                    }
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

const HubSpotForm = ({className}: Props) => {
    const [chiliPiperLoaded, setChiliPiperLoaded] = useState(false);

    useEffect(() => {
        const handleChiliPiper = () => {
            if (!window.ChiliPiper) {
                console.warn("ChiliPiper is not defined. Retrying...");
                return;
            }
            const tenantDomain = "profitsolv";
            var routerName;
            var leadValues: any = {};
            var uri = decodeURIComponent(
                window.location.href.split("?").length > 1 ? window.location.href.split("?")[1].replace(/\+/g, " ") : ""
            );
            var urlParams = new URLSearchParams(uri);
            var entries = urlParams.entries();
            var valid = false;
            for (const [key, value] of entries) {
                if (key.toLowerCase().includes("email")) {
                    valid = true;
                }
                leadValues[key] = value;
            }
            if (valid) {
                const cross_sell_routing = getCrossSellRouting();
                //checking cross sell routing cookie
                if(cross_sell_routing != null && cross_sell_routing != "" && cross_sell_routing != "undefined"){
                    if(cross_sell_routing == "CL Pay"){
                        routerName = "cosmolexpay";
                    }else if(cross_sell_routing == "CL CRM"){
                        routerName = "cosmolex-crm";
                    }else if(cross_sell_routing == "CL LS"){
                        routerName = "cosmolex-lex-share";
                    }else if(cross_sell_routing == "CL Website"){
                        routerName = "cosmolex-websites";
                    }else{
                        //console.log(leadValues['selectedCountry']);
                        routerName = "lcs-cl-us-consultation-call";
                    }

                }else{
                    //setting router name  based on country
                    if(leadValues['selectedCountry'] == "United States"){
                        //checking firm size here
                        if(leadValues['total_firm_size'] != "1-20 employees"){
                            routerName = "lcs-cl-enterprise-consultation-call";
                        }else{
                            routerName = "lcs-cl-us-consultation-call";
                        }


                    }else if(leadValues['selectedCountry'] == "Canada") {
                        //checking firm size here
                        if(leadValues['total_firm_size'] != "1-20 employees"){
                            routerName = "lcs-cl-enterprise-consultation-call";
                        }else{
                            routerName = "lcs-cl-ca-consultation-call";
                        }


                    }else{
                        //checking firm size here
                        if(leadValues['total_firm_size'] != "1-20 employees"){
                            routerName = "lcs-cl-enterprise-consultation-call";

                        }else{
                            routerName = "lcs-cl-us-consultation-call";
                        }

                    }
                }
                console.log(routerName);
                window.ChiliPiper.submit(tenantDomain, routerName, {
                    map: true,
                    lead: leadValues,
                });
                console.log(leadValues);
            }

        };

        if (chiliPiperLoaded) {
            handleChiliPiper();
        }
    }, [chiliPiperLoaded]);

    return (
        <div>
            <Script
                src="//js.hsforms.net/forms/v2-legacy.js"
                strategy="beforeInteractive"
            />
            <Script
                src="//js.hsforms.net/forms/v2.js"
                strategy="beforeInteractive"
            />
            <Script
                src="//js.chilipiper.com/marketing.js"
                strategy="lazyOnload"
                onLoad={() => {
                    setChiliPiperLoaded(true);
                }}
            />
            <div className="relative">
                <div className={classNames("max-w-[40rem] min-h-[31.25rem] mx-auto relative z-1 bg-white rounded-[1.875rem] p-[3.125rem]", className)}>
                    <FormContent />
                </div>
            </div>
        </div>
    );
};

export default HubSpotForm;
