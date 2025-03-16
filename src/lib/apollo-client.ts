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

if (typeof window !== "undefined") {
    persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
    }).catch((err) => {
        console.error("Error persisting cache:", err);
    });
}

const client = new ApolloClient({
    link: from([errorLink, retryLink, httpLink]),
    cache,
    ssrMode: typeof window === "undefined",
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-first",
        },
        query: {
            fetchPolicy: "cache-first",
        },
    },
});

export default client;
