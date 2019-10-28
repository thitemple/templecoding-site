const path = require("path");
const _ = require("lodash");
const createPaginatedPages = require("gatsby-paginate");

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    let slug;
    if (node.internal.type === "MarkdownRemark") {
        if (
            Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
            Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
        ) {
            slug = `/${_.kebabCase(node.frontmatter.slug)}`;
        }
        if (
            Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
            Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
        ) {
            slug = `/${_.kebabCase(node.frontmatter.title)}`;
        }
        createNodeField({ node, name: "slug", value: slug });
    }
};

async function createMarkdownPages(graphql, createPage, reporter) {
    const result = await graphql(`
        {
            pages: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/(markdown-pages)/" } }
                sort: { fields: frontmatter___order, order: ASC }
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            path
                            series
                            order
                        }
                        timeToRead
                    }
                }
            }
        }
    `);
    if (result.errors) {
        reporter.panicOnBuild("Oh nooooo");
    }
    const pages = result.data.pages.edges;
    pages.forEach(({ node }, index) => {
        const { path: prevPath, title: prevTitle } =
            index === 0 ? {} : pages[index - 1].node.frontmatter;
        const { path: nextPath, title: nextTitle } =
            index === pages.length - 1 ? {} : pages[index + 1].node.frontmatter;

        const landingSeries = pages.find(
            x =>
                x.node.frontmatter.series === node.frontmatter.series &&
                x.node.frontmatter.order === 0
        );
        const landingPath = landingSeries
            ? landingSeries.node.frontmatter.path
            : null;

        createPage({
            path: node.frontmatter.path,
            component: path.resolve(`./src/templates/series.js`),
            context: {
                slug: node.fields.slug,
                prevPath,
                prevTitle,
                nextPath,
                nextTitle,
                landingPath
            }
        });
    });
}

exports.createPages = async ({
    graphql,
    actions: { createPage },
    reporter
}) => {
    const result = await graphql(`
        {
            posts: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/(blog)/" } }
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            date(formatString: "YYYY-MM-DD")
                            category
                            path
                        }
                        excerpt(pruneLength: 200)
                        timeToRead
                    }
                }
            }
        }
    `);
    if (result.errors) {
        reporter.panicOnBuild("Error while running GraphQL query.");
        return;
    }
    const postPage = path.resolve("src/templates/post.js");
    const categoryPage = path.resolve("src/templates/category.js");

    createPaginatedPages({
        edges: result.data.posts.edges,
        createPage,
        pageTemplate: "src/templates/index.js",
        pageLength: 5, // This is optional and defaults to 10 if not used
        pathPrefix: "/", // This is optional and defaults to an empty string if not used
        context: {} // This is optional and defaults to an empty object if not used
    });

    const posts = result.data.posts.edges;

    posts.forEach((edge, index) => {
        const next = index === 0 ? null : posts[index - 1].node;
        const prev = index === posts.length - 1 ? null : posts[index + 1].node;

        createPage({
            path: edge.node.frontmatter.path,
            component: postPage,
            context: {
                slug: edge.node.fields.slug,
                prev,
                next
            }
        });
    });

    let categories = [];

    _.each(posts, edge => {
        if (_.get(edge, "node.frontmatter.category")) {
            categories = categories.concat(edge.node.frontmatter.category);
        }
    });

    categories = _.uniq(categories);

    categories.forEach(category => {
        createPage({
            path: `/categories/${_.kebabCase(category)}`,
            component: categoryPage,
            context: {
                category
            }
        });
    });

    await createMarkdownPages(graphql, createPage, reporter);
};
