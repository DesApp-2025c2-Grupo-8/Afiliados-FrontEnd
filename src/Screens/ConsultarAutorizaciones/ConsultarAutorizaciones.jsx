import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import autorizaciones from '../../db/autorizaciones.js'
import CardDinamica from '../../components/CardDinamica/CardDinamica.jsx';
import styles from './ConsultarAutorizaciones.module.css'
import FiltrosCards from '../../components/FiltrosCards/FiltrosCards';
import { MdCancel } from 'react-icons/md';
import { BsClipboard2Plus } from 'react-icons/bs';


const autorizacionesOrdenInverso = [...autorizaciones].reverse();
const medicosOpcionalesIniciales = [...new Set(autorizaciones.map(autorizacion => autorizacion.medico))];
const integrantesOpcionesIniciales = [...new Set(autorizaciones.map(autorizacion => autorizacion.integrante))];
const periodosOpciones = ['Último año', 'Últimos seis meses', 'Últimos tres meses', 'Último mes', 'Últimas dos semanas', 'Última semana'];
const estadosOpcionesIniciales = [...new Set(autorizaciones.map(autorizacion => autorizacion.estado))]
//campos de las cards
const cardData = {

    camposCard: [
        { campo: 'Nro. Autorización', propiedad: 'nroAutorizacion' },
        { campo: 'Integrante', propiedad: 'integrante' },
        { campo: 'Médico', propiedad: 'medico' },
        { campo: 'Fecha Prevista', propiedad: 'fechaPrevista', esFecha: true },
        { campo: 'Lugar', propiedad: 'lugar' }
    ]
}

// Componente principal
const ConsultarAutorizaciones = () => {
    useEffect(() => {
        document.title = 'Consulta de Autorizaciones - Medicina Integral'
    }, [])


    const [listaAutorizaciones] = useState(autorizacionesOrdenInverso);
    const [listaAutorizacionesFiltradas, setListaAutorizacionesFiltradas] = useState(autorizacionesOrdenInverso);
    const [filtroMedico, setFiltroMedico] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroIntegrante, setFiltroIntegrante] = useState('');
    const [filtroPeriodo, setFiltroPeriodo] = useState('');

    const [integrantesOpciones, setIntegrantesOpciones] = useState(integrantesOpcionesIniciales);
    const [medicosOpcionales, setMedicosOpcionales] = useState(medicosOpcionalesIniciales);
    const [estadosOpciones, setEstadosOpciones] = useState(estadosOpcionesIniciales);


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
        if (unPeriodo) {
            const fechaPeriodoSeleccionado = obtenerFechaDelPeriodoSeleccionado(unPeriodo);
            listaAutorizacionesAFiltrar = listaAutorizacionesAFiltrar.filter(autorizacion => autorizacion.fechaPrevista >= fechaPeriodoSeleccionado);
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
        let fechaPeriodoFiltro;

        switch (unPeriodo) {
            case 'Último año':
                fechaPeriodoFiltro = new Date(fechaActual.setFullYear(fechaActual.getFullYear() - 1));
                break;
            case 'Últimos seis meses':
                fechaPeriodoFiltro = new Date(fechaActual.setMonth(fechaActual.getMonth() - 6));
                break;
            case 'Últimos tres meses':
                fechaPeriodoFiltro = new Date(fechaActual.setMonth(fechaActual.getMonth() - 3));
                break;
            case 'Último mes':
                fechaPeriodoFiltro = new Date(fechaActual.setMonth(fechaActual.getMonth() - 1));
                break;
            case 'Últimas dos semanas':
                fechaPeriodoFiltro = new Date(fechaActual.setDate(fechaActual.getDate() - 14));
                break;
            case 'Última semana':
                fechaPeriodoFiltro = new Date(fechaActual.setDate(fechaActual.getDate() - 7));
                break;
            default:
                fechaPeriodoFiltro = fechaActual;

        }

        return fechaPeriodoFiltro.toISOString().slice(0, 10);
    }

    const limpiarFiltroMedico = () => {
        setFiltroMedico('');
        aplicarFiltros('', filtroIntegrante, filtroPeriodo, filtroEstado);
    }

    const limpiarFiltroIntegrante = () => {
        setFiltroIntegrante('');
        aplicarFiltros(filtroMedico, '', filtroPeriodo, filtroEstado);
    }

    const limpiarFiltroPeriodo = () => {
        setFiltroPeriodo('');
        aplicarFiltros(filtroMedico, filtroIntegrante, '', filtroEstado);
    }

    const limpiarFiltroEstado = () => {
        setFiltroEstado('');
        aplicarFiltros(filtroMedico, filtroIntegrante, filtroPeriodo, '');
    }

    const limpiarFiltros = () => {
        setListaAutorizacionesFiltradas(listaAutorizaciones);
        setFiltroMedico('');
        setFiltroIntegrante('');
        setFiltroPeriodo('');
        setFiltroEstado('');
        setEstadosOpciones(estadosOpcionesIniciales);
        setMedicosOpcionales(medicosOpcionalesIniciales);
        setIntegrantesOpciones(integrantesOpcionesIniciales);
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
        switch (unEstado){
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

    return (
        <>
            <div className={styles.containerConsultarAutorizaciones}>
                <section className={styles.botonesContainer}>
                    <h1>Consultar Autorizaciones</h1>
                    <Link className={styles.botonCargarReceta} to={'/cargar-autorizacion'}><BsClipboard2Plus style={{ marginRight: '10px' }} />Cargar Autorización</Link>
                </section>

                <div className={styles.box}>
                    <section className={styles.filtroContainer}>
                        <h2>Filtrar Autorizaciones por:</h2>
                        <hr />
                        <div className={styles.botonLimpiarFiltrosContainer}>
                            <button className={styles.botonLimpiarFiltros} onClick={limpiarFiltros}>Limpiar filtros<MdCancel style={{ marginLeft: '10px' }} /></button>
                        </div>
                        {filtrosConfig.map(unFiltro => (
                            <FiltrosCards {...unFiltro} key={unFiltro.label} />
                        ))}
                        <hr />
                        <h3>{listaAutorizacionesFiltradas.length} Autorizacion(es) encontradas</h3>
                    </section>

                    <section className={styles.recetasContainer}>
                        <h2 className={styles.tituloResultadoAutorizaciones}>Resultados de Búsqueda</h2>
                        {listaAutorizacionesFiltradas.length > 0 ? (listaAutorizacionesFiltradas.map((autorizacion, idx) => (
                            <CardDinamica
                                {...cardData}
                                color={colorSegunEstado(autorizacion.estado)}

                                key={autorizacion.nroAutorizacion}
                                data={autorizacion}
                                header={autorizacion.estado.charAt(0).toUpperCase() + autorizacion.estado.slice(1)}
                            />
                        ))) : (
                            <p>No se encontraron autorizaciones</p>
                        )}
                    </section>
                </div>
            </div>
        </>
    )
}



export default ConsultarAutorizaciones