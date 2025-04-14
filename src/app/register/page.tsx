import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import DemoPageTemplate from "@/components/templates/DemoPageTemplate";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {getLeadersLogos} from "@/lib/queries/logos";
import RegisterPageTemplate from "@/components/templates/RegisterPageTemplate";
import {notFound} from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData('register');
}

export default async function SinglePage() {
   try{
       const pageData = await getPageData("register");
       if (!pageData) {
           notFound();
       }
       const testimonials = await getTestimonialsList();
       const logos = await getLeadersLogos();

       return <RegisterPageTemplate pageData={{
           ...pageData,
           testimonials,
           footerExtendedBg: true,
           leaderLogos: logos
       }} />
   } catch(e: any) {
       notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";