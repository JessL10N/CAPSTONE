import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import TeacherCard from "../components/TeacherCard.component";

const Teachers = () => {
  const role = localStorage.getItem("role");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/docenti");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Errore HTTP! Status: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Dati ricevuti:", data);
      setTeachers(data);
    } catch (error) {
      console.error("Errore nel recupero dei corsi:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <Container className="m-5">
      {/* Su schermi piccoli: flex-column, su medi e superiori: flex-row */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center m-5">
        <h1>Vieni a conoscere i nostri insegnanti...</h1>
        {role === "admin" && (
          <Button
            className="m-2 ps-2 pe-2 d-flex mt-3 mt-md-0 align-self-start align-self-md-center"
            href="/docenti/new"
          >
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
            <div className="align-self-center">Insegnante</div>
          </Button>
        )}
      </div>

      {loading && <p>Caricamento in corso...</p>}
      {error && <p>Errore: {error}</p>}

      {!loading && !error && (
        <Row className="g-3">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <Col key={teacher._id} xs={12} md={6} lg={4}>
                <TeacherCard {...teacher} />
              </Col>
            ))
          ) : (
            <p>Nessun insegnante disponibile al momento.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Teachers;
