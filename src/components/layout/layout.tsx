import React from 'react'
import {Footer} from "@/components/layout/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {/*<Header />*/}
            <main className="container mx-auto p-6">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
