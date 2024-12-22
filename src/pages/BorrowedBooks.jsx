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
        const filteredBooks = data
          .map((book) => {
            const filteredBorrowedBy = book.borrowedBy.filter(
              (borrower) => borrower.userEmail === email
            );
            if (filteredBorrowedBy.length > 0) {
              return { ...book, borrowedBy: filteredBorrowedBy };
            }
            return null;
          })
          .filter(Boolean);

        setBorrowedBooks(filteredBooks);
      }
    } catch (err) {
      setError("Error fetching books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const returnBook = async (bookId, borrower) => {
    try {
      const response = await fetch(`http://localhost:5000/books/return/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: borrower.userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setBorrowedBooks((prevBooks) =>
          prevBooks
            .map((book) => {
              if (book._id === bookId) {
                const updatedBorrowedBy = book.borrowedBy.filter(
                  (b) => b.userEmail !== borrower.userEmail
                );
                if (updatedBorrowedBy.length === 0) {
                  // If no more borrowers remain, remove the book entirely
                  return null;
                }
                return { ...book, borrowedBy: updatedBorrowedBy };
              }
              return book;
            })
            .filter(Boolean) // Remove null entries (books with no borrowers)
        );
      } else {
        setError(data.error || "Failed to return the book.");
      }
    } catch (err) {
      setError("Error returning the book. Please try again.");
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
            {book.borrowedBy.map((borrower, index) => (
              <div key={index}>
                <p>Borrowed Date: {borrower.borrowedAt}</p>
                <p>Return Date: {borrower.returnDate}</p>
                <button
                  onClick={() => returnBook(book._id, borrower)}
                  style={{
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Return Book
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
