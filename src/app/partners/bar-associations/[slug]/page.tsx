import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import BarAssociationsTemplate from "@/components/templates/BarAssociationsTemplate";

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getSEOData(`/partners/strategic/${slug}` || 'home-page');
}

export default async function BarAssociationPage({params}: Params) {
    try {
        const {slug} = await params;
        const pageData = await getPageData(`/partners/strategic/${slug}`);
        const testimonials = await getTestimonialsList();
        return <BarAssociationsTemplate
            pageData={{
                ...pageData,
                testimonials,
                footerExtendedBg: true,
            }}
            formId='02586e92-0cc0-43b6-a937-7a42c176de06'
            routerName='cosmolex-websites'
        />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";