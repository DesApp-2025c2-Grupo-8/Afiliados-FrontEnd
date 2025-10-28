import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap"
import styles from './FormularioTurnos.module.css';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import { useNavigate } from "react-router-dom";


const datosFormInicial = {
    integrantes: [],
    especialidades: [],
    medicos: [],
    lugares: [],
}


const FormularioTurnos = () => {
    useEffect(() => {
        document.title = 'Solicitud de Turno - Medicina Integral'
    }, [])


    const [datosFormulario, setDatosFormulario]= useState(datosFormInicial)


    const [data, setData] = useState({
        numeroAfiliado: numeroAfiliado,
        integrante: "",
        especialidad: "",
        medico: "",
        lugarDeAtencion: "",
    })

    const [paso, setPaso] = useState(1);
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [modalFechaHora, setModalFechaHora] = useState(false);
    const [modalCancelar, setModalCancelar] = useState(false)
    const [errores, setErrores] = useState({});

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ({...prev, [name]: value}))
        if(value) {
            setErrores(prev => ({...prev, [name]: ""}))
        }
    }

    const handleSiguiente = (event) => {
        event.preventDefault();
        const nuevosErrores = {}

        if(!data.integrante){
            nuevosErrores.integrante = "Seleccione un integrante"
        }

        if(!data.especialidad){
            nuevosErrores.especialidad = "Seleccione una especialidad"
        }

        if(Object.keys(nuevosErrores).length >0){
            setErrores(nuevosErrores)
            return;
        }

        setPaso(2);
        setResultadosBusqueda([])
    }

    const handleBuscar = async (event) => {
        event.preventDefault()

        //Llamada a la api
    }

    const cancelar = () => {
        setModalCancelar(true)
    }

    const handleCancelar = () => {
        setModalCancelar(false)
        navigate("/consultar-turnos")
    }

    const handleSeleccionarFechaHora = (unTurno) => {
        setTurnoSeleccionado(unTurno);
        setModalFechaHora(true);
    }

    const handleFechaHoraChange = (event) => {
        const { name, value } = event.target;
        if(!turnoSeleccionado){
            return;
        }

        if(name==='fecha'){
            const disponibilidadFecha = turnoSeleccionado.disponibilidad.find(dia => dia.fecha ===value);
            setTurnoSeleccionado(prev => ({...prev, fechaSeleccionada: value, horaSeleccionada: disponibilidadFecha ? disponibilidadFecha.hora : null}))
        }else if(name==='hora'){
            setTurnoSeleccionado(prev => ({...prev, horaSeleccionada: value}))
        }
    }


    const handleConfirmarTurno = () => {
        console.log('Turno Confirmado: ', turnoSeleccionado);
        setModalFechaHora(false);
        navigate("/consultar-turnos");

        //llamada api para guardar el turno
    }

    const handleVolverBusqueda = () => {
        setResultadosBusqueda([])
        setPaso(1);
    }

    const camposCardTurno = [
       { campo: "Dirección", propiedad: "direccion" },
       { campo: "Teléfonos", propiedad: "telefonos" },
       { campo: "Especialidad", propiedad: "especialidad" },
       { campo: "Tipo de prestador", propiedad: "tipoPrestador" },
   ];

   const getContenidoExtra = (unTurno) => (
    <>
        <p>Primer turno libre: {unTurno.primerTurnoLibre || 'N/D'}</p>
        <Button
            variant="warning"
            onClick={() => handleSeleccionarFechaHora(unTurno)}
            
        >
            Seleccionar fecha y hora
        </Button>
    </>
   )

   const fechasDisponibles = turnoSeleccionado && turnoSeleccionado.disponibilidad ? [...new Set(turnoSeleccionado.disponibilidad.map(dia => dia.fecha))] : []

   const horasDisponiblesModal = turnoSeleccionado && turnoSeleccionado.disponibilidad ? turnoSeleccionado.disponibilidad.filter(dia => dia.fecha ===turnoSeleccionado.fechaSeleccionada).map(dia => dia.hora) : []


   return (
    <div className={styles.fondo}>
        <div className={styles.container}>
            <div className={styles.card}>
                <h4 className={styles.titulo}>Solicitud de Turno</h4>

                {paso ===1 && (
                    <Form onSubmit={handleSiguiente}>
                        <Form.Group className="mb-3">
                            <Form.Label>Integrante <span className={styles.obligatorio}>*</span></Form.Label>
                            <Form.Select
                                name="integrante"
                                value={data.integrante}
                                onChange={handleChange}
                                isInvalid={!!errores.integrante}
                            >
                                <option value="">Seleccione un integrante</option>
                                {datosFormulario.integrantes.map(i => <option key={i} value={i}>{i}</option>)}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errores.integrante}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Especialidad <span className={styles.obligatorio}>*</span></Form.Label>
                            <Form.Select
                                name="especialidad"
                                value={data.especialidad}
                                onChange={handleChange}
                                isInvalid={!!errores.especialidad}
                            >
                                <option value="">Seleccione una especialidad</option>
                                {datosFormulario.especialidades.map(e => <option key={e} value={e}>{e}</option>)}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errores.especialidad}</Form.Control.Feedback>
                        </Form.Group>

                        <div className={styles.botones}>
                            <Button type="button" onClick={cancelar} className={styles.botonCancelar}>Cancelar</Button>
                            <Button type="submit" className={styles.botonSiguiente}>Siguiente</Button>
                        </div>
                    </Form>
                )}

                {paso===2 && (
                    <Form onSubmit={handleBuscar}>
                        <Form.Group className="mb-3">
                            <Form.Label>Médico (Opcional)</Form.Label>
                            <Form.Select
                                name="medico"
                                value={data.medico}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione un médico</option>
                                {datosFormulario.medicos.map(m => <option key={m} value={m}>{m}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Lugar de Atención (Opcional)</Form.Label>
                            <Form.Select
                                name="lugarDeAtencion"
                                value={data.lugarDeAtencion}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione un lugar</option>
                                {datosFormulario.lugares.map(l => <option key={l} value={l}>{l}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <div className={styles.datos}>
                            <p><strong>Integrante: </strong>{data.integrante}</p>
                            <p><strong>Especialidad: </strong>{data.especialidad}</p>
                        </div>

                        <div className={styles.botones}>
                            <Button variant="secondary" type="button" onClick={()=>setPaso(1)}>Anterior</Button>
                            <Button type="submit" className={styles.botonBuscar}>Buscar</Button>
                        </div>
                    </Form>
                )}
            </div>

            {paso===3 && (
                <div className={styles.resultadosContainer}>
                    <div className={styles.botonVolverContainer}>
                        <Button variant="secondary" onClick={handleVolverBusqueda}>Volver a la búsqueda</Button>
                    </div>

                    <Row>
                        {resultadosBusqueda.length > 0 ? (
                            resultadosBusqueda.map((turno) => (
                                <Col md={6} key={turno.id} className="mb-4">
                                    <CardDinamica
                                        data={turno}
                                        header={`Turno con ${turno.profesional}`}
                                        color={styles.headerInfo}
                                        camposCard={camposCardTurno}
                                        tieneContenidoExtra={getContenidoExtra(turno)}
                                    />
                                </Col>
                            ))
                        ) : (
                            <p className="text-center">No se encontraron turnos disponibles con los criterios seleccionados.</p>
                        )}
                    </Row>
                </div>
            )}

            <Modal show={modalFechaHora} onHide={() => setModalFechaHora(false)} centered>
                {turnoSeleccionado && (
                    <>
                    <Modal.Header closeButton className={styles.modalHeader}>
                        <Modal.Title className={styles.modalTitle}>{turnoSeleccionado.profesional}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p><strong>Especialidad: </strong>{turnoSeleccionado.especialidad}</p>
                        <p><strong>Dirección: </strong>{turnoSeleccionado.direccion}</p>
                        <hr />
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Fecha</Form.Label>
                                        <Form.Select
                                            name="fecha"
                                            value={turnoSeleccionado.fechaSeleccionada || ''}
                                            onChange={handleFechaHoraChange}
                                            required
                                        >
                                            <option value="">Seleccione...</option>
                                            {fechasDisponibles.map(fecha => (<option key={fecha} value={fecha}>{fecha}</option>))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Hora</Form.Label>
                                        <Form.Select
                                            name="hora"
                                            value={turnoSeleccionado.horaSeleccionada || ''}
                                            onChange={handleFechaHoraChange}
                                            required
                                            disabled={!turnoSeleccionado.fechaSeleccionada}
                                        >
                                            <option value="">Seleccione...</option>
                                            {horasDisponiblesModal.map(hora => (<option key={hora} value={hora}>{hora}</option>))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <p className="mt-3 text-success">Turno preseleccionado: {turnoSeleccionado.fechaSeleccionada} a las {turnoSeleccionado.horaSeleccionada}</p>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setModalFechaHora(false)}>Cancelar</Button>
                        <Button variant="success" onClick={handleConfirmarTurno} disabled={!turnoSeleccionado.fechaSeleccionada || turnoSeleccionado.horaSeleccionada}>Confirmar Turno</Button>
                    </Modal.Footer>
                    </>
                )}
            </Modal>

            <Modal className={styles.modal} show={modalCancelar} onHide={() => setModalCancelar(false)} centered>
                <Modal.Body>
                    ¿Estás seguro que deseas cancelar la solicitud del turno?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalCancelar(false)} style={{ backgroundColor: '#24979B', border: 'none' }}>Volver</Button>
                    <Button onClick={handleCancelar} style={{ backgroundColor: '#E64F4F', border: 'none' }}>Continuar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
   )

   
}

export default FormularioTurnos;