"use client"

import React, {useEffect} from 'react'
import {Footer} from "@/components/layout/footer";
import {Header} from "@/components/layout/header";
import {useAppContext} from "@/context";

const Layout = ({ children, pageData }: { children: React.ReactNode, pageData: any }) => {

    const {updateData} = useAppContext();
    useEffect(() => {
        updateData({
            featuredPost: pageData.featuredPost,
            menus: pageData.menus || {}
        });
    }, []);

    return (
        <>
            <Header pageData={pageData} />
                <main className="">
                    {children}
                </main>
            <Footer />
        </>
    )
}

export default Layout
