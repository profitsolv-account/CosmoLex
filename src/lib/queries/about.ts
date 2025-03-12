import {Member} from "@/types";
import {gql} from "@apollo/client";
import client from "@/lib/apollo-client";
import {get} from "lodash";
import {BarType} from "@/types/about";

export const getMembersData = async (slug: string): Promise<Member[]> => {
    const query = gql`
        query GetPage($id: ID!) {
            page(id: $id, idType: URI) {
                teamMembers {
                    members {
                        description
                        linkedin
                        name
                        position
                        image {
                            node {
                                altText
                                sourceUrl
                                mediaDetails {
                                    height
                                    width
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const { data } = await client.query({
        query,
        variables: { id: slug },
        fetchPolicy: "no-cache",
    });

    if (!data.page) {
        throw new Error("Page not found");
    }

    return get(data, 'page.teamMembers.members', []);
}

export const getBarsData = async (slug: string): Promise<BarType> => {
    const query = gql`
        query GetPage($id: ID!) {
            page(id: $id, idType: URI) {
                aboutPage {
                    barDescription
                    barTitle
                    barItems {
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
                        url {
                            url
                        }
                    }
                }
            }
        }
    `;

    const { data } = await client.query({
        query,
        variables: { id: slug },
        fetchPolicy: "no-cache",
    });

    if (!data.page) {
        throw new Error("Page not found");
    }

    return get(data, 'page.aboutPage', {});
}