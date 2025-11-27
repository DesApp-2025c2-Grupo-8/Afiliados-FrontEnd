import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import FiltrosCards from '../../components/FiltrosCards/FiltrosCards';
import SearchBarCards from '../../components/SearchBarCards/SearchBarCards';
import styles from './ConsultarTurnos.module.css';
import { MdCancel } from 'react-icons/md';
import { BsClipboard2Plus } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { useAfiliadoDatos } from '../../context/AfiliadoDatos';

const periodosOpciones = [
  'Último año',
  'Últimos seis meses',
  'Últimos tres meses',
  'Último mes',
  'Últimas dos semanas',
  'Última semana',
];

const cardData = {
  color: 'observacion',
  camposCard: [
    { campo: 'Integrante', propiedad: 'integrante' },
    { campo: 'Hora', propiedad: 'hora' },
    { campo: 'Especialidad', propiedad: 'especialidad' },
    { campo: 'Lugar de Atención', propiedad: 'lugarDeAtencion' },
  ],
};

const ConsultarTurnos = () => {
  
  //const navigate = useNavigate();
  const { dataAfiliado } = useAfiliadoDatos();
  const numeroAfiliado = dataAfiliado?.numeroAfiliado;
  const esTitular = dataAfiliado?.rol === 'TITULAR';

  const [listaTurnos, setListaTurnos] = useState([]);
  const [listaTurnosFiltrados, setListaTurnosFiltrados] = useState([]);
  const [filtroAntiguos, setFiltroAntiguos] = useState(false);
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  // Filtros en mobile
  const [filtrosMobileOpen, setFiltrosMobileOpen] = useState(false);    
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

  const obtenerFechaDelPeriodoSeleccionado = useCallback((periodo) => {
    const hoy = new Date();
    let fecha = new Date(hoy);

    console.log(hoy);
    console.log(fecha);
    
    switch (periodo) {
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
        return new Date(0).toISOString().slice(0, 10);
    }

    return fecha.toISOString().slice(0, 10);
  }, []);

  const formatearFecha = (fecha) => {
    if (!fecha || typeof fecha !== 'string') return fecha;
    const partes = fecha.split('-');
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return fecha;
  };

  const fechaLocal = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const esTurnoAntiguo = useCallback((turno) => {
    const hoy = fechaLocal(new Date());
    const horaHoy = new Date().toTimeString().slice(0, 5);

    if (turno.fecha < hoy) {
      return true;
    } else if (turno.fecha === hoy) {
      return turno.hora <= horaHoy;
    }
    return false;
  }, []);

  const aplicarFiltros = useCallback((antiguos, periodo, busqueda) => {
        let turnosFiltrados = listaTurnos.slice();
        if (antiguos) {
            turnosFiltrados = turnosFiltrados.filter(t => t.fecha <= fechaLocal(new Date()))
            turnosFiltrados = turnosFiltrados.filter(t => esTurnoAntiguo(t))
        } else {
            turnosFiltrados = turnosFiltrados.filter(t => !esTurnoAntiguo(t))
        }
        if (periodo) {
            const fechaLimite = obtenerFechaDelPeriodoSeleccionado(periodo)
            const hoy = fechaLocal(new Date());

            if (antiguos) {
                turnosFiltrados = turnosFiltrados.filter(
                    t => t.fecha >= fechaLimite && t.fecha <= hoy
                )
            } else {
                turnosFiltrados = turnosFiltrados.filter(
                    t => t.fecha >= fechaLimite
                )
            }
        }
        
        if (busqueda) {
            const textoBusqueda = busqueda.toLowerCase();
            turnosFiltrados = turnosFiltrados.filter(t => 
                t.integrante?.toLowerCase().includes(textoBusqueda) || t.fecha.includes(busqueda) || 
                t.tipoConsulta?.toLowerCase().includes(textoBusqueda) || t.lugarDeAtencion?.toLowerCase().includes(textoBusqueda)
            )
        }
        setListaTurnosFiltrados(turnosFiltrados)
    }, [listaTurnos, esTurnoAntiguo, obtenerFechaDelPeriodoSeleccionado])




    // useEffect(() => {
    //     document.title = 'Consulta de Turnos - Medicina Integral';
    //     const fetchTurnos = async () => {
    //         if (!numeroAfiliado) return
    //         try {
    //             const response = await fetch(`http://localhost:3000/turnos/consulta/${numeroAfiliado}`);
                
    //             if (!response.ok) {
    //                 setListaTurnos([])
    //                 setListaTurnosFiltrados([])
    //                 return;
    //             }
    //             const data = await response.json()
                
    //             const dataLimpia = data.map(turno => {
    //                 let lugarDeAtencionString = 'N/D';

    //                 if (Array.isArray(turno.lugarDeAtencion) && turno.lugarDeAtencion.length > 0) {
    //                     const primeraUbicacion = turno.lugarDeAtencion[0];
                        
    //                     lugarDeAtencionString = `${primeraUbicacion.partido} (${primeraUbicacion.direccion})`;
    //                 }
    //                 return {
    //                     ...turno,
    //                     lugarDeAtencion: lugarDeAtencionString
    //                 };
    //             });
    //             const turnosOrdenados = [...dataLimpia].sort((a, b) => {
    //                 const dateA = new Date(a.fecha);
    //                 const dateB = new Date(b.fecha);
    //                 return dateB.getTime() - dateA.getTime(); 
    //             })
                
    //             setListaTurnos(turnosOrdenados);
                
    //         } catch (error) {
    //             console.error('Error al obtener turnos:', error);
    //             setListaTurnos([])
    //         } 
    //     }
    //     fetchTurnos()
    // }, [numeroAfiliado]);




    useEffect(() => {
      document.title = 'Consulta de Turnos - Medicina Integral';

      const fetchTurnos = async () => {
        if (!numeroAfiliado) return;

        try {
          let turnosTotales = [];

          // Función auxiliar para traer y limpiar turnos de un afiliado
          const obtenerTurnosAfiliado = async (numAfiliado) => {
            const response = await fetch(`http://localhost:3000/turnos/consulta/${numAfiliado}`);
            if (!response.ok) return [];

            const data = await response.json();

            const dataLimpia = data.map((turno) => {
              let lugarDeAtencionString = 'N/D';

              if (Array.isArray(turno.lugarDeAtencion) && turno.lugarDeAtencion.length > 0) {
                const primeraUbicacion = turno.lugarDeAtencion[0];
                lugarDeAtencionString = `${primeraUbicacion.partido} (${primeraUbicacion.direccion})`;
              }

              return {
                ...turno,
                lugarDeAtencion: lugarDeAtencionString,
              };
            });

            return dataLimpia;
          };

          // Primero traemos los turnos del afiliado actual
          const turnosAfiliado = await obtenerTurnosAfiliado(numeroAfiliado);
          turnosTotales.push(...turnosAfiliado);

          // Si es titular, también traer los turnos del grupo familiar
          if (esTitular && dataAfiliado?.grupoFamiliar?.length > 0) {
            const promesasGrupo = dataAfiliado.grupoFamiliar.map((afiliado) =>
              obtenerTurnosAfiliado(afiliado.numeroAfiliado)
            );

            const resultadosGrupo = await Promise.all(promesasGrupo);
            resultadosGrupo.forEach((turnos) => {
              turnosTotales.push(...turnos);
            });
          }

          // Ordenar todos los turnos juntos por fecha (más reciente primero)
          const turnosOrdenados = [...turnosTotales].sort((a, b) => {
            const dateA = new Date(a.fecha);
            const dateB = new Date(b.fecha);
            return dateB.getTime() - dateA.getTime();
          });

          setListaTurnos(turnosOrdenados);
          setListaTurnosFiltrados(turnosOrdenados);
        } catch (error) {
          console.error('Error al obtener turnos:', error);
          setListaTurnos([]);
          setListaTurnosFiltrados([]);
        }
      };

      fetchTurnos();
    }, [numeroAfiliado, esTitular, dataAfiliado]);


    useEffect(() => {
      aplicarFiltros(filtroAntiguos, filtroPeriodo, filtroBusqueda);
    }, [listaTurnos, aplicarFiltros, filtroAntiguos, filtroPeriodo, filtroBusqueda]);

    const handleAbrirModal = (turno) => {
      setTurnoSeleccionado(turno);
      setMostrarModal(true);
    };

    const handleCancelarTurno = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/turnos/cancelar/${id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json'},
            })
            await response.json()
            
            const turnosActualizados = listaTurnos.filter(t => t._id !== id)
            setListaTurnos(turnosActualizados)
            setMostrarModal(false)
            setTurnoSeleccionado(null)
        } catch (error) {
            console.error('Error al cancelar el turno: ', error)
            setMostrarModal(false)
            setTurnoSeleccionado(null)
        }
    }

    const handleFiltrarPorAntiguos = (isChecked) => {
        setFiltroAntiguos(isChecked);
        if (!isChecked) {
            setFiltroPeriodo('');
        }
    }
    
    const handleBusqueda = (texto) => setFiltroBusqueda(texto);
    const handleFiltrarPorPeriodo = (periodo) => setFiltroPeriodo(periodo);
    const limpiarFiltros = () => {
      setFiltroAntiguos(false);
      setFiltroPeriodo('');
      setFiltroBusqueda('');
    };

    return(
      <>
        <div className={styles.pantallaDeConsultaContainer}>
          <div className={styles.tituloYBotones}>
            <h1 className={styles.tituloPantallaDeConsulta}>Consultar Turnos</h1>
            <section className={styles.botonesContainer}>
              <SearchBarCards
                valorInput={filtroBusqueda}
                filtro={handleBusqueda}
                limpiarFiltros={() => { handleBusqueda(''); }}
                placeholder={"Ingrese un integrante..."}
              />
              <Link className={styles.botonCargarYSolicitar} to={'/solicitar-turno'}>
                <BsClipboard2Plus />
                <span>Solicitar Turno</span>
              </Link>
              <button
                className={styles.botonFiltrosMobile}
                onClick={toggleFiltrosMobile}
              >
                <FaFilter />
              </button>
            </section>
          </div>

          {/* <button
                  className={styles.botonMostrarFiltros}
                  onClick={() => {
                    document.querySelector(`.${styles.filtroContainer}`).classList.toggle(styles.abierto)
                  }}
                >Mostrar / Ocultar filtros</button> */}
          <div className={styles.filtrosYResultadosConsulta}>
            <section className={`${styles.filtrosConsultaContainer} ${filtrosMobileOpen ? styles.activo : ''}`}>
              <button
                className={styles.botonCerrarFiltrosMobile}
                onClick={toggleFiltrosMobile}
              >
                X
              </button>
              <div className={styles.tituloFiltros}>
                <h2>Filtrar turnos por:</h2>
                <hr />
              </div>


              <div className={styles.botonLimpiarFiltrosContainer}>
                <div className={styles.botonAntiguosContainer}>
                  <label className={styles.botonAntiguos}>
                    <input
                      type='checkbox'
                      checked={filtroAntiguos}
                      onChange={(e) => handleFiltrarPorAntiguos(e.target.checked)}
                    />
                    Turnos Pasados
                  </label>
                </div>
                <button className={styles.botonLimpiarFiltros} onClick={limpiarFiltros}>
                  <MdCancel />
                  <span>Limpiar filtros </span>
                </button>

              </div>
              <hr /> 
              {filtroAntiguos && (
                <div className={styles.filtroPeriodoBox}>
                  <FiltrosCards
                    label={'Período'}
                    default={'TODO'}
                    opciones={periodosOpciones}
                    valorActual={filtroPeriodo}
                    filtrarAlSeleccionar={handleFiltrarPorPeriodo}
                    borrarFiltro={() => { handleFiltrarPorPeriodo('') }}
                    />
                  <hr />
                </div>
              )}
              <div className={styles.textoResultadosDeConsulta}>
                <h3>{listaTurnosFiltrados.length} turno(s) encontrados</h3>
              </div>
            </section>

            <section className={styles.resultadosDeConsultaContainer}>
              {listaTurnosFiltrados.length === 0 ?
                <h2>No existen turnos con los filtros ingresados</h2> :
                (listaTurnosFiltrados.map((unTurno, idx) => (
                  <CardDinamica
                    {...cardData}
                    data={unTurno}
                    header={`Fecha de Turno: ${formatearFecha(unTurno.fecha)}`}
                    key={idx}
                    tieneContenidoExtra={
                      !esTurnoAntiguo(unTurno) ? (
                        <button
                          className={styles.botonAbrirModal}
                          onClick={() => handleAbrirModal(unTurno)}
                        >
                          Cancelar Turno
                        </button>) : null
                    }
                    className={styles.cardTurno}
                  />
                )))
              }
            </section>
          </div>
        </div>

        {mostrarModal && turnoSeleccionado && (
          <div className={styles.modalContainer}>
            <div className={styles.modalBox}>
              <div className={styles.modalHeader}>
                <h2>Cancelar Turno</h2>
              </div>
              <p className={styles.modalBody}>
                ¿Deseas cancelar el turno para <strong>{turnoSeleccionado.integrante}</strong> el día <strong>{formatearFecha(turnoSeleccionado.fecha)} - {turnoSeleccionado.hora}</strong>?
              </p>

              <div className={styles.modalFooter}>
                <button
                  className={styles.botonVolver}
                  onClick={() => {
                    setMostrarModal(false);
                    setTurnoSeleccionado(null);
                  }}
                >
                  Volver
                </button>
                <button
                  className={styles.botonCancelarTurno}
                  onClick={() => handleCancelarTurno(turnoSeleccionado._id)}
                >
                  Cancelar Turno
                </button>
              </div>
            </div>
          </div>
        )}
      </>
  );
};

export default ConsultarTurnos;