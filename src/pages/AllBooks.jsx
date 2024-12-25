import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Star, BookOpen, ChevronRight } from 'lucide-react';

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosSecure.get(`/books`);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <BookOpen className="text-indigo-600 w-8 h-8 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Library Collection</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div 
              key={book._id} 
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <div className="aspect-w-3 aspect-h-4">
                  <img 
                    src={book.image} 
                    alt={book.name} 
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{book.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
                    {book.category}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {book.name}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  by <span className="font-medium text-gray-800">{book.authorName}</span>
                </p>
                
                <button
                  onClick={() => handleUpdateClick(book._id)}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  <span>Update Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;