const config = require("./config/SiteConfig");

const pathPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;

module.exports = {
    pathPrefix: config.pathPrefix,
    siteMetadata: {
        title: "Temple Coding",
        siteUrl: config.siteUrl + pathPrefix,
        buildTime: new Date(Date.now()).toLocaleString(),
        description: "The personal blog of Thiago Temple."
    },
    plugins: [
        {
            resolve: "gatsby-plugin-feed",
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
                                title
                                description
                                siteUrl
                                site_url: siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map(edge => {
                                return Object.assign(
                                    {},
                                    edge.node.frontmatter,
                                    {
                                        description: edge.node.excerpt,
                                        date: edge.node.frontmatter.date,
                                        url:
                                            site.siteMetadata.siteUrl +
                                            edge.node.fields.slug,
                                        guid:
                                            site.siteMetadata.siteUrl +
                                            edge.node.fields.slug,
                                        custom_elements: [
                                            {
                                                "content:encoded":
                                                    edge.node.html
                                            }
                                        ]
                                    }
                                );
                            });
                        },
                        query: `
                          {
                            allMarkdownRemark(
                              sort: { order: DESC, fields: [frontmatter___date] },
                            ) {
                              edges {
                                node {
                                  excerpt
                                  html
                                  fields { slug }
                                  frontmatter {
                                    title
                                    date
                                  }
                                }
                              }
                            }
                          }
                        `,
                        output: "/rss.xml",
                        title: "Your Site's RSS Feed",
                        // optional configuration to insert feed reference in pages:
                        // if `string` is used, it will be used to create RegExp and then test if pathname of
                        // current page satisfied this regular expression;
                        // if not provided or `undefined`, all pages will have feed reference inserted
                        match: "^/blog/"
                    }
                ]
            }
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-styled-components",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "post",
                path: `${__dirname}/blog`
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "markdown-pages",
                path: `${__dirname}/src/markdown-pages`,
                plugins: [
                    {
                        resolve: "gatsby-remark-series"
                    }
                ]
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-external-links",
                        options: {
                            target: "_blank",
                            rel: "nofollow noopener noreferrer"
                        }
                    },
                    "gatsby-remark-prismjs",
                    "gatsby-remark-autolink-headers",
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 590
                        }
                    },
                    "gatsby-remark-copy-linked-files"
                ]
            }
        },
        {
            resolve: "gatsby-plugin-typography",
            options: {
                pathToConfigModule: "src/utils/typography.js"
            }
        },
        "gatsby-plugin-catch-links",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-lodash",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: config.siteTitle,
                short_name: config.siteTitleAlt,
                description: config.siteDescription,
                start_url: config.pathPrefix,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: "fullscreen",
                icon: "src/favicon.jpg"
            }
        },
        "gatsby-plugin-offline",
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "UA-41090209-2",
                head: false,
                anonymize: true,
                respectDNT: true
            }
        }
    ]
};
