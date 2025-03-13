import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

const errorLink = onError(({ networkError }) => {
    if (networkError) console.error('Network Error:', networkError);
});

const retryLink = new RetryLink({
    attempts: (count, operation, error) => !!error && count < 3,
    delay: (count) => Math.pow(2, count) * 1000,
});

/*const client = new ApolloClient({
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
});*/

const client = new ApolloClient({
    link: from([errorLink, retryLink, new HttpLink({ uri: 'https://cosmonew1.wpenginepowered.com/graphql' })]),
    cache: new InMemoryCache(),
});

export default client;