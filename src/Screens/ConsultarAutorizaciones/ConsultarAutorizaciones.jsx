import React, { useEffect, useState } from "react";
import autorizaciones from '../../db/autorizaciones.js'
import CardDinamica from '../../components/CardDinamica/CardDinamica.jsx';
import styles from './ConsultarAutorizaciones.module.css'
import { use } from "react";


const autorizacionesOrdenInverso = [...autorizaciones].reverse();
const medicosOpcionalesIniciales = [...new Set(autorizaciones.map(autorizacion => autorizacion.medico))];
const integrantesOpcionesIniciales = [...new Set(autorizaciones.map(autorizacion => autorizacion.integrante))];
const periodosOpciones = ['Último año', 'Últimos seis meses', 'Últimos tres meses', 'Último mes', 'Últimas dos semanas', 'Última semana'];
const estadosOpcionesIniciales = [...new Set(autorizaciones.map(autorizacion => autorizacion.estado))]
//campos de las cards
const cardData = {

    camposCard: [
        { campo: 'Nro. Autorizacion', propiedad: 'nroAutorizacion' },
        { campo: 'Integrante', propiedad: 'integrante' },
        { campo: 'Medico', propiedad: 'medico' },
        { campo: 'Fecha prevista', propiedad: 'fechaPrevista' },
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
        aplicarFiltros(unMedico, filtroIntegrante, filtroEstado, filtroPeriodo);
    }

    const filtrarPorIntegrante = (unIntegrante) => {
        setFiltroIntegrante(unIntegrante);
        aplicarFiltros(filtroMedico, unIntegrante, filtroEstado, filtroPeriodo);
    }

    const filtrarPorPeriodo = (unPeriodo) => {
        setFiltroPeriodo(unPeriodo);
        aplicarFiltros(filtroMedico, filtroIntegrante, filtroEstado, unPeriodo);
    }

    const filtrarPorEstado = (unEstado) => {
        setFiltroEstado(unEstado);
        aplicarFiltros(filtroMedico, filtroIntegrante, unEstado, filtroPeriodo);
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
            (!unIntegrante || autorizacion.integrante.toLowerCase().includes(unMedico.toLowerCase())) &&
            (!unEstado || autorizacion.estado === unEstado)
        ).map(autorizacion => autorizacion.medico)

        const opcionesIntegrantes = listaAutorizaciones.filter(autorizacion =>
            (!unMedico || autorizacion.medico.toLowerCase().includes(unMedico.toLowerCase())) &&
            (!unEstado || autorizacion.estado === unEstado)
        ).map(autorizacion => autorizacion.integrante)

        const opcionesEstados = listaAutorizaciones.filter(autorizacion =>
            (!unMedico || autorizacion.medico.toLowerCase().includes(unMedico.toLowerCase())) &&
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

    return (
        <>
            <div className={styles.containerConsultarAutorizaciones}>
                <h1 className={styles.tituloResultadoAutorizaciones}>Consulta Autorizaciones</h1>

                <section className={styles}>
                    <h1>Consultar Autorizaciones</h1>
                    <Link className={styles} to={'/cargar-autorizacion'}><BsClipboard2Plus style={{ marginRight: '10px' }} />Cargar Autorizacion</Link>
                </section>

                <div className={styles.box}>
                    <section className={styles.filtroContainer}>
                        <h2>Filtrar recetas por:</h2>
                        <hr />
                        <div className={styles.botonLimpiarFiltrosContainer}>
                            <button className={styles.botonLimpiarFiltros} onClick={limpiarFiltros}>Limpiar filtros<MdCancel style={{ marginLeft: '10px' }} /></button>
                        </div>
                        {filtrosConfig.map(unFiltro => (
                            <FiltrosCards {...unFiltro} key={unFiltro.label} />
                        ))}
                        <hr />
                        <h3>{listaRecetasFiltradas.length} receta(s) encontradas</h3>
                    </section>


                    <section className={styles.containerResultadoAutorizaciones}>
                        <h2 className={styles.tituloResultadoAutorizaciones}>Resultados de Búsqueda</h2>
                        {autorizaciones.length > 0 ? (autorizaciones.map((autorizacion, idx) => (
                            <CardDinamica
                                {...cardData}
                                color={autorizacion.estado}

                                key={autorizacion.nroAutorizacion}
                                data={autorizacion}
                                header={autorizacion.estado}
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