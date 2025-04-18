import { useEffect, useRef } from 'react';
import {CustomLink} from "@/components/ui/customLink";

export const CareersApplicantManager = () => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        // @ts-ignore
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>Job Board</title>
              <style>
                * { 
                    font-family: 'Arial', sans-serif; 
                }
                p {
                    text-align: center;
                }
                </style>
            </head>
            <body>
              <div id="job-board-container"></div>
              <script src="https://theapplicantmanager.com/jobfeeds/te_cosmolex.js"></script>
              <script src="https://theapplicantmanager.com/jobfeeds/te_footer.js"></script>
            </body>
          </html>
    `;

        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-5xl font-bold mb-4 text-center">Open Positions</h2>

            <iframe
                ref={iframeRef}
                title="Job Board"
                style={{ width: '100%', height: '60px', border: 'none' }}
            />

            <div className="flex justify-center mt-4">
                <CustomLink href="https://www.glassdoor.com/Overview/Working-at-CosmoLex-EI_IE1289709.11,19.htm">
                    <img
                        src="https://www.glassdoor.com/pc-app/static/img/partnerCenter/badges/eng_CHECK_US_273x90.png"
                        alt="Glassdoor Check Us Out"
                    />
                </CustomLink>
            </div>
        </div>
    );
};

