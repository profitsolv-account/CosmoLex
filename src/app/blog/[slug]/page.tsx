import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";
import {getPostData} from "@/lib/queries/wordpress";
import {Metadata} from "next";
import {getPostSEOData} from "@/lib/queries/seo";

type Params = {
    params: Promise<{slug: string}>;
}
export async function generateMetadata({params}: any): Promise<Metadata> {
    const {slug} = await params;
    return await getPostSEOData(slug || 'home-page');
}

export default async function SinglePost({ params }: any) {
    const { slug } = await params;
    const pageData = await getPostData(slug);
    if (!pageData) {
        notFound();
    }
    return <PostTemplate pageData={pageData} />;
}

/*export async function generateStaticParams() {
    const urls = await getAllPostSlugs();
    // urls.length = 5;
    return urls;
}*/

export const revalidate = false;
export const dynamic = "force-static";
// export const fetchCache = "default-cache";
