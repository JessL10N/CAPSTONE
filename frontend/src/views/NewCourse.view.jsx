import React, { useEffect, useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";

const NewCourse = () => {
  const [teachers, setTeachers] = useState([]); // Stato per salvare gli insegnanti
  const [selectedTeacher, setSelectedTeacher] = useState(""); // Stato per l'insegnante selezionato
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/docenti"); // Assicurati che l'endpoint esista
        if (!response.ok)
          throw new Error("Errore nel recupero degli insegnanti");
        const data = await response.json();
        setTeachers(data); // Imposta la lista degli insegnanti
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCourse = {
        image:
          e.target.formImage.value ||
          "https://media.istockphoto.com/id/644015884/photo/bright-vibrant-colorful-umbrellas-parasols-row-pattern-blue-sky-background.jpg?s=612x612&w=0&k=20&c=6E31BV4QTqhI-IzKagP5K0ugbADlCKLJjINUd0CPtDY=",
        title: e.target.formTitle.value,
        teacher: selectedTeacher, // Usa l'ID selezionato
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
      setShowModal(true); // Mostra la modale di conferma
    } catch (error) {
      console.log(error);
    }
  };

  // Funzione per chiudere la modale e tornare alla lista dei corsi
  const handleClose = () => {
    setShowModal(false);
    navigate("/corsi"); // Redirect alla pagina dei corsi
  };

  return (
    <Container>
      <h1>Crea un nuovo corso</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Immagine</Form.Label>
          <Form.Control type="text" placeholder="Inserisci immagine" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" placeholder="Inserisci titolo" />
        </Form.Group>

        {/* Dropdown per selezionare un insegnante */}
        <Form.Group className="mb-3" controlId="formTeacher">
          <Form.Label>Insegnante</Form.Label>
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

        <Form.Group className="mb-3" controlId="formLevel">
          <Form.Label>Livello</Form.Label>
          <Form.Control type="text" placeholder="Inserisci livello" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formForm">
          <Form.Label>Modalità</Form.Label>
          <Form.Control type="text" placeholder="Inserisci modalità" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control type="text" placeholder="Inserisci descrizione" />
        </Form.Group>

        <Button variant="primary" type="submit">
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
