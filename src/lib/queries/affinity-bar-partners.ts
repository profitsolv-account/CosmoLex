import client, {cacheOption} from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {AffinityBarLogos} from "@/types/affinity-bar-partners";

export const getAffinityBarlogos = async (): Promise<AffinityBarLogos[]> => {

    const { data } = await client.query({
        query: gql`
            query barAffinityPartners {
              barAffinityPartners {
                images {
                  partnersLogo {
                    link {
                      url
                    }
                    image {
                      node {
                        altText
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
        `,
        fetchPolicy: cacheOption,
        variables: {},
    })

    const logos = get(data, 'barAffinityPartners.images.partnersLogo', []);
    return logos.map((item: any) => ({
        alt: item.image.node.altText,
        src: item.image.node.sourceUrl,
        link: item.link.url
    }))
}
