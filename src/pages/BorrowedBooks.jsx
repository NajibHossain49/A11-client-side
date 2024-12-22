import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      setError("");  // Clear any previous error
      setLoading(true);
      setBorrowedBooks([]);

      if (!user?.email) {
        setError("User email not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/borrowed/${user.email}`
        );

        const data = response.data;

        if (data.error) {
          setError(data.error);
        } else {
          const filteredBooks = data
            .map((book) => {
              const filteredBorrowedBy = book.borrowedBy.filter(
                (borrower) => borrower.userEmail === user.email
              );
              if (filteredBorrowedBy.length > 0) {
                return { ...book, borrowedBy: filteredBorrowedBy };
              }
              return null;
            })
            .filter(Boolean);

          if (filteredBooks.length === 0) {
            setError("You have not borrowed any books.");
          } else {
            setBorrowedBooks(filteredBooks);
          }
        }
      } catch (err) {
        // setError("Error fetching books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [user]);

  const returnBook = async (bookId, borrower) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/books/return/${bookId}`,
        { userEmail: borrower.userEmail }
      );

      if (response.status === 200) {
        setBorrowedBooks((prevBooks) =>
          prevBooks
            .map((book) => {
              if (book._id === bookId) {
                const updatedBorrowedBy = book.borrowedBy.filter(
                  (b) => b.userEmail !== borrower.userEmail
                );
                if (updatedBorrowedBy.length === 0) {
                  return null;
                }
                return { ...book, borrowedBy: updatedBorrowedBy };
              }
              return book;
            })
            .filter(Boolean)
        );
      } else {
        setError(response.data.error || "Failed to return the book.");
      }
    } catch (err) {
      setError("Error returning the book. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Borrowed Books Finder</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && borrowedBooks.length === 0 && !error && (
        <p>You have not borrowed any books.</p>
      )}
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
