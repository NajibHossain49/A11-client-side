import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RatingStars from "react-rating-stars-component";
import BorrowModal from "../components/BookBorrowModal";
import useAxiosSecure from '../hooks/useAxiosSecure'

const BookDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure(); // Custom hook to get axios instance with token
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axiosSecure.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-64 object-cover rounded shadow"
          />
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{book.name}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book.authorName}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Category:</strong> {book.category}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Quantity:</strong> {book.quantity}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Description:</strong> {book.shortDescription}
          </p>
          <div className="mb-4">
            <strong>Rating:</strong>
            <RatingStars
              count={5}
              value={book.rating}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
          </div>

          {/* Borrow Button */}
          <button
            onClick={() => setModalOpen(true)}
            disabled={book.quantity <= 0}
            className={`px-6 py-2 rounded shadow ${
              book.quantity <= 0
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {book.quantity > 0 ? "Borrow" : "Unavailable"}
          </button>
        </div>
      </div>

      {/* Borrow Modal */}
      <BorrowModal
        book={book}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default BookDetailsPage;
