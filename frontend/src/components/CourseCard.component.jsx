import React from "react";
import { Card, ListGroup, Col, Button } from "react-bootstrap";
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
    <Col xs={12} md={4} className="mb-4">
      <Card style={{ width: "100%" }}>
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          style={{ height: "33%" }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description || "Nessuna descrizione disponibile."}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
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
        <Card.Body className="d-flex justify-content-between">
          <Card.Link href="/contatti">Prenota il tuo posto</Card.Link>
          {role === "admin" && (
          <Link to={`/corsi/${_id}`}>
            <Button variant="primary">Gestisci Corso</Button>
          </Link>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CourseCard;
