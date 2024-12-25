import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  const location = useLocation();

  // Define route-to-title mapping
  const titles = {
    "/": "Home - My Library",
    "/All-Books": "All Books - My Library",
    "/update-book/:id": "Update Book - My Library",
    "/Add-Book": "Add Book - My Library",
    "/Borrowed-Books": "Borrowed Books - My Library",
    "/book-details/:id": "Book Details - My Library",
    "/login": "Login - My Library",
    "/registration": "Register - My Library",
    // "/categories": "Categories - My Library",
    // "/categories/:category": "Category Books - My Library",
    // "*": "404 Error - My Library",
  };

  useEffect(() => {
    const path = location.pathname;

    // Match the route dynamically
    const dynamicTitle = Object.keys(titles).find((route) =>
      path.match(new RegExp(`^${route.replace(/:\w+/g, "\\w+")}$`))
    );

    // Set document title
    document.title = titles[dynamicTitle] || "My Library";
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet /> {/* Dynamic content will be rendered here */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
