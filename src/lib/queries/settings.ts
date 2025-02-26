import client from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";

export const getSiteSettings = async () => {

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
                }
            }
        `,
        fetchPolicy: "no-cache",
        variables: {},
    })

    console.log(data);

    const footerData = get(data, 'page.cLSettings', {});

    return {
       ...footerData
    }
}