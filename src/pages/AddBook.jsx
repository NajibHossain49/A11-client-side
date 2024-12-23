import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from '../hooks/useAxiosSecure'
const AddBook = () => {
  const axiosSecure = useAxiosSecure()
  const categories = ["Novel", "Thriller", "History", "Sci-Fi"];

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Collecting form data using event.target elements
    const formData = {
      image: e.target.image.value,
      name: e.target.name.value,
      quantity: e.target.quantity.value,
      authorName: e.target.authorName.value,
      category: e.target.category.value,
      shortDescription: e.target.shortDescription.value,
      rating: e.target.rating.value,
    };
  
    try {
      // Use the VITE_API_URL environment variable for the base URL
      const response = await axiosSecure.post(`/add-book`, formData);
      if (response.data.message === "Book Added") {
        toast.success("Book added successfully!");
        e.target.reset(); // Reset the form after successful submission
      }
    } catch (error) {
      toast.error("Error adding book. Please try again.");
      console.error(error);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Book</h1>
      <form onSubmit={handleSubmit}>
        {/* Image URL */}
        <div className="mb-4">
          <label className="block font-semibold">Book Cover Image (URL):</label>
          <input
            type="url"
            name="image"
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
            className="w-full p-2 border rounded"
            placeholder="Enter book title"
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block font-semibold">Quantity:</label>
          <input
            type="number"
            name="quantity"
            className="w-full p-2 border rounded"
            placeholder="Enter quantity"
            required
          />
        </div>

        {/* Author Name */}
        <div className="mb-4">
          <label className="block font-semibold">Author Name:</label>
          <input
            type="text"
            name="authorName"
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

        {/* Short Description */}
        <div className="mb-4">
          <label className="block font-semibold">Short Description:</label>
          <textarea
            name="shortDescription"
            className="w-full p-2 border rounded"
            placeholder="Enter a brief description"
            required
          ></textarea>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block font-semibold">Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            className="w-full p-2 border rounded"
            placeholder="Enter rating"
            min="1"
            max="5"
            required
          />
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Book
        </button>
      </form>

      {/* Static Book Content */}
      <div className="mt-6 p-4 bg-white border rounded shadow-md">
        <h2 className="text-xl font-bold">Book Content</h2>
        <p className="text-gray-700">
          Enter the book details above to add it to the collection.
        </p>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
};

export default AddBook;
