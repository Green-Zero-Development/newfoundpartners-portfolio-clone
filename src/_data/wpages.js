const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchPages() {
    urlToCache = metaData.apiUrl + '/pages?_fields=id,title,slug,yoast_head,template,acf&per_page=100&exclude=15,94';
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

async function processPages(wpages) {
    return Promise.all(
        wpages.map(async (wpage) => {
            if (wpage.template == "templates/thank-you.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_section.title,
                    heroParagraph: wpage.acf.hero_section.paragraph,
                    heroButtonText: wpage.acf.hero_section.button.text,
                    heroButtonLink: wpage.acf.hero_section.button.link
                };
            } else if (wpage.template == "templates/about.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    pageTitle: wpage.acf.page_title,
                    pageContent: wpage.acf.page_content,
                    pageImage: wpage.acf.page_image,
                    principalsTitle: wpage.acf.principals_title,
                    principalsContent: wpage.acf.principals_content
                };
            } else if (wpage.template == "templates/portfolio.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                };
            } else if (wpage.template == "templates/contact.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    pageTitle: wpage.acf.page_title,
                    pageImage: wpage.acf.page_image
                };
            } else {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                };
            }
        })
    );
}

module.exports = async () => {
    const wpages = await fetchPages();
    const processedWPages = await processPages(wpages);
    return processedWPages;
};