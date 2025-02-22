import React from 'react'
import {Footer} from "@/components/layout/footer";
import {Header} from "@/components/layout/header";

const Layout = ({ children, pageData }: { children: React.ReactNode, pageData: any }) => {
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
