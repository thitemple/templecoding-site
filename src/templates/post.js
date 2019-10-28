import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import kebabCase from "lodash/kebabCase";
import { DiscussionEmbed } from "disqus-react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Subline from "../components/Subline";
import Social from "../components/Social";
import { media } from "../utils/media";

import config from "../../config/SiteConfig";
import "../utils/dracula-prism.css";
import "../utils/styles.css";

const Content = styled.article`
    grid-column: 2;
    box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    border-radius: 1rem;
    padding: 2rem 4rem;
    background-color: ${props => props.theme.bg};
    z-index: 9000;
    margin-top: -3rem;
    @media ${media.tablet} {
        padding: 3rem 3rem;
    }
    @media ${media.phone} {
        padding: 2rem 1.5rem;
    }
`;

const Title = styled.h1`
    margin-bottom: 1rem;

    @media ${media.phone} {
        font-size: 2rem;
    }
`;

const PostContent = styled.div`
    margin-top: 4rem;
`;

const Post = props => {
    const postNode = props.data.markdownRemark;
    const post = postNode.frontmatter;
    const url = `${config.siteUrl}${post.path}`;
    const disqusConfig = {
        identifier: url,
        url,
        title: post.title
    };
    return (
        <Layout>
            <Wrapper>
                <SEO postPath={post.path} postNode={postNode} postSEO />
                <Helmet title={`${post.title} | ${config.siteTitle}`} />
                <Header>
                    <Link to="/">{config.siteTitle}</Link>
                </Header>
                <Content>
                    <Title>{post.title}</Title>
                    <Subline>
                        {post.date} &mdash; {postNode.timeToRead} Min Read
                        &mdash; In&nbsp;
                        <Link to={`/categories/${kebabCase(post.category)}`}>
                            {post.category}
                        </Link>
                    </Subline>
                    <PostContent
                        dangerouslySetInnerHTML={{ __html: postNode.html }}
                    />
                    <Social path={post.path} title={post.title} />
                    <a
                        href="https://www.buymeacoffee.com/thitemple"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
                            alt="Buy Me A Coffee"
                            className="center-me"
                            style={{
                                height: "auto !important",
                                width: "auto !important"
                            }}
                        />
                    </a>
                    <DiscussionEmbed
                        shortname={config.disqusShortName}
                        config={disqusConfig}
                    />
                </Content>
            </Wrapper>
        </Layout>
    );
};

export default Post;
Post.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            html: PropTypes.string,
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
                category: PropTypes.string,
                path: PropTypes.string
            })
        }).isRequired
    }).isRequired
};
/* eslint no-undef: off */
export const postQuery = graphql`
    query postByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                category
                path
            }
            timeToRead
        }
    }
`;
