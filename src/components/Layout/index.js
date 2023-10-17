import React, { useState } from 'react'
import logo from "../../images/logo.png"
import { StaticQuery, graphql, Link } from 'gatsby'
import {
    container,
    navbar,
    navbarLeft,
    navbarRight,
    navLinkItem,
    navLinkText,
    heading,
    dropdown,
    dropbtn,
    dropdownContent
  } from './layout.module.css'




const Layout = ({ pageTitle, children }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

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
                      <div className={navbarLeft}>
                        <Link to="/">
                          <img src={logo} alt="Golf Savants"/>
                        </Link>
                      </div>
                      <div>
                        <ul className={navbarRight}>
                            {data.site.siteMetadata.menuLinks.map(link => (
                          <li className={navLinkItem}>
                            <Link to={link.link} className={navLinkText}>{link.name}</Link>
                          </li>
                          ))}
                          <div className={dropdown}>
                            <button onClick={toggleDropdown} className={dropbtn}>
                                Tools
                            </button>
                            {isDropdownOpen && (
                            <div className={dropdownContent}>
                                <a href="https://www.facebook.com">Facebook</a>
                                <a href="https://www.linkedin.com">LinkedIn</a>
                                <a href="https://www.twitter.com">Twitter</a>
                            </div>
                            )}
                          </div>
                        </ul>
                      </div>
                      
                    </nav>
                    <main>
                       <h1 className={heading}>{pageTitle}</h1>
                        {children}
                    </main>
                    <footer>
                        <p>Golf Savants {new Date().getFullYear()}</p>
                    </footer>
                </div>
                    )
                }
            />
            )
        }

export default Layout