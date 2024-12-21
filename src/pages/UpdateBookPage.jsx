import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UpdateBookPage = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  const categories = ["Novel", "Thriller", "History", "Drama", "Sci-Fi"];

  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch the specific book data
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract values from event.target
    const formData = {
      image: e.target.image.value,
      name: e.target.name.value,
      authorName: e.target.authorName.value,
      category: e.target.category.value,
      rating: e.target.rating.value,
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/books/${id}`, formData);
      toast.success("Book updated successfully!");
      navigate("/all-books"); // Redirect to All Books Page
    } catch (error) {
      toast.error("Error updating book. Please try again.");
      console.error(error);
    }
  };

  if (!book) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Book</h1>
      <form onSubmit={handleSubmit}>
        {/* Image URL */}
        <div className="mb-4">
          <label className="block font-semibold">Book Cover Image (URL):</label>
          <input
            type="url"
            name="image"
            defaultValue={book.image}
            className="w-full p-2 border rounded"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Book Name */}
        <div className="mb-4">
          <label className="block font-semibold">Book Name:</label>
          <input
            type="text"
            name="name"
            defaultValue={book.name}
            className="w-full p-2 border rounded"
            placeholder="Enter book title"
            required
          />
        </div>

        {/* Author Name */}
        <div className="mb-4">
          <label className="block font-semibold">Author Name:</label>
          <input
            type="text"
            name="authorName"
            defaultValue={book.authorName}
            className="w-full p-2 border rounded"
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-semibold">Category:</label>
          <select
            name="category"
            defaultValue={book.category}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block font-semibold">Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            defaultValue={book.rating}
            className="w-full p-2 border rounded"
            placeholder="Enter rating"
            min="1"
            max="5"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Update Book
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default UpdateBookPage;
