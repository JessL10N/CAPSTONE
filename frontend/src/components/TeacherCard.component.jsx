import React from "react";
import { Card, Button } from "react-bootstrap";
import "../Style/cards.css";
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
    <Card className="teacher-card d-flex flex-column" style={{ width: "100%"}}>
      <Card.Img
        fluid
        className="teacher-card-img"
        variant="top"
        src={image || Image || "https://via.placeholder.com/150"} // Evita immagini mancanti
        alt={`${name} ${surname}`}
      />
      <Card.Body className="d-flex flex-column flex-grow-1">
        <Card.Title>
          {name || Name} {surname || Surname}
        </Card.Title>
        <Card.Text className="flex-grow-1">
          {bio || Bio || "Nessuna descrizione disponibile."}
        </Card.Text>
        {role === "admin" && (
          <Link className="text-decoration-none mt-auto" to={`/docenti/${_id}`}>
            <div className="d-flex justify-content-center">
              <Button variant="secondary">
                Gestisci insegnante
              </Button>
            </div>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default TeacherCard;
