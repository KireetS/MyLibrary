import React, { useContext } from "react";
import dataContext from "../Contexts/datafetched/dataContext";
import spinContext from "../Contexts/spin/spinContext";
import { Spinner } from "./Spinner";
export const Search = () => {
  const { books , handleClick } = useContext(dataContext);
  const { spin } = useContext(spinContext);

  const sumbitHandler = async(e)=>{
    e.preventDefault()
    await handleClick()
  }

  const limitTitle = (title) => {
    if (title.length > 8) {
      return title.substr(0, 8) + "...";
    }
    return title;
  };
  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 p-10">
        <form onSubmit ={sumbitHandler} className="relative">
          <input
            type="text"
            id="search-navbar"
            className="block w-36 md:w-96 p-2 pl-10 text-sm text-gray-900 border-2 border-r-0 border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
        </form>
        <button
          onClick={handleClick}
          type="submit"
          className=" p-2.5 bg-slate-900 text-gray-300 hover:text-white focus:ring-2 focus:ring-gray-700 rounded-r-lg"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>

      {spin && <Spinner />}


      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
            {books.length > 0 &&
              books.map((book, index) => (
                <a
                  key={index}
                  className="bg-white text-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                  href={book.volumeInfo.previewLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={
                      (book.volumeInfo.imageLinks &&
                        book.volumeInfo.imageLinks.thumbnail) ||
                      "https://img.freepik.com/premium-photo/book-library-with-old-open-textbook-stack-piles-literature-text-archive-reading-desk_779468-5822.jpg?w=2000"
                    }
                    alt="book"
                    className="w-full max-w-full h-auto rounded-lg"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="font-semibold text-lg">
                    {limitTitle(book.volumeInfo.title)}
                  </div>
                  <div className="text-sm">
                    {book.volumeInfo.authors && book.volumeInfo.authors[0]}
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
