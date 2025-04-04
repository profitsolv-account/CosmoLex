"use client"
import React, { useEffect, useRef } from 'react';

export const FreeTrialFormWidget = () => {
    const iframeContainerRef = useRef(null);

    useEffect(() => {
        const element = iframeContainerRef.current;

        if (!element) return;

        const iframe = document.createElement('iframe');

        iframe.src =
            'https://profitsolv-billingplatform-dev.azurewebsites.net/subscription-management/subscription-management.html?businessUnit=cosmolex&productCatalog=CosmoLex&version=v2&showOnlyMainProducts=true&showPreselectedSignUpForm=true&overrideHost=https://internal1.cosmolex.com';

        iframe.style.width = '100%';
        iframe.style.height = '110rem';
        iframe.style.border = 'none';
        iframe.style.background = 'transparent';

        // @ts-ignore
        element.replaceWith(iframe);

        iframe.onload = function () {
            // @ts-ignore
            if (iframe.contentWindow) {
                iframe.contentWindow.postMessage({ action: 'setCookies', data: document.cookie }, '*');
            }
        };

        const handleMessage = (event: any) => {
            if (event.data && event.data.height) {
                iframe.style.height = (event.data.height - 70) + 'px';
            }

            if (event.data.action === 'redirect' && event.data.url) {
                window.location.href = event.data.url;
            }

            if (event.data.action === 'setCookies' && iframe.contentWindow) {
                iframe.contentWindow.postMessage({ action: 'setCookies', data: document.cookie }, '*');
            }

            if (event.data.action === 'sendCustomerToHS') {
                // @ts-ignore
                window.dataLayer = window.dataLayer || [];
                // @ts-ignore
                window.dataLayer.push({ event: 'customerCreated', isCreated: true });
            }

            if (event.data.action === 'scrollTop') {
                let iframePosition = iframe.getBoundingClientRect().top + window.scrollY;

                if (window.innerWidth <= 1000) {
                    iframePosition += 90;
                }

                window.scrollTo({ top: iframePosition, behavior: 'smooth' });
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return <div ref={iframeContainerRef} id="marketplace-sign-up-widget"></div>;
};