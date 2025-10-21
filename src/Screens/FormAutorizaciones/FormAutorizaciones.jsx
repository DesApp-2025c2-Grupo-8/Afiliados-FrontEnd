import React, { useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom"
import { Form, Col, Row, Modal, Button } from "react-bootstrap"
import FormGenerico from "../../components/FormGenerico/FormGenerico";
import styles from './FormAutorizaciones.module.css'

const FormAutorizaciones = () => {
    useEffect(() => {
        document.title = 'Cargar Autorización - Medicina Integral'
    }, []);


    return (
        <>
            <section className={styles.formContainer}>
                <h1 className={styles.titulo}>Nueva Autorización</h1>
                <FormGenerico >
                    <Form.Group>
                        <Form.Label>Integrante<span className={styles.oblgatorio}>*</span></Form.Label>
                        <Form.Select
                            name="integrante"
                            required
                        >
                            <option value="">Seleccione el nombre del integrante</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Especialidad<span className={styles.oblgatorio}>*</span></Form.Label>
                        <Form.Select
                            name="Especialidad"
                            required
                        >
                            <option value="">Seleccione una Especialidad</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Ubicación<span className={styles.oblgatorio}>*</span></Form.Label>
                        <Form.Select
                            name="ubicacion"
                            required
                        >
                            <option value="">Seleccione una ubicación</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Observaciones</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="observaciones"
                        />
                    </Form.Group>
                </FormGenerico>
            </section>
        </>
    )

}
export default FormAutorizaciones;