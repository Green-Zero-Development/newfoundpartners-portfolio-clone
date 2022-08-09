const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchData() {
    urlToCache = metaData.apiUrl + '/pages?_fields=id,title,slug,yoast_head,template,acf&slug=404-2';
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

async function processData(data) {
    return await {
        id: data[0].id,
        title: data[0].title.rendered,
        slug: data[0].slug,
        yoast: data[0].yoast_head,
        template: data[0].template,
        heroTitle: data[0].acf.hero_section.title,
        heroParagraph: data[0].acf.hero_section.paragraph,
        heroButtonText: data[0].acf.hero_section.button.text,
        heroButtonLink: data[0].acf.hero_section.button.link
    };
}

module.exports = async () => {
    const data = await fetchData();
    const processedData = await processData(data);
    return processedData;
};