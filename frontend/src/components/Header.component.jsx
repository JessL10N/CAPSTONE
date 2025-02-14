import { Button } from "react-bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  // Funzione di logout
  const handleLogout = () => {
    // Rimuove il token JWT dal localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Reindirizza l'utente alla pagina di login
    navigate("/login");
  };

  // Verifica se l'utente è loggato (se c'è un token)
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">ZenLife</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/corsi" className="m-auto">Corsi</Nav.Link>
            <Nav.Link href="/docenti" className="m-auto">Chi siamo</Nav.Link>
            <Nav.Link href="/contattaci" className="m-auto">Contattaci</Nav.Link>
            {/* Se l'utente è loggato, mostra il bottone di logout */}
            {isLoggedIn ? (
              <Nav.Link>
                <Button variant="outline-danger" onClick={handleLogout} className="align-self-end">
                  Logout
                </Button>
              </Nav.Link>
            ) : (
              // Se l'utente non è loggato, mostra il link di login
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
