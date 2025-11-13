import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Form, Modal, Button } from "react-bootstrap"
import FormGenerico from "../../components/FormGenerico/FormGenerico";
import styles from './FormAutorizaciones.module.css'
import usuarios from "../../db/usuarios"
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";

const FormAutorizaciones = () => {
    useEffect(() => {
        document.title = 'Cargar Autorización - Medicina Integral'
        if (!dataAfiliado) {
            navigate("/login");
            }

        fetch('http://localhost:3000/prestadores')
            .then(response => {
                if (!response.ok) throw new Error('Error al obtener prestadores');
                return response.json();
            })
            .then(data => {
                setPrestadores(data)
            })
            .catch(error => console.error('Error:', error)
            )
    }, []);
    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();
    const esTitular = dataAfiliado?.rol === "TITULAR";
    const [modalConfirmar, setModalConfirmar] = useState(false)
    const [modalCancelar, setModalCancelar] = useState(false)
    const [nroAutorizacion, setNroAutorizacion] = useState(null)
    const [errores, setErrores] = useState([])
    const [prestadores, setPrestadores] = useState([])
    const [medicoSeleccionado, setMedicoSeleccionado] = useState("")
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("")
    const [ubicaciones, setUbicaciones] = useState([])
    const [direccionDisponible, setDireccionDisponible] = useState("");
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState("");


    const [data, setData] = useState({
        fechaDeCarga: new Date().toISOString(),
        numeroAfiliado: dataAfiliado?.numeroAfiliado,
        integrante: "",
        medico: "",
        especialidad: "",
        partido: "",
        direccion: "",
        observaciones: ""
    })

    const navigate = useNavigate()

    const handleEspecialidadChange = (event) => {
        const especialidad = event.target.value
        setEspecialidadSeleccionada(especialidad)

        setMedicoSeleccionado("")
        setDireccionDisponible("")
        setUbicaciones([])

        //actualiza data
        setData(prev => ({
            ...prev,
            especialidad,
            medico: "",
            partido: "",
            direccion: ""
        }))
    }

    const handleMedicoChange = (event) => {
        const nombreMedico = event.target.value
        setMedicoSeleccionado(nombreMedico)

        const prestador = prestadores.find((p) => p.nombre === nombreMedico && p.especialidad === especialidadSeleccionada)

        if (prestador) {
            setUbicaciones(prestador.ubicacion)
            setDireccionDisponible("")
        } else {
            setUbicaciones([])
            setDireccionDisponible("")
        }

        //actualiza la data pero con el medico seleccionado.
        setData(prev => ({
            ...prev,
            medico: nombreMedico
        }))

    }

    const handleUbicacionChange = (event) => {
        const partidoSeleccionado = event.target.value
        setUbicacionSeleccionada(partidoSeleccionado)

        const ubicacion = ubicaciones.find(u => u.partido === partidoSeleccionado)
        const direccion = ubicacion ? ubicacion.direccion : ""
        setDireccionDisponible(direccion)

        setData(prev => ({
            ...prev,
            partido: partidoSeleccionado,
            direccion: direccion
        }))
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setData(
            campos => ({
                ...campos,
                [name]: value
            })
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const confirmar = async (event) => {
        event.preventDefault()
        try {
            const dataToSend = {
                ...data,
            }
            console.log(dataToSend)
            const response = await fetch('http://localhost:3000/autorizaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            console.log('HTTP status:', response.status, response.statusText)

            const result = await response.json()
            setNroAutorizacion(result.numeroAutorizacion)
            result.error ? setErrores(result.message) : setModalConfirmar(true); // si no hay error muestra el modal
        } catch (error) {
            console.error('Error al enviar la autorización:', error)
        }

    }

    const cancelar = () => {
        setModalCancelar(true)
    }

    const handleCancelar = () => {
        setModalCancelar(false)
        navigate("/consultar-autorizaciones")
    }

    const handleConfirmar = () => {
        setModalConfirmar(false)
        navigate("/consultar-autorizaciones")
    }

    return (
        <div className={styles.fondo}>
            <section className={styles.formContainer}>
                <h1 className={styles.titulo}>Nueva Autorización</h1>
                <FormGenerico handleSubmit={handleSubmit} confirmar={confirmar} cancelar={cancelar}>
                    <Form.Group>
                        <Form.Label>Integrante<span className={styles.oblgatorio}>*</span></Form.Label>
                        <Form.Select
                            name="integrante"
                            value={data.integrante}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione el nombre del integrante</option>
                            {
                                        console.log("dataAfiliado.grupoFamiliar", dataAfiliado?.grupoFamiliar)
                                    }
                                    {
                                        dataAfiliado?.grupoFamiliar.map((usuario) =>
                                            //el return tiene que devolver todos los afiliados si el afiliado es titular (incluyendose) si no, solo si mismos
                                            esTitular ? <option key={usuario.numeroAfiliado} value={`${usuario.nombre} ${usuario.apellido}`}>{`${usuario.nombre} ${usuario.apellido}`}</option> :
                                                ""
                                        )}
                                         <option key={dataAfiliado?.numeroAfiliado} value={`${dataAfiliado?.nombre} ${dataAfiliado?.apellido}`}>{`${dataAfiliado?.nombre} ${dataAfiliado?.apellido}`}</option>
                        </Form.Select>
                        <span>{errores.includes("integrante should not be empty") ? "Seleccione un Integrante" : ""}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Especialidad<span className={styles.oblgatorio}>*</span></Form.Label>
                        <Form.Select
                            name="especialidad"
                            value={especialidadSeleccionada}
                            onChange={handleEspecialidadChange}
                            required
                        >
                            <option value="">Seleccione una Especialidad</option>
                            {/* quiero filtrar las especialidades sin que se repitan */}
                            {
                                Array.from(
                                    new Map(
                                        prestadores.map(p => [
                                            p.especialidad.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""), // el normalize elimina las tildes y acentos para evitar duplicados.
                                            p.especialidad
                                        ])
                                    ).values()
                                ).map((esp, idx) => (
                                    <option key={idx} value={esp}>{esp}</option>
                                ))
                            }
                        </Form.Select>
                        <span>{errores.includes("especialidad should not be empty") ? "Seleccione una Especialidad" : ""}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Médico<span className={styles.oblgatorio}>*</span></Form.Label>
                        <Form.Select
                            name="medico"
                            value={medicoSeleccionado}
                            onChange={handleMedicoChange}
                            disabled={!especialidadSeleccionada}
                            required
                        >
                            <option value="">Seleccione un Médico</option>
                            {prestadores
                                .filter(p => p.especialidad === especialidadSeleccionada)
                                .map((medico, i) => (
                                    <option key={i} value={medico.nombre}>{medico.nombre}</option>
                                ))}
                        </Form.Select>
                        <span>{errores.includes("especialidad should not be empty") ? "Seleccione un Médico" : ""}</span>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Partido<span className={styles.oblgatorio}>*</span></Form.Label>
                        <Form.Select
                            name="ubicacion"
                            value={ubicacionSeleccionada}
                            onChange={handleUbicacionChange}
                            disabled={!medicoSeleccionado}
                            required
                        >
                            <option value="">Seleccione una ubicación</option>
                            {ubicaciones.map((ubi, i) => (
                                <option key={i} value={ubi.partido}>{ubi.partido}</option>
                            ))}
                        </Form.Select>
                        <span>{errores.includes("partido should not be empty") ? "Seleccione un Partido" : ""}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="direccion"
                            value={direccionDisponible}
                            disabled={!ubicacionSeleccionada}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Observaciones</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="observaciones"
                            value={data.observaciones}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </FormGenerico>
            </section>

            <Modal className={styles.modal} show={modalConfirmar} onHide={() => setModalConfirmar(false)} centered>
                <Modal.Body>
                    La Autorización ha sido cargada correctamente. <br />
                    Nro.Autorizacion: {nroAutorizacion}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleConfirmar} style={{ backgroundColor: '#24979B', border: 'none' }}>Aceptar</Button>
                </Modal.Footer>
            </Modal>

            <Modal className={styles.modal} show={modalCancelar} onHide={() => setModalCancelar(false)} centered>
                <Modal.Body>
                    ¿Estas seguro que deseas cancelar la carga de la autorización?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalCancelar(false)} style={{ backgroundColor: '#24979B', border: 'none' }}>Volver</Button>
                    <Button onClick={handleCancelar} style={{ backgroundColor: '#E64F4F', border: 'none' }}>Continuar</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )

}
export default FormAutorizaciones;