import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MyLib
          </span>
        </a>
        <div className="md:order-2">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
              >
                Browse
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
};
