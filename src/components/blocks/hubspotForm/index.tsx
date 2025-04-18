"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Script from "next/script";

declare global {
    interface Window {
        hbspt: any;
        ChiliPiper: any;
        ppcUrlCookiePart2: (key: string) => string | null;
    }
}

const getCrossSellRouting = () => {
    const crossSellRouting = typeof window !== "undefined" && window.ppcUrlCookiePart2
        ? window.ppcUrlCookiePart2("cross_sell_routing")
        : null;
    return crossSellRouting && crossSellRouting !== "undefined" ? crossSellRouting : null;
};

const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(`Failed to load ${src}`);
        document.body.appendChild(script);
    });
};

const FormContent = () => {
    const pathname = usePathname();

    useEffect(() => {
        const loadHubSpotForm = () => {
            const container = document.getElementById("hubspotFormContainer");
            if (container) container.innerHTML = "";

            window.hbspt?.forms.create({
                region: "na1",
                portalId: "20899921",
                formId: "92f180f1-c843-43a1-8ab2-48ffd8302e8f",
                inlineMessage: "Thanks for scheduling a demo!",
                target: "#hubspotFormContainer",
                translations: {
                    en: {
                        submitText: "Request a Demo",
                    },
                },
                onFormReady: (formElement: HTMLElement) => {
                    const inputField = formElement.querySelector(
                        'input[name="cross_sell_routing"]'
                    ) as HTMLInputElement;
                    if (inputField) {
                        inputField.value = getCrossSellRouting() || "";
                    }
                },
                onFormSubmit: (formElement: HTMLElement) => {
                    const getVal = (selector: string) =>
                        encodeURIComponent(
                            (formElement.querySelector(selector) as HTMLInputElement | HTMLSelectElement)?.value || ""
                        );
                    const formData = {
                        firstname: getVal('input[name="firstname"]'),
                        lastname: getVal('input[name="lastname"]'),
                        company: getVal('input[name="company"]'),
                        email: getVal('input[name="email"]'),
                        phone: getVal('input[name="phone"]'),
                        selectedCountry: getVal('select[name="country_list"]'),
                        totalFirmSize: getVal('select[name="total_firm_size"]'),
                    };
                    setTimeout(() => {
                        window.location.href = `/demo/?${new URLSearchParams(formData).toString()}`;
                    }, 250);
                },
            });
        };

        const init = async () => {
            try {
                await loadScript("https://js.hsforms.net/forms/v2-legacy.js");
                await loadScript("https://js.hsforms.net/forms/v2.js");

                if (window.hbspt) {
                    setTimeout(loadHubSpotForm, 200);
                }
            } catch (err) {
                console.error("Failed to load HubSpot script:", err);
            }
        };

        init();
    }, [pathname]);

    return <div id="hubspotFormContainer"></div>;
};

type Props = {
    className?: string;
};

const HubSpotForm = ({ className }: Props) => {
    const [chiliPiperLoaded, setChiliPiperLoaded] = useState(false);

    useEffect(() => {
        const handleChiliPiper = () => {
            if (!window.ChiliPiper) {
                console.warn("ChiliPiper is not defined.");
                return;
            }

            const tenantDomain = "profitsolv";
            let routerName = "";
            const leadValues: Record<string, string> = {};
            const uri = decodeURIComponent(window.location.search.replace(/^\?/, "").replace(/\+/g, " "));
            const urlParams = new URLSearchParams(uri);
            let valid = false;

            for (const [key, value] of urlParams.entries()) {
                if (key.toLowerCase().includes("email")) valid = true;
                leadValues[key] = value;
            }

            if (!valid) return;

            const cross_sell_routing = getCrossSellRouting();
            if (cross_sell_routing) {
                routerName = {
                    "CL Pay": "cosmolexpay",
                    "CL CRM": "cosmolex-crm",
                    "CL LS": "cosmolex-lex-share",
                    "CL Website": "cosmolex-websites",
                }[cross_sell_routing] || "lcs-cl-us-consultation-call";
            } else {
                const isEnterprise = leadValues["total_firm_size"] !== "1-20 employees";
                const country = leadValues["selectedCountry"];
                if (country === "United States") {
                    routerName = isEnterprise ? "lcs-cl-enterprise-consultation-call" : "lcs-cl-us-consultation-call";
                } else if (country === "Canada") {
                    routerName = isEnterprise ? "lcs-cl-enterprise-consultation-call" : "lcs-cl-ca-consultation-call";
                } else {
                    routerName = isEnterprise ? "lcs-cl-enterprise-consultation-call" : "lcs-cl-us-consultation-call";
                }
            }

            console.log("ChiliPiper route:", routerName);
            window.ChiliPiper.submit(tenantDomain, routerName, {
                map: true,
                lead: leadValues,
            });
        };

        if (chiliPiperLoaded) {
            handleChiliPiper();
        }
    }, [chiliPiperLoaded]);

    return (
        <div>
            <Script
                src="//js.chilipiper.com/marketing.js"
                strategy="lazyOnload"
                onLoad={() => setChiliPiperLoaded(true)}
            />
            <div className="relative">
                <div
                    className={classNames(
                        "max-w-[40rem] min-h-[31.25rem] mx-auto relative z-1 bg-white rounded-[1.875rem] p-[3.125rem]",
                        className
                    )}
                >
                    <FormContent />
                </div>
            </div>
        </div>
    );
};

export default HubSpotForm;
