import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getVideoSection} from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import CurrentSetupTemplate from "@/components/templates/CurrentSetupTemplate";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {getLanguage} from "@/lib/helpers";

export const dynamic = 'force-dynamic';

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;

    const lang = await getLanguage();
    let pageSlug = `current-setup/${slug}`
    switch (lang) {
        case 'ca':
            pageSlug = `current-setup-2/${slug}`;
            break;
    }

    return await getSEOData(pageSlug || 'home-page');
}

export default async function SinglePage({params}: Params) {
   try {
       const {slug} = await params;

       const lang = await getLanguage();
       let pageSlug = `current-setup/${slug}`
       switch (lang) {
           case 'ca':
               pageSlug = `current-setup-2/${slug}`;
               break;
       }

       const pageData = await getPageData(pageSlug);
       if (!pageData) {
           notFound();
       }
       const testimonials = await getTestimonialsList();
       const videoSection = await getVideoSection(pageSlug);
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

