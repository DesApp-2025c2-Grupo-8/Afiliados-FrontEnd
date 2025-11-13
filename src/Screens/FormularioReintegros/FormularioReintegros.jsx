import { useState, useEffect } from "react";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";
import styles from './FormularioReintegros.module.css';
import { useNavigate, Link } from "react-router-dom";
// import usuarios from "../../db/usuarios";
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";

const FormularioReintegros = () => {
    useEffect(() => {
        document.title = 'Solicitar Reintegro - Medicina Integral'

        fetch('http://localhost:3000/prestadores')
            .then(response => response.json())
            .then(data => {
                const medicos = data.filter(m => m.tipo === 'Médico');
                setPrestadores(medicos);
            })
            .catch(error => console.error('Error:', error))
    }, []);

    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();
    const numeroAfiliado = dataAfiliado.numeroAfiliado;
    const esTitular = dataAfiliado.rol === "TITULAR";

    const [prestadores, setPrestadores] = useState([])

    const [data, setData] = useState({
        fechaDeCarga: new Date().toISOString(),
        fechaDePrestacion: "",
        numeroAfiliado: numeroAfiliado,
        integrante: "",
        medico: "",
        especialidad: "",
        lugarDeAtencion: "",
        observaciones: "",
        datosFactura: {
            cuit: "",
            fechaDeFactura: "",
            monto: "",
            personaFacturada: "",
            medioDePago: "",
            cbu: ""
        }
    })

    const [modalConfirmar, setModalConfirmar] = useState(false)
    const [modalCancelar, setModalCancelar] = useState(false)
    const [nroOrden, setNroOrden] = useState(null)
    const [errores, setErrores] = useState([])
    const [paso, setPaso] = useState(1);

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setData(
            campos => ({
                ...campos, // mantiene los valores anteriores de data, ejemplo: numeroAfiliado
                [name]: value
            })
        )
    }

    const handleChangeFactura = (event) => {
        const { name, value } = event.target
        setData(prev => ({
            ...prev,
            datosFactura: {
                ...prev.datosFactura,
                [name]: value
            }
        }))
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        setPaso(2)
    }

    const confirmar = async (event) => {
        event.preventDefault()
        // console.log(data);
        setModalConfirmar(true);
        try {
            const dataToSend = {
                ...data
            };
            const response = await fetch('http://localhost:3000/reintegros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
            const result = await response.json();
            setNroOrden(result.numeroOrden);
            console.log("Resultado:", result);
            result.error ? setErrores(result.message) : setModalConfirmar(true);
        } catch (error) {
            console.log("Error:", error);
        }   
    }

    const cancelar = () => {
        setModalCancelar(true)
    }

    const handleCancelar = () => {
        setModalCancelar(false)
        navigate("/consultar-reintegros")
    }

    const handleConfirmar = () => {
        console.log("Enviando...");
        setModalConfirmar(false)
        navigate("/consultar-reintegros")
    }

    const especialidadesIniciales = [...new Set(prestadores.map(p => p.especialidad))];

    const medicosFiltrados = prestadores
        .filter(p => p.especialidad === data.especialidad)
        .map(p => p.nombre);

    const ubicacionesDelMedico = prestadores
        .find(p => p.nombre === data.medico)?.ubicacion || [];


    return (
        <div className={styles.fondo}>
            
            <div className={styles.container}>
                <div className={styles.card}>
                    <h4 className={styles.titulo}>Solicitud de Reintegro</h4>

                    {paso === 1 && (
                        <Form onSubmit={handleSubmit} >
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
                                console.log("dataAfiliado.grupoFamiliar", dataAfiliado.grupoFamiliar)
                            }
                            {                               
                            dataAfiliado.grupoFamiliar.map((usuario) => 
                                    //el return tiene que devolver todos los afiliados si el afiliado es titular (incluyendose) si no, solo si mismos
                                    esTitular ? <option key={usuario.numeroAfiliado} value={`${usuario.nombre} ${usuario.apellido}`}>{`${usuario.nombre} ${usuario.apellido}`}</option> : 
                                    ""
                                )}
                                <option key={dataAfiliado.numeroAfiliado} value={`${dataAfiliado.nombre} ${dataAfiliado.apellido}`}>{`${dataAfiliado.nombre} ${dataAfiliado.apellido}`}</option>
                                </Form.Select>
                                <span className={styles.oblgatorio}>{errores.includes("integrante should not be empty") ? "Seleccione un integrante" : ""}</span>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Fecha de la prestación<span className={styles.oblgatorio}>*</span></Form.Label>
                                <Form.Control
                                    name='fechaDePrestacion'
                                    type='date'
                                    value={data.fechaDePrestacion}
                                    onChange={handleChange}
                                    required
                                >

                                </Form.Control>
                                <span className={styles.oblgatorio}>{errores.includes("fechaDePrestacion should not be empty") ? "Seleccione una fecha de prestación" : ""}</span>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} md={6} controlId="especialidad">
                                   <Form.Label>Especialidad<span className={styles.oblgatorio}>*</span></Form.Label>
                                    <Form.Select
                                        name="especialidad"
                                        value={data.especialidad}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleccione una especialidad</option>
                                        {especialidadesIniciales.map((unaEspecialidad, idx) => (
                                            <option key={idx} value={unaEspecialidad}>{unaEspecialidad}</option>
                                        ))}

                                    </Form.Select>
                                    <span className={styles.oblgatorio}>{errores.includes("especialidad should not be empty") ? "Seleccione una especialidad" : ""}</span>
                                </Form.Group>
                                <Form.Group as={Col} md={6} controlId="medico">
                                     <Form.Label>Médico<span className={styles.oblgatorio}>*</span></Form.Label>
                                    <Form.Select
                                        name="medico"
                                        value={data.medico}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleccione un médico</option>
                                        {medicosFiltrados.map((unMedico, idx) => (
                                            <option key={idx} value={unMedico}>{unMedico}</option>
                                        ))}

                                    </Form.Select>
                                    <span className={styles.oblgatorio}>{errores.includes("medico should not be empty") ? "Ingrese un médico" : ""}</span>
                                </Form.Group>
                            </Row>

                            <Form.Group>
                                <Form.Label>Lugar de atención<span className={styles.oblgatorio}>*</span></Form.Label>
                                <Form.Select
                                    name="lugarDeAtencion"
                                    value={data.lugarDeAtencion}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione el lugar de atención</option>
                                    {ubicacionesDelMedico.map((ubicacion, idx) => (
                                        <option key={idx} value={`${ubicacion.partido} - ${ubicacion.direccion}`}>
                                            {ubicacion.partido} - {ubicacion.direccion}
                                        </option>
                                    ))}

                                </Form.Select>
                                <span className={styles.oblgatorio}>{errores.includes("lugarDeAtencion should not be empty") ? "Seleccione un lugar de atención" : ""}</span>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="observaciones"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <div className={styles.botones}>
                                <Button type="button" onClick={cancelar} style={{backgroundColor: '#E64F4F', border: 'none'}}>Cancelar</Button>
                                <Button type="submit" style={{ backgroundColor: '#24979B', border: 'none' }}>Siguiente</Button>
                            </div>
                        </Form>
                    )}

                    {paso === 2 && (
                        <>
                            <h4 className={styles.subtitulo}>- Datos de facturación -</h4>
                            <Form onSubmit={confirmar}>
                                <Form.Group>
                                    <Form.Label>Fecha de la factura<span className={styles.oblgatorio}>*</span></Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="fechaDeFactura"
                                        value={data.datosFactura.fechaDeFactura}
                                        onChange={handleChangeFactura}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>CUIT<span className={styles.oblgatorio}>*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cuit"
                                        min="0"
                                        value={data.datosFactura.cuit}
                                        onChange={handleChangeFactura}
                                        required
                                    />
                                    <span className={styles.oblgatorio}>{errores.includes("monto should not be empty") ? "Ingrese un monto" : ""}</span>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Monto a reintegrar<span className={styles.oblgatorio}>*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="monto"
                                        min="0"
                                        value={data.datosFactura.monto}
                                        onChange={handleChangeFactura}
                                        required
                                    />
                                    <span className={styles.oblgatorio}>{errores.includes("monto should not be empty") ? "Ingrese un monto" : ""}</span>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Persona facturada<span className={styles.oblgatorio}>*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="personaFacturada"
                                        value={data.datosFactura.personaFacturada}
                                        onChange={handleChangeFactura}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Forma de pago<span className={styles.oblgatorio}>*</span></Form.Label>
                                    <Form.Select
                                        name="medioDePago"
                                        value={data.datosFactura.medioDePago}
                                        onChange={handleChangeFactura}
                                        required
                                    >
                                        <option value="">Seleccione una forma de pago</option>
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Transferencia">Transferencia</option>
                                    </Form.Select>
                                </Form.Group>

                                {data.datosFactura.medioDePago === "Transferencia" && (
                                    <Form.Group>
                                        <Form.Label>CBU<span className={styles.oblgatorio}>*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="cbu"
                                                value={data.datosFactura.cbu}
                                                onChange={handleChangeFactura}
                                                required
                                            />
                                    </Form.Group>
                                )}

                                <div className={styles.botones}>
                                    <Button variant="secondary" onClick={() => setPaso(1)}>Volver</Button>
                                    <Button type="submit" style={{ backgroundColor: '#24979B', border: 'none' }}>Finalizar</Button>
                                </div>
                            </Form>
                        </>
                    )}

                </div>
                <Modal className={styles.modal} show={modalConfirmar} onHide={() => setModalConfirmar(false)} centered>
                    <Modal.Body>
                        El reintegro ha sido solicitado correctamente. <br />
                        Nro.Orden: {nroOrden}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleConfirmar} style={{ backgroundColor: '#24979B', border: 'none' }}>Aceptar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal className={styles.modal} show={modalCancelar} onHide={() => setModalCancelar(false)} centered>
                    <Modal.Body>
                        ¿Estas seguro que deseas cancelar la solicitud del reintegro?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalCancelar(false)} style={{ backgroundColor: '#24979B', border: 'none' }}>Volver</Button>
                        <Button onClick={handleCancelar} style={{ backgroundColor: '#E64F4F', border: 'none' }}>Continuar</Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
};

export default FormularioReintegros;