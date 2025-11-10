/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://comfama-automatizacion.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
  },
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/automations"),
    await config.transform(config, "/users"),
    await config.transform(config, "/reports"),
    await config.transform(config, "/analytics"),
    await config.transform(config, "/settings"),
  ],
};
