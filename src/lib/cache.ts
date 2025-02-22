// lib/cache.js

// Central place to track cache dependencies
const CACHE_DEPENDENCIES = {
    global: 'global-cache'
};

// Function to get the universal tag
export function getUniversalCacheTag() {
    return CACHE_DEPENDENCIES.global;
}
