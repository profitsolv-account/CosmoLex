import React from 'react'
import {Footer} from "@/components/layout/footer";
import {Header} from "@/components/layout/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
           {/* <Header />*/}
            <main className="container mx-auto p-6">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
