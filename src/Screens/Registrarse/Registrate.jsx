import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registrate.module.css"; 
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";

const Registro = () => {
  const navigate = useNavigate();
  const { dataAfiliado } = useAfiliadoDatos();

  const [formData, setFormData] = useState({
    fechaNacimiento: "",
    tipoDocumento: "",
    numeroDocumento: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: ""
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    document.title = "Registrarse - Medicina Integral";
    //si el ususario esta iniciado (hay datos en el context) redirigir al home
    if (dataAfiliado) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    }, console.log(formData));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  //verificar que sea mayor de 15 años
  if (new Date().getFullYear() - new Date(formData.fechaNacimiento).getFullYear() <= 16) {
    setMensaje("Para registrarte tenes que tener 16 años o mas.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setMensaje("Las contraseñas no coinciden.");
    return;
  }

  // 🔹 Crear una copia sin `confirmPassword`
  const { confirmPassword, ...dataToSend } = formData;
  const fechaNac = new Date(dataToSend.fechaNacimiento);
  dataToSend.fechaNacimiento = fechaNac.setHours(fechaNac.getHours()+3);
  console.log("Fecha de Nacimiento ajustada:", dataToSend.fechaNacimiento);
  // dataToSend.fechaNacimiento = dataToSend.fechaNacimiento;
  console.log("Datos a enviar:", dataToSend);

  try {
    const response = await fetch("http://localhost:3000/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
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

              <Form.Group controlId="tipoDocumento" className={styles.formGroup}>
                <Form.Label>Tipo Documento</Form.Label>
                <Form.Select
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="DNI">DNI</option>
                  <option value="PASAPORTE">Pasaporte</option>
                  <option value="LC">Libreta Cívica</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="numeroDocumento" className={styles.formGroup}>
                <Form.Label>Nro. Documento</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="99999999"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="fechaNacimiento" className={styles.formGroupFecha}>
                <Form.Label>Fecha Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.fechaNacimiento}
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
                  value={formData.confirmPassword }
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
