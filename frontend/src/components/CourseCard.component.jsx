import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "../Style/courseCard.css";
import { Link } from "react-router";

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
        <Card.Body className="d-flex justify-content-between"
        style={{ height: "12%" }}>
          <Card.Link href="/contattaci">Prenota il tuo posto</Card.Link>
          {role === "admin" && (
            <Link to={`/corsi/${_id}`}>
              <Button variant="secondary">Gestisci Corso</Button>
            </Link>
          )}
        </Card.Body>
      </Card>
  );
};

export default CourseCard;
