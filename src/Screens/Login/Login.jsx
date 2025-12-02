import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";


const Login = () => {
  const navigate = useNavigate();

  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();

  useEffect(() => {
    document.title = "Iniciar sesión - Medicina Integral";
    //si el ususario esta iniciado (hay datos en el context) redirigir al home
    if (dataAfiliado) {
      navigate("/");
    }
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tipoDocumento, numeroDocumento, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMensaje(data.message || "Error en la autenticación");
      return;
    }

    setMensaje("");

    const grupoFamiliar = data.user.grupoFamiliar || [];
    let grupoCompleto = [];

    for (const afiliado of grupoFamiliar) {
      try {
        const res = await fetch(
          `http://localhost:3000/afiliados/numeroAfiliado/${afiliado}`
        );
        if (res.ok) {
          const info = await res.json();
          grupoCompleto.push(info);
        }
      } catch (error) {
        console.warn("Error al obtener datos del afiliado:", error);
      }
    }

    const userData = {
      ...data.user,
      grupoFamiliar: grupoCompleto,
    };

    setDataAfiliado(userData);
    sessionStorage.setItem("afiliadoDatos", JSON.stringify(userData));

    console.log("Usuario logueado:", userData);
    navigate("/");

  } catch (error) {
    console.error("Error:", error);
    setMensaje("Error al conectar con el servidor.");
  }
};


  return (
    <div className={styles.loginContainer}>
      <Row className={styles.justifyContentCenter}>
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className={styles.loginBox}>
            <h2>Iniciar Sesión</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="tipoDocumento">
                <Form.Label>Tipo Documento</Form.Label>
                <Form.Select
                  required
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                >
                  <option value="">Seleccione</option>
                  <option value="DNI">DNI</option>
                  <option value="PASAPORTE">Pasaporte</option>
                  <option value="LC">Libreta Cívica</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="numeroDocumento">
                <Form.Label>Nro. Documento</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="99999999"
                  required
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
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
