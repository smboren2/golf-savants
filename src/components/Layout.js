import React from 'react';
import Header from './Header';
import '../styles/layout.css';

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} Golf Savants. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;