import React, { useContext, useEffect, useState } from "react";
import dataContext from "../Contexts/datafetched/dataContext";
import spinContext from "../Contexts/spin/spinContext";
import { Spinner } from "./Spinner";
export const Search = () => {
  const { books, handleClick , titems } = useContext(dataContext);
  const { spin } = useContext(spinContext);
  const [startIndex , setStartIndex] = useState(0)
  const sumbitHandler = async (e,updatedStartIndex) => {
    e.preventDefault();
    console.log(updatedStartIndex)
    await handleClick(updatedStartIndex);
    console.log(titems)
  };
  const limitTitle = (title) => {
    if (title.length > 8) {
      return title.substr(0, 8) + "...";
    }
    return title;
  };
  useEffect(()=>{
    console.log("updated ",titems)
  },[titems])
  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 p-10">
        <form onSubmit={(e)=>{
          setStartIndex(0)
          sumbitHandler(e,0)}} className="relative">
          <input
            type="text"
            id="search-navbar"
            className="block w-36 md:w-96 p-2 pl-10 text-sm text-gray-900 border-2 border-r-0 border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
        </form>
        <button
          onClick={(e)=>{
            setStartIndex(0)
            sumbitHandler(e,0)
          }}
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
                    {book.volumeInfo && book.volumeInfo.title
                      ? limitTitle(book.volumeInfo.title)
                      : "Author not mentioned"}
                  </div>
                  <div className="text-sm">
                    {book.volumeInfo.authors && book.volumeInfo.authors[0]}
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>

      <div className="flex bg-gray-100 justify-between items-center p-20">
        <button
          href="/"
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-75"
          disabled={startIndex===0 ? true : false}
          onClick={(e)=>{
            setStartIndex(startIndex - 39)
            sumbitHandler(e,startIndex - 39)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          Previous
        </button>

        <button
          href="/"
          className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-75"
          onClick={(e)=>{
            setStartIndex(startIndex + 39)
            sumbitHandler(e,startIndex + 39)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}

          disabled = {(startIndex  + 40 > titems) ? true : false }
        >
          Next
        </button>
      </div>
    </>
  );
};
