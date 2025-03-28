import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getVideoSection} from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import CurrentSetupTemplate from "@/components/templates/CurrentSetupTemplate";
import {getTestimonialsList} from "@/lib/queries/testimonials";


type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage({params}: Params) {
   try {
       const {slug} = await params;
       const pageData = await getPageData(slug);
       const testimonials = await getTestimonialsList();
       const videoSection = await getVideoSection(slug);
       return <CurrentSetupTemplate
           pageData={{
               ...pageData,
               footerExtendedBg: true,
               testimonials,
               videoSection
           }}
       />
   } catch (error) {
       notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";
