import React, { useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";

const apiUrl = process.env.REACT_APP_API_URI

const NewTeacher = () => {
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  //upload dell'immagine
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Errore durante l'upload dell'immagine");
      }
      const data = await response.json();
      setImage(data.url);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const createTeacher = async (e) => {
    e.preventDefault();
    try {
      const newTeacher = {
        Name: e.target.formName.value,
        Surname: e.target.formSurname.value,
        Bio: e.target.formBio.value,
        Image:
          image ||
          "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
      };

      const response = await fetch(`${apiUrl}/docenti/new`, {
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
    <Container fluid className="p-5">
      <h1 className="m-5">Aggiungi un nuovo insegnante</h1>
      <Form onSubmit={createTeacher}>
        
        {/* Campo per l'upload dell'immagine */}
        <Form.Group className="m-3" controlId="formImage">
          <Form.Label className="fw-semibold">Immagine</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            style={{ width: "50%" }}
            onChange={handleImageUpload}
          />
          {image && (
            <div className="mt-2">
              <img src={image} alt="Anteprima" style={{ width: "200px" }} />
            </div>
          )}
        </Form.Group>

        <Form.Group className="m-3" controlId="formName">
          <Form.Label className="fw-semibold">Nome dell'insegnante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome dell'insegnante"
            style={{ width: "50%" }}
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="formSurname">
          <Form.Label className="fw-semibold">Cognome dell'insegnante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il cognome dell'insegnante"
            style={{ width: "50%" }}
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="formBio">
          <Form.Label className="fw-semibold">Descrizione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci una breve descrizione sull'insegnante"
            style={{ width: "50%" }}
          />
        </Form.Group>

        <Button className="m-3" variant="secondary" type="submit">
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
