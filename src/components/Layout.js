/* eslint no-unused-expressions:0 */

import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import {
    TiSocialTwitter,
    TiSocialLinkedin,
    TiSocialInstagram,
    TiSocialYoutube,
    TiSocialGithub,
    TiRss
} from "react-icons/ti";
import PropTypes from "prop-types";

import SEO from "./SEO";
import theme from "../../config/Theme";
import { media } from "../utils/media";

const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${theme.bg};
    background: ${theme.primary};
  }
  body {
    background: ${theme.bg};
    color: ${theme.default};
    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a {
    color: ${theme.primaryLight};
    text-decoration: none;
    transition: color ${theme.transitionTime};
  }
  a:hover {
    color: ${theme.ultraLight};
  }
  h1, h2, h3, h4 {
    color: ${theme.dark};
    margin-top: 20px;
  }
  blockquote {
    font-style: italic;
    position: relative;
  }

  blockquote:before {
    content: "";
    position: absolute;
    background: ${theme.primary};
    height: 100%;
    width: 6px;
    margin-left: -1.6rem;
  }
  label {
    margin-bottom: .5rem;
    color: ${theme.dark};
  }
  input, textarea {
    border-radius: .5rem;
    border: none;
    background: rgba(0, 0, 0, 0.05);
    padding: .25rem 1rem;
    &:focus {
      outline: none;
    }
  }
`;

const Footer = styled.footer`
    padding: 6rem 0 3rem 0;
    background-color: ${theme.footerBg};
    color: ${theme.primary};
    margin-top: -3em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
    grid-gap: 1em 5em;

    h4 {
        color: ${theme.primary};
    }

    ul {
        list-style: none;
        margin: 0;
    }

    @media ${media.phone} {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, auto);
    }
`;

const Copyrights = styled.p`
    grid-column: 1 / -1;
    justify-self: center;

    @media ${media.phone} {
        justify-self: center;
    }
`;

const Menu = styled.div`
    justify-self: end;
    @media ${media.phone} {
        justify-self: start;
        margin-left: 5em;
    }
`;
const FollowMe = styled.div`
    div {
        display: grid;
        grid-template-columns: repeat(3, 40px);
        grid-gap: 2em;
    }

    @media ${media.phone} {
        margin-left: 5em;
    }
`;

const Layout = ({ children }) => {
    return (
        <StaticQuery
            query={graphql`
                query LayoutQuery {
                    site {
                        siteMetadata {
                            buildTime
                        }
                    }
                }
            `}
            render={() => (
                <ThemeProvider theme={theme}>
                    <>
                        <GlobalStyle />
                        <SEO />
                        {children}
                        <Footer>
                            <Menu>
                                <h4>Menu</h4>
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>
                                    <li>
                                        <Link to="/categories">Categories</Link>
                                    </li>
                                    <li>
                                        <a href="/rss.xml">Feed</a>
                                    </li>
                                    <li>
                                        <Link to="/videos">Videos</Link>
                                    </li>
                                </ul>
                            </Menu>
                            <FollowMe>
                                <h4>Follow me</h4>
                                <div>
                                    <a href="/rss.xml">
                                        <TiRss size={40} />
                                    </a>
                                    <a
                                        href="https://twitter.com/ThiagoTemple"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <TiSocialTwitter size={40} />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/thitemple/"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <TiSocialLinkedin size={40} />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/thitemple/"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <TiSocialInstagram size={40} />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/templecoding"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <TiSocialYoutube size={40} />
                                    </a>
                                    <a
                                        href="https://github.com/thitemple"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <TiSocialGithub size={40} />
                                    </a>
                                </div>
                            </FollowMe>
                            <Copyrights>
                                &copy; 2018 by Thiago Temple. All rights
                                reserved.
                            </Copyrights>
                        </Footer>
                    </>
                </ThemeProvider>
            )}
        />
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
