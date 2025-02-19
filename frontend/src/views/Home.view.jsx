import React from "react";
import "../Style/hero.css";
import Hero from "../components/Hero.component";
import School from "../components/School.component";
import TestimonialsCarousel from "../components/TestimonialsCarousel.component";


const Home = () => {
  return (
    <>
    <Hero />
    <School />
    <TestimonialsCarousel />
    </>
  );
};

export default Home;
