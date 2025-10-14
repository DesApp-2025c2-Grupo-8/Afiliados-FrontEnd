import React, { useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  useEffect(() => {
    document.title = "Iniciar sesión - Medicina Integral";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles["login-container"]}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <div className={styles["login-box"]}>
              <h2>Iniciar Sesión</h2>

              <Form onSubmit={handleSubmit}>
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

                <Form.Group controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </Form.Group>

                <Button
                  variant="info"
                  type="submit"
                  className="w-100 mt-3"
                >
                  Ingresar
                </Button>
              </Form>

              <div className={styles["register-section"]}>
                <span>¿No tenés cuenta?</span>
                <Link to="/registro">Registrarse</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
