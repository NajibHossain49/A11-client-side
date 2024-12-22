import React from "react";
import { useNavigate } from "react-router-dom";

const categories = ["Novel", "Thriller", "History", "Sci-Fi"];

const BookCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Book Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {categories.map((category) => (
          <div
            key={category}
            className="p-4 border rounded shadow cursor-pointer hover:bg-blue-100"
            onClick={() => handleCategoryClick(category)}
          >
            <h2 className="text-lg font-semibold text-center">{category}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
