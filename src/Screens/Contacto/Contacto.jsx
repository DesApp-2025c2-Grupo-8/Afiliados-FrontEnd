import React, { useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./Contacto.module.css";

const Contacto = () => {

  useEffect(() => {
    document.title = "Contacto - Medicina Integral";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.contactoContainer}>
      <Row className={styles.justifyContentCenter}>
        <Col className={styles.colCenter}>
          <div className={styles.contactoBox}>

            <h2>Veamos cómo podemos ayudarte</h2>

            <div className={styles.contenido}>
              
              
              <div className={styles.formulario}>
                <Form onSubmit={handleSubmit} className={styles.formContacto}>
                  
                  <Form.Group controlId="correo" className={styles.formGroup}>
                    <Form.Label>Tu correo</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Ingresá tu correo" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group controlId="mensaje" className={styles.formGroup}>
                    <Form.Label>Tu mensaje</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      placeholder="Escribí tu mensaje..."
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="info"
                    type="submit"
                    className={`${styles.btnEnviar} w-100 mt-3`}
                  >
                    Enviar
                  </Button>

                </Form>
              </div>

              
              <div className={styles.info}>

                
                <iframe
                  className={styles.mapaIframe}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.660503302795!2d-58.37297802347943!3d-34.60284375846905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334d80a1a01af%3A0xd6f295e7bf279d2!2sMaip%C3%BA%2039%2C%20C1084ABA%20CABA!5e0!3m2!1ses-419!2sar!4v1732562600000!5m2!1ses-419!2sar"
                ></iframe>

                
                <a 
                  href="https://maps.app.goo.gl/c6rGC9cQNBzhrC8y7?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkMapa}
                >
                  Ver en Google Maps
                </a>

                
                <div className={styles.datosContacto}>
                  <p><strong>Horario:</strong> Lunes a Viernes 09:00-18:00</p>
                  <p><strong>Dirección:</strong> Maipú 39 - Capital Federal</p>
                  <p><strong>Email:</strong> medicinaintegral@gmail.com</p>
                  <p><strong>Teléfono:</strong> +54 11 1234-5678</p>
                </div>
              </div>

            </div>

          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contacto;
