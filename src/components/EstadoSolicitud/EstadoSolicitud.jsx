import style from "./EstadoSolicitud.module.css"

const EstadoSolicitud = (props) => {
    return (
        <div className={style.estadoSolicitud}>
            <p className={style.tituloEstadoSolicitud}>{props.titulo}:</p>
            <div className={style.containerCantidadEstadoSolicitud}>
                <p className={style.cantidadEstadoSolicitud}>{props.cantidad}</p>
                <div className={style.linea + ' ' + props.estado}></div>
            </div>
        </div>
    );
};

export default EstadoSolicitud;