import React, { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import "../Style/hero.css"

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/testimonials") // Chiamata API con fetch
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento dei testimonial");
        }
        return response.json();
      })
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Errore:", error));
  }, []);

  // Dividi i testimonial in gruppi di 5 per il carosello
  const chunkedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 5) {
    chunkedTestimonials.push(testimonials.slice(i, i + 5));
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">I nostri allievi dicono...</h2>

      <Carousel data-bs-theme="dark">
        {chunkedTestimonials.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="row justify-content-center">
              {group.map((testimonial) => (
                <div key={testimonial._id} className="col-md-2">
                  <div className="card text-center shadow-sm">
                    <img
                      src={testimonial.image}
                      className="card-img-top"
                      alt={testimonial.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
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
