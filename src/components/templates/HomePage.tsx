"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {HomeHeader} from "@/components/common/homeHeader";
import {Partners} from "@/components/blocks/partners";
import {ComplianceManagement} from "@/components/blocks/complianceManagement";
import {MatterCentric} from "@/components/blocks/matterCentric";
import {Testimonials} from "@/components/blocks/testimonials";
import {VideoSlider} from "@/components/blocks/videoSlider";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {PageDataType} from "@/types";


export default function HomePage({ pageData }: { pageData: PageDataType }) {

    const testimonials = pageData.testimonials;
  return (
      <Layout pageData={pageData}>

          <HomeHeader />
          <Partners />
          <ComplianceManagement />
          <MatterCentric />
          {testimonials && <Testimonials testimonials={testimonials} />}
          <VideoSlider />
          <SimplifyPractice />

      </Layout>

  )
}
