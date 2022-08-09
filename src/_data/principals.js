const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchPrincipals() {
    urlToCache = metaData.apiUrl + '/principals_data?per_page=100&_fields=id,acf';
    cacheInterval = metaData.cacheInterval;
    try {
        return AssetCache(
            urlToCache,
            {
                duration: cacheInterval,
                type: "json"
            }
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

async function processPrincipals(sitePrincipals) {
    return Promise.all(
        sitePrincipals.map(async (principalsItem) => {
            return await {
                id: principalsItem.id,
                headshot: principalsItem.acf.headshot,
                name: principalsItem.acf.name,
                bio: principalsItem.acf.bio,
                weight: principalsItem.acf.weight
            }
        })
    );
}

module.exports = async () => {
    const sitePrincipals = await fetchPrincipals();
    const processedPrincipals = await processPrincipals(sitePrincipals);
    return processedPrincipals;
};