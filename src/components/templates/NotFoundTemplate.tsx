import React from 'react'
import Layout from "@/components/layout/layout";
import {DemoHeader} from "@/components/blocks/demoHeader";
import {PageDataType} from "@/types";

export default function NotFoundTemplate({ pageData }: { pageData: PageDataType }) {
    return (
        <Layout pageData={pageData}>
           <div className="text-center min-h-[600px] flex flex-col justify-center items-center">
                <div className="max-w-[600px]">
                    <h1 className="mb-2">404</h1>
                    <h2 className="mb-20">PAGE NOT FOUND</h2>
                    <div className="text-center text-xl">
                        The page you are looking for does not exist. It may have been moved, or removed altogether. Perhaps you can return back to the site&apos;s homepage and see if you can find what you are looking for.
                    </div>
                    <a href="/" className="base-btn mx-auto mt-8 bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark w-[200px]">BACK TO HOMEPAGE</a>
                </div>
           </div>
        </Layout>

    )
}
