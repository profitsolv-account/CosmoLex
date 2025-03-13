"use client";
import {FC, useEffect} from "react";
import { usePathname } from 'next/navigation'

type Props = {
    formId: string;
    routerName: string
}

export const DemoForm: FC<Props> = ({formId, routerName}) => {
    const pathname = usePathname();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//js.hsforms.net/forms/embed/v2.js";
        script.async = true;
        script.onload = () => {
            if ((window as any).hbspt) {
                (window as any).hbspt.forms.create({
                    region: "na1",
                    portalId: "20899921",
                    formId: formId,
                    inlineMessage: "Thanks for scheduling a demo!",
                    target: '#hubspotFormContainer',
                    onFormSubmit: function ($form: any) {
                        const firstName = encodeURIComponent($form.querySelector('input[name="firstname"]')?.value || '');
                        const lastName = encodeURIComponent($form.querySelector('input[name="lastname"]')?.value || '');
                        const companyName = encodeURIComponent($form.querySelector('input[name="company"]')?.value || '');
                        const emailId = encodeURIComponent($form.querySelector('input[name="email"]')?.value || '');
                        const phoneNo = encodeURIComponent($form.querySelector('input[name="phone"]')?.value || '');
                        const firmSize = encodeURIComponent($form.querySelector('select[name="total_firm_size"]')?.value || '');
                        const selectedCountry = encodeURIComponent($form.querySelector('select[name="country_list"]')?.value || '');
                        const cosmolexClient = encodeURIComponent($form.querySelector('input[name="are_you_an_existing_cosmolex_client_"]:checked')?.value || '');

                        setTimeout(() => {
                            window.location.href = `${pathname}?email=${emailId}&firstname=${firstName}&lastname=${lastName}&company=${companyName}&phone=${phoneNo}&are_you_an_existing_cosmolex_client_=${cosmolexClient}&total_firm_size=${firmSize}&country_list=${selectedCountry}`;
                        }, 200);
                    },
                });
            }
        };
        document.body.appendChild(script);
    }, []);

    console.log(pathname);

    return <div className="w-full min-h-[549px] bg-white rounded-[30px] shadow-[0px_21px_30px_0px_rgba(0,0,0,0.05)] p-10" >
        <div className="text-center justify-start text-primary-dark text-[32px] font-semibold leading-loose mb-10">Schedule a Demo</div>
        <div id="hubspotFormContainer"></div>
        <ChiliPiperForm routerName={routerName} />
    </div>;
};


const ChiliPiperForm = ({routerName}: {routerName: string;}) => {
    useEffect(() => {
        // Load ChiliPiper script dynamically
        const script = document.createElement("script");
        script.src = "//js.chilipiper.com/marketing.js";
        script.async = true;
        script.onload = () => {
            processChiliPiper();
        };
        document.body.appendChild(script);
    }, []);

    const processChiliPiper = () => {
        const tenantDomain = "profitsolv"; // Replace with actual domain
        let routerName: string | undefined;
        const leadValues: Record<string, string> = {};

        // Parse URL parameters
        const uri = decodeURIComponent(
            window.location.href.split("?").length > 1
                ? window.location.href.split("?")[1].replace(/\+/g, " ")
                : ""
        );
        const urlParams = new URLSearchParams(uri);
        let valid = false;

        urlParams.forEach((value, key) => {
            if (key.toLowerCase().includes("email")) {
                valid = true;
            }
            leadValues[key] = value;
        });

        if (valid) {
            // Determine router name based on conditions
            if (leadValues["are_you_an_existing_cosmolex_client_"] === "Yes") {
                routerName = "cosmolex-websites";
            } else {
                routerName =
                    leadValues["selectedCountry"] === "United States"
                        ? "lcs-cl-us-consultation-call"
                        : "lcs-cl-ca-consultation-call";
            }

            if ((window as any).ChiliPiper) {
                (window as any).ChiliPiper.submit(tenantDomain, routerName, {
                    map: true,
                    lead: leadValues,
                });
                console.log("ChiliPiper Lead Data:", leadValues);
            } else {
                console.warn("ChiliPiper script not loaded yet.");
            }
        }
    };

    return null;
};