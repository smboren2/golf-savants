'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuLinks = [
    { name: 'Home', link: '/' },
    { 
      name: 'Tools', 
      subItems: [
        { name: 'Course History', link: '/course-history' },
        { name: 'Matchup Tool', link: '/matchup-tool' },
      ]
    },
    // Add more menu items as needed
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-50 md:bg-gray-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          <Link href="/" className="block w-48 h-16 relative">
            <Image 
              src="/images/logo.png" 
              alt="Golf Savants" 
              width={400}
              height={200}
            />
          </Link>
        </div>
        <nav className="w-screen md:w-auto bg-purple-800 md:bg-transparent py-2 md:py-0 -mx-4 px-4 md:mx-0 md:px-0">
          <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
            {menuLinks.map((link, index) => (
              <li key={index} className="relative group mb-2 md:mb-0">
                {link.subItems ? (
                  <>
                    <button 
                      onClick={toggleDropdown}
                      className="text-white md:text-purple-800 hover:text-green-500 font-medium"
                    >
                      {link.name}
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute left-0 md:right-0 mt-2 w-48 bg-purple-700 md:bg-white rounded-md shadow-lg py-1">
                        {link.subItems.map((subItem, subIndex) => (
                          <Link 
                            key={subIndex} 
                            href={subItem.link}
                            className="block px-4 py-2 text-sm text-white md:text-purple-800 hover:bg-purple-600 hover:text-white md:hover:bg-gray-100 md:hover:text-green-500"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link 
                    href={link.link}
                    className="text-white md:text-purple-800 hover:text-green-500 font-medium"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
