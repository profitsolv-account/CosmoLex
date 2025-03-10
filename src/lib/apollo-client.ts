import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    //uri: `${process.env.WORDPRESS_API_URL}/graphql`,
    uri: `https://cosmonew1.wpenginepowered.com/graphql`,
    cache: new InMemoryCache({
        addTypename: false,
    }),
    defaultOptions: {
        query: {
            fetchPolicy: 'no-cache',
        },
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
    }
});

export default client;