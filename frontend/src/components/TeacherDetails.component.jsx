import React, { useEffect, useState } from "react";
import { Form, Button, Container, Modal, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

const TeacherDetails = () => {
  const { id } = useParams();
  const redirect = useNavigate();

  const [image, setImage] = useState("");
  const [teacher, setTeacher] = useState({ Name: "", Surname: "" });
  const [bio, setBio] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(""); // "modify" o "delete"
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/docenti/${id}`);
        if (!response.ok) {
          redirect("/404");
          throw new Error("Si è verificato un problema");
        }
        const teacherData = await response.json();

        setImage(teacherData.Image);
        setTeacher({
          _id: teacherData._id,
          Name: teacherData.Name,
          Surname: teacherData.Surname,
          // se non utilizzi questi campi separatamente, puoi evitarli
        });
        setBio(teacherData.Bio);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeacher();
  }, [id, redirect]);

  const modifyTeacher = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/docenti/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Image: image, // usa "Image" (maiuscola) in linea con lo schema
          Name: teacher.Name, // usa "Name" (maiuscola)
          Surname: teacher.Surname, // usa "Surname" (maiuscola)
          Bio: bio, // usa "Bio" (maiuscola)
        }),
      });
      if (!response.ok) throw new Error("Si è verificato un errore");

      const updatedTeacher = await response.json();
      setTeacher(updatedTeacher);
      setImage(updatedTeacher.Image);
      setBio(updatedTeacher.Bio);

      setSuccessMessage("Aggiornamento avvenuto con successo!");

      setTimeout(() => {
        redirect("/docenti");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeacher = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/docenti/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Si è verificato un errore");
      redirect("/docenti");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (modalAction === "modify") {
      modifyTeacher();
    } else if (modalAction === "delete") {
      deleteTeacher();
    }
    setShowModal(false);
  };

  return (
    <Container>
      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      <h1>Gestisci insegnante</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Immagine</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci nuova immagine"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nome dell'insegnante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome dell'insegnante"
            value={`${teacher.Name}`}
            onChange={(e) => setTeacher({ ...teacher, Name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSurname">
          <Form.Label>Cognome dell'insegnante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il cognome dell'insegnante"
            value={`${teacher.Surname}`}
            onChange={(e) =>
              setTeacher({ ...teacher, Surname: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBio">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci una breve descrizione sull'insegnante"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={() => handleShowModal("modify")}>
          Modifica insegnante
        </Button>
        <Button
          className="m-2"
          variant="danger"
          onClick={() => handleShowModal("delete")}
        >
          Cancella insegnante
        </Button>
      </Form>

      {/* Modale di conferma */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Conferma {modalAction === "modify" ? "Modifica" : "Cancellazione"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler{" "}
          {modalAction === "modify" ? "modificare" : "cancellare"} questo
          insegnante?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button
            variant={modalAction === "modify" ? "primary" : "danger"}
            onClick={handleConfirmAction}
          >
            {modalAction === "modify"
              ? "Conferma Modifica"
              : "Conferma Cancellazione"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TeacherDetails;
