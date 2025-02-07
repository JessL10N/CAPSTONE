import React, { useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";

const NewTeacher = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const createTeacher = async (e) => {
    e.preventDefault();
    try {
      const newTeacher = {
        Name: e.target.formName.value,
        Surname: e.target.formSurname.value,
        Bio: e.target.formBio.value,
        Image:
          e.target.formImage.value ||
          "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
      };

      const response = await fetch("http://localhost:3001/api/docenti/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      });

      if (!response.ok) {
        throw new Error("Si è verificato un errore");
      }
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/docenti");
  };

  return (
    <Container>
      <h1>Aggiungi un nuovo insegnante</h1>
      <Form onSubmit={createTeacher}>
        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Immagine</Form.Label>
          <Form.Control type="text" placeholder="Inserisci nuova immagine" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nome dell'insegnante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome dell'insegnante"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSurname">
          <Form.Label>Cognome dell'insegnante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il cognome dell'insegnante"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBio">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci una breve descrizione sull'insegnante"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Aggiungi insegnante
        </Button>
      </Form>

      {/* Modale di conferma */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Insegnante aggiunto!</Modal.Title>
        </Modal.Header>
        <Modal.Body>L'insegnante è stato aggiunto con successo.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewTeacher;
