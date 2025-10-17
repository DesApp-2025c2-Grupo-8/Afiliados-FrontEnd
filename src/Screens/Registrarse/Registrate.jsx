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

              <Form onSubmit={handleSubmit} className={styles.formRegistro}>
                <Form.Group controlId="nombre" className={styles.formGroup}>
                  <Form.Label>Nombre/s</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su/s nombre/s"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="apellido" className={styles.formGroup}>
                  <Form.Label>Apellido/s</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su/s apellido/s"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="fechaNac" className={styles.formGroupFecha}>
                  <Form.Label>Fecha Nacimiento</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>

                <Form.Group controlId="tipoDoc" className={styles.formGroup}>
                  <Form.Label>Tipo Documento</Form.Label>
                  <Form.Select required>
                    <option value="">Seleccione</option>
                    <option value="dni">DNI</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="lc">Libreta Cívica</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="nroDoc" className={styles.formGroup}>
                  <Form.Label>Nro. Documento</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="99999999"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email" className={styles.formGroup}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="telefono" className={styles.formGroup}>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ingrese su teléfono"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className={styles.formGroup}>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className={styles.formGroup}>
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
                  Registrarse
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
