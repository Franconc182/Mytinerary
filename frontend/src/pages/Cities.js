import React from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Cities() {
  return (
    <>
      <NavBar />
      <div className="citiesCenter">
        <Cards />
      </div>
      <Footer />
    </>
  );
}
