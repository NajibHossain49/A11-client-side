import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import BorrowedBooks from "../pages/BorrowedBooks";
import PrivateRoute from "./PrivateRoute";
import UpdateBookPage from "../pages/UpdateBookPage";

// Create a router object
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/All-Books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBookPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/Add-Book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/Borrowed-Books",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
    ],
  },
  // Catch-all route for unmatched paths
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
