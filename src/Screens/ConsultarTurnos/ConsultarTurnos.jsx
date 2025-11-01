import React, {useCallback, useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import FiltrosCards from '../../components/FiltrosCards/FiltrosCards';
import SearchBarCards from '../../components/SearchBarCards/SearchBarCards';
import styles from './ConsultarTurnos.module.css';
import { MdCancel } from 'react-icons/md';
import { BsClipboard2Plus } from 'react-icons/bs';

import { useNumeroAfiliado } from '../../context/NumeroAfiliado'; 


//const turnosOrdenInverso = [...turnos].reverse(); //Para ordenar turnos de más actuales a más antiguos
//const turnosOrdenados = [...turnos].sort((turno1,turno2) => turno2.fechaDeCarga.localeCompare(turno1.fechaDeCarga)) //ordena y compara las fechas.


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
        //{ campo: 'Fecha de Turno', propiedad: 'fecha', esFecha: true },
        { campo: 'Hora', propiedad: 'hora' },
        { campo: 'Especialidad', propiedad: 'especialidad' },
        //{ campo: 'Profesional', propiedad: 'profesional' },
        { campo: 'Lugar de Atención', propiedad: 'lugarDeAtencion' }
    ],

};


const ConsultarTurnos = () => {
    const { numeroAfiliado } = useNumeroAfiliado();
    
    const [listaTurnos, setListaTurnos] = useState([]);
    const [listaTurnosFiltrados, setListaTurnosFiltrados] = useState([]);
    const [filtroVigentes, setFiltroVigentes] = useState(false);
    const [filtroPeriodo, setFiltroPeriodo] = useState('');
    const [filtroBusqueda, setFiltroBusqueda] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

    const obtenerFechaDelPeriodoSeleccionado = useCallback((periodo) => {
        const hoy = new Date();
        let fecha = new Date(hoy);

        switch(periodo){
            case 'Último año':
                fecha.setFullYear(fecha.getFullYear() - 1);
                break;
            case 'Últimos seis meses':
                fecha.setMonth(fecha.getMonth() - 6);
                break;
            case 'Últimos tres meses':
                fecha.setMonth(fecha.getMonth() - 3);
                break;
            case 'Último mes':
                fecha.setMonth(fecha.getMonth() - 1);
                break;
            case 'Últimas dos semanas':
                fecha.setDate(fecha.getDate() - 14);
                break;
            case 'Última semana':
                fecha.setDate(fecha.getDate() - 7);
                break;
            default:
                return new Date(0).toISOString().slice(0,10); // Fecha muy antigua para 'TODO'
        }

        return fecha.toISOString().slice(0,10);
    }, [])

    const formatearFecha = (fecha) => {
        if(!fecha || typeof fecha !== 'string') return fecha;

        const partes = fecha.split('-'); 
        if (partes.length === 3) {
            return `${partes[2]}-${partes[1]}-${partes[0]}`;
        }
        return fecha
    }

    const esTurnoVigente = useCallback((turno) => {
        const hoy = new Date().toISOString().slice(0,10);
        const horaHoy = new Date().toTimeString().slice(0,5);

        if(turno.fecha > hoy){
            return true;
        }else if(turno.fecha === hoy){
            return turno.hora >= horaHoy
        }

        return false; 

    }, [])

    const aplicarFiltros = useCallback((vigentes, periodo, busqueda) => {
        let turnosFiltrados = listaTurnos.slice()

        if(vigentes) {
            turnosFiltrados = turnosFiltrados.filter(t => esTurnoVigente(t));
        }
        if(periodo){
            const fechaLimite = obtenerFechaDelPeriodoSeleccionado(periodo);
            turnosFiltrados = turnosFiltrados.filter(t => t.fecha >= fechaLimite);
        }
        if(busqueda){
            const textoBusqueda = busqueda.toLowerCase();
            turnosFiltrados = turnosFiltrados.filter(t => 
                t.integrante?.toLowerCase().includes(textoBusqueda) || 
                t.fecha.includes(busqueda) || 
                t.tipoConsulta?.toLowerCase().includes(textoBusqueda) || 
                t.lugarDeAtencion?.toLowerCase().includes(textoBusqueda)
            )
        }

        setListaTurnosFiltrados(turnosFiltrados);
    }, [listaTurnos, esTurnoVigente, obtenerFechaDelPeriodoSeleccionado])

    useEffect(() => {
        document.title = 'Consulta de Turnos - Medicina Integral';

        const fetchTurnos = async () => {
            if (!numeroAfiliado) return
            try {
                const response = await fetch(`http://localhost:3000/turnos/consulta/${numeroAfiliado}`);
                if (!response.ok) {
                    if (response.status === 404) {
                         setListaTurnos([])
                         setListaTurnosFiltrados([])
                         return;
                    }
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al cargar los turnos');
                }
                const data = await response.json()
                
                
                const turnosOrdenados = [...data].sort((a, b) => {
                    const dateA = new Date(a.fecha);
                    const dateB = new Date(b.fecha);
                    return dateB.getTime() - dateA.getTime(); 
                })
                
                setListaTurnos(turnosOrdenados);
                //setListaTurnosFiltrados(turnosOrdenados);
                
            } catch (error) {
                console.error('Fallo al obtener turnos:', error);
                setListaTurnos([])
            } 
        }
        fetchTurnos()
    }, [numeroAfiliado]);

    useEffect(() => {
        aplicarFiltros(filtroVigentes, filtroPeriodo, filtroBusqueda);
    }, [listaTurnos, aplicarFiltros, filtroVigentes, filtroPeriodo, filtroBusqueda]);

    const handleAbrirModal = (turno) => {
        setTurnoSeleccionado(turno)
        setMostrarModal(true)
    }

    const handleCancelarTurno = async (id) => {
        try {
            await fetch(`http://localhost:3000/turnos/cancelar/${id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json'},
            })
            const turnosActualizados = listaTurnos.filter(t => t._id !== id);
            setListaTurnos(turnosActualizados); 
            setMostrarModal(false)
            setTurnoSeleccionado(null);
        } catch (error) {
            console.error('Error al cancelar el turno: ', error);
            setMostrarModal(false)
            setTurnoSeleccionado(null)
        }
    }

    const handleBusqueda = (texto) => {
        setFiltroBusqueda(texto);
    }

    const handleFiltrarPorPeriodo = (periodo) => {
        setFiltroPeriodo(periodo);
    }

    const handleFiltrarPorVigentes = (isChecked) => {
        setFiltroVigentes(isChecked);
    }

    
    const limpiarFiltros = () => {
        setFiltroVigentes(false);
        setFiltroPeriodo('');
        setFiltroBusqueda('');
    }

    return(
        <>
            <div className={styles.consultaTurnosContainer}>
                <section className={styles.headerContainer}>
                    <h1>Consultar Turnos</h1>
                    <SearchBarCards
                    valorInput={filtroBusqueda}
                        filtro={handleBusqueda}
                        limpiarFiltros={() => {handleBusqueda('');}}
                        placeholder={"Ingrese un integrante o fecha de turno..."}
                    />
                    <Link className={styles.botonSolicitarTurno} to={'/solicitar-turno'}><BsClipboard2Plus style={{ marginRight: '10px' }}/>Solicitar Turno</Link>
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
                                    onChange={(e) => handleFiltrarPorVigentes(e.target.checked)}
                                />
                                Vigentes (Próximos)
                            </label>
                        </div>
                        <hr />

                        <FiltrosCards //PERÍODO
                            label={'Período'}
                            default={'TODO'}
                            opciones={periodosOpciones}
                            valorActual={filtroPeriodo}
                            filtrarAlSeleccionar = {handleFiltrarPorPeriodo}
                            borrarFiltro={() => {handleFiltrarPorPeriodo('')}}
                        />
                        <hr />
                        <h3>{listaTurnosFiltrados.length} turno(s) encontrados</h3>
                    </section>

                    <section className={styles.turnosContainer}>
                        {listaTurnosFiltrados.length === 0 ?
                            <h2>No existen turnos con los filtros ingresados</h2> :
                            (listaTurnosFiltrados.map((unTurno, idx) => (
                                    <CardDinamica
                                        {...cardData}
                                        data={unTurno}
                                        header={`Fecha de Turno: ${formatearFecha(unTurno.fecha)}`}
                                        key={idx}
                                        tieneContenidoExtra={
                                            esTurnoVigente(unTurno) ? (
                                            <button
                                                className={styles.botonAbrirModal}
                                                onClick={() => handleAbrirModal(unTurno)}
                                            >
                                            Cancelar Turno
                                            </button> ) :null
                                        }
                                    />
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
                            ¿Deseas cancelar el turno para <strong>{turnoSeleccionado.integrante}</strong> el día <strong>{formatearFecha(turnoSeleccionado.fecha)} - {turnoSeleccionado.hora}</strong>?
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
                                onClick={() => handleCancelarTurno(turnoSeleccionado._id)} 
                            >
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