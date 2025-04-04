import {CompareSectionType, CompareSelectorType} from "@/types/compare";
import {gql} from "@apollo/client";
import client, {cacheOption} from "@/lib/apollo-client";
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
        fetchPolicy: cacheOption,
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
        fetchPolicy: cacheOption,
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
        fetchPolicy: cacheOption,
    });

  /*  if (!data.page) {
        throw new Error("Page not found");
    }*/

    return get(data, 'page.featuresSection.features', []);
}
