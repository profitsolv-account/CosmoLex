import client from "@/lib/apollo-client";
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
                                guid
                            }
                        }
                    }
                }
            }
        `,
        fetchPolicy: "no-cache",
        variables: {},
    })

    const footerData = get(data, 'cLSettings.clSettingsFooterFields', {});
    const headerData = get(data, 'cLSettings.clSettingsFields', {});

    return {
       ...footerData,
       ...headerData,
        logo: get(headerData, 'headerLogo.node.guid', ''),
        logoAltText: get(headerData, 'headerLogo.node.altText', ''),
    }
}