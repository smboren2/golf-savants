import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import logo from "../images/logo.png"

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menuLinks {
            name
            link
            subItems {
              name
              link
            }
          }
        }
      }
    }
  `);

  const menuLinks = data.site.siteMetadata.menuLinks;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Golf Savants" />
        </Link>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          {menuLinks.map((link, index) => (
            <li key={index} className={`nav-item ${link.subItems ? 'dropdown' : ''}`}>
              {link.subItems ? (
                <>
                  <button className="dropbtn" onClick={toggleDropdown}>{link.name}</button>
                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      {link.subItems.map((subItem, subIndex) => (
                        <Link key={subIndex} to={subItem.link}>
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={link.link} className="nav-link">{link.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;