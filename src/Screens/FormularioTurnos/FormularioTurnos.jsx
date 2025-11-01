import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap"
import styles from './FormularioTurnos.module.css';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import { useNavigate } from "react-router-dom";
import usuarios from "../../db/usuarios";
import { useNumeroAfiliado } from "../../context/NumeroAfiliado";


const datosFormInicial = {
    integrantes: [],
    especialidades: [],
    medicos: [],
    lugares: [],
}


const FormularioTurnos = () => {

    const { numeroAfiliado } = useNumeroAfiliado()
    const esTitular = numeroAfiliado.toString().endsWith("01")


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
    const [modalConfirmar, setModalConfirmar] = useState(false)
    const [errores, setErrores] = useState({});
    const [nroTurno, setNroTurno] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Solicitud de Turno - Medicina Integral'

        if(numeroAfiliado !== data.numeroAfiliado){
            setData(prev =>({...prev, numeroAfiliado: numeroAfiliado}))
        }

        const fetchOpciones = async() => {
            try {
                const response = await fetch("http://localhost:3000/turnos/opciones")
                
                const result = await response.json()
                setDatosFormulario(result)
            } catch (error) {
                console.error("Error al cargar las opciones", error)
            }
        }
        fetchOpciones()
    }, [numeroAfiliado, data.numeroAfiliado])

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

        if(!data.integrante){nuevosErrores.integrante = "Seleccione un integrante"}
        if(!data.especialidad){nuevosErrores.especialidad = "Seleccione una especialidad"}

        if(Object.keys(nuevosErrores).length >0){
            setErrores(nuevosErrores)
            return;
        }
        setPaso(2);
        //setResultadosBusqueda([])
    }

    const handleBuscar = async (event) => {
        event.preventDefault()

        const nuevosErrores = {}
        if(!data.integrante){nuevosErrores.integrante = "Seleccione un integrante"}
        if(!data.especialidad){nuevosErrores.especialidad = "Seleccione una especialidad"}

        if(Object.keys(nuevosErrores).length >0){
            setErrores(nuevosErrores)
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/turnos/buscar", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    especialidad: data.especialidad,
                    medico: data.medico || null,
                    lugarDeAtencion: data.lugarDeAtencion || null,
                })
            })
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
        if(!idTurno){ return }
        
        setTurnoSeleccionado({
            ...unTurno,
            id: idTurno,
            fechaSeleccionada: null,
            horaSeleccionada: null
        });
        setModalFechaHora(true);
    }

    const handleFechaHoraChange = (event) => {
        const { name, value } = event.target;
        if(!turnoSeleccionado){return;}

        let horaSeleccionada = turnoSeleccionado.horaSeleccionada;
        let fechaSeleccionada = turnoSeleccionado.fechaSeleccionada

        if(name==='fecha'){
            const disponibilidadFecha = turnoSeleccionado.disponibilidad.find(dia => dia.fecha ===value);
            fechaSeleccionada = value
            horaSeleccionada = disponibilidadFecha ? disponibilidadFecha.hora[0] : null
        }else if(name==='hora'){
            horaSeleccionada = value
        }

        setTurnoSeleccionado(prev =>({
            ...prev,
            fechaSeleccionada: fechaSeleccionada,
            horaSeleccionada: horaSeleccionada
        }))
    }


    const handleConfirmarTurno = async() => {
        if(!turnoSeleccionado?.fechaSeleccionada || !turnoSeleccionado.horaSeleccionada) return;
        const turnoParaGuardar = {
            numeroAfiliado: data.numeroAfiliado,
            integrante: data.integrante,
            especialidad: data.especialidad,
            medico: turnoSeleccionado.profesional,
            lugarDeAtencion: turnoSeleccionado.direccion,
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
                setNroTurno(result.numeroOrden)
                setModalFechaHora(false)
                setModalConfirmar(true)
            }
        } catch (error) {
            console.error("error: ", error)
        }
    
        //navigate("/consultar-turnos");

    }

    const handleConfirmacionFinal = () =>{
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
    return(
        <>
        <p key={`${keyBase}-info`}>Primer turno libre: {unTurno.primerTurnoLibre || 'N/D'}</p>
        <Button
            key={`${keyBase}-btn`}
            variant="warning"
            onClick={() => handleSeleccionarFechaHora(unTurno)}
            
        >
            Seleccionar fecha y hora
        </Button>
    </>
    )
   }

   //const fechasDisponibles = turnoSeleccionado && turnoSeleccionado.disponibilidad ? [...new Set(turnoSeleccionado.disponibilidad.map(dia => dia.fecha))] : []

   const horasDisponiblesModal = turnoSeleccionado?.disponibilidad?.filter((d) => d.fecha === turnoSeleccionado.fechaSeleccionada).flatMap((d) => d.hora) || []


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
                                <option key="clinico" value="Clínico">Clínico</option>
                                <option key="cirujano" value="Cirujano">Cirujano</option>
                                <option key="neurologo" value="Neurólogo">Neurólogo</option>
                                <option key="odontologo" value="Odontólogo">Odontólogo</option>
                                <option key="traumatologo" value="Traumatólogo">Traumatólogo</option>
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
                                <option value="Dr. Juan"> Dr. Juan</option>
                                <option value="Dr. Pepe"> Dr. Pepe</option>
                                <option value="Dra. Lena"> Dra. Lena</option>
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
                                <option value="Sanatorio">Sanatorio</option>
                                <option value="Clínica Médica">Clínica Médica</option>
                                <option value="Consultorio Privado">Consultorio Privado</option>
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
                    <div className={styles.cardsContainer}>
                        {resultadosBusqueda.length > 0 ? (
                            resultadosBusqueda.map((turno) => (
                                <div key={turno.id || turno._id || turno.profesional} className="mb-4" style={{maxWidth: '450px', width: '100%'}}>
                                    <CardDinamica
                                        data={turno}
                                        header={`Turno con ${turno.profesional}`}
                                        color={'aceptada'}
                                        camposCard={camposCardTurno}
                                        tieneContenidoExtra={getContenidoExtra(turno)}
                                    />
                                </div>
                            ))
                        ):(<p className="text-center">No se encontraron turnos disponibles con los criterios seleccionados.</p>)}
                    </div>
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
                                            {turnoSeleccionado.disponibilidad.filter(d => d.hora.length > 0).map(d => (<option key={d.fecha} value={d.fecha}>{d.fecha}</option>))}
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
                        <Button 
                            variant="success"
                            onClick={handleConfirmarTurno} 
                            disabled={!turnoSeleccionado.fechaSeleccionada || !turnoSeleccionado.horaSeleccionada}
                        > Confirmar Turno
                        </Button>
                    </Modal.Footer>
                    </>
                )}
            </Modal>

            <Modal className={styles.modal} show={modalConfirmar} onHide={() => setModalConfirmar(false)} centered>
                <Modal.Body> El turno ha sido solicitado correctamente. <br /> Nro. Turno: <strong>{nroTurno}</strong></Modal.Body>
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
    </div>
   )

   
}

export default FormularioTurnos;