import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

const errorLink = onError(({ networkError }) => {
    if (networkError) console.error(networkError);
});

const retryLink = new RetryLink({
    attempts: { max: 3 },
});

const customFetch = (uri: RequestInfo | URL, options: RequestInit = {}) => {
    return fetch(uri.toString(), {
        ...options,
        next: { tags: ['graphql'] },
        cache: 'force-cache',
    });
};

const httpLink = new HttpLink({
    uri: 'https://cosmonew1.wpenginepowered.com/graphql',
    fetch: customFetch,
});

const client = new ApolloClient({
    link: from([errorLink, retryLink, httpLink]),
    cache: new InMemoryCache(),
});

export default client;
