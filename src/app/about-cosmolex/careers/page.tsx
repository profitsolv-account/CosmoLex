import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import CareersTemplate from "@/components/templates/CareersTemplate";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";

const slug = '/about-cosmolex/careers/';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function CareersPage() {
    
  try {
      const pageData = await getPageData(slug);
      if (!pageData) {
          notFound();
      }

      const testimonials = await getTestimonialsList();

      return <CareersTemplate pageData={{
          ...pageData,
          testimonials,
          footerExtendedBg: true,
      }} />
  } catch(e: any) {
      notFound();
  }
}

export const revalidate = false;


