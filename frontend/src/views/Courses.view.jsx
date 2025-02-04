import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CourseCard from "../components/CourseCard.component";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/corsi");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Errore HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Errore nel recupero dei corsi:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <h1>I nostri corsi</h1>
        <Button>
          Aggiungi corso
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg m-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
        </Button>
      </div>

      {loading && <p>Caricamento in corso...</p>}
      {error && <p>Errore: {error}</p>}

      {!loading && !error && (
        <Row>
          {courses.length > 0 ? (
            courses.map((course) => <CourseCard key={course._id} {...course} />)
          ) : (
            <p>Nessun corso disponibile al momento.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Courses;
