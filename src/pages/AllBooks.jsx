import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Star, BookOpen, ChevronRight, BookOpenCheck, LayoutGrid, Table } from 'lucide-react';

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
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

  const filteredBooks = showOnlyAvailable 
    ? books.filter(book => book.quantity > 0)
    : books;

  const TableView = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Cover</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Book Info</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Quantity</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id} className="border-t border-gray-100">
              <td className="px-6 py-4">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-16 h-20 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4">
                <h3 className="font-semibold text-gray-800">{book.name}</h3>
                <p className="text-sm text-gray-600">by {book.authorName}</p>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
                  {book.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{book.rating}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-600">{book.quantity}</span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleUpdateClick(book._id)}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                >
                  Update
                  <ChevronRight className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredBooks.map((book) => (
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
            <div className="mb-4 flex items-center justify-between">
              <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
                {book.category}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {book.quantity} available
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="text-indigo-600 w-8 h-8 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Library Collection</h1>
          </div>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-200 hover:border-indigo-300"
            >
              <BookOpenCheck className={`w-5 h-5 ${showOnlyAvailable ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className={`font-medium ${showOnlyAvailable ? 'text-indigo-600' : 'text-gray-600'}`}>
                {showOnlyAvailable ? 'Show All Books' : 'Show Available Books'}
              </span>
            </button>

            <div className="flex gap-2 bg-white rounded-lg shadow-md border border-indigo-200">
              <button
                onClick={() => setViewMode('card')}
                className={`flex items-center gap-2 px-4 py-2 rounded-l-lg transition-all duration-300 ${
                  viewMode === 'card' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
                <span className="font-medium">Card View</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-r-lg transition-all duration-300 ${
                  viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Table className="w-5 h-5" />
                <span className="font-medium">Table View</span>
              </button>
            </div>
          </div>
        </div>
        
        {viewMode === 'card' ? <CardView /> : <TableView />}
      </div>
    </div>
  );
};

export default AllBooks;