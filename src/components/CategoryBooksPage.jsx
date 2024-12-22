import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import RatingStars from "react-rating-stars-component"; 

const CategoryBooksPage = () => {
  const { category } = useParams(); // Get the category from URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch books by category
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/category/${category}`
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  if (loading) return <p>Loading books...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">{category} Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {books.map((book) => (
          <div key={book._id} className="p-4 border rounded shadow">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{book.name}</h2>
            <p><strong>Author:</strong> {book.authorName}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Quantity:</strong> {book.quantity}</p>
            <div>
              <strong>Rating:</strong>
              <RatingStars
                count={5} // Max rating (5 stars)
                value={book.rating} // Set the book's rating here
                edit={false} // Prevent editing the rating
                size={24} // Set the star size
                activeColor="#ffd700" // Set the active color (yellow for stars)
              />
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                 <Link to={`/book-details/${book._id}`}>Details</Link>
            </button>;
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBooksPage;
