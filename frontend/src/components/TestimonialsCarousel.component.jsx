import React, { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import "../Style/hero.css";

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  // Elementi mostrati per slide in base alla larghezza della finestra
  function getItemsPerSlide() {
    const width = window.innerWidth;
    if (width < 768) {
      return 1; // Schermo piccolo
    } else if (width < 992) {
      return 3; // Schermo medio
    } else {
      return 5; // Schermo grande
    }
  }

  useEffect(() => {
    fetch("http://localhost:3001/api/testimonials")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento dei testimonial");
        }
        return response.json();
      })
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Errore:", error));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Suddivisione dei testimonial in gruppi per slide
  const testimonialElements = [];
  for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
    testimonialElements.push(testimonials.slice(i, i + itemsPerSlide));
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">I nostri allievi dicono...</h2>
      <Carousel data-bs-theme="dark">
        {testimonialElements.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {group.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className={itemsPerSlide === 1 ? "mx-auto" : ""}
                  style={{
                    flex:
                      itemsPerSlide === 1
                        ? "0 0 auto"
                        : `0 0 ${100 / itemsPerSlide}%`,
                    maxWidth:
                      itemsPerSlide === 1 ? "80%" : `${100 / itemsPerSlide}%`,
                    padding: itemsPerSlide === 1 ? "0" : "0 10px",
                  }}
                >
                  {/* Altezza Card*/}
                  <div
                    className="card text-center shadow-sm"
                    style={{
                      height: "400px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Contenitore immagine*/}
                    <div
                      style={{
                        height: "200px",
                        overflow: "hidden",
                        backgroundColor:
                          itemsPerSlide === 1 ? "black" : "transparent",
                      }}
                    >
                      <img
                        src={testimonial.image}
                        className="card-img-top mx-auto d-block"
                        alt={`${testimonial.name} ${testimonial.surname}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: itemsPerSlide === 1 ? "contain" : "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                    {/* Card body */}
                    <div className="card-body" style={{ flexGrow: 1 }}>
                      <h5 className="card-title">
                        {testimonial.name} {testimonial.surname}
                      </h5>
                      <p className="card-text">{testimonial.testimonial}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default TestimonialsCarousel;
