import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from '../hooks/useAxiosSecure'

const BookBorrowModal = ({ book, isOpen, onClose }) => {
  const { user } = useContext(AuthContext); // Firebase auth context
  const axiosSecure = useAxiosSecure() // Custom hook for axios with auth token
  const [returnDate, setReturnDate] = useState("");

  const handleBorrow = async () => {
    if (!returnDate) {
      toast.error("Return date is required!");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/books/borrow/${book._id}`,
        {
          userName: user.displayName,
          userEmail: user.email,
          returnDate,
        }
      );

      // Check the response for custom messages
      if (response.data.alreadyBorrowed) {
        toast.info("You have already borrowed this book!");
      } else {
        toast.success(response.data.message);
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error(error.response?.data?.error || "Failed to borrow book.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      {/* Toast Notification */}
      <ToastContainer />
      <div className="bg-white p-6 rounded shadow w-1/3">
        <h2 className="text-xl font-bold mb-4">Borrow Book</h2>
        <p>
          <strong>Book Name:</strong> {book?.name}
        </p>
        <p>
          <strong>User:</strong> {user?.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <label className="block mt-4">
          <span className="text-gray-700">Return Date</span>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded shadow-sm"
          />
        </label>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleBorrow}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Borrow
          </button>
        </div>
      </div>
      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
};

export default BookBorrowModal;
