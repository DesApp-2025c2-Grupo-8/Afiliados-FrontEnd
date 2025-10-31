import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registrate.module.css"; 

const Registro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNac: "",
    tipoDoc: "",
    nroDoc: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: ""
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    document.title = "Registrarse - Medicina Integral";
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setMensaje("Registro exitoso. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMensaje(result.message || "Error al registrarse.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className={styles.registroContainer}>
      <Row className={styles.justifyContentCenter}>
        <Col className={styles.colCenter}>
          <div className={styles.registroBox}>
            <h2>Registrate</h2>

            <Form onSubmit={handleSubmit} className={styles.formRegistro}>
              <Form.Group controlId="nombre" className={styles.formGroup}>
                <Form.Label>Nombre/s</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su/s nombre/s"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="apellido" className={styles.formGroup}>
                <Form.Label>Apellido/s</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su/s apellido/s"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="fechaNac" className={styles.formGroupFecha}>
                <Form.Label>Fecha Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.fechaNac}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="tipoDoc" className={styles.formGroup}>
                <Form.Label>Tipo Documento</Form.Label>
                <Form.Select
                  value={formData.tipoDoc}
                  onChange={handleChange}
                  required
                >
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
                  value={formData.nroDoc}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className={styles.formGroup}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="telefono" className={styles.formGroup}>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Ingrese su teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className={styles.formGroup}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className={styles.formGroup}>
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirme su contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                variant="info"
                type="submit"
                className={`${styles.btnRegistrar} w-100 mt-3`}
              >
                Registrarse
              </Button>
            </Form>

            {mensaje && <p className={styles.mensaje}>{mensaje}</p>}

            <div className={styles.loginSection}>
              <span>¿Ya tenés cuenta?</span>
              <Link to="/login">Iniciar Sesión</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Registro;
