import React, { useContext } from "react";
import dataContext from "../Contexts/datafetched/dataContext";
import spinContext from "../Contexts/spin/spinContext";
import { Spinner } from "./Spinner";
export const Search = () => {
  const { books } = useContext(dataContext);
  const { spin } = useContext(spinContext);
  return (
    <>
      {spin && <Spinner/>}
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
                      {book.volumeInfo.title}
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
