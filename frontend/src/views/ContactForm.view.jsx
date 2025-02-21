import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../Style/generalStyle.css"

const apiUrl = process.env.REACT_APP_API_URI

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
        const response = await fetch(`${apiUrl}/contattaci`, {
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
    <Container fluid className="d-flex flex-column min-vh-100 align-items-center background-page container-padding">
      <h1 className="m-5">Contattaci</h1>

      {submittedMessage && (
        <Alert
          variant="success"
          onClose={() => setSubmittedMessage("")}
          dismissible
        >
          {submittedMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}

      {!submittedMessage && (
        <Form
          className="w-75"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="contactFormName" className="mb-3">
            <Form.Label className="fw-semibold">Nome</Form.Label>
            <Form.Control className="form-input-field"
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
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control className="form-input-field"
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
            <Form.Label className="fw-semibold">Oggetto</Form.Label>
            <Form.Control className="form-input-field"
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
            <Form.Label className="fw-semibold">Messaggio</Form.Label>
            <Form.Control className="form-input-field"
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

          <Button variant="secondary" type="submit">
            Invia
          </Button>
        </Form>
      )}
      <Alert className="alert-dark d-flex flex-column m-5 align-items-start">
        <h3>Se preferisci puoi contattarci direttamente:</h3>
        <p className="m-3 fw-bold">
          <span className="m-2"><svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-telephone"
            viewBox="0 0 16 16"
          >
            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
          </svg>
          </span>
          : 075 1234567
        </p>
        <p className="m-3 fw-bold">
          <span className="m-2"><svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-envelope-at"
            viewBox="0 0 16 16"
          >
            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
          </svg>
          </span>
          : zenlife@info.it
        </p>
        <p className="m-3 fw-bold">
          <span className="m-2"><svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-whatsapp"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
          </svg>
          </span>
          : 320 7654321
        </p>
        </Alert>
    </Container>
  );
};

export default ContactForm;
