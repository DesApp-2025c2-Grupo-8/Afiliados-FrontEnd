import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap"
import styles from './FormularioTurnos.module.css';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import { useNavigate } from "react-router-dom";
import usuarios from "../../db/usuarios";

import { useAfiliadoDatos } from '../../context/AfiliadoDatos';



const formatoFecha = (fechaISO) => {
    if (!fechaISO) return '';
    try {
        const [anio, mes, dia] = fechaISO.split('-')
        if (anio && mes && dia) {
            return `${dia}-${mes}-${anio}`
        }
        return fechaISO; 
    } catch (e) {
        return fechaISO;
    }
}


const datosFormInicial = {
    especialidades: [],
    medicos: [],
    lugares: [],
}


const FormularioTurnos = () => {
    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();
    const numeroAfiliado = dataAfiliado?.numeroAfiliado;
    
    const esTitular = dataAfiliado?.rol === 'TITULAR';
    
    
    const [datosFormulario, setDatosFormulario] = useState(datosFormInicial)
    
    
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
    const [modalConfirmar, setModalConfirmar] = useState(false)
    const [errores, setErrores] = useState({});
    const [turnoConfirmado, setTurnoConfirmado] = useState(null);

    const navigate = useNavigate()
    
    const fetchOpciones = async () => {
        try {
            const response = await fetch("http://localhost:3000/turnos/opciones")
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const text = await response.text();
            if (!text) {
                throw new Error("Respuesta vacía del servidor.");
            }
            
            const result = JSON.parse(text);
            setDatosFormulario(result)
        } catch (error) {
            console.error("Error al cargar las opciones", error)
            setDatosFormulario(datosFormInicial);
        }
    }
    
    useEffect(() => {
        document.title = 'Solicitud de Turno - Medicina Integral'
        if (!dataAfiliado) {
                    navigate("/login");
                }

        if (numeroAfiliado !== data.numeroAfiliado) {
            setData(prev => ({ ...prev, numeroAfiliado: numeroAfiliado }))
        }

        fetchOpciones()

    }, [numeroAfiliado, data.numeroAfiliado])
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }))
        if (value) {
            setErrores(prev => ({ ...prev, [name]: "" }))
        }
    }
    
    const handleSiguiente = (event) => {
        event.preventDefault();
        const nuevosErrores = {}

        if (!data.integrante) { nuevosErrores.integrante = "Seleccione un integrante" }
        if (!data.especialidad) { nuevosErrores.especialidad = "Seleccione una especialidad" }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores)
            return;
        }
        setPaso(2);
    }

    const handleBuscar = async (event) => {
        event.preventDefault()

        const nuevosErrores = {}
        if (!data.integrante) { nuevosErrores.integrante = "Seleccione un integrante" }
        if (!data.especialidad) { nuevosErrores.especialidad = "Seleccione una especialidad" }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores)
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/turnos/buscar", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    especialidad: data.especialidad,
                    medico: data.medico || null,
                    lugarDeAtencion: data.lugarDeAtencion || null,
                })
            })

            if (!response.ok) {
                if (response.status === 404) {
                    setResultadosBusqueda([]);
                    setPaso(3);
                    return;
                }
                await response.json().catch(() => ({ message: 'Error' }));
            }
            const resultadosFiltrados = await response.json()
            setResultadosBusqueda(resultadosFiltrados)
            setPaso(3)
        } catch (error) {
            console.error('Error: ', error)
            setResultadosBusqueda([])
            setPaso(3)
        }
    }

    const cancelar = () => {
        setModalCancelar(true)
    }

    const handleCancelar = () => {
        setModalCancelar(false)
        navigate("/consultar-turnos")
    }

    const handleSeleccionarFechaHora = (unTurno) => {
        const idTurno = unTurno._id || unTurno.profesional
        if (!idTurno) { return }

        const ubicacionArray = Array.isArray(unTurno.direccion) ? unTurno.direccion : [];
        const disponibilidadReal = Array.isArray(unTurno.disponibilidad) ? unTurno.disponibilidad : [];

        const direccionString =
            ubicacionArray.length > 0
                ? `${ubicacionArray[0].direccion}, ${ubicacionArray[0].partido}`
                : 'Dirección no disponible';

        const ubicacionParaBackend =
            ubicacionArray.length > 0
                ? {
                    partido: ubicacionArray[0].partido,
                    direccion: ubicacionArray[0].direccion
                }
                : { partido: 'Desconocido', direccion: 'Desconocida' };

        const primerDia = disponibilidadReal.find(d => d.hora.length > 0);
        const fechaInicial = primerDia?.fecha || null;
        const horaInicial = primerDia?.hora[0] || null;

        setTurnoSeleccionado({
            ...unTurno,
            id: idTurno,
            disponibilidad: disponibilidadReal,
            direccion: direccionString,
            dataUbicacionBackend: ubicacionParaBackend,
            fechaSeleccionada: fechaInicial,
            horaSeleccionada: horaInicial
        });
        setModalFechaHora(true);
    }

    const handleFechaHoraChange = (event) => {
        const { name, value } = event.target;
        if (!turnoSeleccionado) { return; }

        let horaSeleccionada = turnoSeleccionado.horaSeleccionada;
        let fechaSeleccionada = turnoSeleccionado.fechaSeleccionada

        if (name === 'fecha') {
            const disponibilidadFecha = turnoSeleccionado.disponibilidad.find(dia => dia.fecha === value);
            fechaSeleccionada = value
            horaSeleccionada = disponibilidadFecha && disponibilidadFecha.hora.length > 0 ? disponibilidadFecha.hora[0] : null
        } else if (name === 'hora') {
            horaSeleccionada = value
        }

        setTurnoSeleccionado(prev => ({
            ...prev,
            fechaSeleccionada: fechaSeleccionada,
            horaSeleccionada: horaSeleccionada
        }))
    }


    const handleConfirmarTurno = async () => {
        if (!turnoSeleccionado?.fechaSeleccionada || !turnoSeleccionado.horaSeleccionada) return;

        const turnoParaGuardar = {
            numeroAfiliado: Number(data.numeroAfiliado),
            integrante: data.integrante,
            especialidad: data.especialidad,
            medico: turnoSeleccionado.profesional,
            lugarDeAtencion: [turnoSeleccionado.dataUbicacionBackend],
            fecha: turnoSeleccionado.fechaSeleccionada,
            hora: turnoSeleccionado.horaSeleccionada,
        }

        try {
            const response = await fetch("http://localhost:3000/turnos/confirmar", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(turnoParaGuardar)
            })
            const result = await response.json()

            if(response.ok){
                setTurnoConfirmado({
                    fecha: turnoParaGuardar.fecha,
                    hora: turnoParaGuardar.hora,
                    medico: turnoParaGuardar.medico,
                }); 
                
                setModalFechaHora(false)
                setModalConfirmar(true)
            } else {
                console.error("Error al confirmar turno", result);
            }
        } catch (error) {
            console.error("error en la solicitud: ", error)
        }
    }

    const handleConfirmacionFinal = () => {
        setModalConfirmar(false)
        navigate("/consultar-turnos");
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

    const getContenidoExtra = (unTurno) => {
    const keyBase = unTurno.id || unTurno._id || unTurno.profesional
    const primerTurnoLibre = (unTurno.disponibilidad && unTurno.disponibilidad.length > 0)
        ? `${formatoFecha(unTurno.disponibilidad[0].fecha)} - ${unTurno.disponibilidad[0].hora[0]}`
        : 'N/D';
        
    return(
        <>
        <p key={`${keyBase}-info`}>Primer turno libre: {primerTurnoLibre}</p>
        <Button
            key={`${keyBase}-btn`}
            variant="warning"
            onClick={() => handleSeleccionarFechaHora(unTurno)}
            disabled={!unTurno.disponibilidad || unTurno.disponibilidad.length === 0}
        >
            Seleccionar fecha y hora
        </Button>
    </>
    )
   }

   const horasDisponiblesModal = (turnoSeleccionado?.disponibilidad || [])
       .filter((d) => d.fecha === turnoSeleccionado?.fechaSeleccionada)
       .flatMap((d) => d.hora) || [];
   const lugaresUnicos = datosFormulario.lugares || [];

   return (
    <div className={styles.fondo}>
        <div className={styles.container}>
            <div className={`${styles.card} ${paso===3 ? styles.cardPaso3 : ""}`}>
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
                                {usuarios.map((usuario) => {
                                        return usuario.numeroAfiliado.toString().includes( esTitular ? data.numeroAfiliado.toString().slice(0,5) : numeroAfiliado.toString()) ? (
                                            <option key={usuario.numeroAfiliado} value={`${usuario.nombre} ${usuario.apellido}`}>{`${usuario.nombre} ${usuario.apellido}`}</option>
                                        ): null
                                    })}
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
                                {datosFormulario.especialidades.map((especialidad) => (
                                    <option key={especialidad} value={especialidad}>
                                        {especialidad}
                                    </option>
                                ))}
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
                                {datosFormulario.medicos.map((medico) => (
                                    <option key={medico} value={medico}>
                                        {medico}
                                    </option>
                                ))}
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
                                {
                                    lugaresUnicos.map((partido) => (
                                        <option key={partido} value={partido}>
                                            {partido}
                                        </option>
                                    ))}
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
                                    {
                                        lugaresUnicos.map((partido) => (
                                            <option key={partido} value={partido}>
                                                {partido}
                                            </option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>

                            <div className={styles.datos}>
                                <p><strong>Integrante: </strong>{data.integrante}</p>
                                <p><strong>Especialidad: </strong>{data.especialidad}</p>
                            </div>

                            <div className={styles.botones}>
                                <Button variant="secondary" type="button" onClick={() => setPaso(1)}>Anterior</Button>
                                <Button type="submit" className={styles.botonBuscar}>Buscar</Button>
                            </div>
                        </Form>
                    )}
                </div>
                {paso === 3 && (
                    <div className={styles.resultadosContainer}>
                        <div className={styles.botonVolverContainer}>
                            <Button variant="secondary" onClick={handleVolverBusqueda}>Volver a la búsqueda</Button>
                        </div>
                        <div className={styles.cardsContainer}>
                            {resultadosBusqueda.length > 0 ? (
                                resultadosBusqueda.map((turno) => {

                                    const ubicacionArray = Array.isArray(turno.direccion) ? turno.direccion : [];
                                    const direccionString =
                                        ubicacionArray.length > 0
                                            ? `${ubicacionArray[0].direccion}, ${ubicacionArray[0].partido}`
                                            : 'Dirección no disponible';

                                    const turnoRender = {
                                        ...turno,
                                        direccion: direccionString,
                                        telefonos: String(turno.telefonos)
                                    };

                                    return (
                                        <div key={turno.id || turno._id || turno.profesional} className="mb-4" style={{ maxWidth: '450px', width: '100%' }}>
                                            <CardDinamica
                                                data={turnoRender}
                                                header={`Turno en ${turnoRender.direccion}`}
                                                color={'aceptada'}
                                                camposCard={camposCardTurno}
                                                tieneContenidoExtra={getContenidoExtra(turnoRender)}
                                            />
                                        </div>
                                    )
                                })
                            ) : (<p className="text-center">No se encontraron turnos disponibles con los criterios seleccionados.</p>)}
                        </div>
                    </div>
                    <div className={styles.cardsContainer}>
                        {resultadosBusqueda.length > 0 ? (
                            resultadosBusqueda.map((turno) => {

                                const ubicacionArray = Array.isArray(turno.direccion) ? turno.direccion : [];
                                const direccionString = 
                                    ubicacionArray.length > 0
                                    ? `${ubicacionArray[0].direccion}, ${ubicacionArray[0].partido}`
                                    : 'Dirección no disponible';

                                const turnoRender = {
                                    ...turno,
                                    direccion: direccionString, 
                                    telefonos: String(turno.telefonos) 
                                };

                                return (
                                    <div key={turno.id || turno._id || turno.profesional} className={`${styles.cardResultado} mb-4`}>
                                        <CardDinamica
                                            data={turnoRender} 
                                            header={`Turno en ${turnoRender.direccion}`}
                                            color={'aceptada'}
                                            camposCard={camposCardTurno}
                                            tieneContenidoExtra={getContenidoExtra(turnoRender)}
                                        />
                                    </div>
                                )
                            })
                        ):(<p className="text-center">No se encontraron turnos disponibles con los criterios seleccionados.</p>)}
                    </div>
                </div>
            )}
            </div>
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
                                            {turnoSeleccionado.disponibilidad
                                                .filter(d => d.hora.length > 0)
                                                .map(d => (
                                                    <option key={d.fecha} value={d.fecha}>
                                                        {formatoFecha(d.fecha)}
                                                    </option>
                                                ))
                                            }
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
                            <p className="mt-3 text-success">Turno preseleccionado: **{formatoFecha(turnoSeleccionado.fechaSeleccionada)}** a las **{turnoSeleccionado.horaSeleccionada}**</p>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalCancelar(false)} style={{ backgroundColor: '#24979B', border: 'none' }}>Volver</Button>
                        <Button onClick={handleCancelar} style={{ backgroundColor: '#E64F4F', border: 'none' }}>Continuar</Button>
                    </Modal.Footer>
                    </>
                )}
            </Modal>
            <Modal className={styles.modal} show={modalConfirmar} onHide={() => setModalConfirmar(false)} centered>
                <Modal.Body> 
                    El turno ha sido solicitado correctamente. <br /> 
                    {turnoConfirmado && (
                        <>
                            Se ha confirmado el turno para el **día {formatoFecha(turnoConfirmado.fecha)}** a las **{turnoConfirmado.hora}**.
                            <br/>
                            Con el Dr/a. **{turnoConfirmado.medico}**.
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer><Button onClick={handleConfirmacionFinal} style={{backgroundColor: '#24979B', border: 'none'}}>Aceptar </Button></Modal.Footer>
            </Modal>

            <Modal className={styles.modal} show={modalCancelar} onHide={() => setModalCancelar(false)} centered>
                <Modal.Body>¿Estás seguro que deseas cancelar la solicitud del turno?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalCancelar(false)} style={{ backgroundColor: '#24979B', border: 'none' }}>Volver</Button>
                    <Button onClick={handleCancelar} style={{ backgroundColor: '#E64F4F', border: 'none' }}>Continuar</Button>
                </Modal.Footer>
            </Modal>
        </div>
   )
}

export default FormularioTurnos;