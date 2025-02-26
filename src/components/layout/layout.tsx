"use client"

import React from 'react'
import {Footer} from "@/components/layout/footer";
import {Header} from "@/components/layout/header";
import {PageDataType} from "@/types";

const Layout = ({ children, pageData }: { children: React.ReactNode, pageData: PageDataType }) => {

    return (
        <>
            <Header pageData={pageData} />
                <main className="">
                    {children}
                </main>
            <Footer pageData={pageData} />
        </>
    )
}

export default Layout
