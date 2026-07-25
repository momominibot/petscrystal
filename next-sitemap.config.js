const { products } = require("./src/lib/products");

module.exports = {
  siteUrl: "https://petscrystals.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/success*"],
  additionalPaths: async () => {
    return products.map((p) => ({
      loc: `/products/${p.id}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
