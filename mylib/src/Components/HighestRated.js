import React, { useContext, useEffect, useState } from "react";
import spinContext from "../Contexts/spin/spinContext";
import { Spinner } from "./Spinner";
export const HighestRated = () => {
  const [highestRated, setHighestRated] = useState([]);
  const { spin, setSpinone, resetSpin } = useContext(spinContext);
  const [startIndex , setStartIndex] = useState(0)
  const [titems , setTitems] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchBooks(
      `https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction&orderBy=relevance&startIndex=${startIndex}&maxResults=40`
    ).then((data) => {
      setHighestRated(data)
    });
    // eslint-disable-next-line
  }, [startIndex]);


  const fetchBooks = async (url) => {
    try {
      setSpinone(true);
      const response = await fetch(url);
      const data = await response.json();
      resetSpin(false);
      setTitems(data.totalItems || 0);
      return data.items || [];
    } catch (error) {
      console.error("error fetching books", error);
      return [];
    }
  };

  const limitTitle = (title) => {
    if (title.length > 8) {
      return title.substr(0, 8) + "...";
    }
    return title;
  };



  return (
    <>
      {spin && <Spinner />}

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
            {highestRated.length > 0 &&
              highestRated.map((book, index) => (
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
          disabled={startIndex === 0 ? true : false}
          onClick={(e) => {
            setStartIndex(startIndex - 39);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Previous
        </button>

        <button
          href="/"
          className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-75"
          onClick={(e) => {
            setStartIndex(startIndex + 39);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={startIndex + 40 > titems ? true : false}
        >
          Next
        </button>
      </div>
    </>
  )
}
