const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchPortfolioTypes() {
    urlToCache = metaData.apiUrl + '/portfolio_type?_fields=id,name&per_page=100';
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

module.exports = async () => {
    const portfolioTypes = await fetchPortfolioTypes();
    return portfolioTypes;
};