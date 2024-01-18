import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ReactPaginate from "react-paginate";

function Books() {
  const [booksArray, setBooksArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 4;

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );
        setBooksArray(response.data.books);
        console.log(response.data.books);
      } catch (error) {
        console.log(error);
      }
    }
    getBooks();
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(0);
  };

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const filteredBooks = booksArray.filter((book) => {
    if (searchInput === "") {
      return true;
    }
    const title = book.title.toLowerCase();
    return title.startsWith(searchInput.toLowerCase());
  });

  const sortedBooks = filteredBooks.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  const offset = currentPage * booksPerPage;
  const currentBooks = sortedBooks.slice(offset, offset + booksPerPage);

  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-8 flex flex-col md:flex-row items-center">
        <h2 className="text-4xl font-bold mb-4 text-red-600 md:mr-96 md:mb-0">
          Kalvium Books
        </h2>
        <div className="flex items-center mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 mr-2"
            onChange={handleSearch}
          />
          <NavLink to="/register">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-green-700 text-white px-4 py-2 rounded"
            >
              Register
            </motion.button>
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentBooks.length ? (
          currentBooks.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-2 rounded shadow-md overflow-hidden cursor-pointer"
              onClick={() => openModal(book)}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-1"
              >
                <img
                  src={book.imageLinks.thumbnail}
                  alt={book.title}
                  className="w-full h-96 object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="font-bold text-xs mb-1">{book.title}</p>
                <p className="text-gray-700 text-xxs">
                  {book.authors.join(", ")}
                </p>
                <p className="text-gray-700 text-xxs">
                  Rating: 🌟 {book.averageRating || "--"}/5
                </p>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <p className="text-red-500">No books found.</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex gap-2"}
          pageClassName={"bg-gray-200 p-2 rounded-full"}
          activeClassName={"bg-red-600 text-white"}
          breakClassName={"text-black"}
          previousClassName={"bg-gray-200 p-2 rounded-full"}
          nextClassName={"bg-gray-200 p-2 rounded-full"}
          disabledClassName={"text-gray-300 cursor-not-allowed"}
        />
      </div>

      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-white p-8 rounded shadow-md w-full md:w-96 max-h-full overflow-y-auto"
            >
              <img
                src={selectedBook.imageLinks.thumbnail}
                alt={selectedBook.title}
                className="w-full h-96 object-contain mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
              <p className="text-gray-700 mb-2">
                {selectedBook.authors.join(", ")}
              </p>
              <p className="text-gray-700 mb-2">
                Rating: 🌟 {selectedBook.averageRating || "--"}/5
              </p>
              <p className="mb-4">{selectedBook.description}</p>
              <a
                href={selectedBook.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                More Info
              </a>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 mx-4 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> 
    </div>
  );
}

export default Books;


