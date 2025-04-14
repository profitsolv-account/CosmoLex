import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData} from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import {getPodcastData} from "@/lib/queries/podcusts";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import PodcastSingleTemplate from "@/components/templates/PodcastSingleTemplate";

const slug = 'podcasts/software-as-a-partner-in-your-business';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage() {
   try {
       const pageData = await getPageData(slug);
       if (!pageData) {
           notFound();
       }
       const podcast = await getPodcastData(slug);
       const testimonials = await getTestimonialsList();
       const features = await getPageFeaturesData('features');
       return <PodcastSingleTemplate pageData={{
           ...pageData,
           testimonials,
           footerExtendedBg: true,
           features,
           podcasts: [podcast]
       }} />
   } catch (error) {
       console.log(error);
       notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";
