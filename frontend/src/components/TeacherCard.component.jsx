import React from "react";
import { Card, Button } from "react-bootstrap";
import "../Style/courseCard.css";
import { Link } from "react-router";

const TeacherCard = ({
  _id,
  image,
  name,
  surname,
  bio,
  Image,
  Name,
  Surname,
  Bio,
}) => {
  const role = localStorage.getItem("role");

  return (
    <Card style={{ width: "100%", height: "800px" }}>
      <Card.Img
        className="teacher-card-img"
        variant="top"
        src={image || Image || "https://via.placeholder.com/150"} // Evita immagini mancanti
        alt={`${name} ${surname}`}
      />
      <Card.Body className="mt-3">
        <Card.Title>
          {name || Name} {surname || Surname}
        </Card.Title>
        <Card.Text>
          {bio || Bio || "Nessuna descrizione disponibile."}
        </Card.Text>
      </Card.Body>
      {role === "admin" && (
        <Link to={`/docenti/${_id}`}>
          <div className="d-flex justify-content-center">
            <Button className="mb-5" variant="primary">
              Gestisci insegnante
            </Button>
          </div>
        </Link>
      )}
    </Card>
  );
};

export default TeacherCard;
