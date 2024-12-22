import React, { useState } from "react";

const BorrowedBooks = () => {
  const [email, setEmail] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBorrowedBooks = async () => {
    setError("");
    setLoading(true);
    setBorrowedBooks([]);

    if (!email) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/books/borrowed/${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch borrowed books.");
      }
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        // Filter `borrowedBy` to include only the entry matching the entered email
        const filteredBooks = data.map((book) => {
          const filteredBorrowedBy = book.borrowedBy.filter(
            (borrower) => borrower.userEmail === email
          );
          if (filteredBorrowedBy.length > 0) {
            return { ...book, borrowedBy: filteredBorrowedBy };
          }
          return null;
        }).filter(Boolean); // Remove books without matching borrowers

        setBorrowedBooks(filteredBooks);
      }
    } catch (err) {
      setError("Error fetching books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Borrowed Books Finder</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="email">Enter Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          style={{
            marginLeft: "10px",
            padding: "5px",
            fontSize: "16px",
            width: "300px",
          }}
        />
        <button
          onClick={fetchBorrowedBooks}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Fetch Books
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {borrowedBooks.map((book) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            {/* Display Image */}
            <img
              src={book.image}
              alt={book.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
            <h3>{book.name}</h3>
            <p>Author: {book.authorName}</p>
            <p>Category: {book.category}</p>
            <p>Description: {book.shortDescription}</p>
            <p>Quantity: {book.quantity}</p>
            {book.borrowedBy.map((borrower, index) => (
              <div key={index}>
                <p>Borrowed By: {borrower.userName}</p>
                <p>Email: {borrower.userEmail}</p>
                <p>Return Date: {borrower.returnDate}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
