import client from "@/lib/apollo-client";
import {gql} from "@apollo/client";
import {get} from "lodash";

export const getHomePageData = async () => {

    const { data } = await client.query({
        query: gql`
            query GetHomePage {
                page(id: "home-page", idType: URI) {
                    id
                    title
                    date
                    content
                }
            }
        `,
        fetchPolicy: "no-cache",
    });
    return get(data, 'page', {});
}

export const getPageData = async (pageSlug: string) => {
    const { data } = await client.query({
        query: gql`
            query GetHPage {
                page(id: "${pageSlug}", idType: URI) {
                    id
                    title
                    date
                    content
                }
            }
        `,
        fetchPolicy: "no-cache",
        variables: { pageSlug }
    });
    return get(data, 'page', {});
}