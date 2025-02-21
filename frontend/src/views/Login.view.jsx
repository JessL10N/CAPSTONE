import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "../Style/generalStyle.css";

const apiUrl = process.env.REACT_APP_API_URI

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Email o password errati");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setMessage("Login riuscito!");
      window.location.href = "/";
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column min-vh-100 background-page p-5"
    >
      <h2 className="ms-0 m-5">Accedi</h2>

      <Form onSubmit={handleLogin}>
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

        <Button variant="secondary" type="submit" className="mt-3">
          Invia
        </Button>
      </Form>
      <Alert
        className="register-alert ms-0 m-5 alert-dark d-flex justify-content-center align-items-center justify-content-around"
      >
        <p className="fw-semibold fs-5">Non hai ancora un account?</p>
        <Button
          a
          href="/registrati"
          className="fw-semibold ms-3"
          variant="secondary"
          type="submit"
        >
          Registrati
        </Button>
      </Alert>
    </Container>
  );
};

export default Login;
