import React from "react";
import "../Style/hero.css";
import Hero from "../components/Hero.component";
import School from "../components/School.component";
import Footer from "../components/Footer.component";
import TestimonialsCarousel from "../components/TestimonialsCarousel.component";


const Home = () => {
  return (
    //HERO SECTION
    <>
    <Hero />
    <School />
    <TestimonialsCarousel />
    <Footer />
    </>
  );
};

export default Home;
