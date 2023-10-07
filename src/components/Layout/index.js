import * as React from 'react'
import logo from "../../images/logo.png"
import { StaticQuery, graphql, Link } from 'gatsby'
import {
    container,
    heading,
    navLinks,
    navLinkItem,
    navLinkText,
    navbar,
    navLeft
  } from './layout.module.css'


  

const Layout = ({ pageTitle, children }) => {
    return (
        <StaticQuery
            query = {graphql`
                query SiteInfo {
                    site {
                        siteMetadata {
                            title
                            menuLinks {
                                name
                                link
                            }
                        }
                    }
                }
            `}

            render={data => (
                <div className={container}>
                    <nav className={navbar}>
                        <div className={navLeft}>
                            <Link to="/">
                                <img src={logo} alt="Golf Savants" width="400" />
                            </Link>
                        </div>
                        <div>
                            <ul className={navLinks}>
                                {data.site.siteMetadata.menuLinks.map(link => (
                                    <li className={navLinkItem}>
                                        <Link to={link.link} className={navLinkText}>{link.name}</Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </nav>
                    <main>
                       <h1 className={heading}>{pageTitle}</h1>
                        {children}
                    </main>
                </div>
                    )
                }
            />
            )
        }

export default Layout