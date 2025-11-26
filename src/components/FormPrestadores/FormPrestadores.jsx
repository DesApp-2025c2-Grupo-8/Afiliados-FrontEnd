import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaSearch } from "react-icons/fa";
import './FormPrestadores.css'



const FormPrestadores = ({ prestadores, onBuscar }) => {
    const [nombre, setNombre] = useState("")
    const [especialidad, setEspecialidad] = useState("")
    const [ubicacion, setUbicacion] = useState("")
    const [tipoPrestador, setTipoPrestador] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        const resultadosFiltrados = prestadores.filter((p) => {

            const coincideNombre =
                nombre === "" || p.nombre.toLowerCase().includes(nombre.toLowerCase())

            const coincideEspecialidad =
                especialidad === "" || p.especialidad === especialidad

            const coincideUbicacion =
                ubicacion === "" ||
                (Array.isArray(p.ubicacion) &&
                    p.ubicacion.some((u) => u.toLowerCase().includes(ubicacion.toLowerCase())))

            const coincideTipo =
                tipoPrestador === "" || p.tipo === tipo

            return coincideNombre && coincideEspecialidad && coincideUbicacion && coincideTipo
        })

        onBuscar(resultadosFiltrados)
    }

    const especialidadesUnicas = [...new Set(prestadores.map((p) => p.especialidad))]
    const tiposUnicos = [...new Set(prestadores.map((p) => p.tipo))]

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

                <Button variant="primary" type="submit">
                    Buscar
                    <FaSearch style={{ margin: '4px' }} />
                </Button>
            </Form>

        </>
    )
}

export default FormPrestadores;