import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaSearch } from "react-icons/fa";
import styles from './FormPrestadores.module.css';

const FormPrestadores = (props) => {

    return (
        <>
            <Form onSubmit={(e) => props.buscarPrestadores(e)} className={styles.formPrestadores} >
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formNombrePrestador">
                        <Form.Label>Buscar por nombre</Form.Label>
                        <Form.Control type="text" placeholder="Juan Gomez / Centro Medico BA" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEspecialidadPrestador">
                        <Form.Label>Especialidad<span style={{color: 'red'}}>*</span></Form.Label>
                        <Form.Select onChange={(e) => props.especialidad(e.target.value)} defaultValue="" >
                            <option className={styles.options} value={"Cardiología"}>Cardiología</option>
                            <option className={styles.options} value={"Diabetología"}>Diabetología</option>
                            <option className={styles.options} value={"Psicología"}>Psicología</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formUbicacionPrestador">
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formTipoPrestador">
                        <Form.Label>Tipo de Prestador</Form.Label>
                        <Form.Select defaultValue="Tipo de Prestador">
                            <option className={styles.options}>Tipo de Prestador</option>
                            <option className={styles.options}>...</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Buscar
                    <FaSearch style={{ margin: '4px' }} />
                </Button>
            </Form>
        </>
    )
}

export default FormPrestadores;