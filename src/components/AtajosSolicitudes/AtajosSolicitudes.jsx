import { useEffect, useState } from 'react';
import EstadoSolicitud from '../../components/EstadoSolicitud/EstadoSolicitud';
import styles from './AtajosSolicitudes.module.css';
import { BsClipboard2Plus } from 'react-icons/bs';
import { LuDollarSign } from 'react-icons/lu';
import { PiPulse } from 'react-icons/pi';
import { Link } from "react-router-dom"
import { FiPlus } from "react-icons/fi";
import { AiOutlineClose } from 'react-icons/ai';

const AtajosSolicitudes = (props) => {

  // const [estadosSolicitudes, setEstadosSolicitudes] = useState([]);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(props.autorizaciones);
  const [tipo, setTipo] = useState("autorizacion");
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("ultimaSemana");
  
  useEffect(() => {
  setSolicitudSeleccionada(props.autorizaciones);
}, [props.autorizaciones]);

  const hoy = new Date();
  const ultimaSemana = new Date();
  ultimaSemana.setDate(hoy.getDate() - 7);
  const ultimoMes = new Date();
  ultimoMes.setMonth(hoy.getMonth() - 1);
  const ultimoAno = new Date();
  ultimoAno.setFullYear(hoy.getFullYear() - 1);

  const obtenerCantidadPorEstadoPeriodoYSolicitud = (estadoS, periodo, solicitudess) => {
    // console.log(solicitudess)
    let fechaInicio;
    if (periodo === "ultimaSemana") {
      fechaInicio = ultimaSemana;
    } else if (periodo === "ultimoMes") {
      fechaInicio = ultimoMes;
    } else {
      fechaInicio = ultimoAno;
    }
    // console.log("fechaInicio:", fechaInicio);
    return solicitudess.filter(solicitud => {
      return (
        solicitud.estado.toLowerCase() === estadoS &&
        new Date(solicitud.fechaDeCarga) >= fechaInicio &&
        new Date(solicitud.fechaDeCarga) <= hoy
      );
    }).length;
  }

  const resumenInicial = [
      { titulo: "Pendientes", estado: "pendiente", cantidad: obtenerCantidadPorEstadoPeriodoYSolicitud("pendiente", "ultimaSemana", props.autorizaciones) },
      { titulo: "En observación", estado: "observacion", cantidad: obtenerCantidadPorEstadoPeriodoYSolicitud("observación", "ultimaSemana", props.autorizaciones) },
      { titulo: "Rechazadas", estado: "rechazada", cantidad: obtenerCantidadPorEstadoPeriodoYSolicitud("rechazada", "ultimaSemana", props.autorizaciones) },
      { titulo: "Aceptadas", estado: "aceptada", cantidad: obtenerCantidadPorEstadoPeriodoYSolicitud("aceptada", "ultimaSemana", props.autorizaciones) },
    ];

  const [estadoSolicitud, setEstadoSolicitud] = useState([]);

  useEffect(() => {
  const nuevoResumen = [
    { titulo: "Pendientes", estado: "pendiente",
      cantidad: obtenerCantidadPorEstadoPeriodoYSolicitud("pendiente", periodoSeleccionado, solicitudSeleccionada)
    },
    { titulo: "En observación", estado: "observacion",
      cantidad: obtenerCantidadPorEstadoPeriodoYSolicitud("observación", periodoSeleccionado, solicitudSeleccionada)
    },
    { titulo: "Rechazadas", estado: "rechazada",
      cantidad: obtenerCantidadPorEstadoPeriodoYSolicitud("rechazada", periodoSeleccionado, solicitudSeleccionada)
    },
    { titulo: "Aceptadas", estado: "aceptada",
      cantidad: obtenerCantidadPorEstadoPeriodoYSolicitud("aceptada", periodoSeleccionado, solicitudSeleccionada)
    },
  ];

  setEstadoSolicitud(nuevoResumen);

    // console.log(tipo + " del " + periodoSeleccionado + " aceptadas ", obtenerCantidadPorEstadoPeriodoYSolicitud("aceptada", periodoSeleccionado, solicitudSeleccionada))
    // console.log(tipo + " del " + periodoSeleccionado + " rechazadas ", obtenerCantidadPorEstadoPeriodoYSolicitud("rechazada", periodoSeleccionado, solicitudSeleccionada))
    // console.log(tipo + " del " + periodoSeleccionado + " en observacion ", obtenerCantidadPorEstadoPeriodoYSolicitud("observacion", periodoSeleccionado, solicitudSeleccionada))
    // console.log(tipo + " del " + periodoSeleccionado + " en observaciónnnn ", obtenerCantidadPorEstadoPeriodoYSolicitud("observación", periodoSeleccionado, solicitudSeleccionada))
    // console.log(tipo + " del " + periodoSeleccionado + " pendientes ", obtenerCantidadPorEstadoPeriodoYSolicitud("pendiente", periodoSeleccionado, solicitudSeleccionada))

  }, [solicitudSeleccionada, periodoSeleccionado]);

  const [mostrarAtajos, setMostrarAtajos] = useState(false);

  return (
    <section className={styles.atajosSolicitudes}>
      <div className={styles.atajosAccionMobile  + (mostrarAtajos ? " " + styles.alargue : "")}>
        <button className={styles.atajosAccionMobileButton} onClick={() => setMostrarAtajos(!mostrarAtajos)}> {mostrarAtajos ? <AiOutlineClose /> : <FiPlus />}</button>
      </div>
      <div className={styles.atajosAccion + (mostrarAtajos ? " " + (styles.mostrar ) : "")}>
        <h2 className={styles.tituloAtajosAccion}>Atajos de acción</h2>
        <Link to="/cargar-autorizacion" className={styles.btnAccion}> <PiPulse /> Nueva autorización</Link>
        <Link to="/solicitar-reintegro" className={styles.btnAccion}> <LuDollarSign /> Solicitar reintegro</Link>
        <Link to="/cargar-receta" className={styles.btnAccion}> <BsClipboard2Plus /> Cargar receta</Link>
      </div>
      <div className={styles.solicitudesEstado}>
        <h2>Solicitudes por estado</h2>
        <div className={styles.containerEstadoPeriodo}>
          <div className={styles.seleccionEstado}>
            <button
              className={(tipo == "autorizacion" ? styles.btnSeleccionEstadoActivo : styles.btnSeleccionEstado)}
              onClick={() => { setSolicitudSeleccionada(props.autorizaciones); setTipo("autorizacion") }}
            >
              Autorizaciones
            </button>
            <button
              className={(tipo == "reintegro" ? styles.btnSeleccionEstadoActivo : styles.btnSeleccionEstado)}
              onClick={() => { setSolicitudSeleccionada(props.reintegros); setTipo("reintegro") }}
            >
              Reintegros
            </button>
            <button
              className={(tipo == "receta" ? styles.btnSeleccionEstadoActivo : styles.btnSeleccionEstado)}
              onClick={() => { setSolicitudSeleccionada(props.recetas); setTipo("receta") }}
            >
              Recetas
            </button>
          </div>
          <div className={styles.periodoResultado}>
            <p className={styles.tituloPeriodo}>- Período -</p>
            <div className={styles.periodoBotones}>
              <button className={(periodoSeleccionado === "ultimaSemana" ? styles.activo : styles.btnPeriodo)} onClick={() => setPeriodoSeleccionado("ultimaSemana")}>Últimos 7 días</button>
              <button className={(periodoSeleccionado === "ultimoMes" ? styles.activo : styles.btnPeriodo)} onClick={() => setPeriodoSeleccionado("ultimoMes",)}>Último mes</button>
              <button className={(periodoSeleccionado === "ultimoAño" ? styles.activo : styles.btnPeriodo)} onClick={() => setPeriodoSeleccionado("ultimoAño")}>Último año</button>
            </div>
            <div className={styles.periodoEstados}>
              {estadoSolicitud.map((item, idx) =>
                <EstadoSolicitud
                  key={idx + item.estado}
                  titulo={item.titulo}
                  cantidad={item.cantidad}
                  estado={item.estado}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtajosSolicitudes;
