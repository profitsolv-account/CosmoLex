import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData, getVideoSection} from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import CurrentSetupTemplate from "@/components/templates/CurrentSetupTemplate";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {getLanguage} from "@/lib/helpers";

const getSlug = async () => {
    const lang = await getLanguage();
    let slug = 'features-2/docketing-billing-payments'
    switch (lang) {
        case 'ca':
            slug = 'features-2/docketing-billing-payments';
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
       const features = await getPageFeaturesData('features');
       return <CurrentSetupTemplate
           pageData={{
               ...pageData,
               footerExtendedBg: true,
               testimonials,
               videoSection,
               features
           }}
       />
   } catch (error) {
       notFound();
   }
}

export const revalidate = false;
export const dynamic = 'force-dynamic';
