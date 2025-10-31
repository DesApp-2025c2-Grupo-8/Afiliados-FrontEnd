import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [tipoDoc, setTipoDoc] = useState("");
  const [nroDoc, setNroDoc] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    document.title = "Iniciar sesión - Medicina Integral";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/usuarios/${tipoDoc}/${nroDoc}`
      );

      if (!response.ok) {
        setMensaje("Usuario no encontrado");
        return;
      }

      const user = await response.json();

      if (user.password === password) {
        setMensaje("Login exitoso");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMensaje("Contraseña incorrecta");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor");
    }
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
                <Form.Select
                  required
                  value={tipoDoc}
                  onChange={(e) => setTipoDoc(e.target.value)}
                >
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
                  value={nroDoc}
                  onChange={(e) => setNroDoc(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="info"
                type="submit"
                className={`${styles.btnIngresar} w-100 mt-3`}
              >
                Ingresar
              </Button>
            </Form>

            {mensaje && (
              <div className="text-center mt-3">
                <span>{mensaje}</span>
              </div>
            )}

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
