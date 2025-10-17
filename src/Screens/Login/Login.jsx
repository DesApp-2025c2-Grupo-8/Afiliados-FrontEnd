import React, { useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {

  const navigate = useNavigate()
  useEffect(() => {
    document.title = "Iniciar sesión - Medicina Integral";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Navigate("/");
  };

  return (
    <div className={styles.loginContainer}>
        <Row className={styles.justifyContentCenter}>
          <Col xs={12} sm={8} md={6} lg={4}>
            <div className={styles.loginBox}>
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
                  type="button"
                  onClick={() => navigate("/")}
                  className={`${styles.btnIngresar} w-100 mt-3`}
                >
                  Ingresar
                </Button>
              </Form>

              <div className={styles.registerSection}>
                <span>¿No tenés cuenta?</span>
                <Link to="/registro">Registrarse</Link>
              </div>
            </div>
          </Col>
        </Row>
    </div>
  );
};

export default Login;
