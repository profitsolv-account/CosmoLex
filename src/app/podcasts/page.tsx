import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData} from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import PodcastsTemplate from "@/components/templates/PodcastsTemplate";
import {getPodcastsData} from "@/lib/queries/podcusts";
import {getTestimonialsList} from "@/lib/queries/testimonials";

const slug = 'podcasts';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage() {
   try {
       const pageData = await getPageData(slug);
       const podcasts = await getPodcastsData('50597');
       const testimonials = await getTestimonialsList();
       const features = await getPageFeaturesData('features');
       return <PodcastsTemplate pageData={{
           ...pageData,
              podcasts,
           testimonials,
           footerExtendedBg: true,
           features
       }} />
   } catch (error) {
       console.log(error);
       notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";
