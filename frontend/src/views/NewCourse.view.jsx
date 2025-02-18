import React, { useEffect, useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";

const NewCourse = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/docenti");
        if (!response.ok)
          throw new Error("Errore nel recupero degli insegnanti");
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeachers();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Errore durante l'upload");
      }
      const data = await response.json();
      // Aggiorna lo stato dell'immagine con l'URL restituito dal server
      setImage(data.url);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCourse = {
        image:
          image ||
          "https://media.istockphoto.com/id/644015884/photo/bright-vibrant-colorful-umbrellas-parasols-row-pattern-blue-sky-background.jpg?s=612x612&w=0&k=20&c=6E31BV4QTqhI-IzKagP5K0ugbADlCKLJjINUd0CPtDY=",
        title: e.target.formTitle.value,
        teacher: selectedTeacher,
        level: e.target.formLevel.value,
        form: e.target.formForm.value,
        description: e.target.formDescription.value,
      };

      const response = await fetch("http://localhost:3001/api/corsi/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error("Si è verificato un errore");
      }
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Funzione per chiudere la modale e tornare alla lista dei corsi
  const handleClose = () => {
    setShowModal(false);
    navigate("/corsi");
  };

  return (
    <Container fluid className="p-5">
      <h1 className="m-5">Crea un nuovo corso</h1>
      <Form onSubmit={handleSubmit}>
        {/* Campo per l'upload dell'immagine */}
        <Form.Group className="m-3" controlId="formImage">
          <Form.Label className="fw-semibold">Immagine</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {image && (
            <div className="mt-2">
              <img src={image} alt="Anteprima" style={{ width: "200px" }} />
            </div>
          )}
        </Form.Group>

        <Form.Group className="m-3" controlId="formTitle">
          <Form.Label className="fw-semibold">Titolo</Form.Label>
          <Form.Control type="text" placeholder="Inserisci titolo" />
        </Form.Group>

        {/* Dropdown per selezionare un insegnante */}
        <Form.Group className="m-3" controlId="formTeacher">
          <Form.Label className="fw-semibold">Insegnante</Form.Label>
          <Form.Select
            onChange={(e) => setSelectedTeacher(e.target.value)}
            required
          >
            <option value="">Seleziona un insegnante</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.Name} {teacher.Surname}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="m-3" controlId="formLevel">
          <Form.Label className="fw-semibold">Livello</Form.Label>
          <Form.Control type="text" placeholder="Inserisci livello" />
        </Form.Group>

        <Form.Group className="m-3" controlId="formForm">
          <Form.Label className="fw-semibold">Modalità</Form.Label>
          <Form.Control type="text" placeholder="Inserisci modalità" />
        </Form.Group>

        <Form.Group className="m-3" controlId="formDescription">
          <Form.Label className="fw-semibold">Descrizione</Form.Label>
          <Form.Control type="text" placeholder="Inserisci descrizione" />
        </Form.Group>

        <Button className="m-3" variant="primary" type="submit">
          Crea corso
        </Button>
      </Form>
      {/* Modale di conferma */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Corso Creato!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Il corso è stato creato con successo.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewCourse;
