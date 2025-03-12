import {CompareSectionType, CompareSelectorType} from "@/types/compare";
import {gql} from "@apollo/client";
import client from "@/lib/apollo-client";
import {get} from "lodash";
import {Feature, Member} from "@/types";

export const getComparePageData = async (): Promise<CompareSelectorType> => {

    const query = gql`
        query GetPage($id: ID!) {
            page(id: $id, idType: URI) {
                compareSelector {
                    compareSubtitle
                    compareTitle
                    compareItems {
                        title
                        firstColumn
                        link {
                            url
                        }
                    }
                }
            }
        }
    `;

    const { data } = await client.query({
        query,
        variables: { id: 'compare' },
        fetchPolicy: "no-cache",
    });

    if (!data.page) {
        throw new Error("Page not found");
    }

    return get(data, 'page.compareSelector', {});
}

export const getCompareChildPageData = async (slug: string): Promise<CompareSectionType> => {

    const query = gql`
        query GetPage($id: ID!) {
            page(id: $id, idType: URI) {
                compareSection {
                    companyName
                    compareSubtitle
                    compareTitle
                    compareItems {
                        classname
                        description
                        name
                        title
                        toCompare
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

    return get(data, 'page.compareSection', {});
}


export const getFeatureData = async (slug: string): Promise<Feature[]> => {

    const query = gql`
        query GetPage($id: ID!) {
            page(id: $id, idType: URI) {
                featuresSection {
                    features {
                        title
                        description
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

    return get(data, 'page.featuresSection.features', []);
}

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