import React, { useEffect, useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

const CourseDetails = () => {
  const { id } = useParams();
  const redirect = useNavigate();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState({ Name: "", Surname: "" });
  const [level, setLevel] = useState("");
  const [form, setForm] = useState("");
  const [description, setDescription] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(""); // "modify" o "delete"

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/corsi/${id}`);
        if (!response.ok) {
          redirect("/404");
          throw new Error("Si è verificato un problema");
        }
        const course = await response.json();

        // Salva l'ID dell'insegnante oltre ai suoi dettagli
        const teacherResponse = await fetch(
          `http://localhost:3001/api/docenti/${course.teacher}`
        );
        if (!teacherResponse.ok)
          throw new Error(
            "Non è stato possibile recuperare i dettagli dell'insegnante."
          );
        const teacherData = await teacherResponse.json();

        setImage(course.image);
        setTitle(course.title);
        setTeacher({ _id: course.teacher, Name: teacherData.Name, Surname: teacherData.Surname });
        setLevel(course.level);
        setForm(course.form);
        setDescription(course.description);

      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, [id, redirect]);

  const modifyCourse = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/corsi/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          title,
          teacher: teacher._id,
          level,
          form,
          description,
        }),
      });
      if (!response.ok) throw new Error("Si è verificato un errore");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/corsi/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Si è verificato un errore");
      redirect("/corsi");
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
      modifyCourse();
    } else if (modalAction === "delete") {
      deleteCourse();
    }
    setShowModal(false);
  };

  return (
    <Container>
      <h1>Gestisci corso</h1>
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

        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci nuovo titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTeacher">
          <Form.Label>Insegnante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci insegnante"
            value={`${teacher.Name} ${teacher.Surname}`} // Mostra nome e cognome
            onChange={(e) => setTeacher({ ...teacher, Name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLevel">
          <Form.Label>Livello</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci livello"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formForm">
          <Form.Label>Modalità</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci modalità"
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci descrizione"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={() => handleShowModal("modify")}>
          Modifica corso
        </Button>
        <Button
          className="m-2"
          variant="danger"
          onClick={() => handleShowModal("delete")}
        >
          Cancella corso
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
          {modalAction === "modify" ? "modificare" : "cancellare"} questo corso?
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

export default CourseDetails;
