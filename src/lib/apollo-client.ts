import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

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

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                page: {
                    keyArgs: ["id"],
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

(async () => {
    await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
    });
})();

const client = new ApolloClient({
    link: from([errorLink, retryLink, httpLink]),
    cache,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-first",
            nextFetchPolicy: "cache-first",
        },
        query: {
            fetchPolicy: "cache-first",
        },
    },
});

export default client;
