import React from "react";
import Hero from "../components/Hero";
import Carrousel from "../components/Carrousel";
import { Link as LinkRouter } from "react-router-dom";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Index() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Carrousel />
      <LinkRouter to={"/home"} />
      <LinkRouter to={"/cities"} />
      <Footer />
    </div>
  );
}
