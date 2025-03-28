import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getVideoSection} from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import CurrentSetupTemplate from "@/components/templates/CurrentSetupTemplate";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {getLanguage} from "@/lib/helpers";

const getSlug = async () => {
    const lang = await getLanguage();
    let slug = 'features-2/general-accounting'
    switch (lang) {
        case 'ca':
            slug = 'features-2/general-accounting';
            break;
    }
    return slug;
}


export async function generateMetadata(): Promise<Metadata> {
   const pageSlug = await getSlug();
    return await getSEOData(pageSlug || 'home-page');
}

export default async function SinglePage() {
   try {
       const pageSlug = await getSlug();
       const pageData = await getPageData(pageSlug);
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

export const revalidate = false;
