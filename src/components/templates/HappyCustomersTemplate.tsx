import Layout from "@/components/layout/layout";
import React from "react";
import {PageDataType} from "@/types";
import {PageHeader} from "@/components/blocks/pageHeader";
import {LinkBlock} from "@/app/linkBlock";
import Img1 from '@/assets/img/cs_study/CSTUDY_landing_roth-1.webp';
import Img2 from '@/assets/img/cs_study/Kraemer LLP.webp';

export const HappyCustomersTemplate = ({pageData}: { pageData: PageDataType }) => {

    return (
        <Layout pageData={pageData}>
            <PageHeader pageData={pageData} />

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
        </Layout>
    )
}
