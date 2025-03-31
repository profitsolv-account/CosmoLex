import client, {cacheOption} from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";
import {SettingsType} from "@/types";

export const getSiteSettings = async (): Promise<SettingsType> => {

    const { data } = await client.query({
        query: gql`
            query GetCLSettings {
                cLSettings {
                    clSettingsFooterFields {
                        companyAddress
                        companyPhone
                        companySummary
                        copyrightText
                        fieldGroupName
                    }
                    clSettingsFields {
                        fieldGroupName
                        freeTrialLink
                        loginLink
                        demoLink
                        headerLogo {
                            node {
                                altText
                                sourceUrl
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: cacheOption,
        variables: {},
    })

    const footerData = get(data, 'cLSettings.clSettingsFooterFields', {});
    const headerData = get(data, 'cLSettings.clSettingsFields', {});

    return {
       ...footerData,
       ...headerData,
        logo: get(headerData, 'headerLogo.node.sourceUrl', ''),
        logoAltText: get(headerData, 'headerLogo.node.altText', ''),
    }
}

export const generalSettings = async (): Promise<any> => {

    const { data } = await client.query({
        query: gql`
            query GetGeneralSettings {
                generalSettings {
                    title
                    description
                }
            }
        `,
        fetchPolicy: cacheOption,
        variables: {},
    });

    return get(data, 'generalSettings', {});
}

export const getRedirections = async () => {
    const { data } = await client.query({
        query: gql`
            query GetRedirections {
                redirections {
                    source
                    target
                }
            }
        `,
        fetchPolicy: cacheOption,
        variables: {},
    });

    return data?.redirections || [];
}