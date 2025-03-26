import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PageTemplate from "@/components/templates/PageTemplate";
import {notFound} from "next/navigation";
import {HappyCustomersTemplate} from "@/components/templates/HappyCustomersTemplate";
import {getCSTestimonialsList} from "@/lib/queries/testimonials";

type Params = {
    params: Promise<{slug: string}>;
}

const slug = 'happy-customers';

export async function generateMetadata({params}: Params): Promise<Metadata> {
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage({params}: Params) {
   try {
       const pageData = await getPageData(slug);
       const csTestimonials = await getCSTestimonialsList();

       return <HappyCustomersTemplate pageData={{
           ...pageData,
           csTestimonials
       }} />
   } catch (error) {
       notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";
