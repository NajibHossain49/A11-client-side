import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch borrowed books for the logged-in user
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/borrowed-books`, {
          params: { email: user?.email },
        });
        setBorrowedBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
        setLoading(false);
      }
    };

    if (user?.email) fetchBorrowedBooks();
  }, [user?.email]);

  const handleReturn = async (bookId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/return-book`, {
        email: user.email,
        bookId,
      });
      toast.success("Book returned successfully!");
      setBorrowedBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (error) {
      toast.error("Failed to return book. Please try again.");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">My Borrowed Books</h1>
      {borrowedBooks.length === 0 ? (
        <p className="text-center text-gray-600">No borrowed books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowedBooks.map((book) => (
            <div key={book._id} className="p-4 border rounded bg-white shadow">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{book.name}</h2>
              <p className="text-gray-600">Category: {book.category}</p>
              <p className="text-gray-600">Borrowed Date: {book.borrowedDate}</p>
              <p className="text-gray-600">Return Date: {book.returnDate}</p>
              <button
                onClick={() => handleReturn(book._id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BorrowedBooks;
