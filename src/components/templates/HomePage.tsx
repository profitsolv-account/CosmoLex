import React from 'react'
import Layout from "@/components/layout/layout";


export default function HomePage({ pageData }: { pageData: any }) {
  return (
      <Layout>
          <div>

              <section className="container mx-auto px-6 py-16 text-center">
                  <h1 className="text-5xl font-bold text-primary">{pageData?.title}</h1>
                  <p className="mt-4 text-lg text-gray-700">{pageData?.excerpt}</p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mt-8" dangerouslySetInnerHTML={{__html: pageData?.content}}>

                  {/*{pageData?.featuredPosts?.map((post: any) => (
          <div key={post.id} className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </div>
        ))}*/}
              </section>
          </div>
      </Layout>

  )
}
