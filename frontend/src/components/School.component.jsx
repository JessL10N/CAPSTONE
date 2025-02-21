import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { Link } from "react-router";
import "../Style/generalStyle.css";

const School = () => {
  return (
    <Container fluid className="background-page container-padding">
      <Row className="align-items-center m-5">
        <Col sm={12}>
          <section>
            <div className="mt-5 fw-medium">
              <h1>Benvenuti nella Nostra Scuola di Yoga</h1>
              <p>
                Lo yoga è molto più di una semplice attività fisica: è un
                percorso di crescita personale, equilibrio e benessere.
                Praticato da millenni, combina movimento, respirazione e
                meditazione per armonizzare corpo e mente.
              </p>
              <p>
                Esistono diversi stili di yoga, ognuno con le proprie
                caratteristiche:
              </p>
              <ul>
                <li className="mt-2">
                  <span className="fw-bold">Hatha Yoga</span>: ideale per chi
                  cerca un approccio dolce e rilassante.
                </li>
                <li className="mt-2">
                  <span className="fw-bold">Vinyasa Yoga</span>: dinamico e
                  fluido, perfetto per chi ama il movimento.
                </li>
                <li className="mt-2">
                  <span className="fw-bold">Ashtanga Yoga</span>: uno stile più
                  intenso e strutturato, per rafforzare corpo e disciplina.
                </li>
                <li className="mt-2">
                  <span className="fw-bold">Yin Yoga</span>: basato su posizioni
                  mantenute a lungo, ottimo per migliorare la flessibilità e il
                  rilassamento profondo.
                </li>
              </ul>
            </div>
            <div className="mt-5 fw-medium">
              <h3>I Benefici dello Yoga</h3>
              <p>
                Praticare yoga regolarmente porta numerosi benefici fisici e
                mentali:
              </p>
              <ul>
                <li className="mt-2">
                  <span className="fw-bold">Migliora la flessibilità</span>, la
                  postura e la forza muscolare.
                </li>
                <li className="mt-2">
                  <span className="fw-bold">Riduce lo stress</span>, l'ansia e
                  favorisce il rilassamento mentale.
                </li>
                <li className="mt-2">
                  Aumenta la <span className="fw-bold">concentrazione</span> e
                  la <span className="fw-bold">consapevolezza</span> del
                  respiro.
                </li>
                <li className="mt-2">
                  Stimola il{" "}
                  <span className="fw-bold">sistema immunitario</span> e
                  migliora la <span className="fw-bold">qualità del sonno</span>
                  .
                </li>
              </ul>
            </div>
            <div className="mt-5 fw-medium">
              <h3>Perché Scegliere ZenLife?</h3>
              <p>
                La nostra scuola è il luogo ideale per immergersi in questa
                disciplina grazie a:
              </p>
              <ul>
                <li className="mt-2">
                  <span className="fw-bold">
                    Insegnanti esperti e qualificati
                  </span>
                  , capaci di guidarti con passione e attenzione.
                </li>
                <li className="mt-2">
                  Un{" "}
                  <span className="fw-bold">
                    ambiente accogliente e rilassante
                  </span>
                  , perfetto per staccare dalla frenesia quotidiana.
                </li>
                <li className="mt-2">
                  <span className="fw-bold">Lezioni adatte a tutti</span>, dai
                  principianti ai più esperti, con percorsi personalizzati.
                </li>
                <li className="mt-2">
                  Un <span className="fw-bold">approccio olistico</span>, che
                  unisce movimento, respirazione e meditazione.
                </li>
              </ul>
            </div>
          </section>
        </Col>
        <Col sm={12} md={5} className="justify-content-center">
          <aside>
            <Image
              fluid
              className="rounded shadow m-md-5 m-2"
              style={{ maxWidth: "500px", width: "100%" }}
              src="https://images.unsplash.com/photo-1444312645910-ffa973656eba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHlvZ2F8ZW58MHx8MHx8fDA%3D"
              alt="pietre in equilibrio"
            />
          </aside>
        </Col>
        <Col sm={12}>
          <div className="mt-5 fw-medium">
            <h3>Iscriviti Ora e Inizia il Tuo Percorso di Benessere</h3>
            <p>
              Se desideri ritrovare l’equilibrio, migliorare la tua salute e
              vivere con maggiore serenità, lo yoga è la scelta perfetta per te.{" "}
              <span>Unisciti a noi</span> e scopri il potere trasformativo di
              questa pratica!
            </p>
            <p className="fw-bold fs-4 mt-5">
              <Link to={`/contattaci`} className="text-decoration-none">
                Contattaci
              </Link>{" "}
              subito per prenotare la tua prima lezione e iniziare oggi stesso!{" "}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default School;
