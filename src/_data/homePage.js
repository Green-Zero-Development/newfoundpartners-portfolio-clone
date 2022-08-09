const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchHomePage() {
    urlToCache = metaData.apiUrl + '/pages?_fields=id,title,slug,yoast_head,template,acf&slug=home-page';
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

async function processHomePage(homePage) {
    return await {
        id: homePage[0].id,
        title: homePage[0].title.rendered,
        slug: homePage[0].slug,
        yoast: homePage[0].yoast_head,
        template: homePage[0].template,
        heroSection: homePage[0].acf.hero_section,
        portfolioSection: homePage[0].acf.portfolio_section
    };
}

module.exports = async () => {
    const homePage = await fetchHomePage();
    const processedHomePage = await processHomePage(homePage);
    return processedHomePage;
};