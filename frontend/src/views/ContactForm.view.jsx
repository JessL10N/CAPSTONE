import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [validated, setValidated] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await fetch("http://localhost:3001/api/contattaci", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          setSubmittedMessage(data.message);
          setFormData({ name: "", email: "", subject: "", message: "" });
          setErrorMessage("");

          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setErrorMessage(data.error || "Si è verificato un errore");
          setSubmittedMessage("");
        }
      } catch (error) {
        setErrorMessage("Errore del server");
        console.error(error);
      }
    }
    setValidated(true);
  };

  return (
    <Container className="mt-5">
      <h1>Contattaci</h1>

      {submittedMessage && (
        <Alert variant="success" onClose={() => setSubmittedMessage("")} dismissible>
          {submittedMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}

      {!submittedMessage && (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="contactFormName" className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Inserisci il tuo nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Per favore inserisci il tuo nome.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="contactFormEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Inserisci la tua email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Per favore inserisci un'email valida.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="contactFormSubject" className="mb-3">
            <Form.Label>Oggetto</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Oggetto del messaggio"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Per favore inserisci un oggetto.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="contactFormMessage" className="mb-3">
            <Form.Label>Messaggio</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={5}
              placeholder="Scrivi il tuo messaggio qui..."
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Per favore inserisci il tuo messaggio.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Invia
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ContactForm;
