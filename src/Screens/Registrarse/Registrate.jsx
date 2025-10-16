import React, { useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registrate.module.css"; 

const Registro = () => {

  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Registrarse - Medicina Integral";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className={styles.registroContainer}>
      {/* <Container> */}
        <Row className={styles.justifyContentCenter}>
          <Col  className={styles.colCenter}>
            <div className={styles.registroBox}>
              <h2>Registrate</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre/s</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su/s nombre/s"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="apellido">
                  <Form.Label>Apellido/s</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su/s apellido/s"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="fechaNac">
                  <Form.Label>Fecha Nacimiento</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>

                <Form.Group controlId="tipoDoc">
                  <Form.Label>Tipo Documento</Form.Label>
                  <Form.Select required>
                    <option value="">Seleccione</option>
                    <option value="dni">DNI</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="lc">Libreta Cívica</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="nroDoc">
                  <Form.Label>Nro. Documento</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="99999999"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ingrese su teléfono"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirme su contraseña"
                    required
                  />
                </Form.Group>

                <Button
                  variant="info"
                  type="submit"
                  onClick={() => navigate("/login")}
                  className={`${styles.btnRegistrar} w-100 mt-3`}
                >
                  Registrar
                </Button>
              </Form>

              <div className={styles.loginSection}>
                <span>¿Ya tenés cuenta?</span>
                <Link to="/login">Iniciar Sesión</Link>
              </div>
            </div>
          </Col>
        </Row>
      {/* </Container> */}
    </div>
  );
};

export default Registro;
