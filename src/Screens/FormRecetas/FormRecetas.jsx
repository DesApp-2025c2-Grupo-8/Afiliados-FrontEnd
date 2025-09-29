import { useState } from "react"
import { Form, Col, Row, Modal, Button } from "react-bootstrap"
import FormGenerico from "../../components/plantilla/Form"
import './FormRecetas.css'
import { useNavigate, Link } from "react-router-dom"
import logo from "@assets/images/Titulo-Logo.svg"

const FormRecetas = () => {
    const [data, setData] = useState({
        integrante: "",
        medicamento: "",
        cantidad: "",
        presentacion: "",
        observaciones: ""
    })

    const [modalConfirmar, setModalConfirmar] = useState(false)
    const [modalCancelar, setModalCancelar] = useState(false)

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { nombre, valor } = event.target
        setData(
            campos => ({
                ...campos,
                [nombre]: valor
            })
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Datos enviados', data) //fetch cuando haya back.

    }

    const confirmar = (event) => {
        event.preventDefault()
        setModalConfirmar(true)
    }

    const cancelar = () => {
        setModalCancelar(true)
    }

    const handleCancelar = () => {
        setModalCancelar(false)
        navigate("/")
    }

    const handleConfirmar = () => {
        setModalConfirmar(false)
        navigate("/") //poner la página de recetas
    }

    return(
        <div className="fondo">
            <div className="header-logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
            </div>
            <div className="container">
                <div className="card">
                    <h4 className="titulo">Carga de Receta</h4>
                    <FormGenerico handleSubmit={handleSubmit} confirmar={confirmar} cancelar={cancelar}>
                        <Form.Group>
                            <Form.Label>Integrante</Form.Label>
                            <Form.Select
                                name="integrante"
                                value={data.integrante}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione el nombre del integrante</option>
                                <option value="">Integrante 1</option>
                                <option value="">Integrante 2</option>
                            </Form.Select>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} md={8} controlId="medicamento">
                                <Form.Label>Medicamento</Form.Label>
                                <Form.Select
                                    name="medicamento"
                                    value={data.medicamento}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un medicamento</option>
                                    <option value="">Ibuprofeno</option>
                                    <option value="">Paracetamol</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="cantidad">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control
                                    name="cantidad"
                                    type="number"
                                    min="0"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group>
                            <Form.Label>Presentación</Form.Label>
                            <Form.Select
                                name="presentacion"
                                value={data.presentacion}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione una opción de la lista</option>
                                <option value="">Comprimidos</option>
                                <option value="">Gotas</option>
                            </Form.Select>
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
                <Modal className="modal" show={modalConfirmar} onHide={() => setModalConfirmar(false)} centered>
                    <Modal.Body>
                        La receta ha sido cargada correctamente. <br />
                        Nro.Orden:
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleConfirmar} style={{backgroundColor: '#24979B', border: 'none'}}>Aceptar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal className="modal" show={modalCancelar} onHide={() => setModalCancelar(false)} centered>
                    <Modal.Body>
                        ¿Estas seguro que deseas cancelar la carga de la receta?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalCancelar(false)} style={{backgroundColor: '#24979B', border:'none'}}>Volver</Button>
                        <Button onClick={handleCancelar} style={{backgroundColor: '#E64F4F', border:'none'}}>Continuar</Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
};

export default FormRecetas;