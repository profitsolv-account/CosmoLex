import client from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {LeaderLogos} from "@/types/logos";

export const getLeadersLogos = async (): Promise<LeaderLogos[]> => {

    const { data } = await client.query({
        query: gql`
            query LeadersLogos {
                softwareLogos {
                    images {
                        leaders {
                            image {
                                node {
                                    altText
                                    sourceUrl
                                }
                            }
                            link {
                                url
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: "cache-first",
        variables: {},
    })

    const logos = get(data, 'softwareLogos.images.leaders', []);
    return logos.map((item: any) => ({
        alt: item.image.node.altText,
        src: item.image.node.sourceUrl,
        link: item.link.url
    }))
}
