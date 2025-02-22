"use client"
import React, {useEffect} from 'react'
import {Footer} from "@/components/layout/footer";
import {Header} from "@/components/layout/header";
import {useAppContext} from "@/context";

const Layout = ({ children, pageData }: { children: React.ReactNode, pageData: any }) => {
    const {setAppData} = useAppContext() as any;

    useEffect(() => {
        setAppData(pageData);
    }, [pageData]);

    return (
        <>
            <Header />
            <main className="">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
