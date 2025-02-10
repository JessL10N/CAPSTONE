import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router";

const TeacherCard = ({ _id, image, name, surname, bio, Image, Name, Surname, Bio }) => {

  const role = localStorage.getItem("role");

  return (
    <Col xs={12} md={4} className="mb-4">
      <Card style={{ width: "100%", height: "800px" }}>
        <Card.Img
          variant="top"
          src={image || Image || "https://via.placeholder.com/150"} // Evita immagini mancanti
          alt={`${name} ${surname}`}
          style={{ width: "100%", height: "400px", objectFit: "cover",objectPosition: "top", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        />
        <Card.Body>
          <Card.Title>
          {name || Name} {surname || Surname}
          </Card.Title>
          <Card.Text>{bio || Bio || "Nessuna descrizione disponibile."}</Card.Text>
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
    </Col>
  );
};

export default TeacherCard;
