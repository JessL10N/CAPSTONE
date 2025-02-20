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
          <Form.Control
            type="email"
            placeholder="Enter email"
            style={{ width: "40%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            style={{ width: "40%" }}
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
        className="ms-0 m-5 alert-dark d-flex justify-content-center align-items-center justify-content-around"
        style={{ width: "40%" }}
      >
        <p className="fw-semibold fs-5">Non hai ancora un account?</p>
        <Button
          a
          href="/registrati"
          className="m-3 fw-semibold"
          variant="secondary"
          type="submit"
          style={{ width: "20%" }}
        >
          Registrati
        </Button>
      </Alert>
    </Container>
  );
};

export default Login;
