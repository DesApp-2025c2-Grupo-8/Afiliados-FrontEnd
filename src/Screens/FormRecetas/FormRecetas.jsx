import { useState, useEffect } from "react"
import { Form, Col, Row, Modal, Button } from "react-bootstrap"
import FormGenerico from "../../components/FormGenerico/FormGenerico"
import styles from './FormRecetas.module.css'
import { useNavigate, Link } from "react-router-dom"
import { useAfiliadoDatos } from "../../context/AfiliadoDatos"

const FormRecetas = () => {
    useEffect(() => {
        document.title = 'Cargar Receta - Medicina Integral'
        if (!dataAfiliado) {
            navigate("/login");
            }
        filtrarGrupoFamiliar()
    }, []);

    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();
    const numeroAfiliado = dataAfiliado?.numeroAfiliado;
    const esConyuge = dataAfiliado?.rol === "CONYUGE";

    const [data, setData] = useState({
        fechaDeCarga: new Date().toISOString(),
        numeroAfiliado: numeroAfiliado, // Este valor debería ser dinámico según el usuario logueado
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
    const [grupoFamiliar, setGrupoFamiliar] = useState([]);

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
            // console.log("Resultado:", result);
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
    
    const esMayorDeEdad = (unaFechaDeNacimiento) => {
        const fechaNacimientoFormateada = new Date(unaFechaDeNacimiento);
        const hoy = new Date();
        const fechaNacimientoMas18Anios = new Date(fechaNacimientoFormateada.getFullYear() + 18, fechaNacimientoFormateada.getMonth(), fechaNacimientoFormateada.getDate());
        return hoy >= fechaNacimientoMas18Anios;
    }

    const filtrarGrupoFamiliar = () => {
        if (esConyuge) {
            setGrupoFamiliar(dataAfiliado?.grupoFamiliar.filter(m => m.rol !== 'TITULAR' && !esMayorDeEdad(m.fechaNacimiento)))
        } else {
            setGrupoFamiliar(dataAfiliado?.grupoFamiliar.filter(m => !esMayorDeEdad(m.fechaNacimiento)))
        }
    }

    return (
        <div className={styles.fondo}>

            <div className={styles.container}>
                <div className={styles.card}>
                    <h4 className={styles.titulo}>Carga de Receta</h4>
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
                                    // console.log("dataAfiliado.grupoFamiliar", dataAfiliado?.grupoFamiliar)
                                }
                                <option key={dataAfiliado?.numeroAfiliado} value={`${dataAfiliado?.nombre} ${dataAfiliado?.apellido}`}>{`${dataAfiliado?.nombre} ${dataAfiliado?.apellido}`}</option>
                                {
                                    grupoFamiliar.map((usuario) =>
                                        //el return tiene que devolver todos los afiliados si el afiliado es titular (incluyendose) si no, solo si mismos
                                        <option key={usuario.numeroAfiliado} value={`${usuario.nombre} ${usuario.apellido}`}>{`${usuario.nombre} ${usuario.apellido}`}</option>
                                    )
                                }
                            </Form.Select>
                            <span className={styles.oblgatorio}>{errores.includes("integrante should not be empty") ? "Seleccione un integrante" : ""}</span>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} md={8} controlId="medicamento">
                                <Form.Label>Medicamento<span className={styles.oblgatorio}>*</span></Form.Label>
                                <Form.Select
                                    name="medicamento"
                                    value={data.medicamento}
                                    onChange={handleChange}
                                    required
                                >
                                    {/* CAMBIAR ESTO */}
                                    <option value="">Seleccione un medicamento</option>
                                    <option value="Antizina">Antizina</option>
                                    <option value="Amoxicilina">Amoxicilina</option>
                                    <option value="Diclofenac">Diclofenac</option>
                                    <option value="Ibuprofeno">Ibuprofeno</option>
                                    <option value="Insulina">Insulina</option>
                                    <option value="Loratadina">Loratadina</option>
                                    <option value="Omeprazol">Omeprazol</option>
                                    <option value="Paracetamol">Paracetamol</option>
                                    <option value="Vitamina C">Vitamina C</option>
                                </Form.Select>
                                <span className={styles.oblgatorio}>{errores.includes("medicamento should not be empty") ? "Ingrese un medicamento" : ""}</span>
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
                            <Form.Label>Presentación<span className={styles.oblgatorio}>*</span></Form.Label>
                            <Form.Select
                                name="presentacion"
                                value={data.presentacion}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione una opción de la lista</option>
                                <option value="Comprimidos">Comprimidos</option>
                                <option value="Cápsulas">Cápsulas</option>
                                <option value="Inyectable">Inyectable</option>
                                <option value="Jarabe">Jarabe</option>
                                <option value="Tabletas masticables">Tabletas masticables</option>
                            </Form.Select>
                            <span className={styles.oblgatorio}>{errores.includes("presentacion should not be empty") ? "Seleccione una presentación" : ""}</span>
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
                        N° Orden: {nroOrden}
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