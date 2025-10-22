import { useState, useEffect } from "react"
import { Form, Col, Row, Modal, Button } from "react-bootstrap"
import FormGenerico from "../../components/FormGenerico/FormGenerico"
import styles from './FormularioReintegros.module.css'
import { useNavigate, Link } from "react-router-dom"
import usuarios from "../../db/usuarios"
import {useNumeroAfiliado} from "../../context/NumeroAfiliado";

const FormularioReintegros = () => {
    useEffect(() => {
        document.title = 'Solicitar Reintegro - Medicina Integral'
    }, []);

    const { numeroAfiliado, setNumeroAfiliado } = useNumeroAfiliado(); 
    const esTitular = numeroAfiliado.toString().endsWith("01");

    const [data, setData] = useState({
        fechaDeCarga: new Date().toISOString(),
        fechaDePrestacion: "",
        numeroAfiliado: numeroAfiliado, // Este valor debería ser dinámico según el usuario logueado
        integrante: "",
        medico: "",
        especialidad: "",
        lugarDeAtencion: "",
        observaciones: "",
        monto: 0
    })

    const [modalConfirmar, setModalConfirmar] = useState(false)
    const [modalCancelar, setModalCancelar] = useState(false)
    const [nroOrden, setNroOrden] = useState(null)
    const [errores, setErrores] = useState([])

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

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const confirmar = async (event) => {
        event.preventDefault()
        try {
            const dataToSend = {
                ...data,
                cantidad: parseInt(data.cantidad)
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
        navigate("/consultar-recetas")
    }

    const handleConfirmar = () => {
        setModalConfirmar(false)
        navigate("/consultar-recetas")
    }

    return (
        <div className={styles.fondo}>
            
            <div className={styles.container}>
                <div className={styles.card}>
                    <h4 className={styles.titulo}>Solicitud de Reintegro</h4>
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
                                usuarios.map((usuario) => {
                                    return usuario.numeroAfiliado.toString().includes( esTitular ? data.numeroAfiliado.toString().slice(0, 5) : numeroAfiliado.toString()) ? (
                                        <option key={usuario.numeroAfiliado} value={`${usuario.nombre} ${usuario.apellido}`}>{`${usuario.nombre} ${usuario.apellido}`}</option>
                                    ) : null
                                })}
                            </Form.Select>
                            <span className={styles.oblgatorio}>{errores.includes("integrante should not be empty") ? "Seleccione un integrante" : ""}</span>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} md={8} controlId="medico">
                                <Form.Label>Médico<span className={styles.oblgatorio}>*</span></Form.Label>
                                <Form.Select
                                    name="medico"
                                    value={data.medico}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un médico</option>
                                    <option value="Dr. Juan">Dr. Juan</option>
                                    <option value="Dr. Pepe">Dr. Pepe</option>
                                    <option value="Dra. Fulana">Dra. Fulana</option>
                                    
                                </Form.Select>
                                <span className={styles.oblgatorio}>{errores.includes("medico should not be empty") ? "Ingrese un médico" : ""}</span>
                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="cantidad">
                                <Form.Label>Cantidad<span className={styles.oblgatorio}>*</span></Form.Label>
                                <Form.Control
                                    name="cantidad"
                                    type="number"
                                    min="0"
                                    onChange={handleChange}
                                    required
                                />
                                <span className={styles.oblgatorio}>{errores.includes("cantidad should not be empty") ? "Ingrese una cantidad" : ""}</span>
                            </Form.Group>
                        </Row>

                        <Form.Group>
                            <Form.Label>Especialidad<span className={styles.oblgatorio}>*</span></Form.Label>
                            <Form.Select
                                name="especialidad"
                                value={data.especialidad}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione una especialidad de la lista</option>
                                <option value="Cirujano">Cirujano</option>
                                <option value="Neurólogo">Neurólogo</option>
                                <option value="Odontólogo">Odontólogo</option>
                                <option value="Traumatólogo">Traumatólogo</option>

                            </Form.Select>
                            <span className={styles.oblgatorio}>{errores.includes("especialidad should not be empty") ? "Seleccione una especialidad" : ""}</span>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Observaciones</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="observaciones"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </FormGenerico>
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