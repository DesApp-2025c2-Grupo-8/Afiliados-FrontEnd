import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaSearch } from "react-icons/fa";
import './FormPrestadores.css'


const FormPrestadores = () => {
    return (
        <>
            <Form className="formPrestadores">
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Buscar por nombre</Form.Label>
                        <Form.Control type="text" placeholder="Juan Gomez / Centro Medico BA" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Especialidad<span >*</span></Form.Label>
                        <Form.Select defaultValue={"Seleccione una especialidad"}>
                            <option className="options"></option>
                            <option className="options"></option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Tipo de Prestador</Form.Label>
                        <Form.Select defaultValue="Tipo de Prestador">
                            <option className="options">Tipo de Prestador</option>
                            <option className="options">...</option>
                        </Form.Select>
                    </Form.Group>

                </Row>

                <Button variant="primary" type="submit">
                    Buscar
                    <FaSearch style={{margin: '4px'}} />
                </Button>
            </Form>

        </>
    )
}

export default FormPrestadores;