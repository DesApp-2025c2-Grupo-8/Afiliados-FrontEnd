import { useEffect, useState } from 'react';
import EstadoSolicitud from '../../components/EstadoSolicitud/EstadoSolicitud';
import "./AtajosSolicitudes.css"
import { BsClipboard2Plus } from 'react-icons/bs';
import { LuDollarSign } from 'react-icons/lu';
import { PiPulse } from 'react-icons/pi';
import { Link } from "react-router-dom"
import solicitudes from '../../db/solicitudes';

const AtajosSolicitudes = () => {

  const [estadosSolicitudes, setEstadosSolicitudes] = useState([]);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState("autorizacion");
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("ultimaSemana");

  // Estado base con títulos fijos y cantidad en 0
  const estadosBase = [
    { titulo: "Pendientes", estado: "pendiente", cantidad: 0 },
    { titulo: "En observación", estado: "observacion", cantidad: 0 },
    { titulo: "Rechazadas", estado: "rechazada", cantidad: 0 },
    { titulo: "Aceptadas", estado: "aceptada", cantidad: 0 },
  ];

  const [estadoSolicitud, setEstadoSolicitud] = useState(estadosBase);

  useEffect(() => {
    const fechaActual = new Date();

    const calcularFechaInicio = () => {
      if (periodoSeleccionado === "ultimaSemana") {
        return new Date(fechaActual.getTime() - (7 * 24 * 60 * 60 * 1000));
      } else if (periodoSeleccionado === "ultimoMes") {
        return new Date(fechaActual.getTime() - (30 * 24 * 60 * 60 * 1000));
      } else {
        return new Date(fechaActual.getTime() - (365 * 24 * 60 * 60 * 1000));
      }
    };

    const fechaDeInicio = calcularFechaInicio();

    // Filtrar solicitudes según tipo y periodo
    const solicitudesFiltradas = solicitudes.filter(solicitud => {
      const fechaSolicitud = new Date(solicitud.fecha);
      return (
        solicitud.tipo === solicitudSeleccionada &&
        fechaSolicitud >= fechaDeInicio &&
        fechaSolicitud <= fechaActual
      );
    });

    setEstadosSolicitudes(solicitudesFiltradas);

    // Generar nuevo resumen a partir del base
    const nuevoResumen = estadosBase.map(item => ({
      ...item,
      cantidad: solicitudesFiltradas.filter(s => s.estado === item.estado).length
    }));

    setEstadoSolicitud(nuevoResumen);

  }, [solicitudSeleccionada, periodoSeleccionado]);

  return (
    <section className='atajos-solicitudes'>
      <div className='atajos-accion'>
        <h2 className='titulo-atajos-accion'>Atajos de acción</h2>
        <Link to="/cargar-autorizacion" className='btn-accion'> <PiPulse /> Nueva autorización</Link>
        <Link to="/solicitar-reintegro" className='btn-accion'> <LuDollarSign /> Solicitar reintegro</Link>
        <Link to="/cargar-receta" className='btn-accion'> <BsClipboard2Plus /> Cargar receta</Link>
      </div>
      <div className='solicitudes-estado'>
        <h2>Solicitudes por estado</h2>
        <div className='container-estado-periodo'>
          <div className='seleccion-estado'>
            <button
              className={'btn-seleccion-estado ' + (solicitudSeleccionada == "autorizacion" ? "activo" : " ")}
              onClick={() => setSolicitudSeleccionada("autorizacion")}
            >
              Autorizaciones
            </button>
            <button
              className={'btn-seleccion-estado ' + (solicitudSeleccionada === "reintegro" ? "activo" : " ")}
              onClick={() => setSolicitudSeleccionada("reintegro")}
            >
              Reintegros
            </button>
            <button
              className={'btn-seleccion-estado ' + (solicitudSeleccionada === "receta" ? "activo" : " ")}
              onClick={() => setSolicitudSeleccionada("receta")}
            >
              Recetas
            </button>
          </div>
          <div className='periodo-resultado'>
            <p className='titulo-periodo'>Período:</p>
            <div className='periodo-botones'>
              <button className={(periodoSeleccionado === "ultimaSemana" ? "activo" : " ")} onClick={() => setPeriodoSeleccionado("ultimaSemana")}>Últimos 7 días</button>
              <button className={(periodoSeleccionado === "ultimoMes" ? "activo" : " ")} onClick={() => setPeriodoSeleccionado("ultimoMes",)}>Último mes</button>
              <button className={(periodoSeleccionado === "ultimoAño" ? "activo" : " ")} onClick={() => setPeriodoSeleccionado("ultimoAño")}>Último año</button>
            </div>
            <div className='periodo-estados'>
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
