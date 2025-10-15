import { useState, useEffect } from "react"
import { Form, Col, Row, Modal, Button } from "react-bootstrap"
import FormGenerico from "../../components/plantilla/Form"
import styles from './FormRecetas.module.css'
import { useNavigate, Link } from "react-router-dom"
import logo from "@assets/images/Titulo-Logo.svg"

const FormRecetas = () => {
    useEffect(() => {
        document.title = 'Cargar Receta - Medicina Integral'
    }, []);

    const [data, setData] = useState({
        fechaDeCarga: new Date().toISOString().slice(0, 10),
        numeroAfiliado: 123456701, // Este valor debería ser dinámico según el usuario logueado
        integrante: "",
        medicamento: "",
        cantidad: "",
        presentacion: "",
        observaciones: ""
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
            const response = await fetch('http://localhost:3000/recetas', {
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
                    <h4 className={styles.titulo}>Carga de Receta</h4>
                    <FormGenerico handleSubmit={handleSubmit} confirmar={confirmar} cancelar={cancelar}>
                        <Form.Group>
                            <Form.Label>Integrante</Form.Label>
                            <Form.Select
                                name="integrante"
                                value={data.integrante}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione el nombre del integrante</option>
                                <option value="Integrante 1">Integrante 1</option>
                                <option value="Integrante 2">Integrante 2</option>
                            </Form.Select>
                            <span>{errores.includes("integrante should not be empty") ? "Seleccione un integrante" : ""}</span>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} md={8} controlId="medicamento">
                                <Form.Label>Medicamento</Form.Label>
                                <Form.Select
                                    name="medicamento"
                                    value={data.medicamento}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un medicamento</option>
                                    <option value="Ibuprofeno">Ibuprofeno</option>
                                    <option value="Paracetamol">Paracetamol</option>
                                </Form.Select>
                                <span>{errores.includes("medicamento should not be empty") ? "Ingrese un medicamento" : ""}</span>
                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="cantidad">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control
                                    name="cantidad"
                                    type="number"
                                    min="0"
                                    onChange={handleChange}
                                    required
                                />
                                <span>{errores.includes("cantidad should not be empty") ? "Ingrese una cantidad" : ""}</span>
                            </Form.Group>
                        </Row>

                        <Form.Group>
                            <Form.Label>Presentación</Form.Label>
                            <Form.Select
                                name="presentacion"
                                value={data.presentacion}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione una opción de la lista</option>
                                <option value="Comprimidos">Comprimidos</option>
                                <option value="Gotas">Gotas</option>
                            </Form.Select>
                            <span>{errores.includes("presentacion should not be empty") ? "Seleccione una presentación" : ""}</span>
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
                        La receta ha sido cargada correctamente. <br />
                        Nro.Orden: {nroOrden}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleConfirmar} style={{ backgroundColor: '#24979B', border: 'none' }}>Aceptar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal className={styles.modal} show={modalCancelar} onHide={() => setModalCancelar(false)} centered>
                    <Modal.Body>
                        ¿Estas seguro que deseas cancelar la carga de la receta?
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

export default FormRecetas;