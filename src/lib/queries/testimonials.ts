import client from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";

export const getTestimonialsList = async () => {

    const { data } = await client.query({
        query: gql`
            query GetTestimonials {
                testimonials {
                    edges {
                        node {
                            id
                            testimonialFields {
                                client
                                content
                                clientPicture {
                                    node {
                                        guid
                                    }
                                }
                                extended
                                location
                                position
                                videoUrl
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: "no-cache",
        variables: {},
    })
console.log(data);
    const testimonials = get(data, 'testimonials.edges', []).map((testimonial: any) => ({
        ...testimonial.node.testimonialFields,
        clientPicture: get(testimonial, 'node.testimonialFields.clientPicture.node.guid', ''),
    }));

    return [
        ...testimonials,
    ]
}