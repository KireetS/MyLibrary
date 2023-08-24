import React, { useState } from "react";

export const Search = () => {
  const [books, setBooks] = useState([]);
  const handleClick = async () => {
    let sb = document.getElementById("search-navbar");
    if (sb) {
      console.log(sb.value);
      let s = sb.value;
      s = s.replace(/ /g, "-");
      console.log(
        `https://www.googleapis.com/books/v1/volumes?key=AIzaSyCSIjcGWF2bu9EZgr2IWTaAhRJyl8-q9Yg&startIndex=0&maxResults=40&q=${s}`
      );
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?key=AIzaSyCSIjcGWF2bu9EZgr2IWTaAhRJyl8-q9Yg&startIndex=0&maxResults=40&q=${s}`
        );
        const data = await response.json();
        setBooks(data.items || []);
      } catch (err) {
        console.error("this is the error ", err);
        setBooks([]);
      }
    }
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
          <button
            onClick={handleClick}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
            {books.length > 0 &&
              books.map((book, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={
                      (book.volumeInfo.imageLinks &&
                        book.volumeInfo.imageLinks.thumbnail) ||
                      "https://img.freepik.com/premium-photo/book-library-with-old-open-textbook-stack-piles-literature-text-archive-reading-desk_779468-5822.jpg?w=2000"
                    }
                    alt="book"
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="font-semibold text-lg">
                    {book.volumeInfo.title}
                  </div>
                  <div className="text-sm">
                    {book.volumeInfo.authors && book.volumeInfo.authors[0]}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
