import React, { useEffect, useState } from "react";
import { Form, Button, Container, Modal, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

const apiUrl = process.env.REACT_APP_API_URI


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
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${apiUrl}/corsi/${id}`);
        if (!response.ok) {
          redirect("/404");
          throw new Error("Si è verificato un problema");
        }
        const course = await response.json();

        // Salva l'ID dell'insegnante + dettagli
        const teacherResponse = await fetch(
          `${apiUrl}/docenti/${course.teacher}`
        );
        if (!teacherResponse.ok)
          throw new Error(
            "Non è stato possibile recuperare i dettagli dell'insegnante."
          );
        const teacherData = await teacherResponse.json();

        setImage(course.image);
        setTitle(course.title);
        setTeacher({
          _id: course.teacher,
          Name: teacherData.Name,
          Surname: teacherData.Surname,
        });
        setLevel(course.level);
        setForm(course.form);
        setDescription(course.description);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, [id, redirect]);

  // Upload immagine

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
        throw new Error("Errore durante l'upload");
      }
      const data = await response.json();
      setImage(data.url);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const modifyCourse = async () => {
    try {
      const response = await fetch(`${apiUrl}/corsi/${id}`, {
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

      setSuccessMessage("Corso modificato con successo!");

      // Dopo 2 secondi, reindirizza alla pagina dei corsi
      setTimeout(() => {
        redirect("/corsi");
      }, 2000);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async () => {
    try {
      const response = await fetch(`${apiUrl}/corsi/${id}`, {
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
    <Container fluid className="p-5">

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <h1 className="m-5">Gestisci corso</h1>
      <Form>

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
          <Form.Control
            type="text"
            placeholder="Inserisci nuovo titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="formTeacherName">
          <Form.Label className="fw-semibold">Nome Insegnante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome"
            value={teacher.Name}
            onChange={(e) => setTeacher({ ...teacher, Name: e.target.value })}
            disabled
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="formTeacherSurname">
          <Form.Label className="fw-semibold">Cognome Insegnante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il cognome"
            value={teacher.Surname}
            onChange={(e) =>
              setTeacher({ ...teacher, Surname: e.target.value })
            }
            disabled
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="formLevel">
          <Form.Label className="fw-semibold">Livello</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci livello"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="formForm">
          <Form.Label className="fw-semibold">Modalità</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci modalità"
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="formDescription">
          <Form.Label className="fw-semibold">Descrizione</Form.Label>
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
        <Button variant="secondary" onClick={() => redirect("/corsi")}>
          Annulla
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
