import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router";
import "../Style/cards.css";

const CourseCard = ({
  _id,
  image,
  title,
  teacher,
  level,
  form,
  description,
}) => {
  const role = localStorage.getItem("role");

  return (
      <Card className="course-card" style={{ width: "100%" }}>
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          style={{ height: "35%" }}
        />
        <Card.Body className="d-flex flex-column"
        style={{ height: "28%" }}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description || "Nessuna descrizione disponibile."}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" 
        style={{ height: "25%" }}>
          <ListGroup.Item>
            <strong>Livello:</strong> {level}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Insegnante: </strong>
            {teacher ? `${teacher.Name} ${teacher.Surname}` : "Non assegnato"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Formato:</strong> {form}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body className="responsive-btn-container d-flex justify-content-between align-items-center"
        style={{ height: "12%" }}>
          <Button className="fw-semibold align-self-center mb-2" href="/contattaci" variant="secondary">Prenota il tuo posto</Button>
          {role === "admin" && (
            <Link to={`/corsi/${_id}`}>
              <Button className="fw-semibold align-self-center mb-2" variant="secondary">Gestisci Corso</Button>
            </Link>
          )}
        </Card.Body>
      </Card>
  );
};

export default CourseCard;
