import React from "react";
import Banner from "../components/Banner";
import BookCategories from "../components/BookCategories";
import ExtraSection1 from "../components/ExtraSection1";
import ExtraSection2 from "../components/ExtraSection2";


const HomePage = () => {
  return (
    <div>
      <Banner />
      <BookCategories />
      <ExtraSection1 />
      <ExtraSection2 />
    </div>
  );
};

export default HomePage;
