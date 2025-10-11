import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import turnos from '../../db/turnos'; 
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import FiltrosCards from '../../components/FiltrosCards/FiltrosCards';
import SearchBarCards from '../../components/SearchBarCards/SearchBarCards';
import styles from './ConsultarTurnos.module.css';
import { MdCancel } from 'react-icons/md';
import { BsClipboard2Plus } from 'react-icons/bs';


const periodosOpciones = [
    'Último año',
    'Últimos seis meses',
    'Últimos tres meses',
    'Último mes',
    'Últimas dos semanas',
    'Última semana'
];

const cardData = {
    color: 'observacion',
    camposCard: [
        //{ campo: 'Fecha de Reserva', propiedad: 'fechaReserva' },
        { campo: 'Integrante', propiedad: 'integrante' },
        { campo: 'Fecha de Turno', propiedad: 'fecha' },
        { campo: 'Hora', propiedad: 'hora' },
        { campo: 'Especialidad', propiedad: 'tipoConsulta' },
        //{ campo: 'Profesional', propiedad: 'profesional' },
        { campo: 'Lugar', propiedad: 'lugar' }
    ]
};


const ConsultarTurnos = () => {
    useEffect(() => {
        document.title = 'Consulta de Turnos - Medicina Integral';
    }, []);

    

    
    const [listaTurnos, setListaTurnos] = useState(turnos);
    const [listaTurnosFiltrados, setListaTurnosFiltrados] = useState(turnos);

    const [filtroVigentes, setFiltroVigentes] = useState(false);
    const [filtroPeriodo, setFiltroPeriodo] = useState('');
    const [filtroBusqueda, setFiltroBusqueda] = useState('');


    const [mostrarModal, setMostrarModal] = useState(false);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [turnosCancelados, setTurnosCancelados] = useState([]);

    useEffect(() => {
        aplicarFiltros(filtroVigentes, filtroPeriodo, filtroBusqueda);
    }, [turnosCancelados, filtroVigentes, filtroPeriodo, filtroBusqueda]);


    const aplicarFiltros = (vigentes, periodo, busqueda) => {
        let turnosFiltrados = listaTurnos.filter(t => !turnosCancelados.includes(t.id))

        if(vigentes) {
            const hoy = new Date().toISOString().slice(0,10);
            //toISOString --> pasa la fecha a un formato YYYY-MM-DDTHH:mm:ss:sssZ y slice --> elimina la hora y minutos, dejando solo la fecha.
            turnosFiltrados = turnosFiltrados.filter(t => t.fecha >= hoy);
        }
        if(periodo){
            const fechaLimite = obtenerFechaDelPeriodoSeleccionado(periodo);
            turnosFiltrados = turnosFiltrados.filter(t => t.fecha >= fechaLimite);
        }
        if(busqueda){
            const textoBusqueda = busqueda.toLowerCase();
            turnosFiltrados = turnosFiltrados.filter(t => t.integrante?.toLowerCase().includes(textoBusqueda) || t.fecha.includes(textoBusqueda)) 
        }

        setListaTurnosFiltrados(turnosFiltrados);
    }

    const obtenerFechaDelPeriodoSeleccionado = (periodo) => {
        const hoy = new Date();
        let fecha;

        switch(periodo){
            case 'Último año':
                fecha = new Date(hoy.setFullYear(hoy.getFullYear() - 1));
                break;
            case 'Últimos seis meses':
                fecha = new Date(hoy.setMonth(hoy.getMonth() - 6));
                break;
            case 'Últimos tres meses':
                fecha = new Date(hoy.setMonth(hoy.getMonth() - 3));
                break;
            case 'Último mes':
                fecha = new Date(hoy.setMonth(hoy.getMonth() - 1));
                break;
            case 'Últimas dos semanas':
                fecha = new Date(hoy.setDate(hoy.getDate() - 14));
                break;
            case 'Última semana':
                fecha = new Date(hoy.setDate(hoy.getDate() - 7));
                break;
            default:
                fecha = hoy;
        }

        return fecha.toISOString().slice(0,10);
    }

    const limpiarFiltros = () => {
        setFiltroVigentes(false);
        setFiltroPeriodo('');
        setFiltroBusqueda('');
        setListaTurnosFiltrados(listaTurnos);
    }

    return(
        <>
            <div className={styles.consultaTurnosContainer}>
                <section className={styles.headerContainer}>
                    <h1>Consultar Turnos</h1>
                    <SearchBarCards
                    valorInput={filtroBusqueda}
                        filtro={(texto) => {
                            setFiltroBusqueda(texto);
                            aplicarFiltros(filtroVigentes, filtroPeriodo, texto);
                        }}
                        limpiarFiltros={() => {
                            setFiltroBusqueda('');
                            aplicarFiltros(filtroVigentes, filtroPeriodo, '');
                        }}
                        placeholder={"Ingrese un integrante o fecha de turno..."}
                    />
                    <Link className={styles.botonSolicitarTurno} to={'solicitar-turno'}><BsClipboard2Plus style={{ marginRight: '10px' }}/>Solicitar Turno</Link>
                </section>
                <div className={styles.box}>
                    <section className={styles.filtroContainer}>
                        <h2>Filtrar turnos por:</h2> 
                        <hr />
                        <div className={styles.botonLimpiarFiltrosContainer}>
                            <button className={styles.botonLimpiarFiltros} onClick={limpiarFiltros}>Limpiar filtros <MdCancel style={{ marginLeft: '10px' }} /></button>
                        </div>
                        <div className={styles.botonCheckVigentesContainer}>
                            <label className={styles.botonCheckVigentes}>
                                <input 
                                    type='checkbox'
                                    checked={filtroVigentes}
                                    onChange={(e) => {
                                        setFiltroVigentes(e.target.checked);
                                        aplicarFiltros(e.target.checked, filtroPeriodo, filtroBusqueda)
                                    }}
                                />
                                Vigentes
                            </label>
                        </div>
                        <hr />

                        <FiltrosCards //PERÍODO
                            label={'Período'}
                            default={'TODO'}
                            opciones={periodosOpciones}
                            valorActual={filtroPeriodo}
                            filtrarAlSeleccionar = {(periodo) => {
                                setFiltroPeriodo(periodo)
                                aplicarFiltros(filtroVigentes, periodo, filtroBusqueda)
                            }}
                            borrarFiltro={() => {
                                setFiltroPeriodo('')
                                aplicarFiltros(filtroVigentes, '', filtroBusqueda)
                            }}
                        />
                        <hr />
                        <h3>{listaTurnosFiltrados.length} turno(s) encontrados</h3>
                    </section>

                    <section className={styles.turnosContainer}>
                        {listaTurnosFiltrados.length === 0 ?
                            <h2>No existen turnos con los filtros ingresados</h2> :
                            (listaTurnosFiltrados.map((unTurno) => (
                                <div key={unTurno.id} className={styles.card}>
                                    <CardDinamica
                                    {...cardData}
                                    data={unTurno}
                                    header={'Nro. Turno: ' + unTurno.id}
                                />
                                    <div className={styles.botonCardContainer}>
                                        <button
                                            className={styles.botonAbrirModal}
                                            onClick={() => {
                                            setTurnoSeleccionado(unTurno);
                                            setMostrarModal(true);
                                            }}
                                        >
                                        Cancelar Turno
                                        </button>
                                    </div>
                                </div>
                            )))
                        }
                    </section>
                </div>
            </div>

            {mostrarModal && turnoSeleccionado &&(
                <div className={styles.modalContainer}>
                    <div className={styles.modalBox}>
                        <div className={styles.modalHeader}>
                            <h2>Cancelar Turno</h2>
                        </div>
                        <p className={styles.modalBody}>
                            ¿Deseas cancelar el turno para <strong>{turnoSeleccionado.integrante}</strong> el día <strong>{turnoSeleccionado.fecha} - {turnoSeleccionado.hora}</strong>?
                        </p>
                        
                        <div className={styles.modalFooter}>
                            <button className={styles.botonVolver}
                                onClick={() => {
                                    setMostrarModal(false)
                                    setTurnoSeleccionado(null)
                                }}>
                                Volver
                            </button>
                            <button className={styles.botonCancelarTurno}
                                onClick={() => {
                                    setTurnosCancelados(p => [...p, turnoSeleccionado.id]);
                                    setMostrarModal(false);
                                    setTurnoSeleccionado(null);
                                }}>
                                Cancelar Turno
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default ConsultarTurnos;