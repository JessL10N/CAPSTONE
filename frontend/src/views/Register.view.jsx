import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button, Container } from "react-bootstrap";
import "../Style/generalStyle.css";

const apiUrl = process.env.REACT_APP_API_URI

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "user";
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      role,
    };

    try {
      const response = await fetch(`${apiUrl}/registrati`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Salva il token nel localStorage
      localStorage.setItem("role", data.role); // Salva il ruolo
      navigate("/");
    } catch (error) {
      setError("Errore nella registrazione");
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column min-vh-100 background-page p-5"
    >
      <h2 className="ms-0 m-5">Registrati</h2>
      {error && <p>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="fw-semibold">Indirizzo e-mail</Form.Label>
          <Form.Control className="form-input-field"
            type="email"
            placeholder="Inserisci email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <Form.Control className="form-input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="secondary" type="submit">
          Registrati
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
