import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaSearch } from "react-icons/fa";
import './FormPrestadores.css'
import { MdCancel } from 'react-icons/md';



const FormPrestadores = (props) => {


    const hadnleResetFiltros = () => {
        props.setNombre('')
        props.setUbicacion('')
        props.setTipoPrestador('')
        props.cambiarEspecialidad('')
    }

    return (
        <>
            <Form onSubmit={props.buscarPrestadores} className="formPrestadores" >
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formNombrePrestador">
                        <Form.Label>Buscar por nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Juan Gomez / Centro Medico BA"
                            value={props.nombre}
                            onChange={(e) => props.setNombre(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEspecialidadPrestador">
                        <Form.Label>Especialidad<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Select
                            value={props.especialidadSeleccionada}
                            onChange={(e) => props.cambiarEspecialidad(e.target.value)}
                        >

                            <option value="">Seleccione una Especialidad</option>
                            {props.prestadores &&
                                [...new Set(props.prestadores.map(p => p.especialidad))].map((especialidad, index) => (
                                    <option key={index} value={especialidad}>{especialidad}</option>
                                ))}

                        </Form.Select>
                        {props.errorEspecialidad && (
                            <span style={{ color: 'red', fontSize: '0.9rem' }}>
                                Debe seleccionar una especialidad
                            </span>
                        )}
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formUbicacionPrestador">
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Select
                        value={props.ubicacion}
                        disabled={!props.especialidadSeleccionada}
                        onChange={(e) => props.setUbicacion(e.target.value)} >
                        <option value="">Seleccione una Ubicación</option>
                        {props.ubicaciones.map((ubi, index) => (
                            <option key={index} value={ubi}>{ubi}</option>
                        ))}

                    </Form.Select>
                </Form.Group>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formTipoPrestador">
                        <Form.Label>Tipo de Prestador</Form.Label>
                        <Form.Select
                            value={props.tipo}
                            disabled={!props.especialidadSeleccionada}
                            onChange={(e) => props.setTipoPrestador(e.target.value)}>

                            <option value="">Seleccione un Tipo de Prestador</option>
                            {props.tipos.map((tipo, index) => (
                                <option key={index} value={tipo}>{tipo}</option>
                            ))}

                        </Form.Select>
                    </Form.Group>

                </Row>

                <Button variant="dark" type="reset" onClick={hadnleResetFiltros}><MdCancel style={{ margin: '4px' }} /> Limpiar Filtros</Button>

                <Button variant="primary" type="submit">
                    <FaSearch style={{ margin: '4px' }} />
                    Buscar
                </Button>
            </Form>

        </>
    )
}

export default FormPrestadores;