import React from 'react'
import Layout from "@/components/layout/layout";
import {PostDataType} from "@/types/post";
import {PostHeader} from "@/components/blocks/headers/postHeader";
import * as cheerio from 'cheerio';
import {TOCItem, TableOfContents} from "@/components/widgets/postNavigation";

export default function PostTemplate({pageData}: { pageData: PostDataType }) {

    const parseContentWithHeadings = (html: string): { content: string; toc: TOCItem[] } => {
        const $ = cheerio.load(html);
        const flat: TOCItem[] = [];

        $('h1,h2,h3,h4,h5').each((_, el) => {
            const $el = $(el);
            $el.addClass('scroll-mt-23');
            const text = $el.text().trim();
            let id = $el.attr('id');

            if (!id) {
                id = text
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-+/g, '-')
                    .replace(/^\-+|\-+$/g, '');
                $el.attr('id', id);
            }

            // @ts-ignore
            flat.push({ id, text, tag: el.tagName });
        });

        const toc: TOCItem[] = [];
        let lastParent: TOCItem | null = null;
        let inNumberedSection = false;
        let numberedParentLevel = 0;

        flat.forEach(item => {
            const level = parseInt(item.tag[1]);
            const startsWithNumber = /^\d+[\.\)]?\s/.test(item.text);

            if (level <= 2) {
                // Always top-level
                toc.push(item);
                lastParent = item;
                inNumberedSection = startsWithNumber;
                numberedParentLevel = level;
            } else if (inNumberedSection && level >= numberedParentLevel && lastParent) {
                // Force nest under numbered parent if same or deeper level
                if (!lastParent.children) lastParent.children = [];
                lastParent.children.push(item);
            } else if (startsWithNumber && lastParent) {
                // Nest under previous non-numbered parent
                if (!lastParent.children) lastParent.children = [];
                lastParent.children.push(item);
                inNumberedSection = true;
                numberedParentLevel = level;
            } else {
                toc.push(item);
                lastParent = item;
                inNumberedSection = false;
            }
        });

        return { content: $('body').html() || '', toc };
    }

    const ct = pageData ? pageData?.content : '';
    const {content, toc} = parseContentWithHeadings(ct || '');

    return (
        <Layout pageData={pageData}>
            <PostHeader pageData={pageData} />
            <div className="b-32 single-entity container-blog flex flex-col-reverse gap-10 items-start lg:flex-row px-4 lg:px-0">
                <div>
                    <section className="pb-20">
                        <section className="container py-4"
                                 dangerouslySetInnerHTML={{__html: content}}/>
                    </section>
                </div>
                <div className="hidden md:block w-full lg:flex-none lg:w-1/3 lg:sticky lg:top-22 lg:pb-10">
                    <TableOfContents toc={toc}/>
                </div>
            </div>

            <section className="container py-4 hidden">
                <div className="w-full relative bg-[#b9dfc3] rounded-tl-[3.125rem] rounded-br-[3.125rem] overflow-hidden p-[4.625rem] my-5">
                    <div className="top-[74px] justify-start text-primary-dark text-xl font-bold font-['Inter'] leading-loose"></div>
                    <div className="justify-start text-primary-dark text-[2.875rem] font-bold font-['Inter'] leading-[3.375rem] mb-5"></div>
                    <div className="justify-start text-primary-dark text-2xl font-normal font-['Inter'] leading-9 mb-5"></div>
                    <a href="/" className="no-underline base-btn w-auto mx-auto bg-primary-dark text-white inline-flex px-8 hover:bg-transparent hover:text-primary-dark"></a>
                </div>
            </section>
        </Layout>

    )
}
