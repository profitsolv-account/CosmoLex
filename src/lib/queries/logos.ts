import client, {cacheOption} from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {LeaderLogos} from "@/types/logos";

export const getLeadersLogos = async (): Promise<LeaderLogos[]> => {

    const { data } = await client.query({
        query: gql`
            query LeadersLogos {
                softwareLogos {
                    images2 {
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
        fetchPolicy: cacheOption,
        variables: {},
    })

    const logos = get(data, 'softwareLogos.images2.leaders', []);
    return logos.map((item: any) => ({
        alt: item.image.node.altText,
        src: item.image.node.sourceUrl,
        link: item.link.url
    }))
}
