import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleUpdateClick = (bookId) => {
    navigate(`/update-book/${bookId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">All Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded shadow-md">
            <img src={book.image} alt={book.name} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold">{book.name}</h2>
            <p className="text-gray-600">Author: {book.authorName}</p>
            <p className="text-gray-600">Category: {book.category}</p>
            <p className="text-gray-600">Rating: {book.rating}</p>
            <button
              onClick={() => handleUpdateClick(book._id)}
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
