"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {HomeHeader} from "@/components/common/homeHeader";


export default function HomePage({ pageData }: { pageData: any }) {
  return (
      <Layout pageData={pageData}>
          <HomeHeader />
          <div className="container">
              <div>
                  <section className="container mx-auto px-6 py-16 text-center">
                      <h1 className="">{pageData?.title}</h1>
                      <p className="mt-4 text-lg text-gray-700">{pageData?.excerpt}</p>
                  </section>

                  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mt-8 min-h-[300px]" dangerouslySetInnerHTML={{__html: pageData ? pageData?.content : ""}}></section>
              </div>
          </div>

      </Layout>

  )
}
