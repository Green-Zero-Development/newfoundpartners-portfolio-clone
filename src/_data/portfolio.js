const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchPortfolio() {
    urlToCache = metaData.apiUrl + '/portfolio_data?per_page=100&_fields=id,slug,modified,yoast_head,types,acf';
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

async function processPortfolio(sitePortfolio) {
    return Promise.all(
        sitePortfolio.map(async (portfolioItem) => {
            return await {
                id: portfolioItem.id,
                title: portfolioItem.acf.title,
                slug: portfolioItem.slug,
                modified: portfolioItem.modified,
                yoast: portfolioItem.yoast_head,
                types: portfolioItem.types,
                projectStatus: portfolioItem.acf.project_status,
                addressInfo: portfolioItem.acf.address_info,
                map: portfolioItem.acf.map,
                aboutText: portfolioItem.acf.about_the_project,
                featId: portfolioItem.acf.featured_image.ID,
                featImg: portfolioItem.acf.featured_image.url,
                featImgAlt: portfolioItem.acf.featured_image.alt,
                gallery: portfolioItem.acf.gallery,
                showOnHomepage: portfolioItem.acf.show_on_homepage,
            }
        })
    );
}

module.exports = async () => {
    const sitePortfolio = await fetchPortfolio();
    const processedPortfolio = await processPortfolio(sitePortfolio);
    return processedPortfolio;
};