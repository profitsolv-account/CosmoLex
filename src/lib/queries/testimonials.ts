import client, {cacheOption} from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {CSTestimonial} from "@/types/testimonials";

export const getTestimonialsList = async (pageSlug?: string) => {

    const { data } = await client.query({
        query: gql`
            query GetTestimonials {
                testimonials(first: 100) {
                    edges {
                        node {
                            id
                            testimonialFields {
                                client
                                content
                                clientPicture {
                                    node {
                                        altText
                                        sourceUrl
                                        mediaDetails {
                                            width
                                            height
                                        }
                                    }
                                }
                                extended
                                location
                                position
                                videoUrl
                                background {
                                    node {
                                        guid
                                    }
                                }
                                flipBackground
                                link {
                                    url
                                }
                                title
                                pageSlugs
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: cacheOption,
        variables: {},
    })

    const testimonials = get(data, 'testimonials.edges', []).map((testimonial: any) => ({
        ...testimonial.node.testimonialFields,
        clientPicture: get(testimonial, 'node.testimonialFields.clientPicture.node', {}),
        background: get(testimonial, 'node.testimonialFields.background.node.guid', ''),
        link: get(testimonial, 'node.testimonialFields.link.url', ''),
        slug: get(testimonial, 'node.testimonialFields.pageSlugs', '') || '',
    }));

    if (pageSlug) {
        const slugs = pageSlug.split('/');
        const slug = slugs[slugs.length - 1];
        return testimonials.filter((testimonial: any) => {
            const slugs = get(testimonial, 'slug', '');
            return slugs.includes(slug);
        });
    }

    return testimonials.filter((testimonial: any) => !testimonial.slug.length || testimonial.slug.includes('all') || testimonial.extended);
}

export const getCSTestimonialsList = async (): Promise<CSTestimonial[]> => {

    const { data } = await client.query({
        query: gql`
            query GetTestimonials {
                csTestimonials(first: 200) {
                    edges {
                        node {
                            id
                            title
                            content
                            csTestimonials {
                                location
                                rating
                                image {
                                    node {
                                        altText
                                        sourceUrl
                                        mediaDetails {
                                            width
                                            height
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: cacheOption,
        variables: {},
    });

    return get(data, 'csTestimonials.edges', []).map((testimonial: any) => ({
        image: get(testimonial, 'node.csTestimonials.image.node', ''),
        title: get(testimonial, 'node.title', ''),
        content: get(testimonial, 'node.content', ''),
        location: get(testimonial, 'node.csTestimonials.location', ''),
        rating: get(testimonial, 'node.csTestimonials.rating', ''),
    }));
}