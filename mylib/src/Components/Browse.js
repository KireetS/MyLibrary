import React, { useEffect, useState, useContext } from "react";
import spinContext from "../Contexts/spin/spinContext";
import { Spinner } from "./Spinner";
import { Link } from "react-router-dom";
export const Browse = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [highestRated, setHighestRated] = useState([]);
  const { spin, setSpinone, resetSpin } = useContext(spinContext);
  useEffect(() => {
    fetchBooks(
      "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&startIndex=0&maxResults=12"
    ).then((data) => setBestSellers(data));

    fetchBooks(
      "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&startIndex=0&maxResults=12"
    ).then((data) => setNewReleases(data));

    fetchBooks(
      "https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction&startIndex=0&maxResults=12"
    ).then((data) => setHighestRated(data));
    // eslint-disable-next-line
  }, []);

  const fetchBooks = async (url) => {
    try {
      setSpinone(true);
      const response = await fetch(url);
      const data = await response.json();
      resetSpin(false);
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

  const renderBooks = (books) => {
    return (
      <>
        {spin && <Spinner />}
        {books.map((book, index) => (
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
      </>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
          {renderBooks(bestSellers)}
        </div>
        <div className="mt-4">
          <Link
            className="text-blue-500 hover:underline"
            to = "/browse/1"
          >
            See More
          </Link>
        </div>

        <h2 className="text-2xl font-semibold mb-4 mt-8">New Releases</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
          {renderBooks(newReleases)}
        </div>
        <div className="mt-4">
          <Link
            className="text-blue-500 hover:underline"
            to = "/browse/2"
          >
            See More
          </Link>
        </div>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Highest Rated</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
          {renderBooks(highestRated)}
        </div>
        <div className="mt-4">
          <Link
            className="text-blue-500 hover:underline"
            to = "/browse/3"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};
