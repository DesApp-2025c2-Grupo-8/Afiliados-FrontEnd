import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CardDinamica from '../../components/CardDinamica/CardDinamica.jsx';
import styles from './ConsultarAutorizaciones.module.css'
import FiltrosCards from '../../components/FiltrosCards/FiltrosCards';
import { MdCancel } from 'react-icons/md';
import { BsClipboard2Plus } from 'react-icons/bs';
import { useAfiliadoDatos } from '../../context/AfiliadoDatos';
import { useNavigate } from "react-router-dom";
import { FaFilter } from 'react-icons/fa';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { FaEdit } from "react-icons/fa";




const periodosOpciones = ['Último año', 'Últimos seis meses', 'Últimos tres meses', 'Último mes', 'Últimas dos semanas', 'Última semana'];

//campos de las cards
const cardData = {

    camposCard: [
        { campo: 'N° Orden', propiedad: 'numeroAutorizacion' },
        { campo: 'Integrante', propiedad: 'integrante' },
        { campo: 'Médico/a', propiedad: 'medico' },
        { campo: 'Fecha de Carga', propiedad: 'fechaDeCarga', esFecha: true },
        { campo: 'Lugar de atención', propiedad: 'direccion' },
        { campo: 'Observaciones', propiedad: 'observaciones' },
        { campo: 'Cantidad de Dias', propiedad: 'cantDias' }
    ],
    tieneBotonDescarga: true
}

// Componente principal
const ConsultarAutorizaciones = () => {

    const navigate = useNavigate();

    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();

    useEffect(() => {
        document.title = 'Consulta de Autorizaciones - Medicina Integral'
        if (!dataAfiliado) {
            navigate("/login");
        }
        fetch('http://localhost:3000/autorizaciones/' + dataAfiliado?.numeroAfiliado)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                const autorizacionesOrdenadas = [...data].reverse()
                setlistaAutorizaciones(autorizacionesOrdenadas)
                setListaAutorizacionesFiltradas(autorizacionesOrdenadas)
                const integrantesOpcionesIniciales = [...new Set(data.map(autorizacion => autorizacion.integrante))].sort()
                setIntegrantesOpciones(integrantesOpcionesIniciales)
                const medicosOpcionalesIniciales = [...new Set(data.map(autorizacion => autorizacion.medico))].sort()
                setMedicosOpcionales(medicosOpcionalesIniciales)
                const estadosOpcionesIniciales = [...new Set(data.map(autorizacion => autorizacion.estado))].sort()
                setEstadosOpciones(estadosOpcionesIniciales)

            })
            .catch(error => console.log(error))
    }, [dataAfiliado])


    const [listaAutorizaciones, setlistaAutorizaciones] = useState([])
    const [listaAutorizacionesFiltradas, setListaAutorizacionesFiltradas] = useState([]);
    const [filtroMedico, setFiltroMedico] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroIntegrante, setFiltroIntegrante] = useState('');
    const [filtroPeriodo, setFiltroPeriodo] = useState('');

    const [integrantesOpciones, setIntegrantesOpciones] = useState([]);
    const [medicosOpcionales, setMedicosOpcionales] = useState([]);
    const [estadosOpciones, setEstadosOpciones] = useState([]);
    const [filtrosMobileOpen, setFiltrosMobileOpen] = useState(false);
    const [modalObservacionesOpen, setModalObservacionesOpen] = useState(false)
    const [elementoSeleccionado, setElementoSeleccionado] = useState(null)

    const toggleFiltrosMobile = () => {
        setFiltrosMobileOpen(!filtrosMobileOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 630 && filtrosMobileOpen) {
                setFiltrosMobileOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [filtrosMobileOpen]);


    const filtrarPorMedico = (unMedico) => {
        setFiltroMedico(unMedico);
        aplicarFiltros(unMedico, filtroIntegrante, filtroPeriodo, filtroEstado);
    }

    const filtrarPorIntegrante = (unIntegrante) => {
        setFiltroIntegrante(unIntegrante);
        aplicarFiltros(filtroMedico, unIntegrante, filtroPeriodo, filtroEstado);
    }

    const filtrarPorPeriodo = (unPeriodo) => {
        setFiltroPeriodo(unPeriodo);
        aplicarFiltros(filtroMedico, filtroIntegrante, unPeriodo, filtroEstado);
    }

    const filtrarPorEstado = (unEstado) => {
        setFiltroEstado(unEstado);
        aplicarFiltros(filtroMedico, filtroIntegrante, filtroPeriodo, unEstado);
    }

    const aplicarFiltros = (unMedico, unIntegrante, unPeriodo, unEstado) => {
        let listaAutorizacionesAFiltrar = [...listaAutorizaciones];

        if (unMedico) {
            listaAutorizacionesAFiltrar = listaAutorizacionesAFiltrar.filter(autorizacion => autorizacion.medico === unMedico);
        };
        if (unIntegrante) {
            listaAutorizacionesAFiltrar = listaAutorizacionesAFiltrar.filter(autorizacion => autorizacion.integrante === unIntegrante);
        };
        if (unPeriodo && unPeriodo !== 'TODO') {
            const fechaDelPeriodoSeleccionado = obtenerFechaDelPeriodoSeleccionado(unPeriodo);
            listaAutorizacionesAFiltrar = listaAutorizacionesAFiltrar.filter(r => r.fechaDeCarga >= fechaDelPeriodoSeleccionado);
        };
        if (unEstado) {
            listaAutorizacionesAFiltrar = listaAutorizacionesAFiltrar.filter(autorizacion => autorizacion.estado === unEstado);
        }

        setListaAutorizacionesFiltradas(listaAutorizacionesAFiltrar);

        const opcionesMedicos = listaAutorizaciones.filter(autorizacion =>
            (!unIntegrante || autorizacion.integrante === unIntegrante) &&
            (!unEstado || autorizacion.estado === unEstado)
        ).map(autorizacion => autorizacion.medico)

        const opcionesIntegrantes = listaAutorizaciones.filter(autorizacion =>
            (!unMedico || autorizacion.medico === unMedico) &&
            (!unEstado || autorizacion.estado === unEstado)
        ).map(autorizacion => autorizacion.integrante)

        const opcionesEstados = listaAutorizaciones.filter(autorizacion =>
            (!unMedico || autorizacion.medico === unMedico) &&
            (!unIntegrante || autorizacion.integrante === unIntegrante)
        ).map(autorizacion => autorizacion.estado);

        setEstadosOpciones([...new Set(opcionesEstados)]);
        setMedicosOpcionales([...new Set(opcionesMedicos)]);
        setIntegrantesOpciones([...new Set(opcionesIntegrantes)]);

    }

    const obtenerFechaDelPeriodoSeleccionado = (unPeriodo) => {

        const fechaActual = new Date();
        let fechaPeriodoFiltro = new Date(fechaActual);

        switch (unPeriodo) {
            case 'Último año':
                fechaPeriodoFiltro.setFullYear(fechaPeriodoFiltro.getFullYear() - 1);
                break;
            case 'Últimos seis meses':
                fechaPeriodoFiltro.setMonth(fechaPeriodoFiltro.getMonth() - 6);
                break;
            case 'Últimos tres meses':
                fechaPeriodoFiltro.setMonth(fechaPeriodoFiltro.getMonth() - 3);
                break;
            case 'Último mes':
                fechaPeriodoFiltro.setMonth(fechaPeriodoFiltro.getMonth() - 1);
                break;
            case 'Últimas dos semanas':
                fechaPeriodoFiltro.setDate(fechaPeriodoFiltro.getDate() - 14);
                break;
            case 'Última semana':
                fechaPeriodoFiltro.setDate(fechaPeriodoFiltro.getDate() - 7);
                break;
        }

        // console.log(fechaPeriodoFiltro.toISOString());
        return fechaPeriodoFiltro.toISOString().slice(0, 10);
    };

    const limpiarFiltroMedico = () => {
        setFiltroMedico('');
        setMedicosOpcionales([...new Set(listaAutorizaciones.map(autorizacion => autorizacion.medico))])
        aplicarFiltros('', filtroIntegrante, filtroPeriodo, filtroEstado);
    }

    const limpiarFiltroIntegrante = () => {
        setFiltroIntegrante('');
        setIntegrantesOpciones([...new Set(listaAutorizaciones.map(autorizacion => autorizacion.integrante))])
        aplicarFiltros(filtroMedico, '', filtroPeriodo, filtroEstado);
    }

    const limpiarFiltroPeriodo = () => {
        setFiltroPeriodo('');
        aplicarFiltros(filtroMedico, filtroIntegrante, '', filtroEstado);
    }

    const limpiarFiltroEstado = () => {
        setFiltroEstado('');
        setEstadosOpciones([...new Set(listaAutorizaciones.map(autorizacion => autorizacion.estado))])
        aplicarFiltros(filtroMedico, filtroIntegrante, filtroPeriodo, '');
    }

    const limpiarFiltros = () => {
        setListaAutorizacionesFiltradas(listaAutorizaciones);
        setFiltroMedico('');
        setFiltroIntegrante('');
        setFiltroPeriodo('');
        setFiltroEstado('');
        setEstadosOpciones([...new Set(listaAutorizaciones.map(autorizacion => autorizacion.estado))]);
        setMedicosOpcionales([...new Set(listaAutorizaciones.map(autorizacion => autorizacion.medico))]);
        setIntegrantesOpciones([...new Set(listaAutorizaciones.map(autorizacion => autorizacion.integrante))]);
    }

    const filtrosConfig = [
        {
            label: 'Medico',
            default: 'Seleccione un medico...',
            defaultDesactivado: true,
            opciones: medicosOpcionales,
            valorActual: filtroMedico,
            filtrarAlSeleccionar: filtrarPorMedico,
            borrarFiltro: limpiarFiltroMedico
        },
        {
            label: 'Integrante',
            default: 'Seleccione un integrante...',
            defaultDesactivado: true,
            opciones: integrantesOpciones,
            valorActual: filtroIntegrante,
            filtrarAlSeleccionar: filtrarPorIntegrante,
            borrarFiltro: limpiarFiltroIntegrante
        },
        {
            label: 'Estado',
            default: 'TODOS',
            defaultDesactivado: false,
            opciones: estadosOpciones,
            valorActual: filtroEstado,
            filtrarAlSeleccionar: filtrarPorEstado,
            borrarFiltro: limpiarFiltroEstado
        },
        {
            label: 'Periodo',
            default: 'Todo',
            defaultDesactivado: false,
            opciones: periodosOpciones,
            valorActual: filtroPeriodo,
            filtrarAlSeleccionar: filtrarPorPeriodo,
            borrarFiltro: limpiarFiltroPeriodo
        }
    ]

    const colorSegunEstado = (unEstado) => {
        let resultado = '';
        switch (unEstado) {
            case 'Aceptada':
                resultado = 'aceptada';
                break;
            case 'Rechazada':
                resultado = 'rechazada';
                break;
            case 'Observación':
                resultado = "observacion"
                break;
            default:
                resultado = 'pendiente'
        }
        return resultado;
    };
    
    const abrirModalObservaciones = (autorizacion) => {
        setElementoSeleccionado(autorizacion)
        setModalObservacionesOpen(true)
    }

    const guardarObservaciones = async () => {
        try {
            const response = await fetch(`http://localhost:3000/autorizaciones/${elementoSeleccionado.numeroAutorizacion}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ observaciones: elementoSeleccionado.observaciones, estado: "Pendiente" }),
            });

            const dataActualizada = await response.json();
            
            setlistaAutorizaciones(prev =>
                prev.map(item =>
                    item.numeroAutorizacion === dataActualizada.numeroAutorizacion
                        ? { ...item, observaciones: dataActualizada.observaciones, estado: dataActualizada.estado}
                        : item
                )
            );

            setListaAutorizacionesFiltradas(prev =>
                prev.map(item =>
                    item.numeroAutorizacion === dataActualizada.numeroAutorizacion
                        ? { ...item, observaciones: dataActualizada.observaciones, estado: dataActualizada.estado}
                        : item
                )
            );

            setModalObservacionesOpen(false);
        } catch (error) {
            console.error('Error al guardar las observaciones:', error);
        }
    };


    return (
        <>
            <div className={styles.pantallaDeConsultaContainer}>
                <div className={styles.tituloYBotones}>
                    <h1 className={styles.tituloPantallaDeConsulta}>Consultar Autorizaciones</h1>
                    <section className={styles.botonesContainer}>
                        <button
                            className={styles.botonFiltrosMobile}
                            onClick={toggleFiltrosMobile}
                        >
                            <FaFilter />
                        </button>

                        <Link className={styles.botonCargarYSolicitar} to={'/cargar-autorizacion'}>
                            <BsClipboard2Plus />
                            <span>Cargar Autorización</span>
                        </Link>
                    </section>
                </div>

                <div className={styles.filtrosYResultadosConsulta}>
                    <section className={`${styles.filtrosConsultaContainer} ${filtrosMobileOpen ? styles.activo : ''}`}>
                        <button
                            className={styles.botonCerrarFiltrosMobile}
                            onClick={toggleFiltrosMobile}
                        >
                            X
                        </button>

                        <div className={styles.tituloFiltros}>
                            <h2>Filtrar Autorizaciones por:</h2>
                            <hr />
                        </div>

                        <div className={styles.botonLimpiarFiltrosContainer}>
                            <button className={styles.botonLimpiarFiltros} onClick={limpiarFiltros}>
                                <MdCancel />
                                <span>Limpiar filtros</span>
                            </button>
                        </div>

                        {filtrosConfig
                            .filter(filtro => filtro.opciones.length > 1)
                            .map(unFiltro => (
                                <FiltrosCards {...unFiltro} key={unFiltro.label} />
                            ))
                        }

                        <div className={styles.textoResultadosDeConsulta}>
                            <hr />
                            <h3>{listaAutorizacionesFiltradas.length} Autorizacion(es) encontradas</h3>
                        </div>
                    </section>

                    <section className={styles.resultadosDeConsultaContainer}>
                        {listaAutorizacionesFiltradas.length === 0 ?
                            <h2>No existen autorizaciones con los filtros ingresados</h2> :
                            (listaAutorizacionesFiltradas.map((autorizacion) => (
                                <CardDinamica
                                    {...cardData}
                                    color={colorSegunEstado(autorizacion.estado)}
                                    key={autorizacion.numeroAutorizacion}
                                    data={{
                                        ...autorizacion,
                                        ...(autorizacion.estado === 'Aceptada'
                                            ? { cantDias: autorizacion.cantDias }
                                            : { cantDias: 'N/A' })
                                    }}
                                    header={autorizacion.estado.charAt(0).toUpperCase() + autorizacion.estado.slice(1)}
                                    tieneBotonDescarga={autorizacion.estado === 'Aceptada'}
                                    tieneContenidoExtra={autorizacion.estado === 'Observación' ? (
                                        <button
                                        
                                            className={styles.btnEditar}
                                            onClick={() => abrirModalObservaciones(autorizacion)}
                                        >
                                            <FaEdit style={ {margin: "4px"}} />
                                            Editar
                                        </button>
                                    ) : null}
                                />
                            )))}
                    </section>
                </div>
            </div>

            <Modal show={modalObservacionesOpen} onHide={() => setModalObservacionesOpen(false)} centered className={styles.modalEntero}>
                <Modal.Header className={styles.headerModalEditarUsuario}>
                    <Modal.Title className={styles.tituloModal}>Editar Observaciones de la Autorización N° {elementoSeleccionado?.numeroAutorizacion}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.bodyModalEditarUsuario}>
                    <label >Observaciones: </label>
                    <textarea
                        className={styles.textareaObservaciones}
                        value={elementoSeleccionado?.observaciones || ""}
                        onChange={(e) => setElementoSeleccionado({
                            ...elementoSeleccionado,
                            observaciones: e.target.value
                        })}
                    />
                </Modal.Body>

                <Modal.Footer className={styles.footerModalEditarUsuario}>
                    <Button className={ styles.btnCerrarCambios } variant="secondary" onClick={() => setModalObservacionesOpen(false)}>
                        Cancelar
                    </Button>
                    <Button className={styles.btnGuardarCambios} variant="primary" onClick={guardarObservaciones}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}



export default ConsultarAutorizaciones


